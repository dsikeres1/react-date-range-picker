import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function CustomBorderRadius() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div
      style={
        {
          "--rdrp-border-radius-sm": "0px",
          "--rdrp-border-radius-md": "0px",
          "--rdrp-border-radius-lg": "0px",
          "--rdrp-border-radius-xl": "0px",
        } as React.CSSProperties
      }
    >
      <DatePicker value={value} onChange={setValue} />
    </div>
  );
}
