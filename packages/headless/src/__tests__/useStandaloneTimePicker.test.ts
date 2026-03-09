import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useStandaloneTimePicker } from "../useStandaloneTimePicker";
import { formatBasic } from "../date-utils";

describe("useStandaloneTimePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-15T14:30:45Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Initialization ──

  it("should initialize with default values when value is null", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: null,
        onChange: vi.fn(),
      }),
    );

    expect(result.current.isOpen).toBe(false);
    expect(result.current.hasValue).toBe(false);
    expect(result.current.displayValue).toBe("");
    expect(result.current.canConfirm).toBe(true);
  });

  it("should sync temp state from value when opened", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T14:30:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.tempHour).toBe(14);
    expect(result.current.tempMinute).toBe(30);
    expect(result.current.tempPeriod).toBe("PM");
  });

  // ── Open / Close ──

  it("should toggle open state in uncontrolled mode", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: null,
        onChange: vi.fn(),
      }),
    );

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should respect controlled open state", () => {
    const onOpenChange = vi.fn();
    const { result, rerender } = renderHook(
      (props) =>
        useStandaloneTimePicker({
          value: null,
          onChange: vi.fn(),
          ...props,
        }),
      {
        initialProps: { open: false, onOpenChange } as {
          open: boolean;
          onOpenChange: (open: boolean) => void;
        },
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

  // ── Hour change ──

  it("should handle hour change in 24h mode", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:00:00"),
        onChange: vi.fn(),
        time: { hourFormat: "24" },
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleHourChange(15);
    });

    expect(result.current.tempHour).toBe(15);
    expect(result.current.tempPeriod).toBe("PM");
  });

  it("should handle hour change in 12h mode", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T15:00:00"),
        onChange: vi.fn(),
        time: { hourFormat: "12" },
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.tempHour).toBe(15);
    expect(result.current.tempPeriod).toBe("PM");

    // In 12h mode, handleHourChange receives 12h values
    // Setting hour to 3 while PM → should become 15
    act(() => {
      result.current.handleHourChange(3);
    });

    expect(result.current.tempHour).toBe(15); // 3 PM in 24h
    expect(result.current.tempPeriod).toBe("PM");
  });

  // ── Period change ──

  it("should handle period change from AM to PM", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T03:00:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.tempHour).toBe(3);
    expect(result.current.tempPeriod).toBe("AM");

    act(() => {
      result.current.handlePeriodChange("PM");
    });

    expect(result.current.tempHour).toBe(15);
    expect(result.current.tempPeriod).toBe("PM");
  });

  it("should handle period change from PM to AM", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T15:00:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.tempHour).toBe(15);

    act(() => {
      result.current.handlePeriodChange("AM");
    });

    expect(result.current.tempHour).toBe(3);
    expect(result.current.tempPeriod).toBe("AM");
  });

  it("should handle midnight edge case (hour 0 AM → PM becomes 12)", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T00:00:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.tempHour).toBe(0);
    expect(result.current.tempPeriod).toBe("AM");

    act(() => {
      result.current.handlePeriodChange("PM");
    });

    expect(result.current.tempHour).toBe(12);
    expect(result.current.tempPeriod).toBe("PM");
  });

  it("should handle noon edge case (hour 12 PM → AM becomes 0)", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T12:00:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.tempHour).toBe(12);
    expect(result.current.tempPeriod).toBe("PM");

    act(() => {
      result.current.handlePeriodChange("AM");
    });

    expect(result.current.tempHour).toBe(0);
    expect(result.current.tempPeriod).toBe("AM");
  });

  // ── Confirm / Cancel / Clear ──

  it("should call onChange with merged date on confirm", () => {
    const onChange = vi.fn<(date: Date | null) => void>();
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:00:00"),
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleHourChange(14);
    });
    act(() => {
      result.current.handleMinuteChange(30);
    });

    act(() => {
      result.current.handleConfirm();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    const confirmed = new Date(onChange.mock.calls[0][0] as Date);
    expect(formatBasic(confirmed, "HH:mm:ss")).toBe("14:30:00");
    expect(result.current.isOpen).toBe(false);
  });

  it("should revert temp state to value on cancel", () => {
    const onChange = vi.fn<(date: Date | null) => void>();
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:00:00"),
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleHourChange(20);
    });
    expect(result.current.tempHour).toBe(20);

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.tempHour).toBe(10);
    expect(result.current.tempPeriod).toBe("AM");
    expect(result.current.isOpen).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should clear when required is false", () => {
    const onChange = vi.fn<(date: Date | null) => void>();
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:00:00"),
        onChange,
      }),
    );

    act(() => {
      result.current.handleClear();
    });

    expect(onChange).toHaveBeenCalledWith(null);
    expect(result.current.isOpen).toBe(false);
  });

  it("should not clear when required is true", () => {
    const onChange = vi.fn<(date: Date | null) => void>();
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:00:00"),
        onChange,
        required: true,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });
    act(() => {
      result.current.handleClear();
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  // ── Minute/Second step rounding ──

  it("should round minutes to step on initialization", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:07:00"),
        onChange: vi.fn(),
        time: { minuteStep: 10 },
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    // 7 rounds down to 0 with step 10
    expect(result.current.tempMinute).toBe(0);
  });

  it("should round seconds to step when precision is second", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:00:23"),
        onChange: vi.fn(),
        time: { precision: "second", secondStep: 15 },
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    // 23 rounds down to 15 with step 15
    expect(result.current.tempSecond).toBe(15);
  });

  // ── Display values ──

  it("should format displayValue from committed value", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T14:30:00"),
        onChange: vi.fn(),
        time: { hourFormat: "24", precision: "minute" },
      }),
    );

    expect(result.current.hasValue).toBe(true);
    expect(result.current.displayValue).toBe("14:30");
  });

  it("should use custom displayFormat when provided", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T14:30:00"),
        onChange: vi.fn(),
        displayFormat: "HH:mm",
      }),
    );

    expect(result.current.displayValue).toBe("14:30");
  });

  // ── Keyboard ──

  it("should cancel on Escape key when open", () => {
    const { result } = renderHook(() =>
      useStandaloneTimePicker({
        value: new Date("2024-05-15T10:00:00"),
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      result.current.handleHourChange(20);
    });
    expect(result.current.tempHour).toBe(20);

    act(() => {
      result.current.handleKeyDown({
        key: "Escape",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLElement>);
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.tempHour).toBe(10); // reverted
  });
});
