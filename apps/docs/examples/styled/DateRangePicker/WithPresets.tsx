import { useState } from "react";
import "react-date-range-picker-styled/styles.css";
import { DateRangePicker } from "react-date-range-picker-styled";
import type { DateRangePreset } from "react-date-range-picker-styled";
import { today, subtract, startOf, endOf } from "react-date-range-picker-headless";

const presets: DateRangePreset[] = [
  {
    label: "Last 7 days",
    value: () => ({
      start: subtract(today(), 6, "day"),
      end: today(),
    }),
  },
  {
    label: "Last 30 days",
    value: () => ({
      start: subtract(today(), 29, "day"),
      end: today(),
    }),
  },
  {
    label: "This month",
    value: () => ({
      start: startOf(today(), "month"),
      end: endOf(today(), "month"),
    }),
  },
  {
    label: "Last month",
    value: () => {
      const lastMonth = subtract(startOf(today(), "month"), 1, "day");
      return {
        start: startOf(lastMonth, "month"),
        end: endOf(lastMonth, "month"),
      };
    },
  },
];

export default function WithPresets() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangePicker value={value} onChange={setValue} presets={presets} />;
}
