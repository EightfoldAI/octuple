import React from 'react';
import type { BodyOperationRef } from './Time.types';
import { TimePartialProps } from './Time.types';
import { mergeClasses } from '../../../../../shared/utilities';
import TimeHeader from './TimeHeader';
import TimeBody from './TimeBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

const countBoolean = (boolList: (boolean | undefined)[]): number =>
    boolList.filter((bool) => bool !== false).length;

function TimePartial<DateType>(props: TimePartialProps<DateType>) {
    const {
        generateConfig,
        format = 'HH:mm:ss',
        active,
        operationRef,
        showHour,
        showMinute,
        showSecond,
        use12Hours = false,
        onSelect,
        value,
        size = DatePickerSize.Medium,
    } = props;
    const bodyOperationRef: React.MutableRefObject<BodyOperationRef> =
        React.useRef<BodyOperationRef>();

    const [activeColumnIndex, setActiveColumnIndex] = React.useState(-1);
    const columnsCount: number = countBoolean([
        showHour,
        showMinute,
        showSecond,
        use12Hours,
    ]);

    operationRef.current = {
        onKeyDown: (event) =>
            createKeyDownHandler(event, {
                onLeftRight: (diff) => {
                    setActiveColumnIndex(
                        (activeColumnIndex + diff + columnsCount) % columnsCount
                    );
                },
                onUpDown: (diff) => {
                    if (activeColumnIndex === -1) {
                        setActiveColumnIndex(0);
                    } else if (bodyOperationRef.current) {
                        bodyOperationRef.current.onUpDown(diff);
                    }
                },
                onEnter: () => {
                    onSelect(value || generateConfig.getNow(), 'key');
                    setActiveColumnIndex(-1);
                },
            }),

        onBlur: () => {
            setActiveColumnIndex(-1);
        },
    };

    return (
        <div
            className={mergeClasses([
                styles.pickerTimePartial,
                { [styles.pickerTimePartialActive]: active },
            ])}
        >
            <TimeHeader {...props} format={format} size={size} />
            <TimeBody
                {...props}
                activeColumnIndex={activeColumnIndex}
                operationRef={bodyOperationRef}
                size={size}
            />
        </div>
    );
}

export default TimePartial;
