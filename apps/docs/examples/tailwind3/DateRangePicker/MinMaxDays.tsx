import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-tailwind3";

export default function MinMaxDays() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangePicker value={value} onChange={setValue} minDays={3} maxDays={14} />;
}
