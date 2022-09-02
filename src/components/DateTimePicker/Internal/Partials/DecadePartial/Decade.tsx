import React from 'react';
import {
    DECADE_COL_COUNT,
    DECADE_DISTANCE_COUNT,
    DECADE_UNIT_DIFF,
    DecadePartialProps,
} from './Decade.types';
import DecadeHeader from './DecadeHeader';
import DecadeBody from './DecadeBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

function DecadePartial<DateType>(props: DecadePartialProps<DateType>) {
    const {
        onViewDateChange,
        generateConfig,
        viewDate,
        operationRef,
        onSelect,
        onPartialChange,
        size = DatePickerSize.Medium,
    } = props;

    operationRef.current = {
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) =>
            createKeyDownHandler(event, {
                onLeftRight: (diff) => {
                    onSelect(
                        generateConfig.addYear(
                            viewDate,
                            diff * DECADE_UNIT_DIFF
                        ),
                        'key'
                    );
                },
                onCtrlLeftRight: (diff) => {
                    onSelect(
                        generateConfig.addYear(
                            viewDate,
                            diff * DECADE_DISTANCE_COUNT
                        ),
                        'key'
                    );
                },
                onUpDown: (diff) => {
                    onSelect(
                        generateConfig.addYear(
                            viewDate,
                            diff * DECADE_UNIT_DIFF * DECADE_COL_COUNT
                        ),
                        'key'
                    );
                },
                onEnter: () => {
                    onPartialChange('year', viewDate);
                },
            }),
    };

    const onDecadesChange = (diff: number) => {
        const newDate = generateConfig.addYear(
            viewDate,
            diff * DECADE_DISTANCE_COUNT
        );
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };

    const onInternalSelect = (date: DateType) => {
        onSelect(date, 'mouse');
        onPartialChange('year', date);
    };

    return (
        <div className={styles.pickerDecadePartial}>
            <DecadeHeader
                {...props}
                onPrevDecades={() => {
                    onDecadesChange(-1);
                }}
                onNextDecades={() => {
                    onDecadesChange(1);
                }}
                size={size}
            />
            <DecadeBody {...props} onSelect={onInternalSelect} size={size} />
        </div>
    );
}

export default DecadePartial;
