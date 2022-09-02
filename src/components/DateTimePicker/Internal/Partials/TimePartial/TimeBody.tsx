import React from 'react';
import type { Unit } from './Time.types';
import { TimeBodyProps } from './Time.types';
import { useMemo } from '../../../../../hooks/useMemo';
import TimeUnitColumn from './TimeUnitColumn';
import { leftPad } from '../../Utils/miscUtil';
import { setTime as utilSetTime } from '../../Utils/timeUtil';
import { DisabledTimes } from '../../OcPicker.types';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

const shouldUnitsUpdate = (prevUnits: Unit[], nextUnits: Unit[]): boolean => {
    if (prevUnits.length !== nextUnits.length) return true;
    // if any unit's disabled status is different, the units should be re-evaluted
    for (let i = 0; i < prevUnits.length; i += 1) {
        if (prevUnits[i].disabled !== nextUnits[i].disabled) return true;
    }
    return false;
};

const generateUnits = (
    start: number,
    end: number,
    step: number,
    disabledUnits: number[] | undefined
): Unit[] => {
    const units: Unit[] = [];
    for (let i = start; i <= end; i += step) {
        units.push({
            label: leftPad(i, 2),
            value: i,
            disabled: (disabledUnits || []).includes(i),
        });
    }
    return units;
};

function TimeBody<DateType>(props: TimeBodyProps<DateType>) {
    const {
        generateConfig,
        operationRef,
        activeColumnIndex,
        value,
        showHour,
        showMinute,
        showSecond,
        use12Hours,
        hourStep = 1,
        minuteStep = 1,
        secondStep = 1,
        disabledTime,
        hideDisabledOptions,
        onSelect,
        size = DatePickerSize.Medium,
    } = props;

    const columns: {
        node: React.ReactElement;
        value: number;
        units: Unit[];
        onSelect: (diff: number) => void;
    }[] = [];
    let isPM: boolean | undefined;
    const originHour: number = value ? generateConfig.getHour(value) : -1;
    let hour: number = originHour;
    const minute: number = value ? generateConfig.getMinute(value) : -1;
    const second: number = value ? generateConfig.getSecond(value) : -1;

    // Disabled Time
    const now: DateType = generateConfig.getNow();
    React.useMemo(() => {
        const disabledConfig: DisabledTimes = disabledTime?.(now);
        return [
            disabledConfig?.disabledHours,
            disabledConfig?.disabledMinutes,
            disabledConfig?.disabledSeconds,
        ];
    }, [disabledTime, now]);

    // Set Time
    const setTime = (
        isNewPM: boolean | undefined,
        newHour: number,
        newMinute: number,
        newSecond: number
    ): DateType => {
        let newDate: DateType = value || generateConfig.getNow();

        const mergedHour: number = Math.max(0, newHour);
        const mergedMinute: number = Math.max(0, newMinute);
        const mergedSecond: number = Math.max(0, newSecond);

        newDate = utilSetTime(
            generateConfig,
            newDate,
            !use12Hours || !isNewPM ? mergedHour : mergedHour + 12,
            mergedMinute,
            mergedSecond
        );

        return newDate;
    };

    const rawHours: Unit[] = generateUnits(
        0,
        23,
        hourStep,
        disabledTime?.(now).disabledHours?.()
    );

    const memorizedRawHours: Unit[] = useMemo(
        () => rawHours,
        rawHours,
        shouldUnitsUpdate
    );

    // Should additional logic to handle 12 hours
    if (use12Hours) {
        isPM = hour >= 12; // -1 means should display AM
        hour %= 12;
    }

    const [AMDisabled, PMDisabled] = React.useMemo(() => {
        if (!use12Hours) {
            return [false, false];
        }
        const AMPMDisabled: boolean[] = [true, true];
        memorizedRawHours.forEach(({ disabled, value: hourValue }) => {
            if (disabled) return;
            if (hourValue >= 12) {
                AMPMDisabled[1] = false;
            } else {
                AMPMDisabled[0] = false;
            }
        });
        return AMPMDisabled;
    }, [use12Hours, memorizedRawHours]);

    const hours = React.useMemo(() => {
        if (!use12Hours) return memorizedRawHours;
        return memorizedRawHours
            .filter(
                isPM
                    ? (hourMeta) => hourMeta.value >= 12
                    : (hourMeta) => hourMeta.value < 12
            )
            .map((hourMeta) => {
                const hourValue: number = hourMeta.value % 12;
                const hourLabel: string =
                    hourValue === 0 ? '12' : leftPad(hourValue, 2);
                return {
                    ...hourMeta,
                    label: hourLabel,
                    value: hourValue,
                };
            });
    }, [use12Hours, isPM, memorizedRawHours]);

    const minutes: Unit[] = generateUnits(
        0,
        59,
        minuteStep,
        disabledTime?.(now).disabledMinutes?.(originHour)
    );

    const seconds: Unit[] = generateUnits(
        0,
        59,
        secondStep,
        disabledTime?.(now).disabledSeconds?.(originHour, minute)
    );

    operationRef.current = {
        onUpDown: (diff: number) => {
            const column = columns[activeColumnIndex];
            if (column) {
                const valueIndex: number = column.units.findIndex(
                    (unit) => unit.value === column.value
                );

                const unitLen: number = column.units.length;
                for (let i: number = 1; i < unitLen; i += 1) {
                    const nextUnit: Unit =
                        column.units[
                            (valueIndex + diff * i + unitLen) % unitLen
                        ];

                    if (nextUnit.disabled !== true) {
                        column.onSelect(nextUnit.value);
                        break;
                    }
                }
            }
        },
    };

    function addColumnNode(
        condition: boolean | undefined,
        node: React.ReactElement,
        columnValue: number,
        units: Unit[],
        onColumnSelect: (diff: number) => void
    ) {
        if (condition !== false) {
            columns.push({
                node: React.cloneElement(node, {
                    value: columnValue,
                    active: activeColumnIndex === columns.length,
                    onSelect: onColumnSelect,
                    units,
                    hideDisabledOptions,
                }),
                onSelect: onColumnSelect,
                value: columnValue,
                units,
            });
        }
    }

    // Hour
    addColumnNode(
        showHour,
        <TimeUnitColumn key="hour" size={size} />,
        hour,
        hours,
        (num) => {
            onSelect(setTime(isPM, num, minute, second), 'mouse');
        }
    );

    // Minute
    addColumnNode(
        showMinute,
        <TimeUnitColumn key="minute" size={size} />,
        minute,
        minutes,
        (num) => {
            onSelect(setTime(isPM, hour, num, second), 'mouse');
        }
    );

    // Second
    addColumnNode(
        showSecond,
        <TimeUnitColumn key="second" size={size} />,
        second,
        seconds,
        (num) => {
            onSelect(setTime(isPM, hour, minute, num), 'mouse');
        }
    );

    // 12 Hours
    let PMIndex: number = -1;
    if (typeof isPM === 'boolean') {
        PMIndex = isPM ? 1 : 0;
    }

    addColumnNode(
        use12Hours === true,
        <TimeUnitColumn key="12hours" size={size} />,
        PMIndex,
        [
            { label: 'AM', value: 0, disabled: AMDisabled },
            { label: 'PM', value: 1, disabled: PMDisabled },
        ],
        (num) => {
            onSelect(setTime(!!num, hour, minute, second), 'mouse');
        }
    );

    return (
        <div className={styles.pickerContent}>
            {columns.map(({ node }) => node)}
        </div>
    );
}

export default TimeBody;
