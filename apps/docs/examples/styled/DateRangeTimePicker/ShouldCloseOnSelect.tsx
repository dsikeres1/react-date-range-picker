import { useState } from "react";
import "react-date-range-picker-styled/styles.css";
import { DateRangeTimePicker } from "react-date-range-picker-styled";

export default function ShouldCloseOnSelect() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangeTimePicker
      value={value}
      onChange={setValue}
      shouldCloseOnSelect
      time={{ minuteStep: 5 }}
    />
  );
}
