import type { CSSProperties, ReactNode } from "react";
import type {
  Locale,
  DayProps,
  DatePickerSize,
  DateRangePreset,
  CaptionLayout,
  CalendarMonth,
  UseDatePickerOptions,
  UseDateRangePickerOptions,
  UseDateTimePickerOptions,
  UseDateRangeTimePickerOptions,
  TimeConfig,
  TimePeriod,
  UseStandaloneTimePickerOptions,
} from "react-date-range-picker-headless";

// ── Render prop context types ──

export interface TriggerRenderProps {
  displayValue: string;
  placeholder: string;
  hasValue: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
  locale: Locale;
  /** Callback ref to attach to the trigger element for Floating UI positioning. */
  triggerRef: (node: HTMLElement | null) => void;
}

export interface HeaderRenderProps {
  month: Date;
  formattedMonthYear: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  locale: Locale;
  captionLayout: CaptionLayout;
  years: number[];
  months: number[];
  onYearSelect: (year: number) => void;
  onMonthSelect: (month: number) => void;
}

export interface WeekdayRowRenderProps {
  weekdays: string[];
}

export interface DayCellRenderProps extends DayProps {
  /** Unique id for the day cell, used by aria-activedescendant on the dialog. */
  id: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface FooterRenderProps {
  canConfirm: boolean;
  hasValue: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClear: () => void;
  locale: Locale;
}

export interface TimeSectionRenderProps {
  displayValue: string;
  label: string;
  timeConfig: Required<TimeConfig>;
  hour: number;
  minute: number;
  second: number;
  period: TimePeriod;
}

export interface RangeTimeSectionRenderProps {
  timeConfig: Required<TimeConfig>;
  start: {
    displayValue: string;
    label: string;
    hour: number;
    minute: number;
    second: number;
    period: TimePeriod;
  };
  end: {
    displayValue: string;
    label: string;
    hour: number;
    minute: number;
    second: number;
    period: TimePeriod;
  };
}

export interface PresetsBarRenderProps {
  presets: DateRangePreset[];
  activePresetIndex: number;
  onPresetClick: (preset: DateRangePreset) => void;
}

// ── Shared visual/render props ──

export interface RenderProps {
  renderTrigger?: (props: TriggerRenderProps) => ReactNode;
  renderHeader?: (props: HeaderRenderProps) => ReactNode;
  renderWeekdayRow?: (props: WeekdayRowRenderProps) => ReactNode;
  renderDayCell?: (props: DayCellRenderProps) => ReactNode;
  renderFooter?: (props: FooterRenderProps) => ReactNode;
  renderTimeSection?: (props: TimeSectionRenderProps) => ReactNode;
  renderPresetsBar?: (props: PresetsBarRenderProps) => ReactNode;
}

export interface VisualProps {
  className?: string;
  style?: CSSProperties;
  inline?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideWeekdays?: boolean;
}

// ── Form integration props ──

export interface FormNameProps {
  /** When provided, renders a hidden `<input>` with the selected value for native form submission. */
  name?: string;
}

export interface RangeFormNameProps extends FormNameProps {
  /** Name for the end-date hidden input. Defaults to `${name}-end` when only `name` is provided. */
  endName?: string;
}

// ── User-facing classNames prop types ──

export interface DatePickerUserClassNames extends Partial<DatePickerClassNames> {
  calendar?: Partial<CalendarGridClassNames>;
}

export interface DateRangePickerUserClassNames extends Partial<DateRangePickerClassNames> {
  calendar?: Partial<CalendarGridClassNames>;
}

export interface DateTimePickerUserClassNames extends Partial<DateTimePickerClassNames> {
  calendar?: Partial<CalendarGridClassNames>;
  timePanel?: Partial<TimePanelClassNames>;
}

export interface DateRangeTimePickerUserClassNames extends Partial<DateRangeTimePickerClassNames> {
  calendar?: Partial<CalendarGridClassNames>;
  timePanel?: Partial<TimePanelClassNames>;
}

export interface TimePickerUserClassNames extends Partial<TimePickerClassNames> {
  timePanel?: Partial<TimePanelClassNames>;
}

// ── Public component props ──

export interface DatePickerProps
  extends UseDatePickerOptions, VisualProps, RenderProps, FormNameProps {
  classNames?: DatePickerUserClassNames;
}

export interface DateRangePickerProps
  extends UseDateRangePickerOptions, VisualProps, RenderProps, RangeFormNameProps {
  classNames?: DateRangePickerUserClassNames;
}

export interface DateTimePickerProps
  extends UseDateTimePickerOptions, VisualProps, RenderProps, FormNameProps {
  classNames?: DateTimePickerUserClassNames;
}

export interface DateRangeTimePickerProps
  extends
    UseDateRangeTimePickerOptions,
    VisualProps,
    Omit<RenderProps, "renderTimeSection">,
    RangeFormNameProps {
  renderTimeSection?: (props: RangeTimeSectionRenderProps) => ReactNode;
  classNames?: DateRangeTimePickerUserClassNames;
}

export interface TimePickerProps extends UseStandaloneTimePickerOptions, FormNameProps {
  size?: DatePickerSize;
  className?: string;
  style?: CSSProperties;
  inline?: boolean;
  hideFooter?: boolean;
  renderFooter?: (props: FooterRenderProps) => ReactNode;
  classNames?: TimePickerUserClassNames;
}

// ── ClassNames types (for theme injection) ──

export interface CalendarGridClassNames {
  calendarPanel?: string;
  header?: string;
  headerTitle?: string;
  captionSelect?: string;
  weekdays?: string;
  weekday?: string;
  grid?: string;
  week?: string;
  day?: string;
  dayEmpty?: string;
  dayToday?: string;
  daySelected?: string;
  dayDisabled?: string;
  dayOutside?: string;
  dayHighlighted?: string;
  dayInRange?: string;
  dayRangeStart?: string;
  dayRangeEnd?: string;
  dayRangeSingle?: string;
  dayHoverRange?: string;
  dayHoverTarget?: string;
  dayFocused?: string;
}

export interface TimePanelClassNames {
  timePanel?: string;
  timeHighlight?: string;
  timeColumns?: string;
  timeColumn?: string;
  timeItem?: string;
  timeItemActive?: string;
  timePadding?: string;
  timeColon?: string;
  timePeriodButton?: string;
}

/** Common classNames shared by all picker components */
export interface BasePickerClassNames {
  root?: string;
  content?: string;
  contentInline?: string;
  trigger?: string;
  triggerPlaceholder?: string;
  triggerClear?: string;
  header?: string;
  headerNavButton?: string;
  headerTitle?: string;
  headerSelect?: string;
  headerSpacer?: string;
  footer?: string;
  footerButton?: string;
  footerClearButton?: string;
  footerConfirmButton?: string;
}

export type DatePickerClassNames = BasePickerClassNames;

export interface DateRangePickerClassNames extends BasePickerClassNames {
  presetsContainer?: string;
  presetButton?: string;
  presetButtonActive?: string;
  presetsLayout?: string;
  calendarsContainer?: string;
}

export interface DateTimePickerClassNames extends BasePickerClassNames {
  timeSection?: string;
  timeLabel?: string;
}

export interface DateRangeTimePickerClassNames extends BasePickerClassNames {
  presetsContainer?: string;
  presetButton?: string;
  presetButtonActive?: string;
  presetsLayout?: string;
  calendarsContainer?: string;
  timeSection?: string;
  timeLabel?: string;
}

export type TimePickerClassNames = BasePickerClassNames;

// ── Internal CalendarGrid props ──

export interface CalendarGridProps {
  calendar: CalendarMonth;
  locale: Locale;
  focusedDate?: Date | null;
  getDayProps: (date: Date, referenceMonth?: Date) => DayProps;
  onDateClick: (date: Date) => void;
  onDateHover?: (date: Date | null) => void;
  showTitle?: boolean;
  hideWeekdays?: boolean;
  captionLayout?: CaptionLayout;
  years?: number[];
  monthOptions?: number[];
  onYearSelect?: (year: number, calendarIndex?: number) => void;
  onMonthSelect?: (month: number, calendarIndex?: number) => void;
  calendarIndex?: number;
  renderWeekdayRow?: (props: WeekdayRowRenderProps) => ReactNode;
  renderDayCell?: (props: DayCellRenderProps) => ReactNode;
}

// ── Internal TimePanelInternal props ──

export interface TimePanelInternalProps {
  hour: number;
  minute: number;
  second: number;
  period: TimePeriod;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onSecondChange: (s: number) => void;
  onPeriodChange: (p: TimePeriod) => void;
  timeConfig: Required<TimeConfig>;
}
