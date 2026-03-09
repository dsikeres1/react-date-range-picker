import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-tailwind3";

export default function ShouldCloseOnSelect() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DateTimePicker
      value={value}
      onChange={setValue}
      shouldCloseOnSelect
      time={{ minuteStep: 5 }}
    />
  );
}
