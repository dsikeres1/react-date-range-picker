import { type ReactNode, forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";
import { formatBasic } from "react-date-range-picker-headless";
import { Day } from "./Day";

export interface GridProps {
  className?: string;
  weekdayClassName?: string;
  weekdaysClassName?: string;
  weekClassName?: string;
  children?: (props: { date: Date; calendarIndex: number }) => ReactNode;
  calendarIndex?: number;
  cn?: (...args: unknown[]) => string;
  // Fallback for simple usage without custom day renderer
  dayClassName?: string;
  dayTodayClassName?: string;
  daySelectedClassName?: string;
  dayDisabledClassName?: string;
  dayOutsideClassName?: string;
  dayHighlightedClassName?: string;
  dayInRangeClassName?: string;
  dayRangeStartClassName?: string;
  dayRangeEndClassName?: string;
  dayRangeSingleClassName?: string;
  dayHoverRangeClassName?: string;
  dayHoverTargetClassName?: string;
  dayFocusedClassName?: string;
  dayEmptyClassName?: string;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      weekdayClassName,
      weekdaysClassName,
      weekClassName,
      children,
      calendarIndex = 0,
      cn: cnFn,
      ...dayClasses
    },
    ref,
  ) => {
    const { calendars, locale } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    const cal = calendars[calendarIndex];
    if (!cal) return null;

    return (
      <div ref={ref} className={cn("rdrp-grid-panel", className)}>
        <div className={cn("rdrp-weekdays", weekdaysClassName)} role="row">
          {locale.weekdays.map((wd) => (
            <div key={wd} className={cn("rdrp-weekday", weekdayClassName)} role="columnheader">
              {wd}
            </div>
          ))}
        </div>
        <div className={cn("rdrp-grid")} role="grid">
          {cal.weeks.map((week, wIdx) => (
            <div key={wIdx} className={cn("rdrp-week", weekClassName)} role="row">
              {week.map((date, dIdx) => {
                if (!date) {
                  return (
                    <div
                      key={`empty-${wIdx}-${dIdx}`}
                      className={cn("rdrp-day-empty", dayClasses.dayEmptyClassName)}
                    />
                  );
                }
                const key = formatBasic(date, "YYYY-MM-DD");

                if (typeof children === "function") {
                  return <span key={key}>{children({ date, calendarIndex })}</span>;
                }

                return (
                  <Day
                    key={key}
                    date={date}
                    calendarIndex={calendarIndex}
                    cn={cnFn}
                    className={dayClasses.dayClassName}
                    todayClassName={dayClasses.dayTodayClassName}
                    selectedClassName={dayClasses.daySelectedClassName}
                    disabledClassName={dayClasses.dayDisabledClassName}
                    outsideClassName={dayClasses.dayOutsideClassName}
                    highlightedClassName={dayClasses.dayHighlightedClassName}
                    inRangeClassName={dayClasses.dayInRangeClassName}
                    rangeStartClassName={dayClasses.dayRangeStartClassName}
                    rangeEndClassName={dayClasses.dayRangeEndClassName}
                    rangeSingleClassName={dayClasses.dayRangeSingleClassName}
                    hoverRangeClassName={dayClasses.dayHoverRangeClassName}
                    hoverTargetClassName={dayClasses.dayHoverTargetClassName}
                    focusedClassName={dayClasses.dayFocusedClassName}
                    emptyClassName={dayClasses.dayEmptyClassName}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
Grid.displayName = "Grid";
