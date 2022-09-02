import React from 'react';
import { MONTH_COL_COUNT, MonthPartialProps } from './Month.types';
import MonthHeader from './MonthHeader';
import MonthBody from './MonthBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

function MonthPartial<DateType>(props: MonthPartialProps<DateType>) {
    const {
        operationRef,
        onViewDateChange,
        generateConfig,
        value,
        viewDate,
        onPartialChange,
        onSelect,
        size = DatePickerSize.Medium,
    } = props;

    operationRef.current = {
        onKeyDown: (event) =>
            createKeyDownHandler(event, {
                onLeftRight: (diff) => {
                    onSelect(
                        generateConfig.addMonth(value || viewDate, diff),
                        'key'
                    );
                },
                onCtrlLeftRight: (diff) => {
                    onSelect(
                        generateConfig.addYear(value || viewDate, diff),
                        'key'
                    );
                },
                onUpDown: (diff) => {
                    onSelect(
                        generateConfig.addMonth(
                            value || viewDate,
                            diff * MONTH_COL_COUNT
                        ),
                        'key'
                    );
                },
                onEnter: () => {
                    onPartialChange('date', value || viewDate);
                },
            }),
    };

    const onYearChange = (diff: number) => {
        const newDate: DateType = generateConfig.addYear(viewDate, diff);
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };

    return (
        <div className={styles.pickerMonthPartial}>
            <MonthHeader
                {...props}
                onPrevYear={() => {
                    onYearChange(-1);
                }}
                onNextYear={() => {
                    onYearChange(1);
                }}
                onYearClick={() => {
                    onPartialChange('year', viewDate);
                }}
                size={size}
            />
            <MonthBody<DateType>
                {...props}
                onSelect={(date) => {
                    onSelect(date, 'mouse');
                    onPartialChange('date', date);
                }}
                size={size}
            />
        </div>
    );
}

export default MonthPartial;
