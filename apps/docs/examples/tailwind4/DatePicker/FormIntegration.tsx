import { type SubmitEvent, useState } from "react";
import { DatePicker } from "react-date-range-picker-tailwind4";

export default function FormIntegration() {
  const [value, setValue] = useState<Date | null>(null);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const birthday = formData.get("birthday");
    alert(`Submitted date: ${typeof birthday === "string" ? birthday : ""}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <DatePicker value={value} onChange={setValue} name="birthday" />
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
