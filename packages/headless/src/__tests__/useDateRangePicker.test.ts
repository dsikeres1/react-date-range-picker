import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatBasic, startOf, endOf } from "../date-utils";
import { useDateRangePicker } from "../useDateRangePicker";

describe("useDateRangePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize correctly", () => {
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
      }),
    );

    expect(result.current.isOpen).toBe(false);
    expect(result.current.tempStartDate).toBeNull();
    expect(result.current.tempEndDate).toBeNull();
    expect(formatBasic(result.current.leftMonth, "YYYY-MM")).toBe("2024-05");
    expect(formatBasic(result.current.rightMonth, "YYYY-MM")).toBe("2024-06");
  });

  it("should select start and end dates correctly", () => {
    const onChange = vi.fn<(value: { start: Date | null; end: Date | null }) => void>();
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    const startDate = new Date("2024-05-10T00:00:00");
    const endDate = new Date("2024-05-20T00:00:00");

    act(() => {
      result.current.handleDateClick(startDate);
    });

    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-10");
    expect(result.current.tempEndDate).toBeNull();

    act(() => {
      result.current.handleDateHover(new Date("2024-05-15T00:00:00"));
    });
    expect(
      result.current.hoveredDate
        ? formatBasic(result.current.hoveredDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");

    act(() => {
      result.current.handleDateClick(endDate);
    });

    expect(
      result.current.tempEndDate
        ? formatBasic(result.current.tempEndDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-20");

    act(() => {
      result.current.handleConfirm();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    const rangeValue = onChange.mock.calls[0][0];
    expect(formatBasic(new Date(rangeValue.start as Date), "YYYY-MM-DD")).toBe("2024-05-10");
    expect(formatBasic(new Date(rangeValue.end as Date), "YYYY-MM-DD")).toBe("2024-05-20");
    expect(result.current.isOpen).toBe(false);
  });

  it("should close on select if shouldCloseOnSelect is true", () => {
    const onChange = vi.fn<(value: { start: Date | null; end: Date | null }) => void>();
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange,
        shouldCloseOnSelect: true,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleDateClick(new Date("2024-05-10T00:00:00")); // Start
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-20T00:00:00")); // End
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(result.current.isOpen).toBe(false);
  });

  it("should swap dates if end is before start", () => {
    const onChange = vi.fn<(value: { start: Date | null; end: Date | null }) => void>();
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleDateClick(new Date("2024-05-20T00:00:00")); // Start
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-10T00:00:00")); // End
    });

    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-10");
    expect(
      result.current.tempEndDate
        ? formatBasic(result.current.tempEndDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-20");
  });

  it("should respect maxDays and minDays constraints", () => {
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
        minDays: 3,
        maxDays: 5,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    // Select start date
    act(() => {
      result.current.handleDateClick(new Date("2024-05-10T00:00:00"));
    });
    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-10");

    // minDays violation (2 days < minDays 3) → restarts selection from May 11
    act(() => {
      result.current.handleDateClick(new Date("2024-05-11T00:00:00"));
    });
    expect(result.current.tempEndDate).toBeNull();
    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-11");

    // maxDays violation from new start (May 11→May 17 = 7 days > maxDays 5) → restarts
    act(() => {
      result.current.handleDateClick(new Date("2024-05-17T00:00:00"));
    });
    expect(result.current.tempEndDate).toBeNull();
    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-17");

    // Restart: select new start
    act(() => {
      result.current.handleDateClick(new Date("2024-05-10T00:00:00"));
    });
    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-10");

    // Valid range (May 10→May 13 = 4 days, between minDays 3 and maxDays 5)
    act(() => {
      result.current.handleDateClick(new Date("2024-05-13T00:00:00"));
    });
    expect(
      result.current.tempEndDate
        ? formatBasic(result.current.tempEndDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-13");
  });

  it("should handle presets correctly", () => {
    const presets = [
      {
        label: "Today",
        value: () => ({ start: startOf(new Date(), "day"), end: endOf(new Date(), "day") }),
      },
    ];

    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
        presets,
      }),
    );

    act(() => {
      result.current.handlePresetClick(presets[0]);
    });

    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");
    expect(
      result.current.tempEndDate
        ? formatBasic(result.current.tempEndDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");
    expect(result.current.activePresetIndex).toBe(0);
  });

  it("should cancel selection and revert to original value", () => {
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-10T00:00:00"));
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-20T00:00:00"));
    });

    expect(result.current.tempStartDate).not.toBeNull();
    expect(result.current.tempEndDate).not.toBeNull();

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.tempStartDate).toBeNull();
    expect(result.current.tempEndDate).toBeNull();
  });

  it("should clear selection correctly", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: new Date("2024-05-10T00:00:00"), end: new Date("2024-05-20T00:00:00") },
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });
    act(() => {
      result.current.handleClear();
    });

    expect(onChange).toHaveBeenCalledWith({ start: null, end: null });
    expect(result.current.tempStartDate).toBeNull();
    expect(result.current.tempEndDate).toBeNull();
    expect(result.current.hoveredDate).toBeNull();
  });

  it("should not clear if required is true", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: new Date("2024-05-10T00:00:00"), end: new Date("2024-05-20T00:00:00") },
        onChange,
        required: true,
      }),
    );

    act(() => {
      result.current.handleOpen();
      result.current.handleClear();
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should manage controlled open state", () => {
    const onOpenChange = vi.fn();
    const { result, rerender } = renderHook(
      (props) =>
        useDateRangePicker({
          value: { start: null, end: null },
          onChange: vi.fn(),
          ...props,
        }),
      {
        initialProps: { open: false, onOpenChange },
      },
    );

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.handleOpen();
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender({ open: true, onOpenChange });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleClose();
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("should navigate via keyboard correctly", () => {
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: new Date("2024-05-15T00:00:00"), end: null },
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    const triggerKey = (key: string) => {
      act(() => {
        result.current.handleKeyDown({
          key,
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent<HTMLElement>);
      });
    };

    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");

    triggerKey("ArrowRight");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-16");

    triggerKey("ArrowLeft");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");

    triggerKey("ArrowDown");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-22");

    triggerKey("ArrowUp");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");

    // Navigate to a different date before pressing Enter (same date as start would be a no-op)
    triggerKey("ArrowRight");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-16");

    triggerKey("Enter");
    expect(
      result.current.tempEndDate
        ? formatBasic(result.current.tempEndDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-16");
  });

  it("should change month/year via dropdown handlers", () => {
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
        initialMonth: new Date("2024-05-01T00:00:00"),
      }),
    );

    expect(formatBasic(result.current.leftMonth, "YYYY-MM")).toBe("2024-05");

    act(() => {
      result.current.handleYearSelect(2025);
    });
    expect(formatBasic(result.current.leftMonth, "YYYY-MM")).toBe("2025-05");

    act(() => {
      result.current.handleMonthSelect(11);
    });
    expect(formatBasic(result.current.leftMonth, "YYYY-MM")).toBe("2025-12");
  });

  // ── Same-day range selection edge cases ──

  it("should allow same-day range when allowSingleDateInRange is true (default)", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleDateClick(new Date("2024-05-15T00:00:00"));
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-15T00:00:00"));
    });

    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");
    expect(
      result.current.tempEndDate
        ? formatBasic(result.current.tempEndDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-05-15");
  });

  it("should reject same-day range when allowSingleDateInRange is false", () => {
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
        allowSingleDateInRange: false,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleDateClick(new Date("2024-05-15T00:00:00"));
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-15T00:00:00"));
    });

    // Same-day click should restart selection (tempEndDate should be null)
    expect(result.current.tempEndDate).toBeNull();
  });

  it("should reject same-day range when minDays > 1", () => {
    const { result } = renderHook(() =>
      useDateRangePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
        minDays: 2,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleDateClick(new Date("2024-05-15T00:00:00"));
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-15T00:00:00"));
    });

    // Should restart since 1 day < minDays 2
    expect(result.current.tempEndDate).toBeNull();
  });
});
