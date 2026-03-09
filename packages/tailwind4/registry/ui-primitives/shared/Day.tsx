import { type ReactNode, forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

export interface DayRenderProps {
  date: Date;
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInHoverRange: boolean;
  isHoverTarget: boolean;
  hasLeftConnection: boolean;
  hasRightConnection: boolean;
  isConsecutiveRange: boolean;
  isFocused: boolean;
  dayOfWeek: number;
  isOutsideDay: boolean;
  isHighlighted: boolean;
  isRangeSingle: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface DayProps {
  date: Date;
  calendarIndex?: number;
  className?: string;
  todayClassName?: string;
  selectedClassName?: string;
  disabledClassName?: string;
  outsideClassName?: string;
  highlightedClassName?: string;
  inRangeClassName?: string;
  rangeStartClassName?: string;
  rangeEndClassName?: string;
  rangeSingleClassName?: string;
  hoverRangeClassName?: string;
  hoverTargetClassName?: string;
  focusedClassName?: string;
  emptyClassName?: string;
  children?: ReactNode | ((props: DayRenderProps) => ReactNode);
  cn?: (...args: unknown[]) => string;
}

export const Day = forwardRef<HTMLButtonElement, DayProps>(
  (
    {
      date,
      calendarIndex = 0,
      className,
      todayClassName,
      selectedClassName,
      disabledClassName,
      outsideClassName,
      highlightedClassName,
      inRangeClassName,
      rangeStartClassName,
      rangeEndClassName,
      rangeSingleClassName,
      hoverRangeClassName,
      hoverTargetClassName,
      focusedClassName,
      emptyClassName: _emptyClassName,
      children,
      cn: cnFn,
    },
    ref,
  ) => {
    const context = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    // Pass reference month if needed for outside days computation
    const props = context.getDayProps(date);

    const onClick = () => context.handleDateClick(date);
    const onMouseEnter = () => context.handleDateHover?.(date);
    const onMouseLeave = () => context.handleDateHover?.(null);

    if (typeof children === "function") {
      return (
        <>
          {children({
            ...props,
            onClick,
            onMouseEnter,
            onMouseLeave,
          })}
        </>
      );
    }

    const {
      day,
      isToday,
      isSelected,
      isDisabled,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isInHoverRange,
      isHoverTarget,
      isFocused,
      isOutsideDay,
      isHighlighted,
      isRangeSingle,
    } = props;

    const showFocusRing = isFocused && !isSelected && !isRangeStart && !isRangeEnd;

    return (
      <button
        ref={ref}
        type="button"
        id={`rdrp-day-${calendarIndex}-${context.locale.formatDate(date)}`}
        className={cn(
          "rdrp-day",
          className,
          isToday && "rdrp-day-today",
          isToday && todayClassName,
          isOutsideDay && "rdrp-day-outside",
          isOutsideDay && outsideClassName,
          isInHoverRange && "rdrp-day-hover-range",
          isInHoverRange && hoverRangeClassName,
          isHoverTarget && "rdrp-day-hover-target",
          isHoverTarget && hoverTargetClassName,
          isInRange && "rdrp-day-in-range",
          isInRange && inRangeClassName,
          isHighlighted && "rdrp-day-highlighted",
          isHighlighted && highlightedClassName,
          isSelected && "rdrp-day-selected",
          isSelected && selectedClassName,
          isRangeStart && "rdrp-day-range-start",
          isRangeStart && rangeStartClassName,
          isRangeEnd && "rdrp-day-range-end",
          isRangeEnd && rangeEndClassName,
          isRangeSingle && "rdrp-day-range-single",
          isRangeSingle && rangeSingleClassName,
          isDisabled && "rdrp-day-disabled",
          isDisabled && disabledClassName,
          showFocusRing && "rdrp-day-focused",
          showFocusRing && focusedClassName,
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={isDisabled}
        tabIndex={isFocused ? 0 : -1}
        aria-label={context.locale.formatDate(date)}
        aria-current={isToday ? "date" : undefined}
        role="gridcell"
        aria-selected={isSelected}
      >
        {day}
      </button>
    );
  },
);
Day.displayName = "Day";
