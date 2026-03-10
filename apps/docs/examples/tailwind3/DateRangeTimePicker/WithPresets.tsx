import { useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-tailwind3";
import type { DateRangePreset } from "react-date-range-picker-tailwind3";
import { today, subtract, startOf, endOf } from "react-date-range-picker-headless";

const presets: DateRangePreset[] = [
  {
    label: "Last 7 Days",
    value: () => ({ start: subtract(today(), 6, "day"), end: today() }),
  },
  {
    label: "Last 30 Days",
    value: () => ({ start: subtract(today(), 29, "day"), end: today() }),
  },
  {
    label: "This Month",
    value: () => ({ start: startOf(today(), "month"), end: endOf(today(), "month") }),
  },
  {
    label: "Last Month",
    value: () => {
      const lastMonth = subtract(startOf(today(), "month"), 1, "day");
      return { start: startOf(lastMonth, "month"), end: endOf(lastMonth, "month") };
    },
  },
];

export default function WithPresets() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangeTimePicker
      value={value}
      onChange={setValue}
      time={{ minuteStep: 5 }}
      presets={presets}
    />
  );
}
