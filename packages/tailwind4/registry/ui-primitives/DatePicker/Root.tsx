import { mergeRefs } from "../../utils/mergeRefs";
import { forwardRef, type ReactNode } from "react";
import { usePickerContext, formatBasic } from "react-date-range-picker-headless";

import { DatePickerProvider, type DatePickerProviderProps } from "react-date-range-picker-headless";

export interface DatePickerRootProps extends DatePickerProviderProps {
  className?: string;
  cn?: (...args: unknown[]) => string;
}

interface InnerProps {
  className?: string;
  children?: ReactNode;
  name?: string;
  value?: Date | null;
}

const Inner = forwardRef<HTMLDivElement, InnerProps>(
  ({ className, children, name, value }, ref) => {
    const context = usePickerContext();
    return (
      <div ref={mergeRefs(ref, context.containerRef)} className={className} data-slot="root">
        {name && (
          <input type="hidden" name={name} value={value ? formatBasic(value, "YYYY-MM-DD") : ""} />
        )}
        {children}
      </div>
    );
  },
);
Inner.displayName = "Inner";

export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>(
  ({ className, cn: cnFn, children, ...options }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <DatePickerProvider {...options}>
        <Inner ref={ref} className={cn(className)} name={options.name} value={options.value}>
          {children}
        </Inner>
      </DatePickerProvider>
    );
  },
);
DatePickerRoot.displayName = "DatePickerRoot";
