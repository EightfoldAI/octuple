import React from 'react';
import { MONTH_COL_COUNT, MonthPartialProps } from './Month.types';
import MonthHeader from './MonthHeader';
import MonthBody from './MonthBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

function MonthPartial<DateType>(props: MonthPartialProps<DateType>) {
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
          onSelect(generateConfig.addMonth(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: (diff: number): void => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onUpDown: (diff: number): void => {
          onSelect(
            generateConfig.addMonth(value || viewDate, diff * MONTH_COL_COUNT),
            'key'
          );
        },
        onEnter: (): void => {
          onPartialChange('date', value || viewDate);
        },
      }),
  };

  const onYearChange = (diff: number): void => {
    const newDate: DateType = generateConfig.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPartialChange(null, newDate);
  };

  return (
    <div className={styles.pickerMonthPartial}>
      <MonthHeader
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
      <MonthBody<DateType>
        {...props}
        onSelect={(date: DateType): void => {
          onSelect(date, 'mouse');
          onPartialChange('date', date);
        }}
        size={size}
      />
    </div>
  );
}

export default MonthPartial;
