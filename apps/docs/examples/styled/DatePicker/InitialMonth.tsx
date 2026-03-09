import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function InitialMonth() {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker value={value} onChange={setValue} initialMonth={new Date(2026, 5, 1)} />;
}
