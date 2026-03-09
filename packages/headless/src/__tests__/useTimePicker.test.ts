import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTimePicker } from "../useTimePicker";
import type { UseTimePickerOptions } from "../types";

describe("useTimePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize lists based on options", () => {
    const { result } = renderHook(() =>
      useTimePicker({
        hour: 14,
        minute: 30,
        second: 15,
        period: "PM" as const,
        onHourChange: vi.fn(),
        onMinuteChange: vi.fn(),
        onPeriodChange: vi.fn(),
        hourFormat: "24",
        precision: "minute",
      }),
    );

    expect(result.current.hours.length).toBe(28); // 24 + 2 padding each side
    expect(result.current.minutes.length).toBe(16); // 12 + 2 padding each side
    expect(result.current.is12Hour).toBe(false);
    expect(result.current.hourIndex).toBe(16); // 14 + 2 padding offset
  });

  it("should fire onHourChange when handleHourClick is called", () => {
    const onHourChange = vi.fn();
    const { result } = renderHook(() =>
      useTimePicker({
        hour: 10,
        minute: 0,
        onHourChange,
        onMinuteChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleHourClick(15);
    });

    expect(onHourChange).toHaveBeenCalledWith(15);
  });

  it("should fire onMinuteChange when handleMinuteClick is called", () => {
    const onMinuteChange = vi.fn();
    const { result } = renderHook(() =>
      useTimePicker({
        hour: 10,
        minute: 0,
        onHourChange: vi.fn(),
        onMinuteChange,
      }),
    );

    act(() => {
      // 15 is valid because default minuteStep is 5
      result.current.handleMinuteClick(15);
    });

    expect(onMinuteChange).toHaveBeenCalledWith(15);
  });

  it("should fire onSecondChange when handleSecondClick is called", () => {
    const onSecondChange = vi.fn();
    const { result } = renderHook(() =>
      useTimePicker({
        hour: 10,
        minute: 0,
        second: 0,
        onHourChange: vi.fn(),
        onMinuteChange: vi.fn(),
        onSecondChange,
        precision: "second",
        secondStep: 1,
      }),
    );

    act(() => {
      result.current.handleSecondClick(30);
    });

    expect(onSecondChange).toHaveBeenCalledWith(30);
  });

  it("should toggle period correctly", () => {
    const onPeriodChange = vi.fn();
    const { result, rerender } = renderHook((props: UseTimePickerOptions) => useTimePicker(props), {
      initialProps: {
        hour: 10,
        minute: 0,
        period: "AM" as "AM" | "PM",
        onHourChange: vi.fn(),
        onMinuteChange: vi.fn(),
        onPeriodChange,
      },
    });

    act(() => {
      result.current.handlePeriodToggle();
    });

    expect(onPeriodChange).toHaveBeenCalledWith("PM");

    // Simulate parent re-rendering with new prop
    rerender({
      hour: 10,
      minute: 0,
      period: "PM",
      onHourChange: vi.fn(),
      onMinuteChange: vi.fn(),
      onPeriodChange,
    });

    act(() => {
      result.current.handlePeriodToggle();
    });

    expect(onPeriodChange).toHaveBeenCalledWith("AM");
  });

  it("should show seconds when precision is 'second'", () => {
    const { result } = renderHook(() =>
      useTimePicker({
        hour: 14,
        minute: 30,
        second: 15,
        period: "PM" as const,
        onHourChange: vi.fn(),
        onMinuteChange: vi.fn(),
        onPeriodChange: vi.fn(),
        precision: "second",
        hourFormat: "24",
      }),
    );

    expect(result.current.hours.length).toBe(28); // 24 + 2 padding each side
    expect(result.current.showSeconds).toBe(true);
  });
});
