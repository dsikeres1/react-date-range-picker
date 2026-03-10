import { TimePickerRoot } from "./Root";
import { TimePickerPeriodToggle } from "./PeriodToggle";
import { Trigger } from "../shared/Trigger";
import { Content } from "../shared/Content";
import { TimePanel } from "../shared/TimePanel";
import { Footer } from "../shared/Footer";
import { ClearButton } from "../shared/ClearButton";
import { CancelButton } from "../shared/CancelButton";
import { ConfirmButton } from "../shared/ConfirmButton";

export const TimePicker = {
  Root: TimePickerRoot,
  Trigger,
  Content,
  TimePanel,
  PeriodToggle: TimePickerPeriodToggle,
  Footer,
  ClearButton,
  CancelButton,
  ConfirmButton,
};
