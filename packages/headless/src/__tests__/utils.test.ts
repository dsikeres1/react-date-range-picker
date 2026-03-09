import { describe, it, expect } from "vitest";
import { formatBasic } from "../date-utils";
import {
  generateCalendarDays,
  weekdayToNumber,
  resolveMinMaxDates,
  isDateDisabled,
  to12Hour,
  to24Hour,
} from "../utils";

describe("utils.ts", () => {
  describe("weekdayToNumber", () => {
    it("converts weekday string to number", () => {
      expect(weekdayToNumber("sunday")).toBe(0);
      expect(weekdayToNumber("monday")).toBe(1);
      expect(weekdayToNumber("saturday")).toBe(6);
    });
  });

  describe("generateCalendarDays", () => {
    it("generates 42 days for a month (default sunday start)", () => {
      // 2024-05-01 is Wednesday
      const month = new Date("2024-05-01T00:00:00");
      const days = generateCalendarDays(month, 0, false);
      expect(days.length).toBe(42);

      // May 1st should be at index 3 (Sun=0, Mon=1, Tue=2, Wed=3)
      expect(days[0]).toBeNull();
      expect(days[3] ? formatBasic(days[3], "YYYY-MM-DD") : undefined).toBe("2024-05-01");
      // May has 31 days. Index 3 + 30 = 33
      expect(days[33] ? formatBasic(days[33], "YYYY-MM-DD") : undefined).toBe("2024-05-31");
      expect(days[34]).toBeNull();
    });

    it("generates 42 days for a month (monday start)", () => {
      // 2024-05-01 is Wednesday
      const month = new Date("2024-05-01T00:00:00");
      const days = generateCalendarDays(month, 1, false);
      expect(days.length).toBe(42);

      // Mon=0, Tue=1, Wed=2. So May 1st is at index 2
      expect(days[0]).toBeNull();
      expect(days[2] ? formatBasic(days[2], "YYYY-MM-DD") : undefined).toBe("2024-05-01");
    });

    it("includes outside days when showOutsideDays is true", () => {
      const month = new Date("2024-05-01T00:00:00");
      const days = generateCalendarDays(month, 0, true);

      // Leading days (April)
      expect(days[0] ? formatBasic(days[0], "YYYY-MM-DD") : undefined).toBe("2024-04-28");
      expect(days[2] ? formatBasic(days[2], "YYYY-MM-DD") : undefined).toBe("2024-04-30");
      // Trailing days (June)
      expect(days[34] ? formatBasic(days[34], "YYYY-MM-DD") : undefined).toBe("2024-06-01");
    });
  });

  describe("resolveMinMaxDates", () => {
    it("resolves disablePast correctly", () => {
      const today = new Date("2024-05-15T00:00:00");
      const { effectiveMinDate } = resolveMinMaxDates(undefined, undefined, today, true, false);
      expect(effectiveMinDate ? formatBasic(effectiveMinDate, "YYYY-MM-DD") : undefined).toBe(
        "2024-05-15",
      );
    });

    it("prefers explicit minDate if it is after today when disablePast is true", () => {
      const today = new Date("2024-05-15T00:00:00");
      const explicitMin = new Date("2024-05-20T00:00:00");
      const { effectiveMinDate } = resolveMinMaxDates(explicitMin, undefined, today, true, false);
      expect(effectiveMinDate ? formatBasic(effectiveMinDate, "YYYY-MM-DD") : undefined).toBe(
        "2024-05-20",
      );
    });
  });

  describe("isDateDisabled", () => {
    it("disables dates before minDate", () => {
      const minDate = new Date("2024-05-10T00:00:00");
      expect(isDateDisabled(new Date("2024-05-09T00:00:00"), minDate)).toBe(true);
      expect(isDateDisabled(new Date("2024-05-10T00:00:00"), minDate)).toBe(false);
    });

    it("disables dates after maxDate", () => {
      const maxDate = new Date("2024-05-20T00:00:00");
      expect(isDateDisabled(new Date("2024-05-21T00:00:00"), undefined, maxDate)).toBe(true);
      expect(isDateDisabled(new Date("2024-05-20T00:00:00"), undefined, maxDate)).toBe(false);
    });

    it("uses custom isDateUnavailable function", () => {
      const isUnavailable = (d: Date) => d.getDay() === 0; // Disable Sundays
      expect(
        isDateDisabled(new Date("2024-05-12T00:00:00"), undefined, undefined, isUnavailable),
      ).toBe(true); // 2024-05-12 is Sunday
      expect(
        isDateDisabled(new Date("2024-05-13T00:00:00"), undefined, undefined, isUnavailable),
      ).toBe(false); // Monday
    });
  });

  // ── 12-hour format edge cases ──

  describe("to12Hour", () => {
    it("converts midnight (0) → 12 AM", () => {
      const result = to12Hour(0);
      expect(result.hour).toBe(12);
      expect(result.period).toBe("AM");
    });

    it("converts noon (12) → 12 PM", () => {
      const result = to12Hour(12);
      expect(result.hour).toBe(12);
      expect(result.period).toBe("PM");
    });

    it("converts 1 → 1 AM", () => {
      const result = to12Hour(1);
      expect(result.hour).toBe(1);
      expect(result.period).toBe("AM");
    });

    it("converts 13 → 1 PM", () => {
      const result = to12Hour(13);
      expect(result.hour).toBe(1);
      expect(result.period).toBe("PM");
    });

    it("converts 23 → 11 PM", () => {
      const result = to12Hour(23);
      expect(result.hour).toBe(11);
      expect(result.period).toBe("PM");
    });
  });

  describe("to24Hour", () => {
    it("converts 12 AM → 0", () => {
      expect(to24Hour(12, "AM")).toBe(0);
    });

    it("converts 12 PM → 12", () => {
      expect(to24Hour(12, "PM")).toBe(12);
    });

    it("converts 1 AM → 1", () => {
      expect(to24Hour(1, "AM")).toBe(1);
    });

    it("converts 1 PM → 13", () => {
      expect(to24Hour(1, "PM")).toBe(13);
    });

    it("converts 11 PM → 23", () => {
      expect(to24Hour(11, "PM")).toBe(23);
    });
  });
});
