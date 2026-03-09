import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-styled";
import "react-date-range-picker-styled/styles.css";

const presets = [
  { label: "Today", value: { start: new Date(), end: new Date() } },
  { label: "Last 7 days", value: { start: new Date(Date.now() - 7 * 86400000), end: new Date() } },
  {
    label: "Last 14 days",
    value: { start: new Date(Date.now() - 14 * 86400000), end: new Date() },
  },
  {
    label: "Last 30 days",
    value: { start: new Date(Date.now() - 30 * 86400000), end: new Date() },
  },
  {
    label: "This month",
    value: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date(),
    },
  },
];

export default function CompoundRangeInline() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangePicker.Root value={value} onChange={setValue} inline presets={presets}>
      <DateRangePicker.Content>
        <div style={{ display: "flex" }}>
          <DateRangePicker.Presets>
            {presets.map((p, i) => (
              <DateRangePicker.PresetItem key={p.label} index={i} />
            ))}
          </DateRangePicker.Presets>
          <div>
            <DateRangePicker.Header>
              <DateRangePicker.PrevButton />
              <DateRangePicker.Title calendarIndex={0} />
              <div style={{ flex: 1 }} />
              <DateRangePicker.Title calendarIndex={1} />
              <DateRangePicker.NextButton />
            </DateRangePicker.Header>
            <DateRangePicker.Calendars>
              <DateRangePicker.Grid calendarIndex={0} />
              <DateRangePicker.Grid calendarIndex={1} />
            </DateRangePicker.Calendars>
          </div>
        </div>
      </DateRangePicker.Content>
    </DateRangePicker.Root>
  );
}
