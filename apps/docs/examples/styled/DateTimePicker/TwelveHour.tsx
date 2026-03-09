import { useState } from "react";
import "react-date-range-picker-styled/rdrp-styles.css";
import { DateTimePicker } from "react-date-range-picker-styled";

export default function TwelveHour() {
  const [value, setValue] = useState<Date | null>(null);

  return <DateTimePicker value={value} onChange={setValue} time={{ hourFormat: "12" }} />;
}
