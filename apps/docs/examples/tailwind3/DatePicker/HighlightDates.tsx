import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

export default function HighlightDates() {
  const [value, setValue] = useState<Date | null>(null);

  const today = new Date();
  const highlightDates = [
    new Date(today.getFullYear(), today.getMonth(), 5),
    new Date(today.getFullYear(), today.getMonth(), 15),
    new Date(today.getFullYear(), today.getMonth(), 25),
  ];

  return <DatePicker value={value} onChange={setValue} highlightDates={highlightDates} />;
}
