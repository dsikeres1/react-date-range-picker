import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-tailwind4";

export default function CaptionDropdown() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangePicker
      value={value}
      onChange={setValue}
      captionLayout="dropdown"
      fromYear={2020}
      toYear={2030}
    />
  );
}
