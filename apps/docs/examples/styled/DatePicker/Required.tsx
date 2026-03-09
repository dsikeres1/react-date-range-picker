import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function Required() {
  const [value, setValue] = useState<Date | null>(new Date());

  return <DatePicker value={value} onChange={setValue} required />;
}
