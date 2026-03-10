import { mergeRefs } from "../../utils/mergeRefs";
import { forwardRef, type ReactNode } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

import {
  StandaloneTimePickerProvider,
  type StandaloneTimePickerProviderProps,
  formatBasic,
} from "react-date-range-picker-headless";

export interface TimePickerRootProps extends StandaloneTimePickerProviderProps {
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
      <div
        ref={mergeRefs(ref, context.containerRef)}
        className={`rdrp-root${className ? ` ${className}` : ""}`}
        data-slot="root"
      >
        {name && (
          <input type="hidden" name={name} value={value ? formatBasic(value, "HH:mm:ss") : ""} />
        )}
        {children}
      </div>
    );
  },
);
Inner.displayName = "Inner";

export const TimePickerRoot = forwardRef<HTMLDivElement, TimePickerRootProps>(
  ({ className, cn: cnFn, children, ...options }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <StandaloneTimePickerProvider {...options}>
        <Inner
          ref={ref}
          className={cn("rdrp-time-picker", className)}
          name={options.name}
          value={options.value}
        >
          {children}
        </Inner>
      </StandaloneTimePickerProvider>
    );
  },
);
TimePickerRoot.displayName = "TimePickerRoot";
