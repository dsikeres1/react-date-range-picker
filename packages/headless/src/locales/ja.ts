import type { Locale } from "../types";
import { createLocale } from "../locale";

export const ja: Locale = createLocale("ja", {
  confirm: "確認",
  cancel: "キャンセル",
  clear: "クリア",
  today: "今日",
  placeholder: "日付を選択",
  rangePlaceholder: "期間を選択",
  dateTimePlaceholder: "日時を選択",
  rangeTimePlaceholder: "期間と時間を選択",
  timePlaceholder: "時間を選択",
  yearLabel: "年",
  monthLabel: "月",
  hourLabel: "時",
  minuteLabel: "分",
  secondLabel: "秒",
  hoursLabel: "時間",
  minutesLabel: "分",
  secondsLabel: "秒",
  startTimeLabel: "開始時間",
  endTimeLabel: "終了時間",
  prevMonthLabel: "前の月",
  nextMonthLabel: "次の月",
  selectYearLabel: "年を選択",
  selectMonthLabel: "月を選択",
});
