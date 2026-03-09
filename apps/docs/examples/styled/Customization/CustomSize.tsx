import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CustomSize() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <div
      style={
        {
          "--rdrp-cell-size": "44px",
          "--rdrp-font-size-base": "15px",
          "--rdrp-font-size-md": "16px",
          "--rdrp-font-size-lg": "18px",
          "--rdrp-spacing-sm": "6px",
          "--rdrp-spacing-md": "10px",
          "--rdrp-spacing-lg": "14px",
        } as React.CSSProperties
      }
    >
      <DateRangePicker value={value} onChange={setValue} />
    </div>
  );
}
