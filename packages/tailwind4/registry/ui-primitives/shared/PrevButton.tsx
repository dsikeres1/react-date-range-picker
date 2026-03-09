import { type ReactNode, forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

export interface NavButtonProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const PrevButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { handlePrevMonth, locale } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <button
        ref={ref}
        type="button"
        className={cn("rdrp-header-nav-button", className)}
        onClick={handlePrevMonth}
        aria-label={locale.prevMonthLabel}
      >
        {children || locale.prevMonth}
      </button>
    );
  },
);
PrevButton.displayName = "PrevButton";
