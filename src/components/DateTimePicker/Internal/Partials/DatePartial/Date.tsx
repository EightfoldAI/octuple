import React from 'react';
import { DatePartialProps } from './Date.types';
import { mergeClasses } from '../../../../../shared/utilities';
import DateBody from './DateBody';
import DateHeader from './DateHeader';
import { WEEK_DAY_COUNT } from '../../Utils/dateUtil';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

const DATE_ROW_COUNT: number = 6;

function DatePartial<DateType>(props: DatePartialProps<DateType>) {
    const {
        partialName = 'date',
        keyboardConfig,
        active,
        operationRef,
        generateConfig,
        value,
        viewDate,
        onViewDateChange,
        onPartialChange,
        onSelect,
        size = DatePickerSize.Medium,
    } = props;

    operationRef.current = {
        onKeyDown: (event) =>
            createKeyDownHandler(event, {
                onLeftRight: (diff) => {
                    onSelect(
                        generateConfig.addDate(value || viewDate, diff),
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
                        generateConfig.addDate(
                            value || viewDate,
                            diff * WEEK_DAY_COUNT
                        ),
                        'key'
                    );
                },
                onPageUpDown: (diff) => {
                    onSelect(
                        generateConfig.addMonth(value || viewDate, diff),
                        'key'
                    );
                },
                ...keyboardConfig,
            }),
    };

    const onYearChange = (diff: number) => {
        const newDate = generateConfig.addYear(viewDate, diff);
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };
    const onMonthChange = (diff: number) => {
        const newDate = generateConfig.addMonth(viewDate, diff);
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };

    return (
        <div
            className={mergeClasses([
                (styles as any)[`picker-${partialName}-partial`],
                { [styles.pickerDatePartialActive]: active },
            ])}
        >
            <DateHeader
                {...props}
                value={value}
                viewDate={viewDate}
                // View Operation
                onPrevYear={() => {
                    onYearChange(-1);
                }}
                onNextYear={() => {
                    onYearChange(1);
                }}
                onPrevMonth={() => {
                    onMonthChange(-1);
                }}
                onNextMonth={() => {
                    onMonthChange(1);
                }}
                onMonthClick={() => {
                    onPartialChange('month', viewDate);
                }}
                onYearClick={() => {
                    onPartialChange('year', viewDate);
                }}
                size={size}
            />
            <DateBody
                {...props}
                onSelect={(date) => onSelect(date, 'mouse')}
                value={value}
                viewDate={viewDate}
                rowCount={DATE_ROW_COUNT}
                size={size}
            />
        </div>
    );
}

export default DatePartial;
