import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatBasic } from "../date-utils";
import { useDateTimePicker } from "../useDateTimePicker";

describe("useDateTimePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
        value: null,
        onChange: vi.fn(),
      }),
    );

    expect(result.current.isOpen).toBe(false);
    expect(result.current.tempDate).toBeNull();
    // Default time is mapped to current time (12:00 PM) when value is null
    expect(result.current.tempHour).toBe(0);
    expect(result.current.tempMinute).toBe(0);
    expect(result.current.tempPeriod).toBe("AM");
  });

  it("should sync time selection with tempDate", () => {
    const onChange = vi.fn<(dateTime: Date | null) => void>();
    const { result } = renderHook(() =>
      useDateTimePicker({
        value: new Date("2024-05-15T10:00:00"),
        onChange,
      }),
    );

    // Initial value is set
    act(() => {
      result.current.handleOpen(); // Open to initialize states from value
    });

    expect(
      result.current.tempDate ? formatBasic(result.current.tempDate, "YYYY-MM-DD") : undefined,
    ).toBe("2024-05-15");
    expect(result.current.tempHour).toBe(10); // internal is 24h format

    // Change hour first
    act(() => {
      result.current.handleHourChange(2); // 2
    });

    // Then change period to ensure state doesn't conflict
    act(() => {
      result.current.handlePeriodChange("PM"); // 2 PM -> 14:00
    });

    expect(result.current.tempHour).toBe(14);

    // When confirmed, onChange should be called with the fully merged date and time
    act(() => {
      result.current.handleConfirm();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    const confirmedDate = new Date(onChange.mock.calls[0][0] as Date);
    expect(formatBasic(confirmedDate, "YYYY-MM-DD HH:mm:ss")).toBe("2024-05-15 14:00:00");
  });

  it("should not call onChange when time is changed before confirm", () => {
    const onChange = vi.fn<(dateTime: Date | null) => void>();
    const { result } = renderHook(() =>
      useDateTimePicker({
        value: null,
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    // Wait for the open effect to finish before clicking a date
    act(() => {
      result.current.handleDateClick(new Date("2024-05-20T00:00:00"));
    });

    expect(
      result.current.tempDate ? formatBasic(result.current.tempDate, "YYYY-MM-DD") : undefined,
    ).toBe("2024-05-20");

    act(() => {
      result.current.handleMinuteChange(30);
    });

    expect(result.current.tempMinute).toBe(30);
    expect(onChange).not.toHaveBeenCalled(); // No onChange until confirm

    act(() => {
      result.current.handleConfirm();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    const confirmedDate = new Date(onChange.mock.calls[0][0] as Date);
    expect(formatBasic(confirmedDate, "YYYY-MM-DD")).toBe("2024-05-20");
    expect(confirmedDate.getMinutes()).toBe(30);
  });

  it("should handle 12-hour format and period changes correctly", () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
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

    act(() => {
      result.current.handlePeriodChange("AM");
    });

    expect(result.current.tempHour).toBe(3); // 3 PM -> 3 AM
    expect(result.current.tempPeriod).toBe("AM");
  });

  it("should round minutes according to minuteStep on initialization", () => {
    const { result } = renderHook(() =>
      useDateTimePicker({
        value: new Date("2024-05-15T12:07:00"),
        onChange: vi.fn(),
        time: { minuteStep: 10 },
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    // 07 should be rounded down to 00 with step 10 (as per our adjustMinuteToStep: Math.floor(m / step) * step)
    expect(result.current.tempMinute).toBe(0);
  });
});
