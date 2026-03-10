import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function CustomDarkMode() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div
      data-theme="dark"
      style={{
        padding: 24,
        borderRadius: 12,
        background: "#1e293b",
      }}
    >
      <DateTimePicker value={value} onChange={setValue} />
    </div>
  );
}
