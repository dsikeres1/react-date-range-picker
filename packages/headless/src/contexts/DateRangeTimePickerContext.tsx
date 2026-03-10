import { createContext, useContext, type ReactNode } from "react";
import { useDateRangeTimePicker } from "../useDateRangeTimePicker";
import type {
  UseDateRangeTimePickerOptions,
  UseDateRangeTimePickerReturn,
  DatePickerSize,
  CalendarMonth,
} from "../types";
import { PickerContext, type PickerContextValue } from "./PickerContext";

const DateRangeTimePickerContext = createContext<UseDateRangeTimePickerReturn | null>(null);

export function useDateRangeTimePickerContext(): UseDateRangeTimePickerReturn {
  const ctx = useContext(DateRangeTimePickerContext);
  if (!ctx) {
    throw new Error(
      "useDateRangeTimePickerContext must be used within <DateRangeTimePickerProvider>",
    );
  }
  return ctx;
}

export interface DateRangeTimePickerProviderProps extends UseDateRangeTimePickerOptions {
  children: ReactNode;
  inline?: boolean;
  size?: DatePickerSize;
  placeholder?: string;
  name?: string;
}

export function DateRangeTimePickerProvider({
  children,
  ...options
}: DateRangeTimePickerProviderProps) {
  const picker = useDateRangeTimePicker(options);

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
    <DateRangeTimePickerContext.Provider value={picker}>
      <PickerContext.Provider value={contextValue}>{children}</PickerContext.Provider>
    </DateRangeTimePickerContext.Provider>
  );
}
