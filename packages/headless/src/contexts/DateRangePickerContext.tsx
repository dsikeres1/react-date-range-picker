import { createContext, useContext, type ReactNode } from "react";
import { useDateRangePicker } from "../useDateRangePicker";
import type {
  UseDateRangePickerOptions,
  UseDateRangePickerReturn,
  DatePickerSize,
  CalendarMonth,
} from "../types";
import { PickerContext, type PickerContextValue } from "./PickerContext";

const DateRangePickerContext = createContext<UseDateRangePickerReturn | null>(null);

export function useDateRangePickerContext(): UseDateRangePickerReturn {
  const ctx = useContext(DateRangePickerContext);
  if (!ctx) {
    throw new Error("useDateRangePickerContext must be used within <DateRangePickerProvider>");
  }
  return ctx;
}

export interface DateRangePickerProviderProps extends UseDateRangePickerOptions {
  children: ReactNode;
  inline?: boolean;
  size?: DatePickerSize;
  placeholder?: string;
  name?: string;
}

export function DateRangePickerProvider({ children, ...options }: DateRangePickerProviderProps) {
  const picker = useDateRangePicker(options);

  const contextValue: PickerContextValue = {
    ...picker,
    // Provide calendars array fallback if a picker returns a single calendar
    calendars:
      "calendars" in picker
        ? (picker as unknown as { calendars: CalendarMonth[] }).calendars
        : [(picker as unknown as { calendar: CalendarMonth }).calendar],
    value: options.value,
    endName: (options as { endName?: string }).endName,
    required: options.required,
    inline: options.inline,
    showOutsideDays: options.showOutsideDays,
    size: options.size,
    placeholder: options.placeholder,
    name: options.name,
    captionLayout: options.captionLayout,
  };

  return (
    <DateRangePickerContext.Provider value={picker}>
      <PickerContext.Provider value={contextValue}>{children}</PickerContext.Provider>
    </DateRangePickerContext.Provider>
  );
}
