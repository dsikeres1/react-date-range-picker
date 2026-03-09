import { type ReactNode, forwardRef, type MutableRefObject } from "react";
import { usePickerContext, type Locale } from "react-date-range-picker-headless";

export interface TriggerRenderProps {
  displayValue: string;
  placeholder: string;
  hasValue: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
  locale: Locale;
  triggerRef: (node: HTMLElement | null) => void;
}

export interface TriggerProps {
  className?: string;
  placeholderClassName?: string;
  clearClassName?: string;
  placeholder?: string;
  children?: ReactNode | ((props: TriggerRenderProps) => ReactNode);
  cn?: (...args: unknown[]) => string;
}

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, placeholderClassName, clearClassName, placeholder, children, cn: cnFn }, ref) => {
    const context = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    const handleClearClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      context.handleClear();
    };

    const handleClearKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        context.handleClear();
      }
    };

    if (typeof children === "function") {
      return (
        <>
          {children({
            displayValue: context.displayValue,
            placeholder: placeholder || context.placeholder || context.locale.placeholder,
            hasValue: context.hasValue,
            isOpen: context.isOpen,
            onToggle: context.handleToggle,
            onClear: context.handleClear,
            locale: context.locale,
            triggerRef: (node) => {
              if (typeof ref === "function") ref(node as unknown as HTMLButtonElement);
              else if (ref && "current" in ref)
                (ref as MutableRefObject<HTMLElement | null>).current = node;
            },
          })}
        </>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(className)}
        onClick={context.handleToggle}
        aria-expanded={context.isOpen}
        aria-haspopup="dialog"
      >
        <span className={context.displayValue ? undefined : cn(placeholderClassName)}>
          {context.displayValue || placeholder || context.placeholder || context.locale.placeholder}
        </span>
        {context.hasValue && !context.required && (
          <span
            role="button"
            tabIndex={0}
            className={cn(clearClassName)}
            aria-label={context.locale.clear}
            onClick={handleClearClick}
            onKeyDown={handleClearKeyDown}
          >
            ×
          </span>
        )}
      </button>
    );
  },
);
Trigger.displayName = "Trigger";
