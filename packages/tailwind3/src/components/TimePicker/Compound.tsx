import { forwardRef } from "react";
import {
  TimePicker as Primitive,
  type TimePickerRootProps,
  type TriggerProps,
  type ContentProps,
  type FooterProps,
  type ActionButtonProps,
  type TimePanelProps,
  type TimePickerPeriodToggleProps,
} from "react-date-range-picker-ui-primitives";
import { cn } from "../../utils";
import {
  rootClassNames,
  triggerClassNames,
  contentClassNames,
  footerClassNames,
  timePanelClassNames,
  timePickerClassNames,
} from "../../theme";

export const Root = forwardRef<HTMLDivElement, TimePickerRootProps>(
  ({ className, ...props }, ref) => (
    <Primitive.Root
      ref={ref}
      className={cn(rootClassNames.root, timePickerClassNames.root, className)}
      cn={cn}
      {...props}
    />
  ),
);
Root.displayName = "TimePicker.Root";

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
Trigger.displayName = "TimePicker.Trigger";

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ className, inlineClassName, ...props }, ref) => (
    <Primitive.Content
      ref={ref}
      className={cn(
        rootClassNames.root,
        contentClassNames.content,
        timePickerClassNames.content,
        className,
      )}
      inlineClassName={cn(contentClassNames.contentInline, inlineClassName)}
      cn={cn}
      {...props}
    />
  ),
);
Content.displayName = "TimePicker.Content";

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
TimePanel.displayName = "TimePicker.TimePanel";

export const PeriodToggle = forwardRef<HTMLButtonElement, TimePickerPeriodToggleProps>(
  ({ className, ...props }, ref) => (
    <Primitive.PeriodToggle
      ref={ref}
      className={cn(timePanelClassNames.timePeriodButton, className)}
      cn={cn}
      {...props}
    />
  ),
);
PeriodToggle.displayName = "TimePicker.PeriodToggle";

export const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className, ...props }, ref) => (
  <Primitive.Footer
    ref={ref}
    className={cn(footerClassNames.footer, className)}
    cn={cn}
    {...props}
  />
));
Footer.displayName = "TimePicker.Footer";

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
ClearButton.displayName = "TimePicker.ClearButton";

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
CancelButton.displayName = "TimePicker.CancelButton";

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
ConfirmButton.displayName = "TimePicker.ConfirmButton";
