import { useState } from "react";
import "react-date-range-picker-styled/rdrp-styles.css";
import { DateRangePicker } from "react-date-range-picker-styled";

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export default function DisabledDates() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangePicker value={value} onChange={setValue} isDateUnavailable={isWeekend} />;
}
