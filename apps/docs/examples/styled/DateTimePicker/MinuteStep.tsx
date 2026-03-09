import { useState } from "react";
import "react-date-range-picker-styled/styles.css";
import { DateTimePicker } from "react-date-range-picker-styled";

export default function MinuteStep() {
  const [value, setValue] = useState<Date | null>(null);

  return <DateTimePicker value={value} onChange={setValue} time={{ minuteStep: 15 }} />;
}
