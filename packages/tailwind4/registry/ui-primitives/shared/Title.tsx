import { type ReactNode, forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

export interface TitleProps {
  className?: string;
  selectClassName?: string;
  calendarIndex?: number;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ className, selectClassName, calendarIndex = 0, children, cn: cnFn }, ref) => {
    const { calendars, locale, captionLayout, years, months, handleYearSelect, handleMonthSelect } =
      usePickerContext();

    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    const monthObj = calendars[calendarIndex]?.month;
    if (!monthObj) return null;

    if (captionLayout === "dropdown") {
      return (
        <div ref={ref} className={cn("rdrp-header-title", className)}>
          <select
            className={cn("rdrp-header-select", selectClassName)}
            value={monthObj.getMonth()}
            onChange={(e) => handleMonthSelect(Number(e.target.value), calendarIndex)}
            aria-label={locale.selectMonthLabel}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {locale.months[m]}
              </option>
            ))}
          </select>
          <select
            className={cn("rdrp-header-select", selectClassName)}
            value={monthObj.getFullYear()}
            onChange={(e) => handleYearSelect(Number(e.target.value), calendarIndex)}
            aria-label={locale.selectYearLabel}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("rdrp-header-title", className)}>
        {children || locale.formatMonthYear(monthObj)}
      </div>
    );
  },
);
Title.displayName = "Title";
