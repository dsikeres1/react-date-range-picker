import { useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-tailwind4";

export default function TwelveHour() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangeTimePicker value={value} onChange={setValue} time={{ hourFormat: "12" }} />;
}
