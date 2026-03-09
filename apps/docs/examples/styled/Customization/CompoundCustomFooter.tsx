import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

export default function CompoundCustomFooter() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DateTimePicker.Root value={value} onChange={setValue}>
      <DateTimePicker.Trigger />
      <DateTimePicker.Content>
        <DateTimePicker.Header>
          <DateTimePicker.PrevButton />
          <DateTimePicker.Title />
          <DateTimePicker.NextButton />
        </DateTimePicker.Header>
        <DateTimePicker.Grid />
        <DateTimePicker.TimeSection>
          <DateTimePicker.TimePanel target="single" />
        </DateTimePicker.TimeSection>
        <DateTimePicker.Footer>
          <DateTimePicker.TodayButton />
          <div style={{ flex: 1 }} />
          <DateTimePicker.CancelButton />
          <DateTimePicker.ConfirmButton />
        </DateTimePicker.Footer>
      </DateTimePicker.Content>
    </DateTimePicker.Root>
  );
}
