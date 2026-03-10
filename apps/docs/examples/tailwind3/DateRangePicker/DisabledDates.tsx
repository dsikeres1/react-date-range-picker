import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-tailwind3";

export default function DisabledDates() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const isDateUnavailable = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable weekends
  };

  return (
    <DateRangePicker value={value} onChange={setValue} isDateUnavailable={isDateUnavailable} />
  );
}
