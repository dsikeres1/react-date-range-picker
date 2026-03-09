import { createContext, useContext, type ReactNode } from "react";
import { useStandaloneTimePicker } from "../useStandaloneTimePicker";
import type {
  UseStandaloneTimePickerOptions,
  UseStandaloneTimePickerReturn,
  DayProps,
} from "../types";
import { PickerContext, type PickerContextValue } from "./PickerContext";

const StandaloneTimePickerContext = createContext<UseStandaloneTimePickerReturn | null>(null);

export function useStandaloneTimePickerContext(): UseStandaloneTimePickerReturn {
  const ctx = useContext(StandaloneTimePickerContext);
  if (!ctx) {
    throw new Error(
      "useStandaloneTimePickerContext must be used within <StandaloneTimePickerProvider>",
    );
  }
  return ctx;
}

export interface StandaloneTimePickerProviderProps extends UseStandaloneTimePickerOptions {
  children: ReactNode;
}

export function StandaloneTimePickerProvider({
  children,
  ...options
}: StandaloneTimePickerProviderProps) {
  const picker = useStandaloneTimePicker(options);

  const contextValue: PickerContextValue = {
    value: options.value,
    endName: undefined,
    isOpen: picker.isOpen,
    locale: picker.locale,
    focusedDate: null,
    displayValue: picker.displayValue,
    hasValue: picker.hasValue,
    canConfirm: picker.canConfirm,

    handleToggle: picker.handleToggle,
    handleOpen: picker.handleOpen,
    handleClose: picker.handleClose,
    handleConfirm: picker.handleConfirm,
    handleCancel: picker.handleCancel,
    handleClear: picker.handleClear,
    handleGoToToday: () => {},
    handlePrevMonth: () => {},
    handleNextMonth: () => {},
    handleKeyDown: picker.handleKeyDown,
    handleDateClick: () => {},

    calendars: [],
    getDayProps: () => ({}) as DayProps,

    years: [],
    months: [],
    handleYearSelect: () => {},
    handleMonthSelect: () => {},

    containerRef: picker.containerRef,
    popupRef: picker.popupRef,

    required: options.required,
    inline: options.inline,
    size: options.size,
    placeholder: options.placeholder,
    name: options.name,

    // Time fields (consumed by shared TimePanel)
    resolvedTimeConfig: picker.resolvedTimeConfig,
    tempHour: picker.tempHour,
    tempMinute: picker.tempMinute,
    tempSecond: picker.tempSecond,
    tempPeriod: picker.tempPeriod,
    handleHourChange: picker.handleHourChange,
    handleMinuteChange: picker.handleMinuteChange,
    handleSecondChange: picker.handleSecondChange,
    handlePeriodChange: picker.handlePeriodChange,
    timeDisplayValue: picker.timeDisplayValue,
  };

  return (
    <StandaloneTimePickerContext.Provider value={picker}>
      <PickerContext.Provider value={contextValue}>{children}</PickerContext.Provider>
    </StandaloneTimePickerContext.Provider>
  );
}
