import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function MultiMonth() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DateTimePicker value={value} onChange={setValue} numberOfMonths={2} time={{ minuteStep: 5 }} />
  );
}
