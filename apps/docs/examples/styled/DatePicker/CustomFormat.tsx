import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CustomFormat() {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker value={value} onChange={setValue} displayFormat="YYYY/MM/DD" />;
}
