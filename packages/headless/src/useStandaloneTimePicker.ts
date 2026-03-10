import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type {
  UseStandaloneTimePickerOptions,
  UseStandaloneTimePickerReturn,
  TimePeriod,
} from "./types";
import { resolveLocale } from "./locale";
import {
  adjustMinuteToStep,
  adjustSecondToStep,
  resolveTimeConfig,
  formatTimeDisplay,
  to12Hour,
  to24Hour,
} from "./utils";
import { setHour, setMinute, setSecond, setMillisecond, formatBasic } from "./date-utils";

export function useStandaloneTimePicker(
  options: UseStandaloneTimePickerOptions,
): UseStandaloneTimePickerReturn {
  const { value, onChange, required, displayFormat } = options;

  const locale = useMemo(() => resolveLocale(options.locale, 0), [options.locale]);

  const resolvedTimeConfig = useMemo(() => resolveTimeConfig(options.time), [options.time]);
  const { precision, hourFormat, minuteStep, secondStep } = resolvedTimeConfig;
  const is12Hour = hourFormat === "12";

  // ── Controlled / Uncontrolled open ──
  const { open: controlledOpen, onOpenChange } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(options.initialOpen ?? false);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  // ── Time state (24h internal) ──
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(0);
  const [tempSecond, setTempSecond] = useState(0);
  const [tempPeriod, setTempPeriod] = useState<TimePeriod>("AM");

  // ── Refs ──
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // ── Sync temp state from value ──
  // For popup mode: sync when opening or when value changes while open.
  // For inline mode: only sync on mount / when value changes externally.
  const inlineInitRef = useRef(false);

  useEffect(() => {
    if (options.inline) {
      // Inline: only sync once on mount
      if (inlineInitRef.current) return;
      inlineInitRef.current = true;
    } else {
      // Popup: only sync when open
      if (!isOpen) return;
    }

    const source = value ?? new Date();
    const h = source.getHours();
    setTempHour(h);
    setTempMinute(adjustMinuteToStep(source.getMinutes(), minuteStep));
    setTempSecond(precision === "second" ? adjustSecondToStep(source.getSeconds(), secondStep) : 0);
    setTempPeriod(h >= 12 ? "PM" : "AM");
  }, [isOpen, value?.getTime()]);

  // ── Actions ──
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleToggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  // ── Time change handlers ──
  const handleHourChange = useCallback(
    (hour: number) => {
      if (is12Hour) {
        const h24 = to24Hour(hour, tempPeriod);
        setTempHour(h24);
        setTempPeriod(to12Hour(h24).period);
      } else {
        setTempHour(hour);
        setTempPeriod(hour >= 12 ? "PM" : "AM");
      }
    },
    [is12Hour, tempPeriod],
  );

  const handleMinuteChange = useCallback((minute: number) => setTempMinute(minute), []);
  const handleSecondChange = useCallback((second: number) => setTempSecond(second), []);

  const handlePeriodChange = useCallback(
    (period: TimePeriod) => {
      setTempPeriod(period);
      const display12 = to12Hour(tempHour).hour;
      setTempHour(to24Hour(display12, period));
    },
    [tempHour],
  );

  // ── Inline auto-sync ──
  useEffect(() => {
    if (!options.inline) return;
    let result = value ? new Date(value.getTime()) : new Date();
    result = setHour(result, tempHour);
    result = setMinute(result, tempMinute);
    result = setSecond(result, precision === "second" ? tempSecond : 0);
    result = setMillisecond(result, 0);
    onChange(result);
  }, [options.inline, tempHour, tempMinute, tempSecond, precision]);

  // ── Confirm / Cancel / Clear ──
  const handleConfirm = useCallback(() => {
    let result = value ? new Date(value.getTime()) : new Date();
    result = setHour(result, tempHour);
    result = setMinute(result, tempMinute);
    result = setSecond(result, precision === "second" ? tempSecond : 0);
    result = setMillisecond(result, 0);
    onChange(result);
    setOpen(false);
  }, [value, tempHour, tempMinute, tempSecond, precision, onChange, setOpen]);

  const handleCancel = useCallback(() => {
    if (value) {
      const h = value.getHours();
      setTempHour(h);
      setTempMinute(adjustMinuteToStep(value.getMinutes(), minuteStep));
      setTempSecond(
        precision === "second" ? adjustSecondToStep(value.getSeconds(), secondStep) : 0,
      );
      setTempPeriod(h >= 12 ? "PM" : "AM");
    } else {
      const now = new Date();
      const h = now.getHours();
      setTempHour(h);
      setTempMinute(adjustMinuteToStep(now.getMinutes(), minuteStep));
      setTempSecond(precision === "second" ? adjustSecondToStep(now.getSeconds(), secondStep) : 0);
      setTempPeriod(h >= 12 ? "PM" : "AM");
    }
    setOpen(false);
  }, [value, minuteStep, secondStep, precision, setOpen]);

  const handleClear = useCallback(() => {
    if (required) return;
    onChange(null);
    setOpen(false);
  }, [required, onChange, setOpen]);

  // ── Click outside ──
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: Event) {
      const target = event.target as Node;
      const inContainer = containerRef.current?.contains(target);
      const inPopup = popupRef.current?.contains(target);
      if (!inContainer && !inPopup) {
        handleCancel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleCancel]);

  // ── Keyboard ──
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    },
    [isOpen, handleCancel],
  );

  // ── Display values ──
  const displayValue = useMemo(() => {
    if (!value) return "";
    if (displayFormat) return formatBasic(value, displayFormat);
    return formatTimeDisplay(
      value.getHours(),
      value.getMinutes(),
      precision === "second" ? value.getSeconds() : 0,
      is12Hour ? to12Hour(value.getHours()).period : "AM",
      resolvedTimeConfig,
      locale.am,
      locale.pm,
    );
  }, [value, displayFormat, precision, is12Hour, resolvedTimeConfig, locale.am, locale.pm]);

  const timeDisplayValue = useMemo(
    () =>
      formatTimeDisplay(
        tempHour,
        tempMinute,
        tempSecond,
        tempPeriod,
        resolvedTimeConfig,
        locale.am,
        locale.pm,
      ),
    [tempHour, tempMinute, tempSecond, tempPeriod, resolvedTimeConfig, locale.am, locale.pm],
  );

  const hasValue = !!value;
  const canConfirm = true;

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
    tempHour,
    tempMinute,
    tempSecond,
    tempPeriod,
    handleHourChange,
    handleMinuteChange,
    handleSecondChange,
    handlePeriodChange,
    handleConfirm,
    handleCancel,
    handleClear,
    displayValue,
    timeDisplayValue,
    hasValue,
    canConfirm,
    locale,
    resolvedTimeConfig,
    containerRef,
    popupRef,
    handleKeyDown,
  };
}
