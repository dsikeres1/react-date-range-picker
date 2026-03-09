import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names with Tailwind conflict resolution. */
export function cn(...args: unknown[]): string {
  return twMerge(clsx(args));
}

import type { DatePickerSize } from "react-date-range-picker-headless";

/** Return the size modifier class. Uses data-slot attributes set by ui-primitives. */
export function sizeClass(size: DatePickerSize = "medium"): string {
  const sizeMap: Record<DatePickerSize, string> = {
    small:
      'text-xs [&_[data-slot="day"]]:w-7 [&_[data-slot="day"]]:h-7 [&_[data-slot="time-item"]]:text-xs [&_[data-slot="time-item"]]:h-6 [&_[data-slot="time-panel"]]:w-48',
    medium:
      'text-sm [&_[data-slot="day"]]:w-9 [&_[data-slot="day"]]:h-9 [&_[data-slot="time-item"]]:text-sm [&_[data-slot="time-item"]]:h-8 [&_[data-slot="time-panel"]]:w-56',
    large:
      'text-base [&_[data-slot="day"]]:w-11 [&_[data-slot="day"]]:h-11 [&_[data-slot="time-item"]]:text-base [&_[data-slot="time-item"]]:h-10 [&_[data-slot="time-panel"]]:w-64',
    "x-large":
      'text-lg [&_[data-slot="day"]]:w-12 [&_[data-slot="day"]]:h-12 [&_[data-slot="time-item"]]:text-lg [&_[data-slot="time-item"]]:h-12 [&_[data-slot="time-panel"]]:w-72',
  };
  return sizeMap[size] || sizeMap["medium"];
}
