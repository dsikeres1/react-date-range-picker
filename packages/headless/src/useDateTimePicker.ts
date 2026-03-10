import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type {
  UseDateTimePickerOptions,
  UseDateTimePickerReturn,
  DayProps,
  TimePeriod,
} from "./types";
import { resolveLocale } from "./locale";
import {
  buildCalendarMonth,
  isDateDisabled,
  adjustMinuteToStep,
  adjustSecondToStep,
  resolveTimeConfig,
  formatTimeDisplay,
  to12Hour,
  to24Hour,
  weekdayToNumber,
  resolveMinMaxDates,
} from "./utils";
import { buildSingleDayProps } from "./buildDayProps";
import {
  add,
  subtract,
  diff,
  startOf,
  isSame,
  formatBasic,
  setYear,
  setMonth,
  setHour,
  setMinute,
  setSecond,
  setMillisecond,
} from "./date-utils";

export function useDateTimePicker(options: UseDateTimePickerOptions): UseDateTimePickerReturn {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    initialMonth,
    isDateUnavailable,
    displayFormat,
    required,
    onMonthChange,
    disablePast,
    disableFuture,
    showOutsideDays,
    highlightDates,
  } = options;

  const weekStartsOnNum = weekdayToNumber(options.weekStartsOn ?? "sunday");

  const highlightKey = useMemo(
    () => highlightDates?.map((d) => d.getTime()).join(","),
    [highlightDates],
  );
  const highlightSet = useMemo(
    () =>
      highlightDates ? new Set(highlightDates.map((d) => formatBasic(d, "YYYY-MM-DD"))) : undefined,
    [highlightKey],
  );

  const locale = useMemo(
    () => resolveLocale(options.locale, weekStartsOnNum),
    [options.locale, weekStartsOnNum],
  );

  const resolvedTimeConfig = useMemo(() => resolveTimeConfig(options.time), [options.time]);

  const { precision, hourFormat, minuteStep, secondStep } = resolvedTimeConfig;
  const is12Hour = hourFormat === "12";

  // ── Controlled / Uncontrolled open ──
  const { open: controlledOpen, onOpenChange } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(options.initialOpen ?? false);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  // ── Date State ──
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => initialMonth || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // ── Time State (always stored in 24h internally) ──
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(0);
  const [tempSecond, setTempSecond] = useState(0);
  const [tempPeriod, setTempPeriod] = useState<TimePeriod>("AM");
  const timePickerRef = useRef<HTMLDivElement>(null);

  const todayStr = formatBasic(new Date(), "YYYY-MM-DD");
  const today = useMemo(() => options.today ?? new Date(), [options.today, todayStr]);

  const { effectiveMinDate, effectiveMaxDate } = useMemo(
    () => resolveMinMaxDates(minDate, maxDate, today, disablePast, disableFuture),
    [minDate, maxDate, today, disablePast, disableFuture],
  );

  // ── Sync temp state on open or value change ──
  useEffect(() => {
    if (isOpen) {
      setTempDate(value ? startOf(value, "day") : null);
      setFocusedDate(value || today);
      const h = value ? value.getHours() : 0;
      setTempHour(h);
      setTempMinute(value ? adjustMinuteToStep(value.getMinutes(), minuteStep) : 0);
      setTempSecond(
        value && precision === "second" ? adjustSecondToStep(value.getSeconds(), secondStep) : 0,
      );
      setTempPeriod(h >= 12 ? "PM" : "AM");
      if (value) {
        setCurrentMonth(value);
      } else if (!tempDate) {
        setCurrentMonth(initialMonth || new Date());
      }
      setIsTimePickerOpen(false);
    } else {
      setFocusedDate(null);
    }
  }, [isOpen, value?.getTime()]);

  // ── Click outside (time picker dropdown) ──
  useEffect(() => {
    if (!isTimePickerOpen) return;

    function handleTimePickerClickOutside(event: Event) {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setIsTimePickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleTimePickerClickOutside);
    document.addEventListener("touchstart", handleTimePickerClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleTimePickerClickOutside);
      document.removeEventListener("touchstart", handleTimePickerClickOutside);
    };
  }, [isTimePickerOpen]);

  // ── Date Actions ──
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleToggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  const handleDateClick = useCallback(
    (date: Date) => {
      setFocusedDate(date);
      if (isDateDisabled(date, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) return;
      setTempDate(date);
    },
    [effectiveMinDate, effectiveMaxDate, isDateUnavailable],
  );

  const handleCancel = useCallback(() => {
    if (value) {
      setTempDate(startOf(value, "day"));
      const h = value.getHours();
      setTempHour(h);
      setTempMinute(adjustMinuteToStep(value.getMinutes(), minuteStep));
      setTempSecond(
        precision === "second" ? adjustSecondToStep(value.getSeconds(), secondStep) : 0,
      );
      setTempPeriod(h >= 12 ? "PM" : "AM");
    } else {
      setTempDate(null);
      setTempHour(0);
      setTempMinute(0);
      setTempSecond(0);
      setTempPeriod("AM");
    }
    setOpen(false);
    setIsTimePickerOpen(false);
  }, [setOpen, value, minuteStep, secondStep, precision]);

  // ── Click outside (main container) ──
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: Event) {
      const target = event.target as Node;
      const inContainer = containerRef.current?.contains(target);
      const inPopup = popupRef.current?.contains(target);
      if (!inContainer && !inPopup) {
        handleCancel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleCancel]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
        return;
      }

      if (!focusedDate) return;

      let nextDate: Date | null = null;
      switch (e.key) {
        case "ArrowLeft":
          nextDate = subtract(focusedDate, 1, "day");
          break;
        case "ArrowRight":
          nextDate = add(focusedDate, 1, "day");
          break;
        case "ArrowUp":
          nextDate = subtract(focusedDate, 1, "week");
          break;
        case "ArrowDown":
          nextDate = add(focusedDate, 1, "week");
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          handleDateClick(focusedDate);
          return;
      }

      if (nextDate) {
        e.preventDefault();
        // Skip disabled dates in the movement direction
        const dff = diff(nextDate, focusedDate, "day");
        const unit: "day" | "week" = Math.abs(dff) === 1 ? "day" : "week";
        const forward = dff > 0;
        let candidate = nextDate;
        for (let i = 0; i < 365; i++) {
          if (!isDateDisabled(candidate, effectiveMinDate, effectiveMaxDate, isDateUnavailable))
            break;
          candidate = forward ? add(candidate, 1, unit) : subtract(candidate, 1, unit);
        }
        if (isDateDisabled(candidate, effectiveMinDate, effectiveMaxDate, isDateUnavailable))
          return;

        if (!isSame(candidate, currentMonth, "month")) {
          setCurrentMonth(startOf(candidate, "month"));
        }
        setFocusedDate(candidate);
      }
    },
    [
      isOpen,
      focusedDate,
      currentMonth,
      handleDateClick,
      handleCancel,
      effectiveMinDate,
      effectiveMaxDate,
      isDateUnavailable,
    ],
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      const next = subtract(m, 1, "month");
      onMonthChange?.(next);
      return next;
    });
  }, [onMonthChange]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      const next = add(m, 1, "month");
      onMonthChange?.(next);
      return next;
    });
  }, [onMonthChange]);

  // ── Inline auto-sync: push combined date+time to onChange on every temp change ──
  useEffect(() => {
    if (!options.inline || !tempDate) return;
    let finalDateTime = tempDate;
    finalDateTime = setHour(finalDateTime, tempHour);
    finalDateTime = setMinute(finalDateTime, tempMinute);
    finalDateTime = setSecond(finalDateTime, precision === "second" ? tempSecond : 0);
    finalDateTime = setMillisecond(finalDateTime, 0);
    onChange(finalDateTime);
  }, [options.inline, tempDate?.getTime(), tempHour, tempMinute, tempSecond, precision]);

  const handleConfirm = useCallback(() => {
    if (tempDate) {
      let finalDateTime = tempDate;
      finalDateTime = setHour(finalDateTime, tempHour);
      finalDateTime = setMinute(finalDateTime, tempMinute);
      finalDateTime = setSecond(finalDateTime, precision === "second" ? tempSecond : 0);
      finalDateTime = setMillisecond(finalDateTime, 0);
      onChange(finalDateTime);
    }
    setOpen(false);
    setIsTimePickerOpen(false);
  }, [tempDate, tempHour, tempMinute, tempSecond, precision, onChange, setOpen]);

  const handleClear = useCallback(() => {
    if (required) return;
    onChange(null);
    setTempDate(null);
    setTempHour(0);
    setTempMinute(0);
    setTempSecond(0);
    setTempPeriod("AM");
    setOpen(false);
    setIsTimePickerOpen(false);
  }, [onChange, required, setOpen]);

  const handleGoToToday = useCallback(() => {
    setCurrentMonth(startOf(today, "month"));
    if (!isDateDisabled(today, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) {
      setFocusedDate(today);
    }
  }, [today, effectiveMinDate, effectiveMaxDate, isDateUnavailable]);

  // ── Time Actions ──
  /**
   * @param hour 12h value (1-12) when hourFormat="12", 24h value (0-23) when hourFormat="24".
   */
  const handleHourChange = useCallback(
    (hour: number) => {
      if (is12Hour) {
        const h24 = to24Hour(hour, tempPeriod);
        setTempHour(h24);
        setTempPeriod(to12Hour(h24).period);
      } else {
        setTempHour(hour);
      }
    },
    [is12Hour, tempPeriod],
  );

  const handleMinuteChange = useCallback((minute: number) => setTempMinute(minute), []);
  const handleSecondChange = useCallback((second: number) => setTempSecond(second), []);

  const handlePeriodChange = useCallback(
    (period: TimePeriod) => {
      setTempPeriod(period);
      const display12 = to12Hour(tempHour).hour;
      setTempHour(to24Hour(display12, period));
    },
    [tempHour],
  );

  // Snapshot for time picker cancel (restore previous values)
  const timeSnapshot = useRef({ hour: 0, minute: 0, second: 0, period: "AM" as TimePeriod });

  const handleTimePickerOpen = useCallback(() => {
    timeSnapshot.current = {
      hour: tempHour,
      minute: tempMinute,
      second: tempSecond,
      period: tempPeriod,
    };
    setIsTimePickerOpen(true);
  }, [tempHour, tempMinute, tempSecond, tempPeriod]);

  const handleTimePickerClose = useCallback(() => setIsTimePickerOpen(false), []);
  const handleTimePickerConfirm = useCallback(() => setIsTimePickerOpen(false), []);

  const handleTimePickerCancel = useCallback(() => {
    const snap = timeSnapshot.current;
    setTempHour(snap.hour);
    setTempMinute(snap.minute);
    setTempSecond(snap.second);
    setTempPeriod(snap.period);
    setIsTimePickerOpen(false);
  }, []);

  // ── Calendar ──
  const numMonths = options.numberOfMonths ?? 1;
  const calendars = useMemo(
    () =>
      Array.from({ length: numMonths }, (_, i) =>
        buildCalendarMonth(add(currentMonth, i, "month"), weekStartsOnNum, showOutsideDays),
      ),
    [currentMonth, weekStartsOnNum, showOutsideDays, numMonths],
  );
  const calendar = calendars[0];

  // ── getDayProps ──
  const getDayProps = useCallback(
    (date: Date, referenceMonth?: Date): DayProps =>
      buildSingleDayProps({
        date,
        tempDate,
        focusedDate,
        today,
        minDate: effectiveMinDate,
        maxDate: effectiveMaxDate,
        isDateUnavailable,
        weekStartsOnNum,
        referenceMonth,
        highlightSet,
      }),
    [
      tempDate,
      focusedDate,
      today,
      effectiveMinDate,
      effectiveMaxDate,
      isDateUnavailable,
      highlightSet,
      weekStartsOnNum,
    ],
  );

  // ── Display ──
  const displayValue = useMemo(() => {
    if (value) {
      return displayFormat
        ? formatBasic(value, displayFormat)
        : locale.formatDateTime(value, precision, hourFormat);
    }
    return "";
  }, [value, locale, displayFormat, precision, hourFormat]);

  const timeDisplayValue = useMemo(
    () =>
      formatTimeDisplay(
        tempHour,
        tempMinute,
        tempSecond,
        tempPeriod,
        resolvedTimeConfig,
        locale.am,
        locale.pm,
      ),
    [tempHour, tempMinute, tempSecond, tempPeriod, resolvedTimeConfig, locale.am, locale.pm],
  );
  const hasValue = !!value;
  const canConfirm = !!tempDate;

  // ── Caption dropdown ──
  const fromYear = options.fromYear ?? today.getFullYear() - 100;
  const toYear = options.toYear ?? today.getFullYear() + 10;

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = fromYear; y <= toYear; y++) arr.push(y);
    return arr;
  }, [fromYear, toYear]);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  const handleYearSelect = useCallback(
    (year: number, calendarIndex = 0) => {
      setCurrentMonth((m) => {
        const target = setYear(add(startOf(m, "month"), calendarIndex, "month"), year);
        const next = subtract(target, calendarIndex, "month");
        onMonthChange?.(next);
        return next;
      });
    },
    [onMonthChange],
  );

  const handleMonthSelect = useCallback(
    (month: number, calendarIndex = 0) => {
      setCurrentMonth((m) => {
        const target = setMonth(add(startOf(m, "month"), calendarIndex, "month"), month);
        const next = subtract(target, calendarIndex, "month");
        onMonthChange?.(next);
        return next;
      });
    },
    [onMonthChange],
  );

  return {
    isOpen,
    tempDate,
    currentMonth,
    locale,
    isTimePickerOpen,
    tempHour,
    tempMinute,
    tempSecond,
    tempPeriod,
    handleDateClick,
    handlePrevMonth,
    handleNextMonth,
    handleOpen,
    handleClose,
    handleToggle,
    handleConfirm,
    handleCancel,
    handleClear,
    handleGoToToday,
    handleHourChange,
    handleMinuteChange,
    handleSecondChange,
    handlePeriodChange,
    handleTimePickerOpen,
    handleTimePickerClose,
    handleTimePickerConfirm,
    handleTimePickerCancel,
    calendar,
    calendars,
    getDayProps,
    displayValue,
    timeDisplayValue,
    hasValue,
    canConfirm,
    containerRef,
    popupRef,
    timePickerRef,
    focusedDate,
    handleKeyDown,
    resolvedTimeConfig,
    years,
    months,
    handleYearSelect,
    handleMonthSelect,
  };
}
