import * as C from "./Compound";
import type { DateRangeTimePickerRootProps } from "../../ui-primitives/index";
import { cn } from "../../utils";
import { headerClassNames, rangeClassNames, dateTimeClassNames } from "../../theme";

export interface DateRangeTimePickerProps extends Omit<DateRangeTimePickerRootProps, "children"> {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function DateRangeTimePickerSimple({
  hideHeader,
  hideFooter,
  ...props
}: DateRangeTimePickerProps) {
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
              <div>
                <C.Grid calendarIndex={0} />
                <C.StartTimeSection>
                  <div className={dateTimeClassNames.timeLabel}>Start Time</div>
                  <C.TimePanel target="start" />
                </C.StartTimeSection>
              </div>
              <div>
                <C.Grid calendarIndex={1} />
                <C.EndTimeSection>
                  <div className={dateTimeClassNames.timeLabel}>End Time</div>
                  <C.TimePanel target="end" />
                </C.EndTimeSection>
              </div>
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

export const DateRangeTimePicker = Object.assign(DateRangeTimePickerSimple, C);
