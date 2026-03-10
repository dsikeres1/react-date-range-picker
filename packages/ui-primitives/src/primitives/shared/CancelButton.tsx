import { forwardRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";
import type { ActionButtonProps } from "./ClearButton";

export const CancelButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const { handleCancel, locale } = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    return (
      <button
        ref={ref}
        type="button"
        className={cn("rdrp-footer-button", className)}
        onClick={handleCancel}
      >
        {children || locale.cancel}
      </button>
    );
  },
);
CancelButton.displayName = "CancelButton";
