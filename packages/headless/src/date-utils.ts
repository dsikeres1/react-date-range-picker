export type DateUnit =
  | "year"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";

export function today(): Date {
  return new Date();
}

export function parseDate(date?: Date | string | number | null): Date {
  if (!date) return new Date();
  return new Date(date);
}

export function startOf(date: Date, unit: DateUnit, weekStartsOn = 0): Date {
  const d = new Date(date.getTime());
  switch (unit) {
    case "year":
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      break;
    case "month":
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      break;
    case "week": {
      const day = d.getDay();
      const diff = (day - weekStartsOn + 7) % 7;
      d.setDate(d.getDate() - diff);
      d.setHours(0, 0, 0, 0);
      break;
    }
    case "day":
      d.setHours(0, 0, 0, 0);
      break;
    case "hour":
      d.setMinutes(0, 0, 0);
      break;
    case "minute":
      d.setSeconds(0, 0);
      break;
    case "second":
      d.setMilliseconds(0);
      break;
  }
  return d;
}

export function endOf(date: Date, unit: DateUnit, weekStartsOn = 0): Date {
  const d = new Date(date.getTime());
  switch (unit) {
    case "year":
      d.setMonth(11, 31);
      d.setHours(23, 59, 59, 999);
      break;
    case "month":
      d.setMonth(d.getMonth() + 1, 0);
      d.setHours(23, 59, 59, 999);
      break;
    case "week": {
      const day = d.getDay();
      const weekEnd = (weekStartsOn + 6) % 7;
      const diff = (weekEnd - day + 7) % 7;
      d.setDate(d.getDate() + diff);
      d.setHours(23, 59, 59, 999);
      break;
    }
    case "day":
      d.setHours(23, 59, 59, 999);
      break;
    case "hour":
      d.setMinutes(59, 59, 999);
      break;
    case "minute":
      d.setSeconds(59, 999);
      break;
    case "second":
      d.setMilliseconds(999);
      break;
  }
  return d;
}

export function add(date: Date, amount: number, unit: DateUnit): Date {
  const d = new Date(date.getTime());
  switch (unit) {
    case "year":
      d.setFullYear(d.getFullYear() + amount);
      break;
    case "month": {
      const target = d.getMonth() + amount;
      d.setMonth(target);
      // Overflow guard: e.g. Jan 31 + 1 month → Mar 3 → clamp to Feb 28
      if (d.getMonth() !== ((target % 12) + 12) % 12) {
        d.setDate(0);
      }
      break;
    }
    case "week":
      d.setDate(d.getDate() + amount * 7);
      break;
    case "day":
      d.setDate(d.getDate() + amount);
      break;
    case "hour":
      d.setHours(d.getHours() + amount);
      break;
    case "minute":
      d.setMinutes(d.getMinutes() + amount);
      break;
    case "second":
      d.setSeconds(d.getSeconds() + amount);
      break;
    case "millisecond":
      d.setMilliseconds(d.getMilliseconds() + amount);
      break;
  }
  return d;
}

export function subtract(date: Date, amount: number, unit: DateUnit): Date {
  return add(date, -amount, unit);
}

export function isSame(
  date1: Date | null | undefined,
  date2: Date | null | undefined,
  unit: DateUnit = "millisecond",
): boolean {
  if (!date1 || !date2) return false;
  if (unit === "millisecond") return date1.getTime() === date2.getTime();
  const d1 = startOf(date1, unit);
  const d2 = startOf(date2, unit);
  return d1.getTime() === d2.getTime();
}

export function isBefore(date1: Date, date2: Date, unit: DateUnit = "millisecond"): boolean {
  const d1 = unit === "millisecond" ? date1 : startOf(date1, unit);
  const d2 = unit === "millisecond" ? date2 : startOf(date2, unit);
  return d1.getTime() < d2.getTime();
}

export function isAfter(date1: Date, date2: Date, unit: DateUnit = "millisecond"): boolean {
  const d1 = unit === "millisecond" ? date1 : startOf(date1, unit);
  const d2 = unit === "millisecond" ? date2 : startOf(date2, unit);
  return d1.getTime() > d2.getTime();
}

export function diff(date1: Date, date2: Date, unit: DateUnit): number {
  const diffMs = date1.getTime() - date2.getTime();
  switch (unit) {
    case "day": {
      const d1 = startOf(date1, "day").getTime();
      const d2 = startOf(date2, "day").getTime();
      return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
    }
    case "month": {
      return (
        (date1.getFullYear() - date2.getFullYear()) * 12 + (date1.getMonth() - date2.getMonth())
      );
    }
    case "year": {
      return date1.getFullYear() - date2.getFullYear();
    }
    case "week": {
      const d1 = startOf(date1, "day").getTime();
      const d2 = startOf(date2, "day").getTime();
      return Math.round((d1 - d2) / (1000 * 60 * 60 * 24 * 7));
    }
    case "hour":
      return Math.round(diffMs / (1000 * 60 * 60));
    case "minute":
      return Math.round(diffMs / (1000 * 60));
    case "second":
      return Math.round(diffMs / 1000);
    case "millisecond":
      return diffMs;
  }
}

export function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function setYear(date: Date, year: number): Date {
  const d = new Date(date.getTime());
  const originalMonth = d.getMonth();
  d.setFullYear(year);
  // Overflow guard: e.g. Feb 29 2028 → setYear(2027) → Mar 1 → clamp to Feb 28
  if (d.getMonth() !== originalMonth) {
    d.setDate(0);
  }
  return d;
}

export function setMonth(date: Date, month: number): Date {
  const d = new Date(date.getTime());
  d.setMonth(month);
  // Overflow guard: e.g. Jan 31 → setMonth(1) → Mar 3 → clamp to Feb 28
  if (d.getMonth() !== ((month % 12) + 12) % 12) {
    d.setDate(0);
  }
  return d;
}

export function setDate(date: Date, day: number): Date {
  const d = new Date(date.getTime());
  d.setDate(day);
  return d;
}

export function setHour(date: Date, hour: number): Date {
  const d = new Date(date.getTime());
  d.setHours(hour);
  return d;
}

export function setMinute(date: Date, minute: number): Date {
  const d = new Date(date.getTime());
  d.setMinutes(minute);
  return d;
}

export function setSecond(date: Date, second: number): Date {
  const d = new Date(date.getTime());
  d.setSeconds(second);
  return d;
}

export function setMillisecond(date: Date, ms: number): Date {
  const d = new Date(date.getTime());
  d.setMilliseconds(ms);
  return d;
}

const FORMAT_TOKENS = /YYYY|MM|DD|HH|hh|mm|ss|M|D|H|h|m|s/g;

export function formatBasic(date: Date, format: string): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const tokens: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    MM: pad(date.getMonth() + 1),
    M: (date.getMonth() + 1).toString(),
    DD: pad(date.getDate()),
    D: date.getDate().toString(),
    HH: pad(date.getHours()),
    H: date.getHours().toString(),
    hh: pad(date.getHours() % 12 || 12),
    h: (date.getHours() % 12 || 12).toString(),
    mm: pad(date.getMinutes()),
    m: date.getMinutes().toString(),
    ss: pad(date.getSeconds()),
    s: date.getSeconds().toString(),
  };

  FORMAT_TOKENS.lastIndex = 0;
  return format.replace(FORMAT_TOKENS, (match) => tokens[match]);
}
