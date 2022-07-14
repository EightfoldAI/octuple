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
        operationRef,
        onViewDateChange,
        generateConfig,
        value,
        viewDate,
        sourceMode,
        onSelect,
        onPartialChange,
    } = props;
    operationRef.current = {
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) =>
            createKeyDownHandler(event, {
                onLeftRight: (diff) => {
                    onSelect(
                        generateConfig.addYear(value || viewDate, diff),
                        'key'
                    );
                },
                onCtrlLeftRight: (diff) => {
                    onSelect(
                        generateConfig.addYear(
                            value || viewDate,
                            diff * YEAR_DECADE_COUNT
                        ),
                        'key'
                    );
                },
                onUpDown: (diff) => {
                    onSelect(
                        generateConfig.addYear(
                            value || viewDate,
                            diff * YEAR_COL_COUNT
                        ),
                        'key'
                    );
                },
                onEnter: () => {
                    onPartialChange(
                        sourceMode === 'date' ? 'date' : 'month',
                        value || viewDate
                    );
                },
            }),
    };

    const onDecadeChange = (diff: number) => {
        const newDate: DateType = generateConfig.addYear(viewDate, diff * 10);
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };

    return (
        <div className={styles.pickerYearPartial}>
            <YearHeader
                {...props}
                onPrevDecade={() => {
                    onDecadeChange(-1);
                }}
                onNextDecade={() => {
                    onDecadeChange(1);
                }}
                onDecadeClick={() => {
                    onPartialChange('decade', viewDate);
                }}
            />
            <YearBody
                {...props}
                onSelect={(date: DateType) => {
                    onPartialChange(
                        sourceMode === 'date' ? 'date' : 'month',
                        date
                    );
                    onSelect(date, 'mouse');
                }}
            />
        </div>
    );
}

export default YearPartial;
