import React from "react";
import * as C from "./Compound";
import type { DateTimePickerRootProps } from "../../ui-primitives/index";
import { dateTimeClassNames } from "../../theme";

export interface DateTimePickerProps extends DateTimePickerRootProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function DateTimePickerSimple({ hideHeader, hideFooter, ...props }: DateTimePickerProps) {
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
        <C.TimeSection>
          <div className={dateTimeClassNames.timeLabel}>Time</div>
          <C.TimePanel target="single" />
        </C.TimeSection>
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

export const DateTimePicker = Object.assign(DateTimePickerSimple, C);
