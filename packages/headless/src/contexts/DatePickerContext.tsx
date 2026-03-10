import { createContext, useContext, type ReactNode } from "react";
import { useDatePicker } from "../useDatePicker";
import type {
  UseDatePickerOptions,
  UseDatePickerReturn,
  DatePickerSize,
  CalendarMonth,
} from "../types";
import { PickerContext, type PickerContextValue } from "./PickerContext";

const DatePickerContext = createContext<UseDatePickerReturn | null>(null);

export function useDatePickerContext(): UseDatePickerReturn {
  const ctx = useContext(DatePickerContext);
  if (!ctx) {
    throw new Error("useDatePickerContext must be used within <DatePickerProvider>");
  }
  return ctx;
}

export interface DatePickerProviderProps extends UseDatePickerOptions {
  children: ReactNode;
  inline?: boolean;
  size?: DatePickerSize;
  placeholder?: string;
  name?: string;
}

export function DatePickerProvider({ children, ...options }: DatePickerProviderProps) {
  const picker = useDatePicker(options);

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
    <DatePickerContext.Provider value={picker}>
      <PickerContext.Provider value={contextValue}>{children}</PickerContext.Provider>
    </DatePickerContext.Provider>
  );
}
