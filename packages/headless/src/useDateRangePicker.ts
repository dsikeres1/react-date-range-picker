import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { UseDateRangePickerOptions, UseDateRangePickerReturn, DayProps } from "./types";
import { resolveLocale } from "./locale";
import { buildCalendarMonth, isDateDisabled, weekdayToNumber, resolveMinMaxDates } from "./utils";
import { buildRangeDayProps } from "./buildDayProps";
import {
  add,
  subtract,
  diff,
  startOf,
  endOf,
  isSame,
  isBefore,
  isAfter,
  formatBasic,
  setYear,
  setMonth,
} from "./date-utils";

export function useDateRangePicker(options: UseDateRangePickerOptions): UseDateRangePickerReturn {
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

  // ── State ──
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [baseMonth, setBaseMonth] = useState(() => initialMonth || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const numMonths = options.numberOfMonths ?? 2;

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
      if (value.start) {
        setBaseMonth(value.start);
      } else if (!tempStartDate) {
        setBaseMonth(initialMonth || new Date());
      }
    } else {
      setFocusedDate(null);
    }
  }, [isOpen, value.start?.getTime(), value.end?.getTime()]);

  // ── Actions ──
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleToggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  const handleDateClick = useCallback(
    (date: Date) => {
      setFocusedDate(date);
      if (isDateDisabled(date, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) return;

      if (!tempStartDate || (tempStartDate && tempEndDate)) {
        // Start new selection
        setTempStartDate(date);
        setTempEndDate(null);
      } else {
        // Set end date with auto-swap
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
        // maxDays validation — restart selection from clicked date
        if (maxDays && dayCount > maxDays) {
          setTempStartDate(date);
          setTempEndDate(null);
          return;
        }
        // minDays validation — restart selection from clicked date
        if (minDays && dayCount < minDays) {
          setTempStartDate(date);
          setTempEndDate(null);
          return;
        }
        setTempStartDate(start);
        setTempEndDate(end);
        setHoveredDate(null);

        // Auto-close on complete selection (or immediate onChange for inline)
        if (options.inline || options.shouldCloseOnSelect) {
          onChange({ start: startOf(start, "day"), end: endOf(end, "day") });
          if (!options.inline) setOpen(false);
        }
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
      options.inline,
      options.shouldCloseOnSelect,
      options.allowSingleDateInRange,
      onChange,
      setOpen,
    ],
  );

  const handleCancel = useCallback(() => {
    setTempStartDate(value.start);
    setTempEndDate(value.end);
    setOpen(false);
  }, [setOpen, value.start, value.end]);

  // ── Click outside ──
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

  /**
   * Validate hovered range for disabled dates.
   * Uses precomputed disabledDateSet for O(1) lookups per day.
   */
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

        // Handle view navigation for range pickers
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

  /**
   * Confirm selection: start gets startOf(day) (00:00:00.000),
   * end gets endOf(day) (23:59:59.999) to include the entire end day.
   * For time-aware ranges, use useDateRangeTimePicker instead.
   */
  const handleConfirm = useCallback(() => {
    if (tempStartDate && tempEndDate) {
      onChange({ start: startOf(tempStartDate, "day"), end: endOf(tempEndDate, "day") });
    }
    setOpen(false);
  }, [tempStartDate, tempEndDate, onChange, setOpen]);

  const handleClear = useCallback(() => {
    if (required) return;
    onChange({ start: null, end: null });
    setTempStartDate(null);
    setTempEndDate(null);
    setHoveredDate(null);
    setOpen(false);
  }, [onChange, required, setOpen]);

  const handleGoToToday = useCallback(() => {
    setBaseMonth(startOf(today, "month"));
    if (!isDateDisabled(today, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) {
      setFocusedDate(today);
    }
  }, [today, effectiveMinDate, effectiveMaxDate, isDateUnavailable]);

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
        displayFormat ? formatBasic(d, displayFormat) : locale.formatDate(d);
      return locale.formatRange(fmt(value.start), fmt(value.end));
    }
    return "";
  }, [value.start, value.end, locale, displayFormat]);

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
    (preset: (typeof presets)[number]) => {
      try {
        const val = typeof preset.value === "function" ? preset.value() : preset.value;
        setTempStartDate(val.start);
        setTempEndDate(val.end);
        setBaseMonth(val.start);

        if (options.shouldCloseOnSelect) {
          onChange({ start: startOf(val.start, "day"), end: endOf(val.end, "day") });
          setOpen(false);
        }
      } catch (e) {
        console.warn("react-date-range-picker: preset evaluation failed:", e);
      }
    },
    [options.shouldCloseOnSelect, onChange, setOpen],
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

  return {
    isOpen,
    tempStartDate,
    tempEndDate,
    hoveredDate,
    leftMonth,
    rightMonth,
    locale,
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
    handleGoToToday,
    leftCalendar,
    rightCalendar,
    calendars,
    getDayProps,
    displayValue,
    hasValue,
    canConfirm,
    containerRef,
    popupRef,
    focusedDate,
    handleKeyDown,
    presets,
    handlePresetClick,
    activePresetIndex,
    years,
    months,
    handleYearSelect,
    handleMonthSelect,
  };
}
