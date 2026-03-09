import { type ReactNode, forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

export interface PresetItemProps {
  index: number;
  className?: string;
  activeClassName?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const PresetItem = forwardRef<HTMLButtonElement, PresetItemProps>(
  ({ index, className, activeClassName, children, cn: cnFn }, ref) => {
    const { presets, activePresetIndex, handlePresetClick } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    if (!presets) {
      throw new Error("PresetItem can only be used within DateRangePicker, DateRangeTimePicker");
    }

    if (!presets[index]) return null;
    const preset = presets[index];
    const isActive = index === activePresetIndex;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(className, isActive && activeClassName)}
        onClick={() => handlePresetClick?.(preset)}
      >
        {children || preset.label}
      </button>
    );
  },
);
PresetItem.displayName = "PresetItem";
