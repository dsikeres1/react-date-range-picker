import { describe, it, expect } from "vitest";
import {
  startOf,
  endOf,
  add,
  subtract,
  isSame,
  isBefore,
  isAfter,
  diff,
  daysInMonth,
  setYear,
  setMonth,
  setDate,
  setHour,
  setMinute,
  setSecond,
  setMillisecond,
  formatBasic,
} from "../date-utils";

describe("date-utils", () => {
  // ── startOf ──

  describe("startOf", () => {
    it("startOf year", () => {
      const d = startOf(new Date(2024, 5, 15, 14, 30, 45), "year");
      expect(d.getFullYear()).toBe(2024);
      expect(d.getMonth()).toBe(0);
      expect(d.getDate()).toBe(1);
      expect(d.getHours()).toBe(0);
    });

    it("startOf month", () => {
      const d = startOf(new Date(2024, 5, 15, 14, 30, 45), "month");
      expect(d.getMonth()).toBe(5);
      expect(d.getDate()).toBe(1);
      expect(d.getHours()).toBe(0);
    });

    it("startOf day", () => {
      const d = startOf(new Date(2024, 5, 15, 14, 30, 45), "day");
      expect(d.getDate()).toBe(15);
      expect(d.getHours()).toBe(0);
      expect(d.getMinutes()).toBe(0);
    });

    it("startOf hour", () => {
      const d = startOf(new Date(2024, 5, 15, 14, 30, 45), "hour");
      expect(d.getHours()).toBe(14);
      expect(d.getMinutes()).toBe(0);
      expect(d.getSeconds()).toBe(0);
    });

    it("startOf minute", () => {
      const d = startOf(new Date(2024, 5, 15, 14, 30, 45), "minute");
      expect(d.getMinutes()).toBe(30);
      expect(d.getSeconds()).toBe(0);
    });

    it("startOf second", () => {
      const d = startOf(new Date(2024, 5, 15, 14, 30, 45, 500), "second");
      expect(d.getSeconds()).toBe(45);
      expect(d.getMilliseconds()).toBe(0);
    });

    it("startOf week (Sunday start)", () => {
      // 2024-06-15 is Saturday
      const d = startOf(new Date(2024, 5, 15), "week", 0);
      expect(d.getDate()).toBe(9); // Sunday June 9
    });

    it("startOf week (Monday start)", () => {
      // 2024-06-15 is Saturday
      const d = startOf(new Date(2024, 5, 15), "week", 1);
      expect(d.getDate()).toBe(10); // Monday June 10
    });
  });

  // ── endOf ──

  describe("endOf", () => {
    it("endOf year", () => {
      const d = endOf(new Date(2024, 5, 15, 10, 0), "year");
      expect(d.getMonth()).toBe(11);
      expect(d.getDate()).toBe(31);
      expect(d.getHours()).toBe(23);
      expect(d.getMinutes()).toBe(59);
      expect(d.getSeconds()).toBe(59);
      expect(d.getMilliseconds()).toBe(999);
    });

    it("endOf month (31-day)", () => {
      const d = endOf(new Date(2024, 0, 15), "month");
      expect(d.getDate()).toBe(31);
      expect(d.getHours()).toBe(23);
    });

    it("endOf month (Feb leap year)", () => {
      const d = endOf(new Date(2024, 1, 10), "month");
      expect(d.getDate()).toBe(29);
    });

    it("endOf month (Feb non-leap year)", () => {
      const d = endOf(new Date(2023, 1, 10), "month");
      expect(d.getDate()).toBe(28);
    });

    it("endOf day", () => {
      const d = endOf(new Date(2024, 5, 15, 10, 0), "day");
      expect(d.getDate()).toBe(15);
      expect(d.getHours()).toBe(23);
      expect(d.getMinutes()).toBe(59);
      expect(d.getSeconds()).toBe(59);
    });

    it("endOf hour", () => {
      const d = endOf(new Date(2024, 5, 15, 14, 10, 20), "hour");
      expect(d.getHours()).toBe(14);
      expect(d.getMinutes()).toBe(59);
      expect(d.getSeconds()).toBe(59);
      expect(d.getMilliseconds()).toBe(999);
    });

    it("endOf minute", () => {
      const d = endOf(new Date(2024, 5, 15, 14, 30, 10), "minute");
      expect(d.getMinutes()).toBe(30);
      expect(d.getSeconds()).toBe(59);
      expect(d.getMilliseconds()).toBe(999);
    });

    it("endOf second", () => {
      const d = endOf(new Date(2024, 5, 15, 14, 30, 45, 100), "second");
      expect(d.getSeconds()).toBe(45);
      expect(d.getMilliseconds()).toBe(999);
    });

    it("endOf week (Sunday start)", () => {
      // 2024-06-15 is Saturday
      const d = endOf(new Date(2024, 5, 12), "week", 0); // Wednesday
      expect(d.getDay()).toBe(6); // Saturday
      expect(d.getDate()).toBe(15);
    });
  });

  // ── add / subtract ──

  describe("add", () => {
    it("add years", () => {
      const d = add(new Date(2024, 0, 1), 2, "year");
      expect(d.getFullYear()).toBe(2026);
    });

    it("add months (no overflow)", () => {
      const d = add(new Date(2024, 0, 15), 3, "month");
      expect(d.getMonth()).toBe(3);
      expect(d.getDate()).toBe(15);
    });

    it("add months with overflow guard (Jan 31 + 1 month)", () => {
      const d = add(new Date(2024, 0, 31), 1, "month");
      // Should clamp to Feb 29 (2024 is leap year)
      expect(d.getMonth()).toBe(1);
      expect(d.getDate()).toBe(29);
    });

    it("add months with overflow guard (Jan 31 + 1 month, non-leap)", () => {
      const d = add(new Date(2023, 0, 31), 1, "month");
      expect(d.getMonth()).toBe(1);
      expect(d.getDate()).toBe(28);
    });

    it("add months with overflow guard (Mar 31 + 1 month → Apr 30)", () => {
      const d = add(new Date(2024, 2, 31), 1, "month");
      expect(d.getMonth()).toBe(3);
      expect(d.getDate()).toBe(30);
    });

    it("add weeks", () => {
      const d = add(new Date(2024, 0, 1), 2, "week");
      expect(d.getDate()).toBe(15);
    });

    it("add days", () => {
      const d = add(new Date(2024, 0, 30), 3, "day");
      expect(d.getMonth()).toBe(1);
      expect(d.getDate()).toBe(2);
    });

    it("add hours", () => {
      const d = add(new Date(2024, 0, 1, 23, 0), 2, "hour");
      expect(d.getDate()).toBe(2);
      expect(d.getHours()).toBe(1);
    });

    it("add minutes", () => {
      const d = add(new Date(2024, 0, 1, 0, 50), 15, "minute");
      expect(d.getHours()).toBe(1);
      expect(d.getMinutes()).toBe(5);
    });

    it("add seconds", () => {
      const d = add(new Date(2024, 0, 1, 0, 0, 50), 15, "second");
      expect(d.getMinutes()).toBe(1);
      expect(d.getSeconds()).toBe(5);
    });

    it("add milliseconds", () => {
      const d = add(new Date(2024, 0, 1, 0, 0, 0, 900), 200, "millisecond");
      expect(d.getSeconds()).toBe(1);
      expect(d.getMilliseconds()).toBe(100);
    });

    it("subtract months with overflow guard (Mar 31 - 1 month → Feb 29)", () => {
      const d = add(new Date(2024, 2, 31), -1, "month");
      expect(d.getMonth()).toBe(1);
      expect(d.getDate()).toBe(29);
    });
  });

  describe("subtract", () => {
    it("subtract days", () => {
      const d = subtract(new Date(2024, 0, 5), 10, "day");
      expect(d.getMonth()).toBe(11);
      expect(d.getFullYear()).toBe(2023);
      expect(d.getDate()).toBe(26);
    });
  });

  // ── Comparison ──

  describe("isSame", () => {
    it("returns true for same day", () => {
      expect(isSame(new Date(2024, 0, 1, 10), new Date(2024, 0, 1, 22), "day")).toBe(true);
    });

    it("returns false for different day", () => {
      expect(isSame(new Date(2024, 0, 1), new Date(2024, 0, 2), "day")).toBe(false);
    });

    it("handles null values", () => {
      expect(isSame(null, new Date(), "day")).toBe(false);
      expect(isSame(new Date(), null, "day")).toBe(false);
      expect(isSame(null, null, "day")).toBe(false);
    });

    it("same month different day", () => {
      expect(isSame(new Date(2024, 5, 1), new Date(2024, 5, 30), "month")).toBe(true);
    });
  });

  describe("isBefore / isAfter", () => {
    it("isBefore day", () => {
      expect(isBefore(new Date(2024, 0, 1), new Date(2024, 0, 2), "day")).toBe(true);
      expect(isBefore(new Date(2024, 0, 1), new Date(2024, 0, 1), "day")).toBe(false);
    });

    it("isAfter day", () => {
      expect(isAfter(new Date(2024, 0, 2), new Date(2024, 0, 1), "day")).toBe(true);
      expect(isAfter(new Date(2024, 0, 1), new Date(2024, 0, 1), "day")).toBe(false);
    });
  });

  // ── diff ──

  describe("diff", () => {
    it("diff in days", () => {
      expect(diff(new Date(2024, 0, 10), new Date(2024, 0, 1), "day")).toBe(9);
    });

    it("diff in days (negative)", () => {
      expect(diff(new Date(2024, 0, 1), new Date(2024, 0, 10), "day")).toBe(-9);
    });

    it("diff in months", () => {
      expect(diff(new Date(2024, 5, 1), new Date(2024, 0, 1), "month")).toBe(5);
    });

    it("diff in years", () => {
      expect(diff(new Date(2026, 0, 1), new Date(2024, 0, 1), "year")).toBe(2);
    });
  });

  // ── daysInMonth ──

  describe("daysInMonth", () => {
    it("January has 31 days", () => {
      expect(daysInMonth(new Date(2024, 0, 1))).toBe(31);
    });

    it("February leap year has 29 days", () => {
      expect(daysInMonth(new Date(2024, 1, 1))).toBe(29);
    });

    it("February non-leap year has 28 days", () => {
      expect(daysInMonth(new Date(2023, 1, 1))).toBe(28);
    });

    it("April has 30 days", () => {
      expect(daysInMonth(new Date(2024, 3, 1))).toBe(30);
    });
  });

  // ── Setters ──

  describe("setters", () => {
    const base = new Date(2024, 5, 15, 14, 30, 45, 500);

    it("setYear", () => {
      expect(setYear(base, 2030).getFullYear()).toBe(2030);
    });

    it("setMonth", () => {
      expect(setMonth(base, 0).getMonth()).toBe(0);
    });

    it("setDate", () => {
      expect(setDate(base, 1).getDate()).toBe(1);
    });

    it("setHour", () => {
      expect(setHour(base, 0).getHours()).toBe(0);
    });

    it("setMinute", () => {
      expect(setMinute(base, 0).getMinutes()).toBe(0);
    });

    it("setSecond", () => {
      expect(setSecond(base, 0).getSeconds()).toBe(0);
    });

    it("setMillisecond", () => {
      expect(setMillisecond(base, 0).getMilliseconds()).toBe(0);
    });

    it("setters do not mutate original", () => {
      const original = new Date(2024, 5, 15, 14, 30, 45);
      const originalTime = original.getTime();
      setYear(original, 2030);
      setMonth(original, 0);
      setDate(original, 1);
      setHour(original, 0);
      setMinute(original, 0);
      setSecond(original, 0);
      expect(original.getTime()).toBe(originalTime);
    });
  });

  // ── formatBasic ──

  describe("formatBasic", () => {
    const d = new Date(2024, 0, 5, 9, 3, 7);

    it("YYYY-MM-DD", () => {
      expect(formatBasic(d, "YYYY-MM-DD")).toBe("2024-01-05");
    });

    it("YYYY/M/D", () => {
      expect(formatBasic(d, "YYYY/M/D")).toBe("2024/1/5");
    });

    it("HH:mm:ss", () => {
      expect(formatBasic(d, "HH:mm:ss")).toBe("09:03:07");
    });

    it("hh:mm (12-hour)", () => {
      expect(formatBasic(d, "hh:mm")).toBe("09:03");
    });

    it("12-hour midnight", () => {
      const midnight = new Date(2024, 0, 1, 0, 0, 0);
      expect(formatBasic(midnight, "hh:mm")).toBe("12:00");
    });

    it("12-hour noon", () => {
      const noon = new Date(2024, 0, 1, 12, 0, 0);
      expect(formatBasic(noon, "hh:mm")).toBe("12:00");
    });

    it("12-hour PM", () => {
      const pm = new Date(2024, 0, 1, 15, 30, 0);
      expect(formatBasic(pm, "h:m")).toBe("3:30");
    });
  });
});
