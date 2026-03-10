import * as C from "./Compound";
import type { DateRangePickerRootProps } from "react-date-range-picker-ui-primitives";
import { cn } from "../../utils";
import { headerClassNames, rangeClassNames } from "../../theme";

export interface DateRangePickerProps extends Omit<DateRangePickerRootProps, "children"> {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function DateRangePickerSimple({ hideHeader, hideFooter, ...props }: DateRangePickerProps) {
  const hasPresets = props.presets && props.presets.length > 0;
  const showFooter =
    hideFooter !== undefined ? !hideFooter : !props.inline && !props.shouldCloseOnSelect;
  const showNav = props.captionLayout !== "dropdown";

  return (
    <C.Root {...props}>
      {!props.inline && <C.Trigger />}
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
                {showNav && <C.PrevButton />}
                <C.Title calendarIndex={0} />
                <div className={headerClassNames.spacer} />
                <C.Title calendarIndex={1} />
                {showNav && <C.NextButton />}
              </C.Header>
            )}
            <C.Calendars>
              <C.Grid calendarIndex={0} />
              <C.Grid calendarIndex={1} />
            </C.Calendars>
            {showFooter && (
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
