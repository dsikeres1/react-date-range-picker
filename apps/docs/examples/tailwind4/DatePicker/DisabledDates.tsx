import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export default function DisabledDates() {
  const [value, setValue] = useState<Date | null>(null);

  const isDateUnavailable = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable weekends
  };

  return <DatePicker value={value} onChange={setValue} isDateUnavailable={isDateUnavailable} />;
}
