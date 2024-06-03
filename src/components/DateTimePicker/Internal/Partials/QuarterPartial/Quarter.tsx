import React from 'react';
import { QuarterPartialProps } from './Quarter.types';
import QuarterHeader from './QuarterHeader';
import QuarterBody from './QuarterBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

function QuarterPartial<DateType>(props: QuarterPartialProps<DateType>) {
  const {
    generateConfig,
    onPartialChange,
    onSelect,
    onViewDateChange,
    operationRef,
    size = DatePickerSize.Medium,
    value,
    viewDate,
  } = props;

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>): boolean =>
      createKeyDownHandler(event, {
        onLeftRight: (diff: number): void => {
          onSelect(generateConfig.addMonth(value || viewDate, diff * 3), 'key');
        },
        onCtrlLeftRight: (diff: number): void => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onUpDown: (diff: number): void => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
      }),
  };

  const onYearChange = (diff: number): void => {
    const newDate: DateType = generateConfig.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPartialChange(null, newDate);
  };

  return (
    <div className={styles.pickerQuarterPartial}>
      <QuarterHeader
        {...props}
        onPrevYear={(): void => {
          onYearChange(-1);
        }}
        onNextYear={(): void => {
          onYearChange(1);
        }}
        onYearClick={(): void => {
          onPartialChange('year', viewDate);
        }}
        size={size}
      />
      <QuarterBody<DateType>
        {...props}
        onSelect={(date: DateType): void => {
          onSelect(date, 'mouse');
        }}
        size={size}
      />
    </div>
  );
}

export default QuarterPartial;
