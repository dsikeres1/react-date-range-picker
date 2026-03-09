import * as C from "./Compound";
import type { DatePickerRootProps } from "../../ui-primitives/index";

export interface DatePickerProps extends Omit<DatePickerRootProps, "children"> {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function DatePickerSimple({ hideHeader, hideFooter, ...props }: DatePickerProps) {
  return (
    <C.Root {...props}>
      <C.Trigger />
      <C.Content>
        {!hideHeader && (
          <C.Header>
            <C.PrevButton />
            <C.Title />
            <C.NextButton />
          </C.Header>
        )}
        <C.Grid />
        {!hideFooter && (
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
