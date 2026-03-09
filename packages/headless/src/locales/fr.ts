import type { Locale } from "../types";
import { createLocale } from "../locale";

export const fr: Locale = createLocale("fr", {
  confirm: "Confirmer",
  cancel: "Annuler",
  clear: "Effacer",
  today: "Aujourd'hui",
  placeholder: "Sélectionner une date",
  rangePlaceholder: "Sélectionner une plage de dates",
  dateTimePlaceholder: "Sélectionner la date et l'heure",
  rangeTimePlaceholder: "Sélectionner la plage de dates et l'heure",
  timePlaceholder: "Sélectionner l'heure",
  yearLabel: "",
  monthLabel: "",
  hourLabel: "h",
  minuteLabel: "min",
  secondLabel: "s",
  hoursLabel: "Heures",
  minutesLabel: "Minutes",
  secondsLabel: "Secondes",
  startTimeLabel: "Heure de début",
  endTimeLabel: "Heure de fin",
  prevMonthLabel: "Mois précédent",
  nextMonthLabel: "Mois suivant",
  selectYearLabel: "Sélectionner une année",
  selectMonthLabel: "Sélectionner un mois",
});
