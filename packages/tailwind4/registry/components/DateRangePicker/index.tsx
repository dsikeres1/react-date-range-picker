import React from "react";
import * as C from "./Compound";
import type { DateRangePickerRootProps } from "../../ui-primitives/index";
import { cn } from "../../utils";
import { headerClassNames, rangeClassNames } from "../../theme";

export interface DateRangePickerProps extends DateRangePickerRootProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function DateRangePickerSimple({ hideHeader, hideFooter, ...props }: DateRangePickerProps) {
  const hasPresets = props.presets && props.presets.length > 0;

  return (
    <C.Root {...props}>
      <C.Trigger />
      <C.Content>
        <div className={cn(hasPresets && rangeClassNames.presetsLayout)}>
          {hasPresets && (
            <C.Presets>
              {props.presets?.map((p, i) => (
                <C.PresetItem key={p.label} index={i} />
              ))}
            </C.Presets>
          )}
          <div>
            {!hideHeader && (
              <C.Header>
                <C.PrevButton />
                <C.Title calendarIndex={0} />
                <div className={headerClassNames.spacer} />
                <C.Title calendarIndex={1} />
                <C.NextButton />
              </C.Header>
            )}
            <C.Calendars>
              <C.Grid calendarIndex={0} />
              <C.Grid calendarIndex={1} />
            </C.Calendars>
            {!hideFooter && (
              <C.Footer>
                <C.ClearButton />
                <C.CancelButton />
                <C.ConfirmButton />
              </C.Footer>
            )}
          </div>
        </div>
      </C.Content>
    </C.Root>
  );
}

export const DateRangePicker = Object.assign(DateRangePickerSimple, C);
