import { useState } from "react";
import "react-date-range-picker-styled/styles.css";
import { TimePicker } from "react-date-range-picker-styled";

export default function Basic() {
  const [value, setValue] = useState<Date | null>(null);

  return <TimePicker value={value} onChange={setValue} />;
}
