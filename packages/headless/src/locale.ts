import type { HourFormat, Locale, TimePeriod, TimePrecision } from "./types";
import { padNumber, to12Hour } from "./utils";

export const DEFAULT_LOCALE: Locale = {
  weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  confirm: "Confirm",
  cancel: "Cancel",
  clear: "Clear",
  today: "Today",
  placeholder: "Select date",
  rangePlaceholder: "Select date range",
  dateTimePlaceholder: "Select date and time",
  rangeTimePlaceholder: "Select date range and time",
  timePlaceholder: "Select time",
  am: "AM",
  pm: "PM",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "Hours",
  minuteLabel: "Minutes",
  secondLabel: "Seconds",
  hoursLabel: "Hours",
  minutesLabel: "Minutes",
  secondsLabel: "Seconds",
  startTimeLabel: "Start time",
  endTimeLabel: "End time",
  rangeSeparator: " ~ ",
  prevMonth: "\u2039",
  nextMonth: "\u203A",
  prevMonthLabel: "Previous month",
  nextMonthLabel: "Next month",
  selectYearLabel: "Select year",
  selectMonthLabel: "Select month",
  formatMonthYear: (month) => {
    return `${DEFAULT_LOCALE.months[month.getMonth()]} ${month.getFullYear()}`;
  },
  formatDate: (date) => {
    return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
  },
  formatDateTime: (date, precision?: TimePrecision, hourFormat?: HourFormat) => {
    const h = date.getHours();
    const datePart = `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
    if (hourFormat === "12") {
      const { hour: h12, period } = to12Hour(h);
      let time = `${padNumber(h12)}:${padNumber(date.getMinutes())}`;
      if (precision === "second") time += `:${padNumber(date.getSeconds())}`;
      return `${datePart} ${time} ${period}`;
    }
    const base = `${datePart} ${padNumber(h)}:${padNumber(date.getMinutes())}`;
    if (precision === "second") return `${base}:${padNumber(date.getSeconds())}`;
    return base;
  },
  formatTime: (hour: number, minute: number, second: number, period?: TimePeriod) => {
    const h = padNumber(hour);
    const m = padNumber(minute);
    const s = padNumber(second);
    if (period) return `${h}:${m}:${s} ${period}`;
    return `${h}:${m}:${s}`;
  },
  formatRange: (start: string, end: string) => `${start} ~ ${end}`,
};

export const mergeLocale = (partial?: Partial<Locale>): Locale => {
  if (!partial) return DEFAULT_LOCALE;
  const merged = { ...DEFAULT_LOCALE, ...partial };
  // If rangeSeparator was overridden but formatRange wasn't, regenerate formatRange
  if (partial.rangeSeparator && !partial.formatRange) {
    merged.formatRange = (start: string, end: string) => `${start}${merged.rangeSeparator}${end}`;
  }
  return merged;
};

export function resolveLocale(partial?: Partial<Locale>, weekStartsOnNum: number = 0): Locale {
  const merged = mergeLocale(partial);
  if (weekStartsOnNum === 0) return merged;
  const { weekdays } = merged;
  return {
    ...merged,
    weekdays: [...weekdays.slice(weekStartsOnNum), ...weekdays.slice(0, weekStartsOnNum)],
  };
}

export function createLocale(localeKey: string, overrides?: Partial<Locale>): Locale {
  const getWeekday = (i: number) => {
    // 2023-01-01 is Sunday
    const d = new Date(2023, 0, 1 + i);
    return new Intl.DateTimeFormat(localeKey, { weekday: "short" }).format(d);
  };
  const getMonth = (i: number) => {
    const d = new Date(2023, i, 1);
    return new Intl.DateTimeFormat(localeKey, { month: "long" }).format(d);
  };
  const weekdays = Array.from({ length: 7 }, (_, i) => getWeekday(i));
  const months = Array.from({ length: 12 }, (_, i) => getMonth(i));

  const amDate = new Date(2023, 0, 1, 9, 0);
  const pmDate = new Date(2023, 0, 1, 15, 0);
  const getPeriod = (d: Date, fallback: string) => {
    const parts = new Intl.DateTimeFormat(localeKey, {
      hour: "numeric",
      hour12: true,
    }).formatToParts(d);
    const periodPart = parts.find((p) => p.type === "dayPeriod");
    return periodPart ? periodPart.value : fallback;
  };

  const am = getPeriod(amDate, "AM");
  const pm = getPeriod(pmDate, "PM");

  const base = {
    ...DEFAULT_LOCALE,
    weekdays,
    months,
    am,
    pm,
    // Override formatMonthYear to use the generated locale months (not DEFAULT_LOCALE.months)
    formatMonthYear: (month: Date) => {
      return `${months[month.getMonth()]} ${month.getFullYear()}`;
    },
    ...overrides,
  };

  return base;
}
