import { mergeRefs } from "../../utils/mergeRefs";
import { forwardRef, type ReactNode } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

import {
  DateTimePickerProvider,
  type DateTimePickerProviderProps,
  formatBasic,
} from "react-date-range-picker-headless";

export interface DateTimePickerRootProps extends DateTimePickerProviderProps {
  className?: string;
  style?: React.CSSProperties;
  cn?: (...args: unknown[]) => string;
}

interface InnerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  name?: string;
  value?: Date | null;
}

const Inner = forwardRef<HTMLDivElement, InnerProps>(
  ({ className, style, children, name, value }, ref) => {
    const context = usePickerContext();
    return (
      <div
        ref={mergeRefs(ref, context.containerRef)}
        className={`rdrp-root${className ? ` ${className}` : ""}`}
        style={style}
        data-slot="root"
      >
        {name && (
          <input
            type="hidden"
            name={name}
            value={value ? formatBasic(value, "YYYY-MM-DD HH:mm:ss") : ""}
          />
        )}
        {children}
      </div>
    );
  },
);
Inner.displayName = "Inner";

export const DateTimePickerRoot = forwardRef<HTMLDivElement, DateTimePickerRootProps>(
  ({ className, style, cn: cnFn, children, ...options }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <DateTimePickerProvider {...options}>
        <Inner
          ref={ref}
          className={cn(className)}
          style={style}
          name={options.name}
          value={options.value}
        >
          {children}
        </Inner>
      </DateTimePickerProvider>
    );
  },
);
DateTimePickerRoot.displayName = "DateTimePickerRoot";
