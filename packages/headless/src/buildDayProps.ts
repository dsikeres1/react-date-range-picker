import type { DayProps } from "./types";
import { isDateDisabled, isDateSame, isToday } from "./utils";
import {
  add,
  subtract,
  isBefore,
  isAfter,
  isSame,
  diff,
  startOf,
  daysInMonth,
  formatBasic,
} from "./date-utils";

// ── Params for single date pickers ──

export interface BuildSingleDayPropsParams {
  date: Date;
  tempDate: Date | null;
  focusedDate?: Date | null;
  today: Date;
  minDate?: Date;
  maxDate?: Date;
  isDateUnavailable?: (date: Date) => boolean;
  weekStartsOnNum: number;
  referenceMonth?: Date;
  highlightSet?: Set<string>;
}

// ── Params for range date pickers ──

export interface BuildRangeDayPropsParams {
  date: Date;
  tempStartDate: Date | null;
  tempEndDate: Date | null;
  hoveredDate: Date | null;
  focusedDate?: Date | null;
  today: Date;
  minDate?: Date;
  maxDate?: Date;
  isDateUnavailable?: (date: Date) => boolean;
  maxDays?: number;
  minDays?: number;
  weekStartsOnNum: number;
  referenceMonth?: Date;
  highlightSet?: Set<string>;
}

// ── Single getDayProps (useDatePicker, useDateTimePicker) ──

export function buildSingleDayProps(p: BuildSingleDayPropsParams): DayProps {
  const {
    date,
    tempDate,
    focusedDate,
    today,
    minDate,
    maxDate,
    isDateUnavailable,
    weekStartsOnNum,
    referenceMonth,
    highlightSet,
  } = p;

  return {
    date,
    day: date.getDate(),
    isToday: isToday(date, today),
    isSelected: isDateSame(date, tempDate),
    isDisabled: isDateDisabled(date, minDate, maxDate, isDateUnavailable),
    isInRange: false,
    isRangeStart: false,
    isRangeEnd: false,
    isInHoverRange: false,
    isHoverTarget: false,
    hasLeftConnection: false,
    hasRightConnection: false,
    isConsecutiveRange: false,
    isFocused: focusedDate ? isDateSame(date, focusedDate) : false,
    dayOfWeek: (date.getDay() - weekStartsOnNum + 7) % 7,
    isOutsideDay: referenceMonth ? !isSame(date, referenceMonth, "month") : false,
    isHighlighted: highlightSet ? highlightSet.has(formatBasic(date, "YYYY-MM-DD")) : false,
    isRangeSingle: false,
  };
}

// ── Range getDayProps (useDateRangePicker, useDateRangeTimePicker) ──

export function buildRangeDayProps(p: BuildRangeDayPropsParams): DayProps {
  const {
    date,
    tempStartDate,
    tempEndDate,
    hoveredDate,
    today,
    minDate,
    maxDate,
    isDateUnavailable,
    maxDays,
    minDays,
    weekStartsOnNum,
    referenceMonth,
    highlightSet,
  } = p;

  const isRangeStart = isDateSame(date, tempStartDate);
  const isRangeEnd = isDateSame(date, tempEndDate);

  // In range: between start and end, or between start and hovered
  let isInRange = false;
  let isInHoverRange = false;
  if (tempStartDate) {
    if (tempEndDate) {
      isInRange = isAfter(date, tempStartDate, "day") && isBefore(date, tempEndDate, "day");
    } else if (hoveredDate) {
      if (isAfter(hoveredDate, tempStartDate, "day")) {
        isInHoverRange = isAfter(date, tempStartDate, "day") && isBefore(date, hoveredDate, "day");
      } else if (isBefore(hoveredDate, tempStartDate, "day")) {
        isInHoverRange = isBefore(date, tempStartDate, "day") && isAfter(date, hoveredDate, "day");
      }
    }
  }

  // Include hover target in range-or-edge check for connection computation
  const isHoverEdge = !!(
    tempStartDate &&
    !tempEndDate &&
    hoveredDate &&
    isDateSame(date, hoveredDate)
  );
  const isInRangeOrEdge = isInRange || isInHoverRange || isRangeStart || isRangeEnd || isHoverEdge;

  // Consecutive dates: start and end are exactly 1 day apart
  const isConsecutiveRange =
    !!tempStartDate &&
    !!tempEndDate &&
    diff(startOf(tempEndDate, "day"), startOf(tempStartDate, "day"), "day") === 1;

  // Connection flags for range background styling
  let hasLeftConnection = false;
  let hasRightConnection = false;

  if (isInRangeOrEdge) {
    // Column index in the week grid (0=leftmost, 6=rightmost)
    const columnIndex = (date.getDay() - weekStartsOnNum + 7) % 7;
    const prevDate = subtract(date, 1, "day");
    const nextDate = add(date, 1, "day");

    const isDateInRangeOrHoverEdge = (d: Date) => {
      if (isDateSame(d, tempStartDate) || isDateSame(d, tempEndDate)) return true;
      if (tempStartDate && !tempEndDate && isDateSame(d, hoveredDate)) return true;
      if (tempStartDate && tempEndDate) {
        return isAfter(d, tempStartDate, "day") && isBefore(d, tempEndDate, "day");
      }
      if (tempStartDate && !tempEndDate && hoveredDate) {
        const [start, end] = isAfter(hoveredDate, tempStartDate, "day")
          ? [tempStartDate, hoveredDate]
          : [hoveredDate, tempStartDate];
        return isAfter(d, start, "day") && isBefore(d, end, "day");
      }
      return false;
    };

    // Check if previous cell in the same row is also in range
    const prevInRangeOrEdge = columnIndex > 0 && isDateInRangeOrHoverEdge(prevDate);

    // Check if next cell in the same row is also in range
    const nextInRangeOrEdge = columnIndex < 6 && isDateInRangeOrHoverEdge(nextDate);

    // Cross-month continuation: use visual range bounds (including hover)
    const isLastDay = date.getDate() === daysInMonth(date);
    const isFirstDay = date.getDate() === 1;

    let rangeMin = tempStartDate;
    let rangeMax: Date | null = tempEndDate;
    if (tempStartDate && !tempEndDate && hoveredDate) {
      if (isBefore(hoveredDate, tempStartDate, "day")) {
        rangeMin = hoveredDate;
        rangeMax = tempStartDate;
      } else {
        rangeMax = hoveredDate;
      }
    }

    const rangeExtendsToNextMonth =
      isLastDay && rangeMax && !isDateSame(date, rangeMax) && isBefore(date, rangeMax, "day");
    const rangeExtendsFromPrevMonth =
      isFirstDay && rangeMin && !isDateSame(date, rangeMin) && isAfter(date, rangeMin, "day");

    hasLeftConnection = !!(prevInRangeOrEdge || rangeExtendsFromPrevMonth);
    hasRightConnection = !!(nextInRangeOrEdge || rangeExtendsToNextMonth);
  }

  // Disabled: minDate/maxDate + isDateUnavailable + maxDays + minDays
  let disabled = isDateDisabled(date, minDate, maxDate, isDateUnavailable);
  if (!disabled && tempStartDate && !tempEndDate) {
    const daysDiff = Math.abs(diff(startOf(date, "day"), startOf(tempStartDate, "day"), "day"));
    if (maxDays && daysDiff + 1 > maxDays) {
      disabled = true;
    }
    if (minDays && daysDiff > 0 && daysDiff + 1 < minDays) {
      disabled = true;
    }
  }

  return {
    date,
    day: date.getDate(),
    isToday: isToday(date, today),
    isSelected: isRangeStart || isRangeEnd,
    isDisabled: disabled,
    isInRange,
    isRangeStart,
    isRangeEnd,
    isInHoverRange,
    isHoverTarget: isDateSame(date, hoveredDate),
    hasLeftConnection,
    hasRightConnection,
    isConsecutiveRange,
    isFocused: p.focusedDate ? isDateSame(date, p.focusedDate) : false,
    dayOfWeek: (date.getDay() - weekStartsOnNum + 7) % 7,
    isOutsideDay: referenceMonth ? !isSame(date, referenceMonth, "month") : false,
    isHighlighted: highlightSet ? highlightSet.has(formatBasic(date, "YYYY-MM-DD")) : false,
    isRangeSingle: isRangeStart && isRangeEnd,
  };
}
