import { forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";
import type { ActionButtonProps } from "./ClearButton";

export const TodayButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { handleGoToToday, locale } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <button
        ref={ref}
        type="button"
        className={cn("rdrp-footer-button", className)}
        onClick={handleGoToToday}
      >
        {children || locale.today}
      </button>
    );
  },
);
TodayButton.displayName = "TodayButton";
