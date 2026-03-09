import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/rdrp-styles.css";

export default function MultiMonth() {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker value={value} onChange={setValue} numberOfMonths={2} />;
}
