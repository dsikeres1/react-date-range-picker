import { forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";
import type { NavButtonProps } from "./PrevButton";

export const NextButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { handleNextMonth, locale } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <button
        ref={ref}
        type="button"
        className={cn("rdrp-header-nav-button", className)}
        onClick={handleNextMonth}
        aria-label={locale.nextMonthLabel}
      >
        {children || locale.nextMonth}
      </button>
    );
  },
);
NextButton.displayName = "NextButton";
