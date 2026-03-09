import { createContext, useContext, type KeyboardEvent, type RefObject } from "react";

import type {
  DayProps,
  Locale,
  DatePickerSize,
  CaptionLayout,
  DateRangePreset,
  TimeConfig,
  TimePeriod,
  CalendarMonth,
} from "../types";

export interface PickerContextValue {
  value?: unknown;
  endName?: string;
  isOpen: boolean;
  locale: Locale;
  focusedDate: Date | null;
  displayValue: string;
  hasValue: boolean;
  canConfirm: boolean;

  handleToggle: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  handleClear: () => void;
  handleGoToToday: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  handleDateClick: (date: Date) => void;
  handleDateHover?: (date: Date | null) => void;

  calendars: CalendarMonth[];
  getDayProps: (date: Date, referenceMonth?: Date) => DayProps;

  captionLayout?: CaptionLayout;
  years: number[];
  months: number[];
  handleYearSelect: (year: number, calendarIndex?: number) => void;
  handleMonthSelect: (month: number, calendarIndex?: number) => void;

  containerRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;

  required?: boolean;
  inline?: boolean;
  showOutsideDays?: boolean;
  size?: DatePickerSize;
  placeholder?: string;
  name?: string;

  presets?: DateRangePreset[];
  handlePresetClick?: (preset: DateRangePreset) => void;
  activePresetIndex?: number;

  resolvedTimeConfig?: Required<TimeConfig>;

  tempHour?: number;
  tempMinute?: number;
  tempSecond?: number;
  tempPeriod?: TimePeriod;
  handleHourChange?: (hour: number) => void;
  handleMinuteChange?: (minute: number) => void;
  handleSecondChange?: (second: number) => void;
  handlePeriodChange?: (period: TimePeriod) => void;
  isTimePickerOpen?: boolean;
  handleTimePickerOpen?: () => void;
  handleTimePickerClose?: () => void;
  handleTimePickerConfirm?: () => void;
  handleTimePickerCancel?: () => void;
  timePickerRef?: RefObject<HTMLDivElement | null>;
  timeDisplayValue?: string;

  startHour?: number;
  startMinute?: number;
  startSecond?: number;
  startPeriod?: TimePeriod;
  endHour?: number;
  endMinute?: number;
  endSecond?: number;
  endPeriod?: TimePeriod;
  handleStartHourChange?: (hour: number) => void;
  handleStartMinuteChange?: (minute: number) => void;
  handleStartSecondChange?: (second: number) => void;
  handleStartPeriodChange?: (period: TimePeriod) => void;
  handleEndHourChange?: (hour: number) => void;
  handleEndMinuteChange?: (minute: number) => void;
  handleEndSecondChange?: (second: number) => void;
  handleEndPeriodChange?: (period: TimePeriod) => void;
  isStartTimePickerOpen?: boolean;
  isEndTimePickerOpen?: boolean;
  handleStartTimePickerOpen?: () => void;
  handleStartTimePickerClose?: () => void;
  handleStartTimePickerConfirm?: () => void;
  handleStartTimePickerCancel?: () => void;
  handleEndTimePickerOpen?: () => void;
  handleEndTimePickerClose?: () => void;
  handleEndTimePickerConfirm?: () => void;
  handleEndTimePickerCancel?: () => void;
  startTimePickerRef?: RefObject<HTMLDivElement | null>;
  endTimePickerRef?: RefObject<HTMLDivElement | null>;
  startTimeDisplayValue?: string;
  endTimeDisplayValue?: string;
}

export const PickerContext = createContext<PickerContextValue | null>(null);

export function usePickerContext(): PickerContextValue {
  const ctx = useContext(PickerContext);
  if (!ctx) throw new Error("Must be used within a Picker Root component");
  return ctx;
}
