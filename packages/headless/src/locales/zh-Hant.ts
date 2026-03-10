import type { Locale } from "../types";
import { createLocale } from "../locale";

export const zhHant: Locale = createLocale("zh-TW", {
  confirm: "確認",
  cancel: "取消",
  clear: "清除",
  today: "今天",
  placeholder: "選擇日期",
  rangePlaceholder: "選擇日期範圍",
  dateTimePlaceholder: "選擇日期和時間",
  rangeTimePlaceholder: "選擇日期範圍和時間",
  timePlaceholder: "選擇時間",
  yearLabel: "年",
  monthLabel: "月",
  hourLabel: "時",
  minuteLabel: "分",
  secondLabel: "秒",
  hoursLabel: "小時",
  minutesLabel: "分鐘",
  secondsLabel: "秒鐘",
  startTimeLabel: "開始時間",
  endTimeLabel: "結束時間",
  prevMonthLabel: "上個月",
  nextMonthLabel: "下個月",
  selectYearLabel: "選擇年份",
  selectMonthLabel: "選擇月份",
});
