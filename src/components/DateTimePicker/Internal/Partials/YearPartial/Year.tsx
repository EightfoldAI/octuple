import React from 'react';
import {
  YEAR_COL_COUNT,
  YEAR_DECADE_COUNT,
  YearPartialProps,
} from './Year.types';
import YearHeader from './YearHeader';
import YearBody from './YearBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';

import styles from '../../ocpicker.module.scss';

function YearPartial<DateType>(props: YearPartialProps<DateType>) {
  const {
    generateConfig,
    onPartialChange,
    onSelect,
    onViewDateChange,
    operationRef,
    sourceMode,
    value,
    viewDate,
  } = props;
  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>): boolean =>
      createKeyDownHandler(event, {
        onLeftRight: (diff: number): void => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: (diff: number): void => {
          onSelect(
            generateConfig.addYear(value || viewDate, diff * YEAR_DECADE_COUNT),
            'key'
          );
        },
        onUpDown: (diff: number): void => {
          onSelect(
            generateConfig.addYear(value || viewDate, diff * YEAR_COL_COUNT),
            'key'
          );
        },
        onEnter: (): void => {
          onPartialChange(
            sourceMode === 'date' ? 'date' : 'month',
            value || viewDate
          );
        },
      }),
  };

  const onDecadeChange = (diff: number): void => {
    const newDate: DateType = generateConfig.addYear(viewDate, diff * 10);
    onViewDateChange(newDate);
    onPartialChange(null, newDate);
  };

  return (
    <div className={styles.pickerYearPartial}>
      <YearHeader
        {...props}
        onPrevDecade={(): void => {
          onDecadeChange(-1);
        }}
        onNextDecade={(): void => {
          onDecadeChange(1);
        }}
        onDecadeClick={(): void => {
          onPartialChange('decade', viewDate);
        }}
      />
      <YearBody
        {...props}
        onSelect={(date: DateType): void => {
          onPartialChange(sourceMode === 'date' ? 'date' : 'month', date);
          onSelect(date, 'mouse');
        }}
      />
    </div>
  );
}

export default YearPartial;
