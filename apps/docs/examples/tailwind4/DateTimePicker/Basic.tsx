import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-tailwind4";

export default function Basic() {
  const [value, setValue] = useState<Date | null>(null);

  return <DateTimePicker value={value} onChange={setValue} />;
}
