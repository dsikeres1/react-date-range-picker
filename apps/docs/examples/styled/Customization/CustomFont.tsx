import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CustomFont() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <div style={{ fontFamily: "'Georgia', serif" }}>
      <DateRangePicker value={value} onChange={setValue} />
    </div>
  );
}
