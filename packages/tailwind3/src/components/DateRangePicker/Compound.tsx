import { forwardRef } from "react";
import {
  DateRangePicker as Primitive,
  type DateRangePickerRootProps,
  type TriggerProps,
  type ContentProps,
  type HeaderProps,
  type NavButtonProps,
  type TitleProps,
  type GridProps,
  type DayProps,
  type FooterProps,
  type ActionButtonProps,
  type CalendarsProps,
  type PresetsProps,
  type PresetItemProps,
} from "react-date-range-picker-ui-primitives";
import { cn } from "../../utils";
import {
  rootClassNames,
  triggerClassNames,
  contentClassNames,
  headerClassNames,
  gridClassNames,
  dayClassNames,
  footerClassNames,
  rangeClassNames,
} from "../../theme";

export const Root = forwardRef<HTMLDivElement, DateRangePickerRootProps>(
  ({ className, size, ...props }, ref) => (
    <Primitive.Root
      ref={ref}
      className={cn(rootClassNames.root, size && `rdrp-size-${size}`, className)}
      cn={cn}
      size={size}
      {...props}
    />
  ),
);
Root.displayName = "DateRangePicker.Root";

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, placeholderClassName, clearClassName, ...props }, ref) => (
    <Primitive.Trigger
      ref={ref}
      className={cn(triggerClassNames.trigger, className)}
      placeholderClassName={cn(triggerClassNames.placeholder, placeholderClassName)}
      clearClassName={cn(triggerClassNames.clear, clearClassName)}
      cn={cn}
      {...props}
    />
  ),
);
Trigger.displayName = "DateRangePicker.Trigger";

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ className, inlineClassName, ...props }, ref) => (
    <Primitive.Content
      ref={ref}
      className={cn(rootClassNames.root, contentClassNames.content, className)}
      inlineClassName={cn(contentClassNames.contentInline, inlineClassName)}
      cn={cn}
      {...props}
    />
  ),
);
Content.displayName = "DateRangePicker.Content";

export const Header = forwardRef<HTMLDivElement, HeaderProps>(({ className, ...props }, ref) => (
  <Primitive.Header
    ref={ref}
    className={cn(headerClassNames.header, className)}
    cn={cn}
    {...props}
  />
));
Header.displayName = "DateRangePicker.Header";

export const PrevButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ className, ...props }, ref) => (
    <Primitive.PrevButton
      ref={ref}
      className={cn(headerClassNames.navButton, className)}
      cn={cn}
      {...props}
    />
  ),
);
PrevButton.displayName = "DateRangePicker.PrevButton";

export const NextButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ className, ...props }, ref) => (
    <Primitive.NextButton
      ref={ref}
      className={cn(headerClassNames.navButton, className)}
      cn={cn}
      {...props}
    />
  ),
);
NextButton.displayName = "DateRangePicker.NextButton";

export const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ className, selectClassName, ...props }, ref) => (
    <Primitive.Title
      ref={ref}
      className={cn(headerClassNames.title, className)}
      selectClassName={cn(headerClassNames.select, selectClassName)}
      cn={cn}
      {...props}
    />
  ),
);
Title.displayName = "DateRangePicker.Title";

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, weekdayClassName, weekdaysClassName, weekClassName, ...props }, ref) => (
    <Primitive.Grid
      ref={ref}
      className={cn(gridClassNames.panel, className)}
      weekdayClassName={cn(gridClassNames.weekday, weekdayClassName)}
      weekdaysClassName={cn(gridClassNames.weekdays, weekdaysClassName)}
      weekClassName={cn(gridClassNames.week, weekClassName)}
      gridClassName={gridClassNames.grid}
      dayClassName={dayClassNames.day}
      dayTodayClassName={dayClassNames.today}
      daySelectedClassName={dayClassNames.selected}
      dayDisabledClassName={dayClassNames.disabled}
      dayOutsideClassName={dayClassNames.outside}
      dayHighlightedClassName={dayClassNames.highlighted}
      dayInRangeClassName={dayClassNames.inRange}
      dayRangeStartClassName={dayClassNames.rangeStart}
      dayRangeEndClassName={dayClassNames.rangeEnd}
      dayRangeSingleClassName={dayClassNames.rangeSingle}
      dayHoverRangeClassName={dayClassNames.hoverRange}
      dayHoverTargetClassName={dayClassNames.hoverTarget}
      dayFocusedClassName={dayClassNames.focused}
      dayEmptyClassName={dayClassNames.empty}
      cn={cn}
      {...props}
    />
  ),
);
Grid.displayName = "DateRangePicker.Grid";

export const Day = forwardRef<HTMLButtonElement, DayProps>(({ className, ...props }, ref) => (
  <Primitive.Day
    ref={ref}
    className={cn(dayClassNames.day, className)}
    todayClassName={dayClassNames.today}
    selectedClassName={dayClassNames.selected}
    disabledClassName={dayClassNames.disabled}
    outsideClassName={dayClassNames.outside}
    highlightedClassName={dayClassNames.highlighted}
    inRangeClassName={dayClassNames.inRange}
    rangeStartClassName={dayClassNames.rangeStart}
    rangeEndClassName={dayClassNames.rangeEnd}
    rangeSingleClassName={dayClassNames.rangeSingle}
    hoverRangeClassName={dayClassNames.hoverRange}
    hoverTargetClassName={dayClassNames.hoverTarget}
    focusedClassName={dayClassNames.focused}
    emptyClassName={dayClassNames.empty}
    cn={cn}
    {...props}
  />
));
Day.displayName = "DateRangePicker.Day";

export const Calendars = forwardRef<HTMLDivElement, CalendarsProps>(
  ({ className, ...props }, ref) => (
    <Primitive.Calendars
      ref={ref}
      className={cn(rangeClassNames.calendarsContainer, className)}
      cn={cn}
      {...props}
    />
  ),
);
Calendars.displayName = "DateRangePicker.Calendars";

export const Presets = forwardRef<HTMLDivElement, PresetsProps>(({ className, ...props }, ref) => (
  <Primitive.Presets
    ref={ref}
    className={cn(rangeClassNames.presetsContainer, className)}
    cn={cn}
    {...props}
  />
));
Presets.displayName = "DateRangePicker.Presets";

export const PresetItem = forwardRef<HTMLButtonElement, PresetItemProps>(
  ({ className, activeClassName, ...props }, ref) => (
    <Primitive.PresetItem
      ref={ref}
      className={cn(rangeClassNames.presetButton, className)}
      activeClassName={cn(rangeClassNames.presetButtonActive, activeClassName)}
      cn={cn}
      {...props}
    />
  ),
);
PresetItem.displayName = "DateRangePicker.PresetItem";

export const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className, ...props }, ref) => (
  <Primitive.Footer
    ref={ref}
    className={cn(footerClassNames.footer, className)}
    cn={cn}
    {...props}
  />
));
Footer.displayName = "DateRangePicker.Footer";

export const ClearButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Primitive.ClearButton
      ref={ref}
      className={cn(footerClassNames.clearButton, className)}
      cn={cn}
      {...props}
    />
  ),
);
ClearButton.displayName = "DateRangePicker.ClearButton";

export const CancelButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Primitive.CancelButton
      ref={ref}
      className={cn(footerClassNames.button, className)}
      cn={cn}
      {...props}
    />
  ),
);
CancelButton.displayName = "DateRangePicker.CancelButton";

export const ConfirmButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Primitive.ConfirmButton
      ref={ref}
      className={cn(footerClassNames.confirmButton, className)}
      cn={cn}
      {...props}
    />
  ),
);
ConfirmButton.displayName = "DateRangePicker.ConfirmButton";

export const TodayButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Primitive.TodayButton
      ref={ref}
      className={cn(footerClassNames.button, className)}
      cn={cn}
      {...props}
    />
  ),
);
TodayButton.displayName = "DateRangePicker.TodayButton";
