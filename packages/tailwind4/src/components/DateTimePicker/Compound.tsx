import { forwardRef } from "react";
import {
  DateTimePicker as Primitive,
  type DateTimePickerRootProps,
  type TriggerProps,
  type ContentProps,
  type HeaderProps,
  type NavButtonProps,
  type TitleProps,
  type GridProps,
  type DayProps,
  type FooterProps,
  type ActionButtonProps,
  type DateTimeSectionProps,
  type TimePanelProps,
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
  dateTimeClassNames,
  timePanelClassNames,
} from "../../theme";

export const Root = forwardRef<HTMLDivElement, DateTimePickerRootProps>(
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
Root.displayName = "DateTimePicker.Root";

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
Trigger.displayName = "DateTimePicker.Trigger";

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
Content.displayName = "DateTimePicker.Content";

export const Header = forwardRef<HTMLDivElement, HeaderProps>(({ className, ...props }, ref) => (
  <Primitive.Header
    ref={ref}
    className={cn(headerClassNames.header, className)}
    cn={cn}
    {...props}
  />
));
Header.displayName = "DateTimePicker.Header";

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
PrevButton.displayName = "DateTimePicker.PrevButton";

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
NextButton.displayName = "DateTimePicker.NextButton";

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
Title.displayName = "DateTimePicker.Title";

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
Grid.displayName = "DateTimePicker.Grid";

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
Day.displayName = "DateTimePicker.Day";

export const TimeSection = forwardRef<HTMLDivElement, DateTimeSectionProps>(
  ({ className, ...props }, ref) => (
    <Primitive.TimeSection
      ref={ref}
      className={cn(dateTimeClassNames.timeSection, className)}
      cn={cn}
      {...props}
    />
  ),
);
TimeSection.displayName = "DateTimePicker.TimeSection";

export const TimePanel = forwardRef<HTMLDivElement, TimePanelProps>(
  ({ className, ...props }, ref) => (
    <Primitive.TimePanel
      ref={ref}
      className={cn(timePanelClassNames.timePanel, className)}
      highlightClassName={timePanelClassNames.timeHighlight}
      columnsClassName={timePanelClassNames.timeColumns}
      columnClassName={timePanelClassNames.timeColumn}
      itemClassName={timePanelClassNames.timeItem}
      itemActiveClassName={timePanelClassNames.timeItemActive}
      paddingClassName={timePanelClassNames.timePadding}
      colonClassName={timePanelClassNames.timeColon}
      periodButtonClassName={timePanelClassNames.timePeriodButton}
      cn={cn}
      {...props}
    />
  ),
);
TimePanel.displayName = "DateTimePicker.TimePanel";

export const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className, ...props }, ref) => (
  <Primitive.Footer
    ref={ref}
    className={cn(footerClassNames.footer, className)}
    cn={cn}
    {...props}
  />
));
Footer.displayName = "DateTimePicker.Footer";

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
ClearButton.displayName = "DateTimePicker.ClearButton";

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
CancelButton.displayName = "DateTimePicker.CancelButton";

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
ConfirmButton.displayName = "DateTimePicker.ConfirmButton";

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
TodayButton.displayName = "DateTimePicker.TodayButton";
