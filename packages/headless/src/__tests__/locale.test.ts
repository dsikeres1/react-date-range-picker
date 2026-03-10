import { describe, it, expect } from "vitest";
import { resolveLocale, createLocale, DEFAULT_LOCALE } from "../locale";

describe("locale", () => {
  describe("createLocale", () => {
    it("should generate locale-specific weekdays and months", () => {
      const ko = createLocale("ko-KR", { confirm: "확인" });
      // Korean weekdays should not be the English defaults
      expect(ko.weekdays[0]).not.toBe("Su");
      expect(ko.months[0]).not.toBe("January");
      expect(ko.confirm).toBe("확인");
    });

    it("should keep default format functions (not auto-derive from Intl)", () => {
      const ko = createLocale("ko-KR");
      const testDate = new Date(2026, 2, 16); // 2026-03-16
      // Must use our default yyyy-MM-dd format, NOT Korean locale format
      expect(ko.formatDate(testDate)).toBe("2026-03-16");
    });

    it("should use locale months in formatMonthYear but keep default format structure", () => {
      const ko = createLocale("ko-KR");
      const testDate = new Date(2026, 2, 1); // March 2026
      const result = ko.formatMonthYear(testDate);
      // Should use the Korean month name (from Intl), not "March"
      expect(result).toContain("2026");
      expect(result).not.toContain("March");
      // Format should be "{month} {year}" (default structure)
      expect(result).toBe(`${ko.months[2]} 2026`);
    });

    it("should keep default formatDateTime", () => {
      const ko = createLocale("ko-KR");
      const testDate = new Date(2026, 2, 16, 14, 30, 0);
      expect(ko.formatDateTime(testDate)).toBe("2026-03-16 14:30");
      expect(ko.formatDateTime(testDate, "second")).toBe("2026-03-16 14:30:00");
    });

    it("should allow explicit format overrides", () => {
      const custom = createLocale("ko-KR", {
        formatDate: (date) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
      });
      const testDate = new Date(2026, 2, 16);
      expect(custom.formatDate(testDate)).toBe("2026년 3월 16일");
    });
  });

  describe("resolveLocale", () => {
    it("should return default locale when no partial provided and weekStartsOn is 0", () => {
      const locale = resolveLocale(undefined, 0);
      expect(locale.weekdays).toEqual(DEFAULT_LOCALE.weekdays);
    });

    it("should rotate weekdays when weekStartsOn is 1 (Monday)", () => {
      const locale = resolveLocale(undefined, 1);
      // Default: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
      // Starts on Mo: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
      expect(locale.weekdays[0]).toBe("Mo");
      expect(locale.weekdays[6]).toBe("Su");
    });

    it("should rotate weekdays when weekStartsOn is 6 (Saturday)", () => {
      const locale = resolveLocale(undefined, 6);
      expect(locale.weekdays[0]).toBe("Sa");
      expect(locale.weekdays[1]).toBe("Su");
    });

    it("should merge partial locale overrides", () => {
      const locale = resolveLocale({ confirm: "OK" }, 0);
      expect(locale.confirm).toBe("OK");
      expect(locale.cancel).toBe(DEFAULT_LOCALE.cancel);
    });
  });
});
