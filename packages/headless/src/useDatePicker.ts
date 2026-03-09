import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { UseDatePickerOptions, UseDatePickerReturn, DayProps } from "./types";
import { resolveLocale } from "./locale";
import { buildCalendarMonth, isDateDisabled, weekdayToNumber, resolveMinMaxDates } from "./utils";
import { buildSingleDayProps } from "./buildDayProps";
import { add, subtract, diff, startOf, isSame, formatBasic, setYear, setMonth } from "./date-utils";

export function useDatePicker(options: UseDatePickerOptions): UseDatePickerReturn {
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

  // Serialize highlight dates for stable memo key (avoids re-computation on new array references)

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
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => initialMonth || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const todayStr = formatBasic(new Date(), "YYYY-MM-DD");
  const today = useMemo(() => options.today ?? new Date(), [options.today, todayStr]);

  const { effectiveMinDate, effectiveMaxDate } = useMemo(
    () => resolveMinMaxDates(minDate, maxDate, today, disablePast, disableFuture),
    [minDate, maxDate, today, disablePast, disableFuture],
  );

  // ── Sync temp state on open or value change ──
  useEffect(() => {
    if (isOpen) {
      setTempDate(value);
      if (value) {
        setCurrentMonth(value);
        setFocusedDate(value);
      } else {
        if (!tempDate) setCurrentMonth(initialMonth || new Date());
        setFocusedDate(today);
      }
    } else {
      setFocusedDate(null);
    }
  }, [isOpen, value?.getTime()]);

  // ── Actions ──
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleToggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  const handleDateClick = useCallback(
    (date: Date) => {
      setFocusedDate(date);
      if (isDateDisabled(date, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) return;
      if (options.inline || options.shouldCloseOnSelect) {
        setTempDate(date);
        onChange(startOf(date, "day"));
        if (!options.inline) setOpen(false);
        return;
      }
      setTempDate(date);
    },
    [
      effectiveMinDate,
      effectiveMaxDate,
      isDateUnavailable,
      options.inline,
      options.shouldCloseOnSelect,
      onChange,
      setOpen,
    ],
  );

  const handleCancel = useCallback(() => {
    setTempDate(value ? startOf(value, "day") : null);
    setOpen(false);
  }, [setOpen, value]);

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

  const handleConfirm = useCallback(() => {
    if (tempDate) {
      onChange(startOf(tempDate, "day"));
    }
    setOpen(false);
  }, [tempDate, onChange, setOpen]);

  const handleClear = useCallback(() => {
    if (required) return;
    onChange(null);
    setTempDate(null);
    setOpen(false);
  }, [onChange, required, setOpen]);

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
      weekStartsOnNum,
      highlightSet,
    ],
  );

  // ── Display ──
  const displayValue = useMemo(() => {
    if (value) {
      return displayFormat ? formatBasic(value, displayFormat) : locale.formatDate(value);
    }
    return "";
  }, [value, locale, displayFormat]);

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

  const handleGoToToday = useCallback(() => {
    setCurrentMonth(startOf(today, "month"));
    if (!isDateDisabled(today, effectiveMinDate, effectiveMaxDate, isDateUnavailable)) {
      setFocusedDate(today);
    }
  }, [today, effectiveMinDate, effectiveMaxDate, isDateUnavailable]);

  return {
    isOpen,
    tempDate,
    currentMonth,
    locale,
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
    calendar,
    calendars,
    getDayProps,
    displayValue,
    hasValue,
    canConfirm,
    containerRef,
    popupRef,
    focusedDate,
    handleKeyDown,
    years,
    months,
    handleYearSelect,
    handleMonthSelect,
  };
}
