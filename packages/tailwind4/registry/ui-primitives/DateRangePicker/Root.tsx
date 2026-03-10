import { mergeRefs } from "../../utils/mergeRefs";
import { forwardRef, type ReactNode } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

import {
  DateRangePickerProvider,
  type DateRangePickerProviderProps,
} from "react-date-range-picker-headless";
import { formatBasic } from "react-date-range-picker-headless";

export interface DateRangePickerRootProps extends DateRangePickerProviderProps {
  className?: string;
  endName?: string;
  cn?: (...args: unknown[]) => string;
}

interface InnerProps {
  className?: string;
  children?: ReactNode;
  name?: string;
  endName?: string;
  value?: { start: Date | null; end: Date | null };
}

const Inner = forwardRef<HTMLDivElement, InnerProps>(
  ({ className, children, name, endName, value }, ref) => {
    const context = usePickerContext();
    return (
      <div ref={mergeRefs(ref, context.containerRef)} className={className} data-slot="root">
        {name && (
          <input
            type="hidden"
            name={name}
            value={value?.start && value?.end ? formatBasic(value.start, "YYYY-MM-DD") : ""}
          />
        )}
        {name && (
          <input
            type="hidden"
            name={endName || `${name}-end`}
            value={value?.start && value?.end ? formatBasic(value.end, "YYYY-MM-DD") : ""}
          />
        )}
        {children}
      </div>
    );
  },
);
Inner.displayName = "Inner";

export const DateRangePickerRoot = forwardRef<HTMLDivElement, DateRangePickerRootProps>(
  ({ className, cn: cnFn, children, endName, ...options }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <DateRangePickerProvider {...options}>
        <Inner
          ref={ref}
          className={cn(className)}
          endName={endName}
          name={options.name}
          value={options.value}
        >
          {children}
        </Inner>
      </DateRangePickerProvider>
    );
  },
);
DateRangePickerRoot.displayName = "DateRangePickerRoot";
