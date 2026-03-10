import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";
import type { DatePickerSize } from "react-date-range-picker-headless";

const sizes: DatePickerSize[] = ["small", "medium", "large", "x-large"];

export default function Sizes() {
  const [values, setValues] = useState<Record<DatePickerSize, Date | null>>({
    small: null,
    medium: null,
    large: null,
    "x-large": null,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 60, fontSize: 13, fontWeight: 600, opacity: 0.5, flexShrink: 0 }}>
            {size}
          </span>
          <DatePicker
            value={values[size]}
            onChange={(date) => setValues((prev) => ({ ...prev, [size]: date }))}
            size={size}
          />
        </div>
      ))}
    </div>
  );
}
