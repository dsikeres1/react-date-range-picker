import { useState } from "react";
import "react-date-range-picker-styled/styles.css";
import { DateRangePicker } from "react-date-range-picker-styled";

export default function MinMaxDays() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangePicker value={value} onChange={setValue} minDays={3} maxDays={14} />;
}
