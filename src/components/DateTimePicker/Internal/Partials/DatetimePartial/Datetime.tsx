import React from 'react';
import { DatetimePartialProps } from './Datetime.types';
import { mergeClasses } from '../../../../../shared/utilities';
import { eventKeys } from '../../../../../shared/utilities';
import DatePartial from '../DatePartial/Date';
import TimePartial from '../TimePartial/Time';
import { tuple } from '../../Utils/miscUtil';
import { setDateTime as setTime } from '../../Utils/timeUtil';
import type { PartialRefProps } from '../../OcPicker.types';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

const ACTIVE_PARTIAL = tuple('date', 'time');
type ActivePartialType = typeof ACTIVE_PARTIAL[number];

function DatetimePartial<DateType>(props: DatetimePartialProps<DateType>) {
    const {
        operationRef,
        generateConfig,
        value,
        defaultValue,
        disabledTime,
        showTime,
        onSelect,
        size = DatePickerSize.Medium,
    } = props;
    const [activePartial, setActivePartial] =
        React.useState<ActivePartialType | null>(null);

    const dateOperationRef: React.MutableRefObject<PartialRefProps> =
        React.useRef<PartialRefProps>({});
    const timeOperationRef: React.MutableRefObject<PartialRefProps> =
        React.useRef<PartialRefProps>({});

    const timeProps = typeof showTime === 'object' ? { ...showTime } : {};

    function getNextActive(offset: number) {
        const activeIndex = ACTIVE_PARTIAL.indexOf(activePartial!) + offset;
        const nextActivePartial = ACTIVE_PARTIAL[activeIndex] || null;
        return nextActivePartial;
    }

    const onBlur = (e?: React.FocusEvent<HTMLElement>) => {
        if (timeOperationRef.current.onBlur) {
            timeOperationRef.current.onBlur(e!);
        }
        setActivePartial(null);
    };

    operationRef.current = {
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            // Switch active partial
            if (event.key === eventKeys.TAB) {
                const nextActivePartial = getNextActive(
                    event.shiftKey ? -1 : 1
                );
                setActivePartial(nextActivePartial);

                if (nextActivePartial) {
                    event.preventDefault();
                }

                return true;
            }

            // Operate on current active partial
            if (activePartial) {
                const ref =
                    activePartial === 'date'
                        ? dateOperationRef
                        : timeOperationRef;

                if (ref.current && ref.current.onKeyDown) {
                    ref.current.onKeyDown(event);
                }

                return true;
            }

            // Switch first active partial if operate without partial
            if (
                [
                    eventKeys.ARROWLEFT,
                    eventKeys.ARROWRIGHT,
                    eventKeys.ARROWUP,
                    eventKeys.ARROWDOWN,
                ].includes(event.key)
            ) {
                setActivePartial('date');
                return true;
            }

            return false;
        },
        onBlur,
        onClose: onBlur,
    };

    const onInternalSelect = (date: DateType, source: 'date' | 'time') => {
        let selectedDate = date;

        if (source === 'date' && !value && timeProps.defaultValue) {
            // Date with time defaultValue
            selectedDate = generateConfig.setHour(
                selectedDate,
                generateConfig.getHour(timeProps.defaultValue)
            );
            selectedDate = generateConfig.setMinute(
                selectedDate,
                generateConfig.getMinute(timeProps.defaultValue)
            );
            selectedDate = generateConfig.setSecond(
                selectedDate,
                generateConfig.getSecond(timeProps.defaultValue)
            );
        } else if (source === 'time' && !value && defaultValue) {
            selectedDate = generateConfig.setYear(
                selectedDate,
                generateConfig.getYear(defaultValue)
            );
            selectedDate = generateConfig.setMonth(
                selectedDate,
                generateConfig.getMonth(defaultValue)
            );
            selectedDate = generateConfig.setDate(
                selectedDate,
                generateConfig.getDate(defaultValue)
            );
        }

        if (onSelect) {
            onSelect(selectedDate, 'mouse');
        }
    };

    const disabledTimes = disabledTime ? disabledTime(value || null) : {};

    return (
        <div
            className={mergeClasses([
                styles.pickerDatetimePartial,
                {
                    [styles.pickerDatetimePartialActive]: activePartial,
                },
            ])}
        >
            <DatePartial
                {...props}
                operationRef={dateOperationRef}
                active={activePartial === 'date'}
                onSelect={(date) => {
                    onInternalSelect(
                        setTime(
                            generateConfig,
                            date,
                            !value && typeof showTime === 'object'
                                ? showTime.defaultValue
                                : null
                        ),
                        'date'
                    );
                }}
                size={size}
            />
            <TimePartial
                {...props}
                format={undefined}
                {...timeProps}
                {...disabledTimes}
                disabledTime={null}
                defaultValue={undefined}
                operationRef={timeOperationRef}
                active={activePartial === 'time'}
                onSelect={(date: DateType) => {
                    onInternalSelect(date, 'time');
                }}
                size={size}
            />
        </div>
    );
}

export default DatetimePartial;
