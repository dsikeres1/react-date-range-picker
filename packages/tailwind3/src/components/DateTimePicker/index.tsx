import * as C from "./Compound";
import type { DateTimePickerRootProps } from "react-date-range-picker-ui-primitives";
import { dateTimeClassNames } from "../../theme";

export interface DateTimePickerProps extends Omit<DateTimePickerRootProps, "children"> {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function DateTimePickerSimple({ hideHeader, hideFooter, ...props }: DateTimePickerProps) {
  const showFooter =
    hideFooter !== undefined ? !hideFooter : !props.inline && !props.shouldCloseOnSelect;
  const showNav = props.captionLayout !== "dropdown";

  return (
    <C.Root {...props}>
      {!props.inline && <C.Trigger />}
      <C.Content>
        {!hideHeader && (
          <C.Header>
            {showNav && <C.PrevButton />}
            <C.Title />
            {showNav && <C.NextButton />}
          </C.Header>
        )}
        <C.Grid />
        <C.TimeSection>
          <div className={dateTimeClassNames.timeLabel}>Time</div>
          <C.TimePanel target="single" />
        </C.TimeSection>
        {showFooter && (
          <C.Footer>
            <C.ClearButton />
            <C.CancelButton />
            <C.ConfirmButton />
          </C.Footer>
        )}
      </C.Content>
    </C.Root>
  );
}

export const DateTimePicker = Object.assign(DateTimePickerSimple, C);
