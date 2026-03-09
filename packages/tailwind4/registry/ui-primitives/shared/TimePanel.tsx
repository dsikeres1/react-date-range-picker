import { forwardRef, useEffect } from "react";
import { usePickerContext } from "react-date-range-picker-headless";
import { useTimePicker } from "react-date-range-picker-headless";

export interface TimePanelProps {
  target?: "start" | "end" | "single";
  className?: string;
  highlightClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  itemClassName?: string;
  itemActiveClassName?: string;
  paddingClassName?: string;
  colonClassName?: string;
  periodButtonClassName?: string;
  cn?: (...args: unknown[]) => string;
}

export const TimePanel = forwardRef<HTMLDivElement, TimePanelProps>(
  (
    {
      target = "single",
      className,
      highlightClassName,
      columnsClassName,
      columnClassName,
      itemClassName,
      itemActiveClassName,
      paddingClassName,
      colonClassName,
      periodButtonClassName,
      cn: cnFn,
    },
    ref,
  ) => {
    const context = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    let config = context.resolvedTimeConfig;
    if (!config) config = {} as Required<import("react-date-range-picker-headless").TimeConfig>; // Not a time picker

    let hour, minute, second, period, onHour, onMinute, onSecond, onPeriod;

    if (target === "single") {
      hour = context.tempHour ?? 0;
      minute = context.tempMinute ?? 0;
      second = context.tempSecond ?? 0;
      period = context.tempPeriod ?? "AM";
      onHour = context.handleHourChange!;
      onMinute = context.handleMinuteChange!;
      onSecond = context.handleSecondChange!;
      onPeriod = context.handlePeriodChange!;
    } else if (target === "start") {
      hour = context.startHour ?? 0;
      minute = context.startMinute ?? 0;
      second = context.startSecond ?? 0;
      period = context.startPeriod ?? "AM";
      onHour = context.handleStartHourChange!;
      onMinute = context.handleStartMinuteChange!;
      onSecond = context.handleStartSecondChange!;
      onPeriod = context.handleStartPeriodChange!;
    } else {
      hour = context.endHour ?? 0;
      minute = context.endMinute ?? 0;
      second = context.endSecond ?? 0;
      period = context.endPeriod ?? "AM";
      onHour = context.handleEndHourChange!;
      onMinute = context.handleEndMinuteChange!;
      onSecond = context.handleEndSecondChange!;
      onPeriod = context.handleEndPeriodChange!;
    }

    const tp = useTimePicker({
      hour,
      minute,
      second,
      period,
      onHourChange: onHour,
      onMinuteChange: onMinute,
      onSecondChange: onSecond,
      onPeriodChange: onPeriod,
      precision: config?.precision,
      hourFormat: config?.hourFormat,
      minuteStep: config?.minuteStep,
      secondStep: config?.secondStep,
      itemHeight: config?.itemHeight,
    });

    // Auto scroll when panel appears
    useEffect(() => {
      tp.scrollToValues();
    }, [tp.scrollToValues]);

    return (
      <div ref={ref} className={cn("rdrp-time-panel", className)}>
        <div className={cn("rdrp-time-highlight", highlightClassName)} />
        <div className={cn("rdrp-time-columns", columnsClassName)}>
          <div
            ref={tp.hourListRef}
            className={cn("rdrp-time-column", columnClassName)}
            onScroll={tp.handleHourScroll}
            tabIndex={0}
            role="listbox"
            aria-label={context.locale.hourLabel}
            aria-orientation="vertical"
          >
            {tp.hours.map((val, i) => (
              <div
                key={`hour-${val}-${i}`}
                role={val !== -1 ? "option" : "presentation"}
                tabIndex={val !== -1 ? 0 : -1}
                aria-selected={val !== -1 ? i === tp.hourIndex : undefined}
                className={cn(
                  val === -1 ? "rdrp-time-padding" : "rdrp-time-item",
                  val === -1 ? paddingClassName : itemClassName,
                  i === tp.hourIndex && val !== -1 && "rdrp-time-item-active",
                  i === tp.hourIndex && val !== -1 && itemActiveClassName,
                )}
                onClick={() => {
                  if (val !== -1) tp.handleHourClick(val);
                }}
                onKeyDown={(e) => {
                  if (val !== -1 && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    tp.handleHourClick(val);
                  }
                }}
              >
                {val !== -1 ? val.toString().padStart(2, "0") : ""}
              </div>
            ))}
          </div>

          {tp.showMinutes && (
            <>
              <div className={cn("rdrp-time-colon", colonClassName)}>:</div>
              <div
                ref={tp.minuteListRef}
                className={cn("rdrp-time-column", columnClassName)}
                onScroll={tp.handleMinuteScroll}
                tabIndex={0}
                role="listbox"
                aria-label={context.locale.minuteLabel}
                aria-orientation="vertical"
              >
                {tp.minutes.map((val, i) => (
                  <div
                    key={`min-${val}-${i}`}
                    role={val !== -1 ? "option" : "presentation"}
                    tabIndex={val !== -1 ? 0 : -1}
                    aria-selected={val !== -1 ? i === tp.minuteIndex : undefined}
                    className={cn(
                      val === -1 ? "rdrp-time-padding" : "rdrp-time-item",
                      val === -1 ? paddingClassName : itemClassName,
                      i === tp.minuteIndex && val !== -1 && "rdrp-time-item-active",
                      i === tp.minuteIndex && val !== -1 && itemActiveClassName,
                    )}
                    onClick={() => {
                      if (val !== -1) tp.handleMinuteClick(val);
                    }}
                    onKeyDown={(e) => {
                      if (val !== -1 && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        tp.handleMinuteClick(val);
                      }
                    }}
                  >
                    {val !== -1 ? val.toString().padStart(2, "0") : ""}
                  </div>
                ))}
              </div>
            </>
          )}

          {tp.showSeconds && (
            <>
              <div className={cn("rdrp-time-colon", colonClassName)}>:</div>
              <div
                ref={tp.secondListRef}
                className={cn("rdrp-time-column", columnClassName)}
                onScroll={tp.handleSecondScroll}
                tabIndex={0}
                role="listbox"
                aria-label={context.locale.secondLabel}
                aria-orientation="vertical"
              >
                {tp.seconds.map((val, i) => (
                  <div
                    key={`sec-${val}-${i}`}
                    role={val !== -1 ? "option" : "presentation"}
                    tabIndex={val !== -1 ? 0 : -1}
                    aria-selected={val !== -1 ? i === tp.secondIndex : undefined}
                    className={cn(
                      val === -1 ? "rdrp-time-padding" : "rdrp-time-item",
                      val === -1 ? paddingClassName : itemClassName,
                      i === tp.secondIndex && val !== -1 && "rdrp-time-item-active",
                      i === tp.secondIndex && val !== -1 && itemActiveClassName,
                    )}
                    onClick={() => {
                      if (val !== -1) tp.handleSecondClick(val);
                    }}
                    onKeyDown={(e) => {
                      if (val !== -1 && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        tp.handleSecondClick(val);
                      }
                    }}
                  >
                    {val !== -1 ? val.toString().padStart(2, "0") : ""}
                  </div>
                ))}
              </div>
            </>
          )}

          {tp.is12Hour && (
            <button
              type="button"
              className={cn("rdrp-time-period-button", periodButtonClassName)}
              aria-label={`${tp.period === "AM" ? context.locale.am : context.locale.pm}, toggle AM/PM`}
              onClick={tp.handlePeriodToggle}
            >
              {tp.period === "AM" ? context.locale.am : context.locale.pm}
            </button>
          )}
        </div>
      </div>
    );
  },
);
TimePanel.displayName = "TimePanel";
