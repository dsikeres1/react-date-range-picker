import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export default function CompoundNoFooter() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DatePicker.Root value={value} onChange={setValue}>
      <DatePicker.Trigger />
      <DatePicker.Content>
        <DatePicker.Header>
          <DatePicker.PrevButton />
          <DatePicker.Title />
          <DatePicker.NextButton />
        </DatePicker.Header>
        <DatePicker.Grid />
      </DatePicker.Content>
    </DatePicker.Root>
  );
}
