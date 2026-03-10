import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

export default function Required() {
  const [value, setValue] = useState<Date | null>(new Date());

  return <DatePicker value={value} onChange={setValue} required />;
}
