import { useState } from "react";
import { DateTimePicker } from "react-date-range-picker-tailwind3";
import { createLocale } from "react-date-range-picker-headless";

const koLocale = createLocale("ko-KR", {
  confirm: "확인",
  cancel: "취소",
  clear: "초기화",
  today: "오늘",
  dateTimePlaceholder: "날짜 및 시간 선택",
});

export default function CustomLocale() {
  const [value, setValue] = useState<Date | null>(null);

  return <DateTimePicker value={value} onChange={setValue} locale={koLocale} />;
}
