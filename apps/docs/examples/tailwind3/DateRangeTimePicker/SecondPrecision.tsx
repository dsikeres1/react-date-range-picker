import { useState } from "react";
import { DateRangeTimePicker } from "react-date-range-picker-tailwind3";

export default function SecondPrecision() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return <DateRangeTimePicker value={value} onChange={setValue} time={{ precision: "second" }} />;
}
