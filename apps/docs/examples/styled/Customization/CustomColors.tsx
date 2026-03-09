import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CustomColors() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div
      style={
        {
          "--rdrp-color-primary": "#7c3aed",
          "--rdrp-color-primary-hover": "#6d28d9",
          "--rdrp-color-primary-light": "#ede9fe",
          "--rdrp-color-primary-lighter": "#f5f3ff",
          "--rdrp-color-primary-disabled": "#c4b5fd",
          "--rdrp-color-text-today": "#7c3aed",
          "--rdrp-color-border-hover": "#c4b5fd",
        } as React.CSSProperties
      }
    >
      <DatePicker value={value} onChange={setValue} />
    </div>
  );
}
