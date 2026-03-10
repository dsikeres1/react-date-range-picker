import { describe, it, expect } from "vitest";
import { buildSingleDayProps, buildRangeDayProps } from "../buildDayProps";

describe("buildDayProps", () => {
  describe("buildSingleDayProps", () => {
    it("should correctly identify today", () => {
      const today = new Date("2023-01-15T00:00:00");
      const props = buildSingleDayProps({
        date: today,
        tempDate: null,
        today,
        weekStartsOnNum: 0,
      });
      expect(props.isToday).toBe(true);
    });

    it("should correctly identify selected date", () => {
      const today = new Date("2023-01-15T00:00:00");
      const tempDate = new Date("2023-01-20T00:00:00");
      const props = buildSingleDayProps({
        date: tempDate,
        tempDate,
        today,
        weekStartsOnNum: 0,
      });
      expect(props.isSelected).toBe(true);
    });

    it("should correctly identify disabled dates", () => {
      const today = new Date("2023-01-15T00:00:00");
      const date = new Date("2023-01-10T00:00:00");
      const minDate = new Date("2023-01-14T00:00:00");

      const props = buildSingleDayProps({
        date,
        tempDate: null,
        today,
        minDate,
        weekStartsOnNum: 0,
      });
      expect(props.isDisabled).toBe(true);
    });

    it("should correctly identify focused date", () => {
      const today = new Date("2023-01-15T00:00:00");
      const focusedDate = new Date("2023-01-16T00:00:00");

      const props = buildSingleDayProps({
        date: focusedDate,
        tempDate: null,
        focusedDate,
        today,
        weekStartsOnNum: 0,
      });
      expect(props.isFocused).toBe(true);
    });
  });

  describe("buildRangeDayProps", () => {
    it("should correctly identify range boundaries and in-range dates", () => {
      const today = new Date("2023-01-15T00:00:00");
      const tempStartDate = new Date("2023-01-10T00:00:00");
      const tempEndDate = new Date("2023-01-20T00:00:00");

      // Check start date
      const startProps = buildRangeDayProps({
        date: tempStartDate,
        tempStartDate,
        tempEndDate,
        hoveredDate: null,
        today,
        weekStartsOnNum: 0,
      });
      expect(startProps.isRangeStart).toBe(true);
      expect(startProps.isSelected).toBe(true);

      // Check middle date
      const middleDate = new Date("2023-01-15T00:00:00");
      const middleProps = buildRangeDayProps({
        date: middleDate,
        tempStartDate,
        tempEndDate,
        hoveredDate: null,
        today,
        weekStartsOnNum: 0,
      });
      expect(middleProps.isInRange).toBe(true);
      expect(middleProps.isRangeStart).toBe(false);
      expect(middleProps.isRangeEnd).toBe(false);

      // Check end date
      const endProps = buildRangeDayProps({
        date: tempEndDate,
        tempStartDate,
        tempEndDate,
        hoveredDate: null,
        today,
        weekStartsOnNum: 0,
      });
      expect(endProps.isRangeEnd).toBe(true);
      expect(endProps.isSelected).toBe(true);
    });

    it("should correctly identify hover ranges", () => {
      const today = new Date("2023-01-15T00:00:00");
      const tempStartDate = new Date("2023-01-10T00:00:00");
      const hoveredDate = new Date("2023-01-15T00:00:00");

      const middleDate = new Date("2023-01-12T00:00:00");
      const middleProps = buildRangeDayProps({
        date: middleDate,
        tempStartDate,
        tempEndDate: null,
        hoveredDate,
        today,
        weekStartsOnNum: 0,
      });

      expect(middleProps.isInHoverRange).toBe(true);
      expect(middleProps.isInRange).toBe(false);
    });
  });
});
