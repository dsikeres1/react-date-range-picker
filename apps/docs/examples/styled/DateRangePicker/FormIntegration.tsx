import { type SubmitEvent, useState } from "react";
import "react-date-range-picker-styled/styles.css";
import { DateRangePicker } from "react-date-range-picker-styled";

export default function FormIntegration() {
  const [value, setValue] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const start = formData.get("booking");
    const end = formData.get("booking-end");
    alert(
      `Submitted range: ${typeof start === "string" ? start : ""} ~ ${typeof end === "string" ? end : ""}`,
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <DateRangePicker value={value} onChange={setValue} name="booking" />
      <button
        type="submit"
        style={{
          padding: "6px 14px",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          background: "#3b82f6",
          color: "#fff",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Submit
      </button>
    </form>
  );
}
