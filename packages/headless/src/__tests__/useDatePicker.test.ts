import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatBasic } from "../date-utils";
import { useDatePicker } from "../useDatePicker";

describe("useDatePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize correctly", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: null,
        onChange: vi.fn(),
      }),
    );

    expect(result.current.isOpen).toBe(false);
    expect(result.current.tempDate).toBeNull();
    expect(formatBasic(result.current.currentMonth, "YYYY-MM")).toBe("2024-05");
  });

  it("should manage controlled open state", () => {
    const onOpenChange = vi.fn();
    const { result, rerender } = renderHook(
      (props) =>
        useDatePicker({
          value: null,
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
      useDatePicker({
        value: new Date("2024-05-15T00:00:00"),
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

    triggerKey("Enter");
    expect(
      result.current.tempDate ? formatBasic(result.current.tempDate, "YYYY-MM-DD") : undefined,
    ).toBe("2024-05-15");
  });

  it("should clear selection correctly", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDatePicker({
        value: new Date("2024-05-15T00:00:00"),
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });
    act(() => {
      result.current.handleClear();
    });

    expect(onChange).toHaveBeenCalledWith(null);
    expect(result.current.tempDate).toBeNull();
  });

  it("should not clear if required is true", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDatePicker({
        value: new Date("2024-05-15T00:00:00"),
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

  it("should change month/year via dropdown handlers", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: null,
        onChange: vi.fn(),
        initialMonth: new Date("2024-05-01T00:00:00"),
      }),
    );

    expect(formatBasic(result.current.currentMonth, "YYYY-MM")).toBe("2024-05");

    act(() => {
      result.current.handleYearSelect(2025);
    });
    expect(formatBasic(result.current.currentMonth, "YYYY-MM")).toBe("2025-05");

    act(() => {
      result.current.handleMonthSelect(11); // December (0-indexed)
    });
    expect(formatBasic(result.current.currentMonth, "YYYY-MM")).toBe("2025-12");
  });

  it("should not overflow when selecting month on a day-of-month > target month's days", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: new Date("2024-03-31T00:00:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    // currentMonth is synced to value (March 31)
    expect(formatBasic(result.current.currentMonth, "YYYY-MM")).toBe("2024-03");

    // Select February — without fix, Mar 31 -> month(1) overflows to Mar 3
    act(() => {
      result.current.handleMonthSelect(1);
    });
    expect(formatBasic(result.current.currentMonth, "YYYY-MM")).toBe("2024-02");

    // Select year on a leap day scenario
    act(() => {
      result.current.handleMonthSelect(1); // Stay at Feb
    });
    act(() => {
      result.current.handleYearSelect(2023); // 2023 is not a leap year
    });
    expect(formatBasic(result.current.currentMonth, "YYYY-MM")).toBe("2023-02");
  });

  it("should cancel selection and revert to original value", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: new Date("2024-05-10T00:00:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });
    act(() => {
      result.current.handleDateClick(new Date("2024-05-20T00:00:00")); // Choose a new temporary date
    });

    expect(
      result.current.tempDate ? formatBasic(result.current.tempDate, "YYYY-MM-DD") : undefined,
    ).toBe("2024-05-20");

    act(() => {
      result.current.handleCancel(); // Should cancel and revert tempDate to value
    });

    expect(result.current.isOpen).toBe(false);
    expect(
      result.current.tempDate ? formatBasic(result.current.tempDate, "YYYY-MM-DD") : undefined,
    ).toBe("2024-05-10");
  });

  // ── Leap year / year boundary edge cases ──

  it("should navigate from Feb 29 via keyboard (leap year)", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: new Date("2024-02-29T00:00:00"),
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
    ).toBe("2024-02-29");

    // ArrowRight → Mar 1
    triggerKey("ArrowRight");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-03-01");

    // ArrowLeft → back to Feb 29
    triggerKey("ArrowLeft");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-02-29");
  });

  it("should navigate across year boundary (Dec 31 → Jan 1)", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: new Date("2024-12-31T00:00:00"),
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
    ).toBe("2024-12-31");

    // ArrowRight → Jan 1, 2025
    triggerKey("ArrowRight");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2025-01-01");

    // ArrowLeft → back to Dec 31
    triggerKey("ArrowLeft");
    expect(
      result.current.focusedDate
        ? formatBasic(result.current.focusedDate, "YYYY-MM-DD")
        : undefined,
    ).toBe("2024-12-31");
  });
});
