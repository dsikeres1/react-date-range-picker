import type { Locale } from "../types";
import { createLocale } from "../locale";

export const tr: Locale = createLocale("tr", {
  confirm: "Onayla",
  cancel: "İptal",
  clear: "Temizle",
  today: "Bugün",
  placeholder: "Tarih seçin",
  rangePlaceholder: "Tarih aralığı seçin",
  dateTimePlaceholder: "Tarih ve saat seçin",
  rangeTimePlaceholder: "Tarih ve saat aralığı seçin",
  timePlaceholder: "Saat seçin",
  yearLabel: "Yıl",
  monthLabel: "Ay",
  hourLabel: "sa",
  minuteLabel: "dk",
  secondLabel: "sn",
  hoursLabel: "Saatler",
  minutesLabel: "Dakikalar",
  secondsLabel: "Saniyeler",
  startTimeLabel: "Başlangıç saati",
  endTimeLabel: "Bitiş saati",
  prevMonthLabel: "Önceki ay",
  nextMonthLabel: "Sonraki ay",
  selectYearLabel: "Yıl seçin",
  selectMonthLabel: "Ay seçin",
});
