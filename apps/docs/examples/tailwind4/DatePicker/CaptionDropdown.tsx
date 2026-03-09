import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export default function CaptionDropdown() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DatePicker
      value={value}
      onChange={setValue}
      captionLayout="dropdown"
      fromYear={2020}
      toYear={2030}
    />
  );
}
