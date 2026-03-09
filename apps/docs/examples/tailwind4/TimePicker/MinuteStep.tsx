import { useState } from "react";
import { TimePicker } from "react-date-range-picker-tailwind4";

export default function MinuteStep() {
  const [value, setValue] = useState<Date | null>(null);

  return <TimePicker value={value} onChange={setValue} time={{ minuteStep: 15 }} />;
}
