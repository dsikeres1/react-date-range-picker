import { useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-tailwind4";

export default function MinMaxDays() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangeTimePicker value={value} onChange={setValue} minDays={2} maxDays={14} />;
}
