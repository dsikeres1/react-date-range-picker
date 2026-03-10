import type { Locale } from "../types";
import { createLocale } from "../locale";

export const zhHans: Locale = createLocale("zh-CN", {
  confirm: "确认",
  cancel: "取消",
  clear: "清除",
  today: "今天",
  placeholder: "选择日期",
  rangePlaceholder: "选择日期范围",
  dateTimePlaceholder: "选择日期和时间",
  rangeTimePlaceholder: "选择日期范围和时间",
  timePlaceholder: "选择时间",
  yearLabel: "年",
  monthLabel: "月",
  hourLabel: "时",
  minuteLabel: "分",
  secondLabel: "秒",
  hoursLabel: "小时",
  minutesLabel: "分钟",
  secondsLabel: "秒钟",
  startTimeLabel: "开始时间",
  endTimeLabel: "结束时间",
  prevMonthLabel: "上个月",
  nextMonthLabel: "下个月",
  selectYearLabel: "选择年份",
  selectMonthLabel: "选择月份",
});
