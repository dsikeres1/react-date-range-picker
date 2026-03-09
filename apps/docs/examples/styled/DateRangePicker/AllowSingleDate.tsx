import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function AllowSingleDate() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangePicker value={value} onChange={setValue} allowSingleDateInRange={false} />;
}
