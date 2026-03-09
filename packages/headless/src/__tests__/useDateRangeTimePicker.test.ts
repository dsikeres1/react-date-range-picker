import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatBasic } from "../date-utils";
import { useDateRangeTimePicker } from "../useDateRangeTimePicker";

describe("useDateRangeTimePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useDateRangeTimePicker({
        value: { start: null, end: null },
        onChange: vi.fn(),
      }),
    );

    expect(result.current.isOpen).toBe(false);
    expect(result.current.tempStartDate).toBeNull();
    expect(result.current.tempEndDate).toBeNull();
    expect(result.current.startHour).toBe(0);
    expect(result.current.endHour).toBe(23);
  });

  it("should merge time changes into start and end dates before confirming", () => {
    const onChange = vi.fn<(value: { start: Date | null; end: Date | null }) => void>();
    const { result } = renderHook(() =>
      useDateRangeTimePicker({
        value: { start: null, end: null },
        onChange,
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    act(() => {
      // Click start date (2024-05-10) and end date (2024-05-20)
      result.current.handleDateClick(new Date("2024-05-10T00:00:00"));
    });

    act(() => {
      result.current.handleDateClick(new Date("2024-05-20T00:00:00"));
    });

    act(() => {
      result.current.handleStartHourChange(10);
      result.current.handleStartMinuteChange(30);
    });

    act(() => {
      result.current.handleStartPeriodChange("AM");
    });

    act(() => {
      result.current.handleEndHourChange(3);
      result.current.handleEndMinuteChange(45);
    });

    act(() => {
      result.current.handleEndPeriodChange("PM");
    });

    expect(result.current.startHour).toBe(10);
    expect(result.current.startMinute).toBe(30);
    expect(result.current.endHour).toBe(15); // 3 PM
    expect(result.current.endMinute).toBe(45);

    act(() => {
      result.current.handleConfirm();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    const rangeValue = onChange.mock.calls[0][0];
    expect(formatBasic(new Date(rangeValue.start as Date), "YYYY-MM-DD HH:mm:ss")).toBe(
      "2024-05-10 10:30:00",
    );
    expect(formatBasic(new Date(rangeValue.end as Date), "YYYY-MM-DD HH:mm:ss")).toBe(
      "2024-05-20 15:45:00",
    );
  });

  it("should reset to 23:59:59 PM on clear", () => {
    const { result } = renderHook(() =>
      useDateRangeTimePicker({
        value: { start: new Date("2024-05-10T10:00:00"), end: new Date("2024-05-20T15:00:00") },
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.startHour).toBe(10);
    expect(result.current.endHour).toBe(15);

    act(() => {
      result.current.handleClear();
    });

    expect(result.current.startHour).toBe(0);
    expect(result.current.endHour).toBe(23);
    expect(result.current.endMinute).toBe(55); // adjustMinuteToStep(59, 5) = 55
    expect(result.current.endPeriod).toBe("PM");
  });

  it("should restore start time on cancel via snapshot", () => {
    const { result } = renderHook(() =>
      useDateRangeTimePicker({
        value: { start: new Date("2024-05-10T10:30:00"), end: new Date("2024-05-20T15:00:00") },
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.startHour).toBe(10);
    expect(result.current.startMinute).toBe(30);

    // Open start time picker (snapshots current values)
    act(() => {
      result.current.handleStartTimePickerOpen();
    });
    expect(result.current.isStartTimePickerOpen).toBe(true);

    // Change start time
    act(() => {
      result.current.handleStartHourChange(18);
      result.current.handleStartMinuteChange(45);
    });
    expect(result.current.startHour).toBe(18);
    expect(result.current.startMinute).toBe(45);

    // Cancel — should restore to snapshot values
    act(() => {
      result.current.handleStartTimePickerCancel();
    });
    expect(result.current.isStartTimePickerOpen).toBe(false);
    expect(result.current.startHour).toBe(10);
    expect(result.current.startMinute).toBe(30);
  });

  it("should restore end time on cancel via snapshot", () => {
    const { result } = renderHook(() =>
      useDateRangeTimePicker({
        value: { start: new Date("2024-05-10T10:00:00"), end: new Date("2024-05-20T15:45:00") },
        onChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.endHour).toBe(15);
    expect(result.current.endMinute).toBe(45);

    // Open end time picker (snapshots current values)
    act(() => {
      result.current.handleEndTimePickerOpen();
    });

    // Change end time
    act(() => {
      result.current.handleEndHourChange(8);
      result.current.handleEndMinuteChange(0);
    });
    expect(result.current.endHour).toBe(8);

    // Cancel — should restore
    act(() => {
      result.current.handleEndTimePickerCancel();
    });
    expect(result.current.isEndTimePickerOpen).toBe(false);
    expect(result.current.endHour).toBe(15);
    expect(result.current.endMinute).toBe(45);
  });

  it("should handle presets with time correctly", () => {
    const onChange = vi.fn();
    const presets = [
      {
        label: "Custom Range",
        value: {
          start: new Date("2024-01-01T08:00:00"),
          end: new Date("2024-01-02T20:00:00"),
        },
      },
    ];
    const { result } = renderHook(() =>
      useDateRangeTimePicker({
        value: { start: null, end: null },
        onChange,
        presets,
      }),
    );

    act(() => {
      result.current.handlePresetClick(presets[0]);
    });

    expect(
      result.current.tempStartDate
        ? formatBasic(result.current.tempStartDate, "YYYY-MM-DD HH:mm")
        : undefined,
    ).toBe("2024-01-01 08:00");
    expect(
      result.current.tempEndDate
        ? formatBasic(result.current.tempEndDate, "YYYY-MM-DD HH:mm")
        : undefined,
    ).toBe("2024-01-02 20:00");
    expect(result.current.startHour).toBe(8);
    expect(result.current.endHour).toBe(20);
  });
});
