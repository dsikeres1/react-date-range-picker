import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-tailwind4";

export default function MinMaxDate() {
  const [value, setValue] = useState<Date | null>(null);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return <DateTimePicker value={value} onChange={setValue} minDate={minDate} maxDate={maxDate} />;
}
