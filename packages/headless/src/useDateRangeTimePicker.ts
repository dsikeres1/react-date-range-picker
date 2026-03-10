import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type {
  UseDateRangeTimePickerOptions,
  UseDateRangeTimePickerReturn,
  DayProps,
  TimePeriod,
  DateRangePreset,
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
import { buildRangeDayProps } from "./buildDayProps";
import {
  add,
  subtract,
  diff,
  startOf,
  isSame,
  isBefore,
  isAfter,
  formatBasic,
  setYear,
  setMonth,
  setHour,
  setMinute,
  setSecond,
  setMillisecond,
} from "./date-utils";

export function useDateRangeTimePicker(
  options: UseDateRangeTimePickerOptions,
): UseDateRangeTimePickerReturn {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    initialMonth,
    isDateUnavailable,
    displayFormat,
    maxDays,
    minDays,
    required,
    onMonthChange,
    disablePast,
    disableFuture,
    showOutsideDays,
    highlightDates,
  } = options;

  const presets = useMemo(() => options.presets ?? [], [options.presets]);

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
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [baseMonth, setBaseMonth] = useState(() => initialMonth || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const numMonths = options.numberOfMonths ?? 2;

  // ── Start Time State ──
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [startSecond, setStartSecond] = useState(0);
  const [startPeriod, setStartPeriod] = useState<TimePeriod>("AM");
  const [isStartTimePickerOpen, setIsStartTimePickerOpen] = useState(false);
  const startTimePickerRef = useRef<HTMLDivElement>(null);

  // ── End Time State ──
  const [endHour, setEndHour] = useState(23);
  const [endMinute, setEndMinute] = useState(() => adjustMinuteToStep(59, minuteStep));
  const [endSecond, setEndSecond] = useState(() =>
    precision === "second" ? adjustSecondToStep(59, secondStep) : 0,
  );
  const [endPeriod, setEndPeriod] = useState<TimePeriod>("PM");
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = useState(false);
  const endTimePickerRef = useRef<HTMLDivElement>(null);

  const todayStr = formatBasic(new Date(), "YYYY-MM-DD");
  const today = useMemo(() => options.today ?? new Date(), [options.today, todayStr]);

  const { effectiveMinDate, effectiveMaxDate } = useMemo(
    () => resolveMinMaxDates(minDate, maxDate, today, disablePast, disableFuture),
    [minDate, maxDate, today, disablePast, disableFuture],
  );

  // ── Precompute disabled date set for visible calendar days ──
  const disabledDateSet = useMemo(() => {
    if (!isDateUnavailable && !effectiveMinDate && !effectiveMaxDate) return null;
    const set = new Set<string>();
    for (let m = 0; m < numMonths; m++) {
      const cal = buildCalendarMonth(add(baseMonth, m, "month"), weekStartsOnNum, showOutsideDays);
      for (const day of cal.days) {
        if (day && isDateDisabled(day, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) {
          set.add(formatBasic(day, "YYYY-MM-DD"));
        }
      }
    }
    return set;
  }, [
    baseMonth,
    numMonths,
    weekStartsOnNum,
    showOutsideDays,
    effectiveMinDate,
    effectiveMaxDate,
    isDateUnavailable,
  ]);

  // ── Sync temp state on open or value change ──
  useEffect(() => {
    if (isOpen) {
      setTempStartDate(value.start);
      setTempEndDate(value.end);
      setFocusedDate(value.start || today);

      const sh = value.start ? value.start.getHours() : 0;
      setStartHour(sh);
      setStartMinute(value.start ? adjustMinuteToStep(value.start.getMinutes(), minuteStep) : 0);
      setStartSecond(
        value.start && precision === "second"
          ? adjustSecondToStep(value.start.getSeconds(), secondStep)
          : 0,
      );
      setStartPeriod(sh >= 12 ? "PM" : "AM");

      const eh = value.end ? value.end.getHours() : 23;
      setEndHour(eh);
      setEndMinute(
        value.end
          ? adjustMinuteToStep(value.end.getMinutes(), minuteStep)
          : adjustMinuteToStep(59, minuteStep),
      );
      setEndSecond(
        value.end && precision === "second"
          ? adjustSecondToStep(value.end.getSeconds(), secondStep)
          : 0,
      );
      setEndPeriod(eh >= 12 ? "PM" : "AM");

      if (value.start) {
        setBaseMonth(value.start);
      } else if (!tempStartDate) {
        setBaseMonth(initialMonth || new Date());
      }
      setIsStartTimePickerOpen(false);
      setIsEndTimePickerOpen(false);
    } else {
      setFocusedDate(null);
    }
  }, [isOpen, value.start?.getTime(), value.end?.getTime()]);

  // ── Click outside time pickers ──
  useEffect(() => {
    if (!isStartTimePickerOpen) return;
    function handler(event: Event) {
      if (
        startTimePickerRef.current &&
        !startTimePickerRef.current.contains(event.target as Node)
      ) {
        setIsStartTimePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isStartTimePickerOpen]);

  useEffect(() => {
    if (!isEndTimePickerOpen) return;
    function handler(event: Event) {
      if (endTimePickerRef.current && !endTimePickerRef.current.contains(event.target as Node)) {
        setIsEndTimePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isEndTimePickerOpen]);

  // ── Date Actions ──
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleToggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  const handleDateClick = useCallback(
    (date: Date) => {
      setFocusedDate(date);
      if (isDateDisabled(date, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) return;

      if (!tempStartDate || (tempStartDate && tempEndDate)) {
        setTempStartDate(date);
        setTempEndDate(null);
      } else {
        let start = tempStartDate;
        let end = date;
        if (isBefore(date, tempStartDate, "day")) {
          start = date;
          end = tempStartDate;
        }

        // Check if any date in the selected range is disabled
        let hasDisabledDate = false;
        if (disabledDateSet) {
          let current = add(start, 1, "day");
          while (isBefore(current, end, "day")) {
            if (disabledDateSet.has(formatBasic(current, "YYYY-MM-DD"))) {
              hasDisabledDate = true;
              break;
            }
            current = add(current, 1, "day");
          }
        }

        if (hasDisabledDate) {
          // Restart selection from the clicked date
          setTempStartDate(date);
          setTempEndDate(null);
          return;
        }

        // Same-day range check
        if (options.allowSingleDateInRange === false && isSame(start, end, "day")) {
          // Instead of ignoring, restart selection from the clicked date for better UX
          setTempStartDate(date);
          setTempEndDate(null);
          return;
        }

        const dayCount = Math.abs(diff(startOf(end, "day"), startOf(start, "day"), "day")) + 1;
        if ((maxDays && dayCount > maxDays) || (minDays && dayCount < minDays)) {
          setTempStartDate(date);
          setTempEndDate(null);
          return;
        }
        setTempStartDate(start);
        setTempEndDate(end);
        setHoveredDate(null);
      }
    },
    [
      tempStartDate,
      tempEndDate,
      effectiveMinDate,
      effectiveMaxDate,
      isDateUnavailable,
      disabledDateSet,
      maxDays,
      minDays,
      options.allowSingleDateInRange,
    ],
  );

  const handleCancel = useCallback(() => {
    setTempStartDate(value.start);
    setTempEndDate(value.end);
    if (value.start) {
      const sh = value.start.getHours();
      setStartHour(sh);
      setStartMinute(adjustMinuteToStep(value.start.getMinutes(), minuteStep));
      setStartSecond(
        precision === "second" ? adjustSecondToStep(value.start.getSeconds(), secondStep) : 0,
      );
      setStartPeriod(sh >= 12 ? "PM" : "AM");
    } else {
      setStartHour(0);
      setStartMinute(0);
      setStartSecond(0);
      setStartPeriod("AM");
    }
    if (value.end) {
      const eh = value.end.getHours();
      setEndHour(eh);
      setEndMinute(adjustMinuteToStep(value.end.getMinutes(), minuteStep));
      setEndSecond(
        precision === "second" ? adjustSecondToStep(value.end.getSeconds(), secondStep) : 0,
      );
      setEndPeriod(eh >= 12 ? "PM" : "AM");
    } else {
      setEndHour(23);
      setEndMinute(adjustMinuteToStep(59, minuteStep));
      setEndSecond(precision === "second" ? adjustSecondToStep(59, secondStep) : 0);
      setEndPeriod("PM");
    }
    setOpen(false);
    setIsStartTimePickerOpen(false);
    setIsEndTimePickerOpen(false);
  }, [setOpen, value.start, value.end, minuteStep, secondStep, precision]);

  // ── Click outside (main picker) ──
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

  const handleDateHover = useCallback(
    (date: Date | null) => {
      if (tempStartDate && !tempEndDate) {
        if (date) {
          const [rangeStart, rangeEnd] = isAfter(date, tempStartDate, "day")
            ? [tempStartDate, date]
            : [date, tempStartDate];
          let hasDisabled = false;
          if (disabledDateSet) {
            let cursor = add(rangeStart, 1, "day");
            while (isBefore(cursor, rangeEnd, "day")) {
              if (disabledDateSet.has(formatBasic(cursor, "YYYY-MM-DD"))) {
                hasDisabled = true;
                break;
              }
              cursor = add(cursor, 1, "day");
            }
          }
          setHoveredDate(hasDisabled ? null : date);
        } else {
          setHoveredDate(null);
        }
      }
    },
    [tempStartDate, tempEndDate, disabledDateSet],
  );

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

        if (isBefore(candidate, baseMonth, "month")) {
          setBaseMonth(startOf(candidate, "month"));
        } else if (isAfter(candidate, add(baseMonth, numMonths - 1, "month"), "month")) {
          setBaseMonth(startOf(subtract(candidate, numMonths - 1, "month"), "month"));
        }

        setFocusedDate(candidate);
        if (tempStartDate && !tempEndDate) {
          handleDateHover(candidate);
        }
      }
    },
    [
      isOpen,
      focusedDate,
      baseMonth,
      numMonths,
      handleDateClick,
      handleCancel,
      handleDateHover,
      tempStartDate,
      tempEndDate,
      effectiveMinDate,
      effectiveMaxDate,
      isDateUnavailable,
    ],
  );

  const handlePrevMonth = useCallback(() => {
    setBaseMonth((m) => {
      const next = subtract(m, 1, "month");
      onMonthChange?.(next);
      return next;
    });
  }, [onMonthChange]);

  const handleNextMonth = useCallback(() => {
    setBaseMonth((m) => {
      const next = add(m, 1, "month");
      onMonthChange?.(next);
      return next;
    });
  }, [onMonthChange]);

  // ── Inline auto-sync: push combined dates+times to onChange on every temp change ──
  const tempStartTime = tempStartDate?.getTime();
  const tempEndTime = tempEndDate?.getTime();
  useEffect(() => {
    if (!options.inline || !tempStartDate || !tempEndDate) return;
    const sec = precision === "second";
    let finalStart = tempStartDate;
    finalStart = setHour(finalStart, startHour);
    finalStart = setMinute(finalStart, startMinute);
    finalStart = setSecond(finalStart, sec ? startSecond : 0);
    finalStart = setMillisecond(finalStart, 0);

    let finalEnd = tempEndDate;
    finalEnd = setHour(finalEnd, endHour);
    finalEnd = setMinute(finalEnd, endMinute);
    finalEnd = setSecond(finalEnd, sec ? endSecond : 0);
    finalEnd = setMillisecond(finalEnd, 0);

    if (finalStart.getTime() > finalEnd.getTime()) {
      onChange({ start: finalEnd, end: finalStart });
    } else {
      onChange({ start: finalStart, end: finalEnd });
    }
  }, [
    options.inline,
    tempStartTime,
    tempEndTime,
    startHour,
    startMinute,
    startSecond,
    endHour,
    endMinute,
    endSecond,
    precision,
  ]);

  const handleConfirm = useCallback(() => {
    if (tempStartDate && tempEndDate) {
      const sec = precision === "second";
      let finalStart = tempStartDate;
      finalStart = setHour(finalStart, startHour);
      finalStart = setMinute(finalStart, startMinute);
      finalStart = setSecond(finalStart, sec ? startSecond : 0);
      finalStart = setMillisecond(finalStart, 0);

      let finalEnd = tempEndDate;
      finalEnd = setHour(finalEnd, endHour);
      finalEnd = setMinute(finalEnd, endMinute);
      finalEnd = setSecond(finalEnd, sec ? endSecond : 0);
      finalEnd = setMillisecond(finalEnd, 0);

      // Auto-swap if start datetime > end datetime (e.g. same day, time reversed)
      if (finalStart.getTime() > finalEnd.getTime()) {
        onChange({ start: finalEnd, end: finalStart });
      } else {
        onChange({ start: finalStart, end: finalEnd });
      }
    }
    setOpen(false);
    setIsStartTimePickerOpen(false);
    setIsEndTimePickerOpen(false);
  }, [
    tempStartDate,
    tempEndDate,
    startHour,
    startMinute,
    startSecond,
    endHour,
    endMinute,
    endSecond,
    precision,
    onChange,
    setOpen,
  ]);

  const handleClear = useCallback(() => {
    if (required) return;
    onChange({ start: null, end: null });
    setTempStartDate(null);
    setTempEndDate(null);
    setHoveredDate(null);
    setStartHour(0);
    setStartMinute(0);
    setStartSecond(0);
    setStartPeriod("AM");
    setEndHour(23);
    setEndMinute(adjustMinuteToStep(59, minuteStep));
    setEndSecond(precision === "second" ? adjustSecondToStep(59, secondStep) : 0);
    setEndPeriod("PM");
    setOpen(false);
    setIsStartTimePickerOpen(false);
    setIsEndTimePickerOpen(false);
  }, [onChange, required, minuteStep, secondStep, precision, setOpen]);

  // ── Start Time Actions ──
  const startTimeSnapshot = useRef({ hour: 0, minute: 0, second: 0, period: "AM" as TimePeriod });

  const handleStartHourChange = useCallback(
    (hour: number) => {
      if (is12Hour) {
        const h24 = to24Hour(hour, startPeriod);
        setStartHour(h24);
        setStartPeriod(to12Hour(h24).period);
      } else {
        setStartHour(hour);
      }
    },
    [is12Hour, startPeriod],
  );
  const handleStartMinuteChange = useCallback((minute: number) => setStartMinute(minute), []);
  const handleStartSecondChange = useCallback((second: number) => setStartSecond(second), []);
  const handleStartPeriodChange = useCallback(
    (period: TimePeriod) => {
      setStartPeriod(period);
      const display12 = to12Hour(startHour).hour;
      setStartHour(to24Hour(display12, period));
    },
    [startHour],
  );
  const handleStartTimePickerOpen = useCallback(() => {
    startTimeSnapshot.current = {
      hour: startHour,
      minute: startMinute,
      second: startSecond,
      period: startPeriod,
    };
    setIsStartTimePickerOpen(true);
    setIsEndTimePickerOpen(false);
  }, [startHour, startMinute, startSecond, startPeriod]);
  const handleStartTimePickerClose = useCallback(() => setIsStartTimePickerOpen(false), []);
  const handleStartTimePickerConfirm = useCallback(() => setIsStartTimePickerOpen(false), []);
  const handleStartTimePickerCancel = useCallback(() => {
    const snap = startTimeSnapshot.current;
    setStartHour(snap.hour);
    setStartMinute(snap.minute);
    setStartSecond(snap.second);
    setStartPeriod(snap.period);
    setIsStartTimePickerOpen(false);
  }, []);

  // ── End Time Actions ──
  const endTimeSnapshot = useRef({ hour: 23, minute: 0, second: 0, period: "PM" as TimePeriod });

  const handleEndHourChange = useCallback(
    (hour: number) => {
      if (is12Hour) {
        const h24 = to24Hour(hour, endPeriod);
        setEndHour(h24);
        setEndPeriod(to12Hour(h24).period);
      } else {
        setEndHour(hour);
      }
    },
    [is12Hour, endPeriod],
  );
  const handleEndMinuteChange = useCallback((minute: number) => setEndMinute(minute), []);
  const handleEndSecondChange = useCallback((second: number) => setEndSecond(second), []);
  const handleEndPeriodChange = useCallback(
    (period: TimePeriod) => {
      setEndPeriod(period);
      const display12 = to12Hour(endHour).hour;
      setEndHour(to24Hour(display12, period));
    },
    [endHour],
  );
  const handleEndTimePickerOpen = useCallback(() => {
    endTimeSnapshot.current = {
      hour: endHour,
      minute: endMinute,
      second: endSecond,
      period: endPeriod,
    };
    setIsEndTimePickerOpen(true);
    setIsStartTimePickerOpen(false);
  }, [endHour, endMinute, endSecond, endPeriod]);
  const handleEndTimePickerClose = useCallback(() => setIsEndTimePickerOpen(false), []);
  const handleEndTimePickerConfirm = useCallback(() => setIsEndTimePickerOpen(false), []);
  const handleEndTimePickerCancel = useCallback(() => {
    const snap = endTimeSnapshot.current;
    setEndHour(snap.hour);
    setEndMinute(snap.minute);
    setEndSecond(snap.second);
    setEndPeriod(snap.period);
    setIsEndTimePickerOpen(false);
  }, []);

  // ── Calendars ──
  const calendars = useMemo(
    () =>
      Array.from({ length: numMonths }, (_, i) =>
        buildCalendarMonth(add(baseMonth, i, "month"), weekStartsOnNum, showOutsideDays),
      ),
    [baseMonth, weekStartsOnNum, showOutsideDays, numMonths],
  );
  const leftCalendar = calendars[0];
  const rightCalendar = calendars[calendars.length - 1];
  const leftMonth = baseMonth;
  const rightMonth = add(baseMonth, Math.max(numMonths - 1, 0), "month");

  // ── getDayProps ──
  const getDayProps = useCallback(
    (date: Date, referenceMonth?: Date): DayProps =>
      buildRangeDayProps({
        date,
        tempStartDate,
        tempEndDate,
        hoveredDate,
        focusedDate,
        today,
        minDate: effectiveMinDate,
        maxDate: effectiveMaxDate,
        isDateUnavailable,
        maxDays,
        minDays,
        weekStartsOnNum,
        referenceMonth,
        highlightSet,
      }),
    [
      tempStartDate,
      tempEndDate,
      hoveredDate,
      focusedDate,
      today,
      effectiveMinDate,
      effectiveMaxDate,
      isDateUnavailable,
      maxDays,
      minDays,
      weekStartsOnNum,
      highlightSet,
    ],
  );

  // ── Display ──
  const displayValue = useMemo(() => {
    if (value.start && value.end) {
      const fmt = (d: Date) =>
        displayFormat
          ? formatBasic(d, displayFormat)
          : locale.formatDateTime(d, precision, hourFormat);
      return locale.formatRange(fmt(value.start), fmt(value.end));
    }
    return "";
  }, [value.start, value.end, locale, displayFormat, precision, hourFormat]);

  const startTimeDisplayValue = useMemo(
    () =>
      formatTimeDisplay(
        startHour,
        startMinute,
        startSecond,
        startPeriod,
        resolvedTimeConfig,
        locale.am,
        locale.pm,
      ),
    [startHour, startMinute, startSecond, startPeriod, resolvedTimeConfig, locale.am, locale.pm],
  );

  const endTimeDisplayValue = useMemo(
    () =>
      formatTimeDisplay(
        endHour,
        endMinute,
        endSecond,
        endPeriod,
        resolvedTimeConfig,
        locale.am,
        locale.pm,
      ),
    [endHour, endMinute, endSecond, endPeriod, resolvedTimeConfig, locale.am, locale.pm],
  );

  const hasValue = !!(value.start && value.end);
  const canConfirm = !!(tempStartDate && tempEndDate);

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
      setBaseMonth((m) => {
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
      setBaseMonth((m) => {
        const target = setMonth(add(startOf(m, "month"), calendarIndex, "month"), month);
        const next = subtract(target, calendarIndex, "month");
        onMonthChange?.(next);
        return next;
      });
    },
    [onMonthChange],
  );

  // ── Presets ──
  const handlePresetClick = useCallback(
    (preset: DateRangePreset) => {
      try {
        const val = typeof preset.value === "function" ? preset.value() : preset.value;
        setTempStartDate(val.start);
        setTempEndDate(val.end);
        setBaseMonth(val.start);

        // Extract time from preset values
        const sh = val.start.getHours();
        setStartHour(sh);
        setStartMinute(adjustMinuteToStep(val.start.getMinutes(), minuteStep));
        setStartSecond(
          precision === "second" ? adjustSecondToStep(val.start.getSeconds(), secondStep) : 0,
        );
        setStartPeriod(sh >= 12 ? "PM" : "AM");

        const eh = val.end.getHours();
        setEndHour(eh);
        setEndMinute(adjustMinuteToStep(val.end.getMinutes(), minuteStep));
        setEndSecond(
          precision === "second" ? adjustSecondToStep(val.end.getSeconds(), secondStep) : 0,
        );
        setEndPeriod(eh >= 12 ? "PM" : "AM");

        if (options.shouldCloseOnSelect) {
          onChange({ start: val.start, end: val.end });
          setOpen(false);
        }
      } catch (e) {
        console.warn("react-date-range-picker: preset evaluation failed:", e);
      }
    },
    [options.shouldCloseOnSelect, onChange, setOpen, minuteStep, secondStep, precision],
  );

  const activePresetIndex = useMemo(() => {
    if (!tempStartDate || !tempEndDate || presets.length === 0) return -1;
    return presets.findIndex((preset) => {
      try {
        const val = typeof preset.value === "function" ? preset.value() : preset.value;
        return isSame(val.start, tempStartDate, "day") && isSame(val.end, tempEndDate, "day");
      } catch (e) {
        console.warn("react-date-range-picker: preset evaluation failed:", e);
        return false;
      }
    });
  }, [tempStartDate, tempEndDate, presets]);

  const handleGoToToday = useCallback(() => {
    setBaseMonth(startOf(today, "month"));
    if (!isDateDisabled(today, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) {
      setFocusedDate(today);
    }
  }, [today, effectiveMinDate, effectiveMaxDate, isDateUnavailable]);

  return {
    isOpen,
    tempStartDate,
    tempEndDate,
    hoveredDate,
    leftMonth,
    rightMonth,
    locale,
    startHour,
    startMinute,
    startSecond,
    startPeriod,
    endHour,
    endMinute,
    endSecond,
    endPeriod,
    isStartTimePickerOpen,
    isEndTimePickerOpen,
    handleDateClick,
    handleDateHover,
    handlePrevMonth,
    handleNextMonth,
    handleOpen,
    handleClose,
    handleToggle,
    handleConfirm,
    handleCancel,
    handleClear,
    handleStartHourChange,
    handleStartMinuteChange,
    handleStartSecondChange,
    handleStartPeriodChange,
    handleStartTimePickerOpen,
    handleStartTimePickerClose,
    handleStartTimePickerConfirm,
    handleStartTimePickerCancel,
    handleEndHourChange,
    handleEndMinuteChange,
    handleEndSecondChange,
    handleEndPeriodChange,
    handleEndTimePickerOpen,
    handleEndTimePickerClose,
    handleEndTimePickerConfirm,
    handleEndTimePickerCancel,
    leftCalendar,
    rightCalendar,
    calendars,
    getDayProps,
    displayValue,
    startTimeDisplayValue,
    endTimeDisplayValue,
    hasValue,
    canConfirm,
    containerRef,
    popupRef,
    startTimePickerRef,
    endTimePickerRef,
    focusedDate,
    handleKeyDown,
    resolvedTimeConfig,
    presets,
    handlePresetClick,
    activePresetIndex,
    years,
    months,
    handleGoToToday,
    handleYearSelect,
    handleMonthSelect,
  };
}
