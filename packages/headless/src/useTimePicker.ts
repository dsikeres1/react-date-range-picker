import { useCallback, useEffect, useMemo, useRef } from "react";
import type { UseTimePickerOptions, UseTimePickerReturn } from "./types";
import { generateHours, generateHours12, generateMinutes, generateSeconds } from "./utils";

const DEFAULT_ITEM_HEIGHT = 32;
const CENTER_INDEX = 2;

export function useTimePicker(options: UseTimePickerOptions): UseTimePickerReturn {
  const {
    hour,
    minute,
    second = 0,
    period = "AM",
    onHourChange,
    onMinuteChange,
    onSecondChange,
    onPeriodChange,
    precision = "minute",
    hourFormat = "24",
    minuteStep = 5,
    secondStep = 1,
    itemHeight = DEFAULT_ITEM_HEIGHT,
  } = options;

  const isProgrammaticHourScrollRef = useRef(false);
  const isProgrammaticMinuteScrollRef = useRef(false);
  const isProgrammaticSecondScrollRef = useRef(false);
  const hourScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const minuteScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const secondScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const ignoreHourSyncRef = useRef(false);
  const ignoreMinuteSyncRef = useRef(false);
  const ignoreSecondSyncRef = useRef(false);

  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);
  const secondListRef = useRef<HTMLDivElement>(null);

  const is12Hour = hourFormat === "12";
  const showMinutes = precision === "minute" || precision === "second";
  const showSeconds = precision === "second";

  const hours = useMemo(() => (is12Hour ? generateHours12() : generateHours()), [is12Hour]);
  const minutes = useMemo(() => generateMinutes(minuteStep), [minuteStep]);
  const seconds = useMemo(() => generateSeconds(secondStep), [secondStep]);

  const hourIndex = useMemo(() => {
    const idx = hours.indexOf(hour);
    return idx >= 0 ? idx : CENTER_INDEX;
  }, [hours, hour]);

  const minuteIndex = useMemo(() => {
    const idx = minutes.indexOf(minute);
    return idx >= 0 ? idx : 0;
  }, [minutes, minute]);

  const secondIndex = useMemo(() => {
    const idx = seconds.indexOf(second);
    return idx >= 0 ? idx : 0;
  }, [seconds, second]);

  // ── Scroll sync: value → scroll position ──
  useEffect(() => {
    if (ignoreHourSyncRef.current) {
      ignoreHourSyncRef.current = false;
      return;
    }
    if (hourListRef.current) {
      hourListRef.current.scrollTop = (hourIndex - CENTER_INDEX) * itemHeight;
    }
  }, [hourIndex, itemHeight]);

  useEffect(() => {
    if (ignoreMinuteSyncRef.current) {
      ignoreMinuteSyncRef.current = false;
      return;
    }
    if (minuteListRef.current && showMinutes) {
      minuteListRef.current.scrollTop = (minuteIndex - CENTER_INDEX) * itemHeight;
    }
  }, [minuteIndex, itemHeight, showMinutes]);

  useEffect(() => {
    if (ignoreSecondSyncRef.current) {
      ignoreSecondSyncRef.current = false;
      return;
    }
    if (secondListRef.current && showSeconds) {
      secondListRef.current.scrollTop = (secondIndex - CENTER_INDEX) * itemHeight;
    }
  }, [secondIndex, showSeconds, itemHeight]);

  // ── Scroll handlers ──
  const handleHourScroll = useCallback(() => {
    if (isProgrammaticHourScrollRef.current) return;
    if (hourListRef.current) {
      const scrollTop = hourListRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / itemHeight) + CENTER_INDEX;
      if (
        newIndex >= 0 &&
        newIndex < hours.length &&
        hours[newIndex] !== -1 &&
        newIndex !== hourIndex
      ) {
        ignoreHourSyncRef.current = true;
        onHourChange(hours[newIndex]);
      }
    }
  }, [hours, hourIndex, itemHeight, onHourChange]);

  const handleMinuteScroll = useCallback(() => {
    if (isProgrammaticMinuteScrollRef.current) return;
    if (minuteListRef.current) {
      const scrollTop = minuteListRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / itemHeight) + CENTER_INDEX;
      if (
        newIndex >= 0 &&
        newIndex < minutes.length &&
        minutes[newIndex] !== -1 &&
        newIndex !== minuteIndex
      ) {
        ignoreMinuteSyncRef.current = true;
        onMinuteChange(minutes[newIndex]);
      }
    }
  }, [minutes, minuteIndex, itemHeight, onMinuteChange]);

  const handleSecondScroll = useCallback(() => {
    if (isProgrammaticSecondScrollRef.current) return;
    if (secondListRef.current && onSecondChange) {
      const scrollTop = secondListRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / itemHeight) + CENTER_INDEX;
      if (
        newIndex >= 0 &&
        newIndex < seconds.length &&
        seconds[newIndex] !== -1 &&
        newIndex !== secondIndex
      ) {
        ignoreSecondSyncRef.current = true;
        onSecondChange(seconds[newIndex]);
      }
    }
  }, [seconds, secondIndex, itemHeight, onSecondChange]);

  // ── Click handlers ──
  const handleHourClick = useCallback(
    (h: number) => {
      const index = hours.indexOf(h);
      if (index < 0) return;
      isProgrammaticHourScrollRef.current = true;
      ignoreHourSyncRef.current = true;
      onHourChange(h);
      if (hourListRef.current) {
        hourListRef.current.scrollTo({
          top: (index - CENTER_INDEX) * itemHeight,
          behavior: "smooth",
        });
      }
      clearTimeout(hourScrollTimeoutRef.current);
      hourScrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticHourScrollRef.current = false;
      }, 500);
    },
    [hours, itemHeight, onHourChange],
  );

  const handleMinuteClick = useCallback(
    (m: number) => {
      const index = minutes.indexOf(m);
      if (index < 0) return;
      isProgrammaticMinuteScrollRef.current = true;
      ignoreMinuteSyncRef.current = true;
      onMinuteChange(m);
      if (minuteListRef.current) {
        minuteListRef.current.scrollTo({
          top: (index - CENTER_INDEX) * itemHeight,
          behavior: "smooth",
        });
      }
      clearTimeout(minuteScrollTimeoutRef.current);
      minuteScrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticMinuteScrollRef.current = false;
      }, 500);
    },
    [minutes, itemHeight, onMinuteChange],
  );

  const handleSecondClick = useCallback(
    (s: number) => {
      const index = seconds.indexOf(s);
      if (index < 0) return;
      isProgrammaticSecondScrollRef.current = true;
      ignoreSecondSyncRef.current = true;
      if (onSecondChange) onSecondChange(s);
      if (secondListRef.current) {
        secondListRef.current.scrollTo({
          top: (index - CENTER_INDEX) * itemHeight,
          behavior: "smooth",
        });
      }
      clearTimeout(secondScrollTimeoutRef.current);
      secondScrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticSecondScrollRef.current = false;
      }, 500);
    },
    [seconds, itemHeight, onSecondChange],
  );

  // ── Cleanup scroll timeouts on unmount ──
  useEffect(() => {
    return () => {
      clearTimeout(hourScrollTimeoutRef.current);
      clearTimeout(minuteScrollTimeoutRef.current);
      clearTimeout(secondScrollTimeoutRef.current);
    };
  }, []);

  // ── Period toggle ──
  const handlePeriodToggle = useCallback(() => {
    if (onPeriodChange) {
      onPeriodChange(period === "AM" ? "PM" : "AM");
    }
  }, [period, onPeriodChange]);

  // ── Scroll all to current values ──
  const scrollToValues = useCallback(() => {
    if (hourListRef.current) {
      hourListRef.current.scrollTop = (hourIndex - CENTER_INDEX) * itemHeight;
    }
    if (minuteListRef.current && showMinutes) {
      minuteListRef.current.scrollTop = (minuteIndex - CENTER_INDEX) * itemHeight;
    }
    if (secondListRef.current && showSeconds) {
      secondListRef.current.scrollTop = (secondIndex - CENTER_INDEX) * itemHeight;
    }
  }, [hourIndex, minuteIndex, secondIndex, showMinutes, showSeconds, itemHeight]);

  return {
    hours,
    minutes,
    seconds,
    hourIndex,
    minuteIndex,
    secondIndex,
    showMinutes,
    showSeconds,
    is12Hour,
    period,
    handlePeriodToggle,
    hourListRef,
    minuteListRef,
    secondListRef,
    handleHourScroll,
    handleMinuteScroll,
    handleSecondScroll,
    handleHourClick,
    handleMinuteClick,
    handleSecondClick,
    scrollToValues,
    itemHeight,
    centerIndex: CENTER_INDEX,
  };
}
