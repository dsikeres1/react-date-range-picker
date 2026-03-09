import { useState } from "react";
import { DatePicker } from "react-date-range-picker-styled";
import { createLocale } from "react-date-range-picker-headless";
import "react-date-range-picker-styled/styles.css";

const koLocale = createLocale("ko-KR", {
  confirm: "확인",
  cancel: "취소",
  clear: "초기화",
  today: "오늘",
  placeholder: "날짜 선택",
});

export default function CustomLocale() {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker value={value} onChange={setValue} locale={koLocale} weekStartsOn="monday" />;
}
