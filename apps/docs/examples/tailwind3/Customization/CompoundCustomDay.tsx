import { useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind3";

const eventDates = new Set([5, 12, 18, 25]);

export default function CompoundCustomDay() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <DatePicker.Root value={value} onChange={setValue} inline>
      <DatePicker.Content>
        <DatePicker.Header>
          <DatePicker.PrevButton />
          <DatePicker.Title />
          <DatePicker.NextButton />
        </DatePicker.Header>
        <DatePicker.Grid>
          {({ date }) => (
            <DatePicker.Day date={date}>
              {({ day, isDisabled, isSelected, isToday, onClick, onMouseEnter, onMouseLeave }) => (
                <button
                  type="button"
                  onClick={onClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  disabled={isDisabled}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    border: "none",
                    borderRadius: 6,
                    cursor: isDisabled ? "default" : "pointer",
                    background: isSelected ? "#3b82f6" : "transparent",
                    color: isSelected ? "#fff" : isToday ? "#2563eb" : undefined,
                    fontWeight: isToday || isSelected ? 600 : 400,
                    fontSize: 13,
                    position: "relative",
                  }}
                >
                  {day}
                  {eventDates.has(date.getDate()) && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 2,
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: isSelected ? "#fff" : "#f59e0b",
                      }}
                    />
                  )}
                </button>
              )}
            </DatePicker.Day>
          )}
        </DatePicker.Grid>
      </DatePicker.Content>
    </DatePicker.Root>
  );
}
