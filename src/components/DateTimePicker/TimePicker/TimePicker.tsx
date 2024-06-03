'use client';

import React, { forwardRef, useMemo } from 'react';
import DatePicker from '../DatePicker';
import { TimePickerProps, TimeRangePickerProps } from './TimePicker.types';

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } =
  DatePicker;

const RangePicker = forwardRef<any, TimeRangePickerProps>((props, ref) => (
  <InternalRangePicker
    {...props}
    dropdownClassNames={props.popupClassNames}
    picker="time"
    mode={undefined}
    ref={ref}
  />
));

const TimePicker = forwardRef<any, TimePickerProps>(
  ({ addon, renderExtraFooter, popupClassNames, ...rest }, ref) => {
    const internalRenderExtraFooter = useMemo(() => {
      if (renderExtraFooter) {
        return renderExtraFooter;
      }
      if (addon) {
        return addon;
      }
      return undefined;
    }, [addon, renderExtraFooter]);

    return (
      <InternalTimePicker
        {...rest}
        dropdownClassNames={popupClassNames}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  }
);

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;

export default TimePicker as MergedTimePicker;
