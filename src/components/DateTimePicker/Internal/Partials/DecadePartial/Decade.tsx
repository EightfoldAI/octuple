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
        generateConfig,
        onPartialChange,
        onSelect,
        onViewDateChange,
        operationRef,
        size = DatePickerSize.Medium,
        viewDate,
    } = props;

    operationRef.current = {
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>): boolean =>
            createKeyDownHandler(event, {
                onLeftRight: (diff: number): void => {
                    onSelect(
                        generateConfig.addYear(
                            viewDate,
                            diff * DECADE_UNIT_DIFF
                        ),
                        'key'
                    );
                },
                onCtrlLeftRight: (diff: number): void => {
                    onSelect(
                        generateConfig.addYear(
                            viewDate,
                            diff * DECADE_DISTANCE_COUNT
                        ),
                        'key'
                    );
                },
                onUpDown: (diff: number): void => {
                    onSelect(
                        generateConfig.addYear(
                            viewDate,
                            diff * DECADE_UNIT_DIFF * DECADE_COL_COUNT
                        ),
                        'key'
                    );
                },
                onEnter: (): void => {
                    onPartialChange('year', viewDate);
                },
            }),
    };

    const onDecadesChange = (diff: number): void => {
        const newDate: DateType = generateConfig.addYear(
            viewDate,
            diff * DECADE_DISTANCE_COUNT
        );
        onViewDateChange(newDate);
        onPartialChange(null, newDate);
    };

    const onInternalSelect = (date: DateType): void => {
        onSelect(date, 'mouse');
        onPartialChange('year', date);
    };

    return (
        <div className={styles.pickerDecadePartial}>
            <DecadeHeader
                {...props}
                onPrevDecades={(): void => {
                    onDecadesChange(-1);
                }}
                onNextDecades={(): void => {
                    onDecadesChange(1);
                }}
                size={size}
            />
            <DecadeBody {...props} onSelect={onInternalSelect} size={size} />
        </div>
    );
}

export default DecadePartial;
