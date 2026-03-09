import type { Locale } from "../types";
import { createLocale } from "../locale";

export const ko: Locale = createLocale("ko-KR", {
  confirm: "확인",
  cancel: "취소",
  clear: "초기화",
  today: "오늘",
  placeholder: "날짜 선택",
  rangePlaceholder: "날짜 범위 선택",
  dateTimePlaceholder: "날짜 및 시간 선택",
  rangeTimePlaceholder: "날짜 범위 및 시간 선택",
  timePlaceholder: "시간 선택",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "시",
  minuteLabel: "분",
  secondLabel: "초",
  hoursLabel: "시",
  minutesLabel: "분",
  secondsLabel: "초",
  startTimeLabel: "시작 시간",
  endTimeLabel: "종료 시간",
  prevMonthLabel: "이전 달",
  nextMonthLabel: "다음 달",
  selectYearLabel: "연도 선택",
  selectMonthLabel: "월 선택",
});
