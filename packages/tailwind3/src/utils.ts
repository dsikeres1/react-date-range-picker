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
      "text-[11px] [&_[data-slot=day]]:w-7 [&_[data-slot=day]]:h-7 [&_[data-slot=day]]:text-[11px] [&_[data-slot=nav-button]]:w-6 [&_[data-slot=nav-button]]:h-6 [&_[data-slot=trigger]]:min-w-[160px] [&_[data-slot=trigger]]:px-2.5 [&_[data-slot=trigger]]:py-1.5 [&_[data-slot=time-item]]:text-[11px] [&_[data-slot=time-item]]:h-7 [&_[data-slot=time-panel]]:w-[100px] [&_[data-slot=time-panel]]:h-[148px]",
    medium:
      "text-[13px] [&_[data-slot=day]]:w-9 [&_[data-slot=day]]:h-9 [&_[data-slot=day]]:text-[13px] [&_[data-slot=nav-button]]:w-7 [&_[data-slot=nav-button]]:h-7 [&_[data-slot=trigger]]:min-w-[200px] [&_[data-slot=trigger]]:px-3.5 [&_[data-slot=trigger]]:py-2 [&_[data-slot=time-item]]:text-[14px] [&_[data-slot=time-item]]:h-8 [&_[data-slot=time-panel]]:w-[120px] [&_[data-slot=time-panel]]:h-[176px]",
    large:
      "text-[14px] [&_[data-slot=day]]:w-11 [&_[data-slot=day]]:h-11 [&_[data-slot=day]]:text-[14px] [&_[data-slot=nav-button]]:w-8 [&_[data-slot=nav-button]]:h-8 [&_[data-slot=trigger]]:min-w-[240px] [&_[data-slot=trigger]]:px-4 [&_[data-slot=trigger]]:py-2.5 [&_[data-slot=time-item]]:text-[15px] [&_[data-slot=time-item]]:h-9 [&_[data-slot=time-panel]]:w-[140px] [&_[data-slot=time-panel]]:h-[196px]",
    "x-large":
      "text-[15px] [&_[data-slot=day]]:w-[52px] [&_[data-slot=day]]:h-[52px] [&_[data-slot=day]]:text-[15px] [&_[data-slot=nav-button]]:w-9 [&_[data-slot=nav-button]]:h-9 [&_[data-slot=trigger]]:min-w-[280px] [&_[data-slot=trigger]]:px-5 [&_[data-slot=trigger]]:py-3 [&_[data-slot=time-item]]:text-[16px] [&_[data-slot=time-item]]:h-10 [&_[data-slot=time-panel]]:w-[160px] [&_[data-slot=time-panel]]:h-[216px]",
  };
  return sizeMap[size] || sizeMap["medium"];
}
