import { clsx } from "clsx";

/** Merge class names (no Tailwind conflict resolution needed for styled CSS). */
export function cn(...args: unknown[]): string {
  return clsx(args);
}

import type { DatePickerSize } from "react-date-range-picker-headless";

/** Return the size modifier class. */
export function sizeClass(size: DatePickerSize = "medium"): string {
  return `rdrp-size-${size}`;
}
