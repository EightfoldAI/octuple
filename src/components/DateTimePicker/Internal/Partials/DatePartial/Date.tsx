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
        active,
        generateConfig,
        keyboardConfig,
        onPartialChange,
        onSelect,
        onViewDateChange,
        operationRef,
        partialName = 'date',
        size = DatePickerSize.Medium,
        value,
        viewDate,
    } = props;

    operationRef.current = {
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>): boolean =>
            createKeyDownHandler(event, {
                onLeftRight: (diff: number): void => {
                    onSelect(
                        generateConfig.addDate(value || viewDate, diff),
                        'key'
                    );
                },
                onCtrlLeftRight: (diff: number): void => {
                    onSelect(
                        generateConfig.addYear(value || viewDate, diff),
                        'key'
                    );
                },
                onUpDown: (diff: number): void => {
                    onSelect(
                        generateConfig.addDate(
                            value || viewDate,
                            diff * WEEK_DAY_COUNT
                        ),
                        'key'
                    );
                },
                onPageUpDown: (diff: number): void => {
                    onSelect(
                        generateConfig.addMonth(value || viewDate, diff),
                        'key'
                    );
                },
                ...keyboardConfig,
            }),
    };

    const onYearChange = (diff: number): void => {
        const newDate: DateType = generateConfig.addYear(viewDate, diff);
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };
    const onMonthChange = (diff: number): void => {
        const newDate: DateType = generateConfig.addMonth(viewDate, diff);
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
                onPrevYear={(): void => {
                    onYearChange(-1);
                }}
                onNextYear={(): void => {
                    onYearChange(1);
                }}
                onPrevMonth={(): void => {
                    onMonthChange(-1);
                }}
                onNextMonth={(): void => {
                    onMonthChange(1);
                }}
                onMonthClick={(): void => {
                    onPartialChange('month', viewDate);
                }}
                onYearClick={(): void => {
                    onPartialChange('year', viewDate);
                }}
                size={size}
            />
            <DateBody
                {...props}
                onSelect={(date: DateType): void => onSelect(date, 'mouse')}
                value={value}
                viewDate={viewDate}
                rowCount={DATE_ROW_COUNT}
                size={size}
            />
        </div>
    );
}

export default DatePartial;
