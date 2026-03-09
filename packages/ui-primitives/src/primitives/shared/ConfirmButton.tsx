import { forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";
import type { ActionButtonProps } from "./ClearButton";

export const ConfirmButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { handleConfirm, canConfirm, locale } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <button
        ref={ref}
        type="button"
        className={cn(className)}
        onClick={handleConfirm}
        disabled={!canConfirm}
      >
        {children || locale.confirm}
      </button>
    );
  },
);
ConfirmButton.displayName = "ConfirmButton";
