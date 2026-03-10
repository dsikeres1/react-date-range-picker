import * as C from "./Compound";
import type { DatePickerRootProps } from "../../ui-primitives/index";
import { rangeClassNames } from "../../theme";

export interface DatePickerProps extends Omit<DatePickerRootProps, "children"> {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function DatePickerSimple({ hideHeader, hideFooter, ...props }: DatePickerProps) {
  const showFooter =
    hideFooter !== undefined ? !hideFooter : !props.inline && !props.shouldCloseOnSelect;
  const showNav = props.captionLayout !== "dropdown";
  const numMonths = props.numberOfMonths ?? 1;

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
        {numMonths > 1 ? (
          <div className={rangeClassNames.calendarsContainer}>
            {Array.from({ length: numMonths }, (_, i) => (
              <C.Grid key={i} calendarIndex={i} />
            ))}
          </div>
        ) : (
          <C.Grid />
        )}
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

export const DatePicker = Object.assign(DatePickerSimple, C);
