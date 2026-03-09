import { type ReactNode, forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

export interface PresetsProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const Presets = forwardRef<HTMLDivElement, PresetsProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { presets } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    if (!presets) {
      throw new Error("Presets can only be used within DateRangePicker, DateRangeTimePicker");
    }
    if (presets.length === 0) return null;

    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  },
);
Presets.displayName = "Presets";
