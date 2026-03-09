import { useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-tailwind3";

export default function CaptionDropdown() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangeTimePicker
      value={value}
      onChange={setValue}
      captionLayout="dropdown"
      fromYear={2020}
      toYear={2030}
      time={{ minuteStep: 5 }}
    />
  );
}
