import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CustomSizeViaCSS() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div
      style={{
        ["--rdrp-cell-size" as string]: "44px",
        ["--rdrp-font-size-base" as string]: "15px",
        ["--rdrp-font-size-md" as string]: "16px",
        ["--rdrp-font-size-lg" as string]: "18px",
        ["--rdrp-nav-btn-size" as string]: "34px",
        ["--rdrp-trigger-padding-x" as string]: "18px",
        ["--rdrp-trigger-padding-y" as string]: "12px",
      }}
    >
      <DatePicker value={value} onChange={setValue} />
    </div>
  );
}
