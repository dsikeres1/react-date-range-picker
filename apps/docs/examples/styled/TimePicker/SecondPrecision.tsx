import { useState } from "react";
import "react-date-range-picker-styled/rdrp-styles.css";
import { TimePicker } from "react-date-range-picker-styled";

export default function SecondPrecision() {
  const [value, setValue] = useState<Date | null>(null);

  return <TimePicker value={value} onChange={setValue} time={{ precision: "second" }} />;
}
