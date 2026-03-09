import { createContext, useContext, type ReactNode } from "react";
import { useDateTimePicker } from "../useDateTimePicker";
import type {
  UseDateTimePickerOptions,
  UseDateTimePickerReturn,
  DatePickerSize,
  CalendarMonth,
} from "../types";
import { PickerContext, type PickerContextValue } from "./PickerContext";

const DateTimePickerContext = createContext<UseDateTimePickerReturn | null>(null);

export function useDateTimePickerContext(): UseDateTimePickerReturn {
  const ctx = useContext(DateTimePickerContext);
  if (!ctx) {
    throw new Error("useDateTimePickerContext must be used within <DateTimePickerProvider>");
  }
  return ctx;
}

export interface DateTimePickerProviderProps extends UseDateTimePickerOptions {
  children: ReactNode;
  inline?: boolean;
  size?: DatePickerSize;
  placeholder?: string;
  name?: string;
}

export function DateTimePickerProvider({ children, ...options }: DateTimePickerProviderProps) {
  const picker = useDateTimePicker(options);

  const contextValue: PickerContextValue = {
    ...picker,
    // Provide calendars array fallback if a picker returns a single calendar
    calendars:
      "calendars" in picker
        ? (picker as unknown as { calendars: CalendarMonth[] }).calendars
        : [(picker as unknown as { calendar: CalendarMonth }).calendar],
    value: options.value,
    endName: undefined,
    required: options.required,
    inline: options.inline,
    showOutsideDays: options.showOutsideDays,
    size: options.size,
    placeholder: options.placeholder,
    name: options.name,
    captionLayout: options.captionLayout,
  };

  return (
    <DateTimePickerContext.Provider value={picker}>
      <PickerContext.Provider value={contextValue}>{children}</PickerContext.Provider>
    </DateTimePickerContext.Provider>
  );
}
