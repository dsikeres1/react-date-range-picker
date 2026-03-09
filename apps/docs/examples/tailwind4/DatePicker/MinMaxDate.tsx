import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export default function MinMaxDate() {
  const [value, setValue] = useState<Date | null>(null);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return <DatePicker value={value} onChange={setValue} minDate={minDate} maxDate={maxDate} />;
}
