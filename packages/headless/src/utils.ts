declare const process: { env?: { NODE_ENV?: string } } | undefined;

import type {
  MinuteStep,
  SecondStep,
  CalendarMonth,
  TimePeriod,
  TimeConfig,
  WeekDay,
} from "./types";
import {
  startOf,
  endOf,
  add,
  subtract,
  isSame,
  isBefore,
  isAfter,
  daysInMonth,
  formatBasic,
} from "./date-utils";

// ── WeekDay helpers ──

const WEEKDAY_MAP: Record<WeekDay, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/**
 * Convert a WeekDay name to its numeric value (0=Sunday, 6=Saturday).
 */
export const weekdayToNumber = (day: WeekDay): number => WEEKDAY_MAP[day];

/**
 * Generate 42-cell (6 weeks) calendar array for a given month.
 * Leading/trailing nulls for empty cells (or actual dates if showOutsideDays is true).
 * Supports custom week start day.
 */
export const generateCalendarDays = (
  month: Date,
  weekStartsOn: number = 0,
  showOutsideDays: boolean = false,
): (Date | null)[] => {
  const startOfMonth = startOf(month, "month");
  const firstDayOfWeek = startOfMonth.getDay();

  // Offset for custom week start
  const offset = (firstDayOfWeek - weekStartsOn + 7) % 7;

  const days: (Date | null)[] = [];

  // Leading cells
  for (let i = 0; i < offset; i++) {
    if (showOutsideDays) {
      days.push(subtract(startOfMonth, offset - i, "day"));
    } else {
      days.push(null);
    }
  }

  const dim = daysInMonth(month);
  for (let day = 1; day <= dim; day++) {
    const d = new Date(month.getFullYear(), month.getMonth(), day);
    days.push(d);
  }

  // Trailing cells
  const nextMonth = add(startOf(month, "month"), 1, "month");
  let trailingIndex = 1;
  while (days.length < 42) {
    if (showOutsideDays) {
      days.push(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), trailingIndex));
      trailingIndex++;
    } else {
      days.push(null);
    }
  }

  return days;
};

/**
 * Convert flat 42-element array into 6 arrays of 7 (weeks).
 */
export const daysToWeeks = (days: (Date | null)[]): (Date | null)[][] => {
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
};

/**
 * Build a CalendarMonth object for a given month.
 * Supports custom week start day and outside days.
 */
export const buildCalendarMonth = (
  month: Date,
  weekStartsOn: number = 0,
  showOutsideDays: boolean = false,
): CalendarMonth => {
  const days = generateCalendarDays(month, weekStartsOn, showOutsideDays);
  return { month, days, weeks: daysToWeeks(days) };
};

/**
 * Check if a date is today.
 */
export const isToday = (date: Date, today: Date): boolean => {
  return isSame(date, today, "day");
};

/**
 * Check if a date is the last day of its month.
 */
export const isLastDayOfMonth = (date: Date): boolean => {
  return date.getDate() === daysInMonth(date);
};

/**
 * Check if a date is the first day of its month.
 */
export const isFirstDayOfMonth = (date: Date): boolean => {
  return date.getDate() === 1;
};

/**
 * Null-safe day-level comparison.
 */
export const isDateSame = (a: Date | null | undefined, b: Date | null | undefined): boolean => {
  return isSame(a, b, "day");
};

/**
 * Check if date is between start and end (exclusive boundaries).
 */
export const isInRange = (
  date: Date,
  start: Date | null | undefined,
  end: Date | null | undefined,
): boolean => {
  if (!start || !end) return false;
  return isAfter(date, start, "day") && isBefore(date, end, "day");
};

/**
 * Resolve effective min/max dates by merging explicit bounds with disablePast/disableFuture.
 * disablePast sets minDate to today (start of day), disableFuture sets maxDate to today (end of day).
 */
export const resolveMinMaxDates = (
  minDate: Date | undefined,
  maxDate: Date | undefined,
  today: Date,
  disablePast?: boolean,
  disableFuture?: boolean,
): { effectiveMinDate: Date | undefined; effectiveMaxDate: Date | undefined } => {
  let effectiveMinDate = minDate;
  let effectiveMaxDate = maxDate;

  if (disablePast) {
    const todayStart = startOf(today, "day");
    effectiveMinDate = effectiveMinDate
      ? isAfter(todayStart, effectiveMinDate)
        ? todayStart
        : effectiveMinDate
      : todayStart;
  }

  if (disableFuture) {
    const todayEnd = endOf(today, "day");
    effectiveMaxDate = effectiveMaxDate
      ? isBefore(todayEnd, effectiveMaxDate)
        ? todayEnd
        : effectiveMaxDate
      : todayEnd;
  }

  if (
    typeof process !== "undefined" &&
    process.env?.NODE_ENV !== "production" &&
    effectiveMinDate &&
    effectiveMaxDate &&
    isAfter(effectiveMinDate, effectiveMaxDate)
  ) {
    console.warn("react-date-range-picker: minDate is after maxDate. All dates will be disabled.");
  }

  return { effectiveMinDate, effectiveMaxDate };
};

/**
 * Check if a date is disabled by minDate/maxDate bounds
 * or by a custom isDateUnavailable function.
 */
export const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  isDateUnavailable?: (date: Date) => boolean,
): boolean => {
  if (minDate && isBefore(date, minDate, "day")) return true;
  if (maxDate && isAfter(date, maxDate, "day")) return true;
  if (isDateUnavailable?.(date)) return true;
  return false;
};

/**
 * Format date with customizable format string.
 */
export const formatDate = (date: Date, format = "YYYY-MM-DD"): string => {
  return formatBasic(date, format);
};

/**
 * Format date+time with customizable format string.
 */
export const formatDateTime = (date: Date, format = "YYYY-MM-DD HH:mm"): string => {
  return formatBasic(date, format);
};

/** Number of padding items before/after real values (keeps selected item centered). */
const TIME_PADDING = 2;

/**
 * Generate hours array (0-23) with padding.
 */
export const generateHours = (): number[] => {
  const pad: number[] = Array.from({ length: TIME_PADDING }, () => -1);
  return [...pad, ...Array.from({ length: 24 }, (_, i) => i), ...pad];
};

/**
 * Generate minutes array by step.
 */
export const generateMinutes = (minuteStep: MinuteStep = 5): number[] => {
  const pad: number[] = Array.from({ length: TIME_PADDING }, () => -1);
  const minutes: number[] = [];
  for (let i = 0; i < 60; i += minuteStep) {
    minutes.push(i);
  }
  return [...pad, ...minutes, ...pad];
};

/**
 * Generate seconds array by step.
 */
export const generateSeconds = (secondStep: SecondStep = 1): number[] => {
  const pad: number[] = Array.from({ length: TIME_PADDING }, () => -1);
  const seconds: number[] = [];
  for (let i = 0; i < 60; i += secondStep) {
    seconds.push(i);
  }
  return [...pad, ...seconds, ...pad];
};

/**
 * Pad number to 2-digit string (e.g. 1 → "01").
 */
export const padNumber = (num: number): string => {
  return num.toString().padStart(2, "0");
};

/**
 * Snap minute to nearest valid step (e.g. step=5: 7→5, 13→10).
 */
export const adjustMinuteToStep = (minute: number, minuteStep: MinuteStep): number => {
  return Math.floor(minute / minuteStep) * minuteStep;
};

/**
 * Snap second to nearest valid step.
 */
export const adjustSecondToStep = (second: number, secondStep: SecondStep): number => {
  return Math.floor(second / secondStep) * secondStep;
};

// ── 12-hour format helpers ──

/**
 * Generate 12-hour hours array (1-12).
 */
export const generateHours12 = (): number[] => {
  const pad: number[] = Array.from({ length: TIME_PADDING }, () => -1);
  return [...pad, ...Array.from({ length: 12 }, (_, i) => i + 1), ...pad];
};

/**
 * Convert 24-hour to 12-hour + period.
 * 0 → 12 AM, 12 → 12 PM, 13 → 1 PM, etc.
 */
export const to12Hour = (hour24: number): { hour: number; period: TimePeriod } => {
  const period: TimePeriod = hour24 >= 12 ? "PM" : "AM";
  let hour = hour24 % 12;
  if (hour === 0) hour = 12;
  return { hour, period };
};

/**
 * Convert 12-hour + period to 24-hour.
 * 12 AM → 0, 12 PM → 12, 1 PM → 13, etc.
 */
export const to24Hour = (hour12: number, period: TimePeriod): number => {
  if (period === "AM") {
    return hour12 === 12 ? 0 : hour12;
  }
  return hour12 === 12 ? 12 : hour12 + 12;
};

/**
 * Resolve TimeConfig with defaults.
 */
export const resolveTimeConfig = (config?: TimeConfig): Required<TimeConfig> => {
  return {
    precision: config?.precision ?? "minute",
    hourFormat: config?.hourFormat ?? "24",
    minuteStep: config?.minuteStep ?? 5,
    secondStep: config?.secondStep ?? 1,
    itemHeight: config?.itemHeight ?? 32,
  };
};

/**
 * Format time display string based on config.
 */
export const formatTimeDisplay = (
  hour: number,
  minute: number,
  second: number,
  period: TimePeriod,
  config: Required<TimeConfig>,
  amLabel: string = "AM",
  pmLabel: string = "PM",
): string => {
  const { precision, hourFormat } = config;
  const displayHour = hourFormat === "12" ? to12Hour(hour).hour : hour;
  let result = padNumber(displayHour);

  if (precision === "minute" || precision === "second") {
    result += `:${padNumber(minute)}`;
  }
  if (precision === "second") {
    result += `:${padNumber(second)}`;
  }
  if (hourFormat === "12") {
    const derivedPeriod = to12Hour(hour).period;
    result += ` ${derivedPeriod === "AM" ? amLabel : pmLabel}`;
  }
  return result;
};
