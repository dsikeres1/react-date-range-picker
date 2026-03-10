import { useState } from "react";
import { TimePicker } from "react-date-range-picker-tailwind3";

export default function SecondPrecision() {
  const [value, setValue] = useState<Date | null>(null);

  return <TimePicker value={value} onChange={setValue} time={{ precision: "second" }} />;
}
