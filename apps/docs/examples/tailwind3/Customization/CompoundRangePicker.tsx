import { useState } from "react";
import { DateRangePicker } from "react-date-range-picker-tailwind3";

const presets = [
  { label: "Last 7 days", value: { start: new Date(Date.now() - 7 * 86400000), end: new Date() } },
  {
    label: "Last 30 days",
    value: { start: new Date(Date.now() - 30 * 86400000), end: new Date() },
  },
  {
    label: "This month",
    value: { start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), end: new Date() },
  },
];

export default function CompoundRangePicker() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DateRangePicker.Root value={value} onChange={setValue} presets={presets}>
      <DateRangePicker.Trigger>
        {({ displayValue, isOpen, onToggle, triggerRef }) => (
          <button
            ref={triggerRef as React.Ref<HTMLButtonElement>}
            onClick={onToggle}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              border: `1px solid ${isOpen ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: isOpen ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <span style={{ fontSize: 18 }}>{"\uD83D\uDCC5"}</span>
            <span>{displayValue || "Select date range"}</span>
          </button>
        )}
      </DateRangePicker.Trigger>
      <DateRangePicker.Content>
        <div style={{ display: "flex", gap: 16 }}>
          <DateRangePicker.Presets>
            {presets.map((_, i) => (
              <DateRangePicker.PresetItem key={i} index={i} />
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
            <DateRangePicker.Footer>
              <DateRangePicker.ClearButton />
              <DateRangePicker.CancelButton />
              <DateRangePicker.ConfirmButton />
            </DateRangePicker.Footer>
          </div>
        </div>
      </DateRangePicker.Content>
    </DateRangePicker.Root>
  );
}
