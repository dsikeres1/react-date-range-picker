import { type ReactNode, forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";

export interface ActionButtonProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const ClearButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { handleClear, locale, hasValue } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    if (!hasValue) return null;

    return (
      <button ref={ref} type="button" className={cn(className)} onClick={handleClear}>
        {children || locale.clear}
      </button>
    );
  },
);
ClearButton.displayName = "ClearButton";
