import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export default function WeekStartsOn() {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker value={value} onChange={setValue} weekStartsOn="monday" />;
}
