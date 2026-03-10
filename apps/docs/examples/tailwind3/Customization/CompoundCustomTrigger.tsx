import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

export default function CompoundCustomTrigger() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DatePicker.Root value={value} onChange={setValue}>
      <DatePicker.Trigger>
        {({ displayValue, isOpen, onToggle, triggerRef }) => (
          <button
            ref={triggerRef as React.Ref<HTMLButtonElement>}
            onClick={onToggle}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              border: `1px solid ${isOpen ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: 6,
              background: isOpen ? "#eff6ff" : "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <span style={{ fontSize: 18 }}>{"\uD83D\uDCC5"}</span>
            <span>{displayValue || "Pick a date"}</span>
          </button>
        )}
      </DatePicker.Trigger>
      <DatePicker.Content>
        <DatePicker.Header>
          <DatePicker.PrevButton />
          <DatePicker.Title />
          <DatePicker.NextButton />
        </DatePicker.Header>
        <DatePicker.Grid />
        <DatePicker.Footer>
          <DatePicker.ClearButton />
          <DatePicker.CancelButton />
          <DatePicker.ConfirmButton />
        </DatePicker.Footer>
      </DatePicker.Content>
    </DatePicker.Root>
  );
}
