import React from 'react';
import { QuarterPartialProps } from './Quarter.types';
import QuarterHeader from './QuarterHeader';
import QuarterBody from './QuarterBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

function QuarterPartial<DateType>(props: QuarterPartialProps<DateType>) {
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
                        generateConfig.addMonth(value || viewDate, diff * 3),
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
                        generateConfig.addYear(value || viewDate, diff),
                        'key'
                    );
                },
            }),
    };

    const onYearChange = (diff: number) => {
        const newDate = generateConfig.addYear(viewDate, diff);
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };

    return (
        <div className={styles.pickerQuarterPartial}>
            <QuarterHeader
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
            <QuarterBody<DateType>
                {...props}
                onSelect={(date) => {
                    onSelect(date, 'mouse');
                }}
                size={size}
            />
        </div>
    );
}

export default QuarterPartial;
