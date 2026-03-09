import type { RefObject, KeyboardEvent } from "react";

// ── Size ──

export type DatePickerSize = "x-large" | "large" | "medium" | "small";

// ── Week ──

export type WeekDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

// ── Time ──

export type MinuteStep = 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30;
export type SecondStep = 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30;
export type TimePrecision = "hour" | "minute" | "second";
export type HourFormat = "12" | "24";
export type TimePeriod = "AM" | "PM";

// ── Time config (shared across time-related hooks) ──

export interface TimeConfig {
  /** Time display precision. Defaults to "minute". */
  precision?: TimePrecision;
  /** 12-hour or 24-hour format. Defaults to "24". */
  hourFormat?: HourFormat;
  /** Minute increment step. Defaults to 5 (not 1). */
  minuteStep?: MinuteStep;
  /** Second increment step. Defaults to 1. */
  secondStep?: SecondStep;
  itemHeight?: number;
}

// ── Locale ──

export interface Locale {
  weekdays: string[];
  months: string[];
  confirm: string;
  cancel: string;
  clear: string;
  today: string;
  placeholder: string;
  rangePlaceholder: string;
  dateTimePlaceholder: string;
  rangeTimePlaceholder: string;
  timePlaceholder: string;
  am: string;
  pm: string;
  yearLabel: string;
  monthLabel: string;
  hourLabel: string;
  minuteLabel: string;
  secondLabel: string;
  hoursLabel: string;
  minutesLabel: string;
  secondsLabel: string;
  startTimeLabel: string;
  endTimeLabel: string;
  rangeSeparator: string;
  prevMonth: string;
  nextMonth: string;
  prevMonthLabel: string;
  nextMonthLabel: string;
  selectYearLabel: string;
  selectMonthLabel: string;
  formatMonthYear: (month: Date) => string;
  formatDate: (date: Date) => string;
  formatDateTime: (date: Date, precision?: TimePrecision, hourFormat?: HourFormat) => string;
  formatTime: (hour: number, minute: number, second: number, period?: TimePeriod) => string;
  formatRange: (start: string, end: string) => string;
}

// ── Calendar ──

export interface CalendarMonth {
  month: Date;
  days: (Date | null)[];
  weeks: (Date | null)[][];
}

// ── DayProps (per-cell computed flags) ──

export interface DayProps {
  date: Date;
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInHoverRange: boolean;
  isHoverTarget: boolean;
  hasLeftConnection: boolean;
  hasRightConnection: boolean;
  isConsecutiveRange: boolean;
  isFocused: boolean;
  dayOfWeek: number;
  /** True when this day belongs to a different month (prev/next) and showOutsideDays is enabled. */
  isOutsideDay: boolean;
  /** True when this day is in the highlightDates array. */
  isHighlighted: boolean;
  /** True when this day is both range start and range end (single-day range). */
  isRangeSingle: boolean;
}

// ── Caption Layout ──

export type CaptionLayout = "buttons" | "dropdown";

// ── Presets ──

export interface DateRangePreset {
  label: string;
  value: { start: Date; end: Date } | (() => { start: Date; end: Date });
}

// ── Shared base options (common to all date picker hooks) ──

interface BaseDatePickerOptions {
  minDate?: Date;
  maxDate?: Date;
  locale?: Partial<Locale>;
  initialMonth?: Date;
  /** UI pass-through: headless hooks ignore this. Styled components read it from props for visual sizing. */
  size?: DatePickerSize;
  /** Which day the week starts on. Defaults to "sunday". */
  weekStartsOn?: WeekDay;
  /** Custom function to mark specific dates as unavailable (disabled). */
  isDateUnavailable?: (date: Date) => boolean;
  /** Custom date format string for the display value (e.g. "YYYY/MM/DD"). */
  displayFormat?: string;
  /** Controlled open state. When provided, the hook will not manage open state internally. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  initialOpen?: boolean;
  /** Callback fired when the open state changes. Works with both controlled and uncontrolled modes. */
  onOpenChange?: (open: boolean) => void;
  /** When true, handleClear is a no-op (prevents clearing the value). */
  required?: boolean;
  /** Override today's date for isToday and disablePast/disableFuture calculations. */
  today?: Date;
  /** Callback fired when the displayed month changes (via prev/next navigation or programmatic change). */
  onMonthChange?: (month: Date) => void;
  /** Disable all dates before today (or the `today` override). */
  disablePast?: boolean;
  /** Disable all dates after today (or the `today` override). */
  disableFuture?: boolean;
  /** Show days from previous/next months to fill the 6-week grid (instead of empty cells). */
  showOutsideDays?: boolean;
  /** Array of dates to highlight in the calendar (e.g. holidays, events). */
  highlightDates?: Date[];
  /**
   * When true, automatically confirm and close on date selection.
   * - useDatePicker: closes on single date click.
   * - useDateRangePicker: closes when end date is selected.
   * - useDateTimePicker: not used (always requires explicit Confirm).
   * - useDateRangeTimePicker: only applies to preset clicks,
   *   NOT to date clicks (time must be set before confirming).
   */
  shouldCloseOnSelect?: boolean;
  /** When true, the picker is always visible (no popup). Date clicks immediately call onChange. */
  inline?: boolean;
  /** Number of months to display simultaneously. Defaults to 1 for single, 2 for range. */
  numberOfMonths?: number;
  /** Caption layout: "buttons" for prev/next arrows (default), "dropdown" for year/month selects. */
  captionLayout?: CaptionLayout;
  /** Start year for dropdown (default: current year - 100). */
  fromYear?: number;
  /** End year for dropdown (default: current year + 10). */
  toYear?: number;
}

// ── useDatePicker ──

export interface UseDatePickerOptions extends BaseDatePickerOptions {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export interface UseDatePickerReturn {
  isOpen: boolean;
  tempDate: Date | null;
  currentMonth: Date;
  locale: Locale;

  handleDateClick: (date: Date) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  handleClear: () => void;
  handleGoToToday: () => void;

  calendar: CalendarMonth;
  calendars: CalendarMonth[];
  getDayProps: (date: Date, referenceMonth?: Date) => DayProps;
  displayValue: string;
  hasValue: boolean;
  canConfirm: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;

  // Keyboard navigation
  focusedDate: Date | null;
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;

  // Caption dropdown
  years: number[];
  months: number[];
  handleYearSelect: (year: number, calendarIndex?: number) => void;
  handleMonthSelect: (month: number, calendarIndex?: number) => void;
}

// ── useDateRangePicker ──

export interface UseDateRangePickerOptions extends BaseDatePickerOptions {
  value: { start: Date | null; end: Date | null };
  onChange: (value: { start: Date | null; end: Date | null }) => void;
  /** Maximum number of days allowed in a range (inclusive). */
  maxDays?: number;
  /** Minimum number of days required in a range (inclusive). */
  minDays?: number;
  /** Predefined date range presets (e.g. "Last 7 days", "This month"). */
  presets?: DateRangePreset[];
  /** When false, prevents selecting a range where start === end. Defaults to true. */
  allowSingleDateInRange?: boolean;
}

export interface UseDateRangePickerReturn {
  isOpen: boolean;
  tempStartDate: Date | null;
  tempEndDate: Date | null;
  hoveredDate: Date | null;
  leftMonth: Date;
  rightMonth: Date;
  locale: Locale;

  handleDateClick: (date: Date) => void;
  handleDateHover: (date: Date | null) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  handleClear: () => void;
  handleGoToToday: () => void;
  leftCalendar: CalendarMonth;
  rightCalendar: CalendarMonth;
  calendars: CalendarMonth[];
  getDayProps: (date: Date, referenceMonth?: Date) => DayProps;
  displayValue: string;
  hasValue: boolean;
  canConfirm: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;

  // Keyboard navigation
  focusedDate: Date | null;
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;

  // Presets
  presets: DateRangePreset[];
  handlePresetClick: (preset: DateRangePreset) => void;
  activePresetIndex: number;

  // Caption dropdown
  years: number[];
  months: number[];
  handleYearSelect: (year: number, calendarIndex?: number) => void;
  handleMonthSelect: (month: number, calendarIndex?: number) => void;
}

// ── useDateTimePicker ──

export interface UseDateTimePickerOptions extends BaseDatePickerOptions {
  value: Date | null;
  onChange: (dateTime: Date | null) => void;
  time?: TimeConfig;
}

export interface UseDateTimePickerReturn {
  // Date state
  isOpen: boolean;
  tempDate: Date | null;
  currentMonth: Date;
  locale: Locale;

  // Time state
  isTimePickerOpen: boolean;
  tempHour: number;
  tempMinute: number;
  tempSecond: number;
  tempPeriod: TimePeriod;

  // Date actions
  handleDateClick: (date: Date) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  handleClear: () => void;
  handleGoToToday: () => void;

  // Time actions
  handleHourChange: (hour: number) => void;
  handleMinuteChange: (minute: number) => void;
  handleSecondChange: (second: number) => void;
  handlePeriodChange: (period: TimePeriod) => void;
  handleTimePickerOpen: () => void;
  handleTimePickerClose: () => void;
  handleTimePickerConfirm: () => void;
  handleTimePickerCancel: () => void;

  // Computed
  calendar: CalendarMonth;
  calendars: CalendarMonth[];
  getDayProps: (date: Date, referenceMonth?: Date) => DayProps;
  displayValue: string;
  timeDisplayValue: string;
  hasValue: boolean;
  canConfirm: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;
  timePickerRef: RefObject<HTMLDivElement | null>;

  // Keyboard navigation
  focusedDate: Date | null;
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;

  // Time config (resolved)
  resolvedTimeConfig: Required<TimeConfig>;

  // Caption dropdown
  years: number[];
  months: number[];
  handleYearSelect: (year: number, calendarIndex?: number) => void;
  handleMonthSelect: (month: number, calendarIndex?: number) => void;
}

// ── useDateRangeTimePicker ──

export interface UseDateRangeTimePickerOptions extends BaseDatePickerOptions {
  value: { start: Date | null; end: Date | null };
  onChange: (value: { start: Date | null; end: Date | null }) => void;
  time?: TimeConfig;
  /** Maximum number of days allowed in a range (inclusive). */
  maxDays?: number;
  /** Minimum number of days required in a range (inclusive). */
  minDays?: number;
  /** Predefined date range presets (e.g. "Last 7 days", "This month"). */
  presets?: DateRangePreset[];
  /** When false, prevents selecting a range where start === end. Defaults to true. */
  allowSingleDateInRange?: boolean;
}

export interface UseDateRangeTimePickerReturn {
  // Date state
  isOpen: boolean;
  tempStartDate: Date | null;
  tempEndDate: Date | null;
  hoveredDate: Date | null;
  leftMonth: Date;
  rightMonth: Date;
  locale: Locale;

  // Start time state
  startHour: number;
  startMinute: number;
  startSecond: number;
  startPeriod: TimePeriod;

  // End time state
  endHour: number;
  endMinute: number;
  endSecond: number;
  endPeriod: TimePeriod;

  // Time picker open states
  isStartTimePickerOpen: boolean;
  isEndTimePickerOpen: boolean;

  // Date actions
  handleDateClick: (date: Date) => void;
  handleDateHover: (date: Date | null) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  handleClear: () => void;
  handleGoToToday: () => void;

  // Start time actions
  handleStartHourChange: (hour: number) => void;
  handleStartMinuteChange: (minute: number) => void;
  handleStartSecondChange: (second: number) => void;
  handleStartPeriodChange: (period: TimePeriod) => void;
  handleStartTimePickerOpen: () => void;
  handleStartTimePickerClose: () => void;
  handleStartTimePickerConfirm: () => void;
  handleStartTimePickerCancel: () => void;

  // End time actions
  handleEndHourChange: (hour: number) => void;
  handleEndMinuteChange: (minute: number) => void;
  handleEndSecondChange: (second: number) => void;
  handleEndPeriodChange: (period: TimePeriod) => void;
  handleEndTimePickerOpen: () => void;
  handleEndTimePickerClose: () => void;
  handleEndTimePickerConfirm: () => void;
  handleEndTimePickerCancel: () => void;

  // Computed
  leftCalendar: CalendarMonth;
  rightCalendar: CalendarMonth;
  calendars: CalendarMonth[];
  getDayProps: (date: Date, referenceMonth?: Date) => DayProps;
  displayValue: string;
  startTimeDisplayValue: string;
  endTimeDisplayValue: string;
  hasValue: boolean;
  canConfirm: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;
  startTimePickerRef: RefObject<HTMLDivElement | null>;
  endTimePickerRef: RefObject<HTMLDivElement | null>;

  // Keyboard navigation
  focusedDate: Date | null;
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;

  // Time config (resolved)
  resolvedTimeConfig: Required<TimeConfig>;

  // Presets
  presets: DateRangePreset[];
  handlePresetClick: (preset: DateRangePreset) => void;
  activePresetIndex: number;

  // Caption dropdown
  years: number[];
  months: number[];
  handleYearSelect: (year: number, calendarIndex?: number) => void;
  handleMonthSelect: (month: number, calendarIndex?: number) => void;
}

// ── useTimePicker ──

export interface UseTimePickerOptions {
  /** Hour value. 24h mode: 0-23, 12h mode: 1-12. */
  hour: number;
  /** Current minute value. */
  minute: number;
  second?: number;
  period?: TimePeriod;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
  onSecondChange?: (second: number) => void;
  onPeriodChange?: (period: TimePeriod) => void;
  precision?: TimePrecision;
  hourFormat?: HourFormat;
  minuteStep?: MinuteStep;
  secondStep?: SecondStep;
  itemHeight?: number;
}

export interface UseTimePickerReturn {
  hours: number[];
  minutes: number[];
  seconds: number[];
  hourIndex: number;
  minuteIndex: number;
  secondIndex: number;
  showMinutes: boolean;
  showSeconds: boolean;
  is12Hour: boolean;
  period: TimePeriod;
  handlePeriodToggle: () => void;
  hourListRef: RefObject<HTMLDivElement | null>;
  minuteListRef: RefObject<HTMLDivElement | null>;
  secondListRef: RefObject<HTMLDivElement | null>;
  handleHourScroll: () => void;
  handleMinuteScroll: () => void;
  handleSecondScroll: () => void;
  handleHourClick: (hour: number) => void;
  handleMinuteClick: (minute: number) => void;
  handleSecondClick: (second: number) => void;
  scrollToValues: () => void;
  itemHeight: number;
  centerIndex: number;
}

// ── useStandaloneTimePicker ──

export interface UseStandaloneTimePickerOptions {
  /** Current time value (Date object, only time portion used). */
  value: Date | null;
  /** Callback when time value changes. */
  onChange: (date: Date | null) => void;
  /** Time configuration (precision, hourFormat, steps). */
  time?: TimeConfig;
  /** Locale overrides. */
  locale?: Partial<Locale>;
  /** Custom time format string for the display value (e.g. "HH:mm"). */
  displayFormat?: string;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  initialOpen?: boolean;
  /** Callback fired when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** When true, handleClear is a no-op. */
  required?: boolean;
  /** When true, picker is always visible (no popup). Time changes call onChange immediately. */
  inline?: boolean;
  /** UI pass-through: headless hooks ignore this. */
  size?: DatePickerSize;
  /** Placeholder text for the trigger. */
  placeholder?: string;
  /** Form field name for hidden input. */
  name?: string;
}

export interface UseStandaloneTimePickerReturn {
  // Open state
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;

  // Time state (24h internally)
  tempHour: number;
  tempMinute: number;
  tempSecond: number;
  tempPeriod: TimePeriod;

  // Time actions
  handleHourChange: (hour: number) => void;
  handleMinuteChange: (minute: number) => void;
  handleSecondChange: (second: number) => void;
  handlePeriodChange: (period: TimePeriod) => void;

  // Confirm/Cancel/Clear
  handleConfirm: () => void;
  handleCancel: () => void;
  handleClear: () => void;

  // Computed
  displayValue: string;
  timeDisplayValue: string;
  hasValue: boolean;
  canConfirm: boolean;
  locale: Locale;
  resolvedTimeConfig: Required<TimeConfig>;

  // Refs
  containerRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;

  // Keyboard
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
}
