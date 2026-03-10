import * as C from "./Compound";
import type { TimePickerRootProps } from "../../ui-primitives/index";

export interface TimePickerProps extends Omit<TimePickerRootProps, "children"> {
  hideFooter?: boolean;
}

export function TimePickerSimple({ hideFooter, ...props }: TimePickerProps) {
  const showFooter = hideFooter !== undefined ? !hideFooter : !props.inline;

  return (
    <C.Root {...props}>
      {!props.inline && <C.Trigger />}
      <C.Content>
        <C.TimePanel target="single" />
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

export const TimePicker = Object.assign(TimePickerSimple, C);
