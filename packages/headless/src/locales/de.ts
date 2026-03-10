import type { Locale } from "../types";
import { createLocale } from "../locale";

export const de: Locale = createLocale("de", {
  confirm: "Bestätigen",
  cancel: "Abbrechen",
  clear: "Löschen",
  today: "Heute",
  placeholder: "Datum auswählen",
  rangePlaceholder: "Datumsbereich auswählen",
  dateTimePlaceholder: "Datum und Uhrzeit auswählen",
  rangeTimePlaceholder: "Datumsbereich und Uhrzeit auswählen",
  timePlaceholder: "Uhrzeit auswählen",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "Std",
  minuteLabel: "Min",
  secondLabel: "Sek",
  hoursLabel: "Stunden",
  minutesLabel: "Minuten",
  secondsLabel: "Sekunden",
  startTimeLabel: "Startzeit",
  endTimeLabel: "Endzeit",
  prevMonthLabel: "Vorheriger Monat",
  nextMonthLabel: "Nächster Monat",
  selectYearLabel: "Jahr auswählen",
  selectMonthLabel: "Monat auswählen",
});
