import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CSSCustomFont() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div
      style={{
        ["--rdrp-font-family" as string]: '"Georgia", "Times New Roman", serif',
      }}
    >
      <DatePicker value={value} onChange={setValue} />
    </div>
  );
}
