import { type ReactNode, forwardRef } from "react";
import { useStandaloneTimePickerContext } from "react-date-range-picker-headless";

export interface TimePickerPeriodToggleProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const TimePickerPeriodToggle = forwardRef<HTMLButtonElement, TimePickerPeriodToggleProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { tempPeriod, handlePeriodChange, locale } = useStandaloneTimePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <button
        ref={ref}
        type="button"
        className={cn("rdrp-time-period-button", className)}
        aria-label={`${tempPeriod === "AM" ? locale.am : locale.pm}, toggle AM/PM`}
        onClick={() => handlePeriodChange(tempPeriod === "AM" ? "PM" : "AM")}
      >
        {children || (tempPeriod === "AM" ? locale.am : locale.pm)}
      </button>
    );
  },
);
TimePickerPeriodToggle.displayName = "TimePickerPeriodToggle";
