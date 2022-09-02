import React, { useEffect, useContext, useRef, useState } from 'react';
import {
    OcPickerPartialBaseProps,
    OcPickerPartialDateProps,
    OcPickerPartialProps,
    OcPickerPartialTimeProps,
} from './OcPicker.types';
import { mergeClasses } from '../../../shared/utilities';
import { eventKeys } from '../../../shared/utilities';
import { useMergedState } from '../../../hooks/useMergedState';
import TimePartial from './Partials/TimePartial/Time';
import DateTimePartial from './Partials/DatetimePartial/Datetime';
import DatePartial from './Partials/DatePartial/Date';
import WeekPartial from './Partials/WeekPartial/Week';
import MonthPartial from './Partials/MonthPartial/Month';
import QuarterPartial from './Partials/QuarterPartial/Quarter';
import YearPartial from './Partials/YearPartial/Year';
import DecadePartial from './Partials/DecadePartial/Decade';
import type {
    PartialMode,
    PartialRefProps,
    OcPickerMode,
} from './OcPicker.types';
import { isEqual } from './Utils/dateUtil';
import PartialContext from './PartialContext';
import { PickerModeMap } from './Utils/uiUtil';
import RangeContext from './RangeContext';
import { getExtraFooter } from './Utils/getExtraFooter';
import getRanges from './Utils/getRanges';
import { getLowerBoundTime, setDateTime, setTime } from './Utils/timeUtil';
import { ButtonSize, NeutralButton } from '../../Button';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { Size } from '../../ConfigProvider';
import { DatePickerSize } from './OcPicker.types';

import styles from './ocpicker.module.scss';

type OmitType<DateType> = Omit<OcPickerPartialBaseProps<DateType>, 'picker'> &
    Omit<OcPickerPartialDateProps<DateType>, 'picker'> &
    Omit<OcPickerPartialTimeProps<DateType>, 'picker'>;
type MergedPickerPartialProps<DateType> = {
    picker?: OcPickerMode;
} & OmitType<DateType>;

function OcPickerPartial<DateType>(props: OcPickerPartialProps<DateType>) {
    const {
        classNames,
        style,
        locale,
        generateConfig,
        value,
        defaultValue,
        pickerValue,
        defaultPickerValue,
        disabledDate,
        mode,
        picker = 'date',
        tabIndex = 0,
        showNow,
        showTime,
        showToday,
        renderExtraFooter,
        hideHeader,
        onSelect,
        onChange,
        onPartialChange,
        onMouseDown,
        onPickerValueChange,
        onOk,
        components,
        direction,
        hourStep = 1,
        minuteStep = 1,
        secondStep = 1,
        size = DatePickerSize.Medium,
    } = props as MergedPickerPartialProps<DateType>;
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);
    const needConfirmButton: boolean =
        (picker === 'date' && !!showTime) || picker === 'time';

    const isHourStepValid = 24 % hourStep === 0;
    const isMinuteStepValid = 60 % minuteStep === 0;
    const isSecondStepValid = 60 % secondStep === 0;

    const partialContext = useContext(PartialContext);
    const {
        operationRef,
        partialRef: partialDivRef,
        onSelect: onContextSelect,
        hideRanges,
    } = partialContext;

    const { inRange, partialPosition, rangedValue, hoverRangedValue } =
        useContext(RangeContext);
    const partialRef = useRef<PartialRefProps>({});

    // Handle init logic
    const initRef = useRef(true);

    // Value
    const [mergedValue, setInnerValue] = useMergedState(null, {
        value,
        defaultValue,
        postState: (val) => {
            return val;
        },
    });

    // View date control
    const [viewDate, setInnerViewDate] = useMergedState<
        DateType | null,
        DateType
    >(null, {
        value: pickerValue,
        defaultValue: defaultPickerValue || mergedValue,
        postState: (date) => {
            const now = generateConfig.getNow();
            if (!date) {
                return now;
            }
            // When value is null and set showTime
            if (!mergedValue && showTime) {
                const defaultDateObject =
                    typeof showTime === 'object'
                        ? showTime.defaultValue
                        : defaultValue;
                return setDateTime(
                    generateConfig,
                    Array.isArray(date) ? date[0] : date,
                    defaultDateObject || now
                );
            }
            return Array.isArray(date) ? date[0] : date;
        },
    });

    const setViewDate = (date: DateType) => {
        setInnerViewDate(date);
        if (onPickerValueChange) {
            onPickerValueChange(date);
        }
    };

    // Partial control
    const getInternalNextMode = (nextMode: PartialMode): PartialMode => {
        const getNextMode = PickerModeMap[picker!];
        if (getNextMode) {
            return getNextMode(nextMode);
        }

        return nextMode;
    };

    const [mergedMode, setInnerMode] = useMergedState(
        () => {
            if (picker === 'time') {
                return 'time';
            }
            return getInternalNextMode('date');
        },
        {
            value: mode,
        }
    );

    useEffect(() => {
        setInnerMode(picker);
    }, [picker]);

    const [sourceMode, setSourceMode] = useState<PartialMode>(() => mergedMode);

    const onInternalPartialChange = (
        newMode: PartialMode | null,
        viewValue: DateType
    ) => {
        const nextMode = getInternalNextMode(newMode || mergedMode);
        setSourceMode(mergedMode);
        setInnerMode(nextMode);

        if (
            onPartialChange &&
            (mergedMode !== nextMode ||
                isEqual(generateConfig, viewDate, viewDate))
        ) {
            onPartialChange(viewValue, nextMode);
        }
    };

    const triggerSelect = (
        date: DateType,
        type: 'key' | 'mouse' | 'submit',
        forceTriggerSelect: boolean = false
    ) => {
        if (mergedMode === picker || forceTriggerSelect) {
            setInnerValue(date);

            if (onSelect) {
                onSelect(date);
            }

            if (onContextSelect) {
                onContextSelect(date, type);
            }

            if (
                onChange &&
                !isEqual(generateConfig, date, mergedValue) &&
                !disabledDate?.(date)
            ) {
                onChange(date);
            }
        }
    };

    const onInternalKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (partialRef.current?.onKeyDown) {
            if (
                [
                    eventKeys.ARROWLEFT,
                    eventKeys.ARROWRIGHT,
                    eventKeys.ARROWUP,
                    eventKeys.ARROWDOWN,
                    eventKeys.PAGEUP,
                    eventKeys.PAGEDOWN,
                    eventKeys.ENTER,
                ].includes(e.key)
            ) {
                e.preventDefault();
            }
            return partialRef.current?.onKeyDown(e);
        }

        return null;
    };

    const onInternalBlur: React.FocusEventHandler<HTMLElement> = (e) => {
        if (partialRef.current?.onBlur) {
            partialRef.current.onBlur(e);
        }
    };

    if (operationRef && partialPosition !== 'right') {
        operationRef.current = {
            onKeyDown: onInternalKeyDown,
            onClose: () => {
                if (partialRef.current?.onClose) {
                    partialRef.current.onClose();
                }
            },
        };
    }

    useEffect(() => {
        if (value && !initRef.current) {
            setInnerViewDate(value);
        }
    }, [value]);

    useEffect(() => {
        initRef.current = false;
    }, []);

    let partialNode: React.ReactNode;

    const pickerProps = {
        ...(props as MergedPickerPartialProps<DateType>),
        operationRef: partialRef,
        viewDate,
        value: mergedValue,
        onViewDateChange: setViewDate,
        sourceMode,
        onPartialChange: onInternalPartialChange,
        disabledDate,
    };
    delete pickerProps.onChange;
    delete pickerProps.onSelect;

    switch (mergedMode) {
        case 'decade':
            partialNode = (
                <DecadePartial<DateType>
                    {...pickerProps}
                    onSelect={(date, type) => {
                        setViewDate(date);
                        triggerSelect(date, type);
                    }}
                    size={size}
                />
            );
            break;

        case 'year':
            partialNode = (
                <YearPartial<DateType>
                    {...pickerProps}
                    onSelect={(date, type) => {
                        setViewDate(date);
                        triggerSelect(date, type);
                    }}
                    size={size}
                />
            );
            break;

        case 'month':
            partialNode = (
                <MonthPartial<DateType>
                    {...pickerProps}
                    onSelect={(date, type) => {
                        setViewDate(date);
                        triggerSelect(date, type);
                    }}
                    size={size}
                />
            );
            break;

        case 'quarter':
            partialNode = (
                <QuarterPartial<DateType>
                    {...pickerProps}
                    onSelect={(date, type) => {
                        setViewDate(date);
                        triggerSelect(date, type);
                    }}
                    size={size}
                />
            );
            break;

        case 'week':
            partialNode = (
                <WeekPartial
                    {...pickerProps}
                    onSelect={(date, type) => {
                        setViewDate(date);
                        triggerSelect(date, type);
                    }}
                    size={size}
                />
            );
            break;

        case 'time':
            delete pickerProps.showTime;
            partialNode = (
                <TimePartial<DateType>
                    {...pickerProps}
                    {...(typeof showTime === 'object' ? showTime : null)}
                    onSelect={(date, type) => {
                        setViewDate(date);
                        triggerSelect(date, type);
                    }}
                    size={size}
                />
            );
            break;

        default:
            if (showTime) {
                partialNode = (
                    <DateTimePartial
                        {...pickerProps}
                        onSelect={(date, type) => {
                            setViewDate(date);
                            triggerSelect(date, type);
                        }}
                        size={size}
                    />
                );
            } else {
                partialNode = (
                    <DatePartial<DateType>
                        {...pickerProps}
                        onSelect={(date, type) => {
                            setViewDate(date);
                            triggerSelect(date, type);
                        }}
                        size={size}
                    />
                );
            }
    }

    let extraFooter: React.ReactNode;
    let rangesNode: React.ReactNode;

    const onNow = (): void => {
        const now = generateConfig.getNow();
        const lowerBoundTime = getLowerBoundTime(
            generateConfig.getHour(now),
            generateConfig.getMinute(now),
            generateConfig.getSecond(now),
            isHourStepValid ? hourStep : 1,
            isMinuteStepValid ? minuteStep : 1,
            isSecondStepValid ? secondStep : 1
        );
        const adjustedNow = setTime(
            generateConfig,
            now,
            lowerBoundTime[0], // hour
            lowerBoundTime[1], // minute
            lowerBoundTime[2] // second
        );
        triggerSelect(adjustedNow, 'submit');
    };

    if (!hideRanges) {
        extraFooter = getExtraFooter(mergedMode, renderExtraFooter);
        rangesNode = getRanges({
            components,
            needConfirmButton,
            okDisabled:
                !mergedValue || (disabledDate && disabledDate(mergedValue)),
            locale,
            showNow,
            onNow: needConfirmButton && onNow,
            onOk: () => {
                if (mergedValue) {
                    triggerSelect(mergedValue, 'submit', true);
                    if (onOk) {
                        onOk(mergedValue);
                    }
                }
            },
            size: size,
        });
    }

    const datePickerSizeToButtonSizeMap = new Map<
        DatePickerSize | Size,
        ButtonSize | Size
    >([
        [DatePickerSize.Flex, ButtonSize.Flex],
        [DatePickerSize.Large, ButtonSize.Large],
        [DatePickerSize.Medium, ButtonSize.Medium],
        [DatePickerSize.Small, ButtonSize.Small],
    ]);

    let todayNode: React.ReactNode;

    if (showToday && mergedMode === 'date' && picker === 'date' && !showTime) {
        const now: DateType = generateConfig.getNow();
        const disabled: boolean = disabledDate && disabledDate(now);
        todayNode = (
            <NeutralButton
                aria-disabled={disabled}
                classNames={mergeClasses([
                    'picker-today-btn',
                    disabled && 'picker-today-btn-disabled',
                ])}
                onClick={() => {
                    if (!disabled) {
                        triggerSelect(now, 'mouse', true);
                    }
                }}
                size={datePickerSizeToButtonSizeMap.get(size)}
                text={locale.today}
            />
        );
    }

    return (
        <PartialContext.Provider
            value={{
                ...partialContext,
                mode: mergedMode,
                hideHeader:
                    'hideHeader' in props
                        ? hideHeader
                        : partialContext.hideHeader,
                hidePrevBtn: inRange && partialPosition === 'right',
                hideNextBtn: inRange && partialPosition === 'left',
            }}
        >
            <div
                tabIndex={tabIndex}
                className={mergeClasses([
                    styles.pickerPartial,
                    {
                        [styles.pickerSmall]:
                            size === DatePickerSize.Flex && largeScreenActive,
                    },
                    {
                        [styles.pickerMedium]:
                            size === DatePickerSize.Flex && mediumScreenActive,
                    },
                    {
                        [styles.pickerMedium]:
                            size === DatePickerSize.Flex && smallScreenActive,
                    },
                    {
                        [styles.pickerLarge]:
                            size === DatePickerSize.Flex && xSmallScreenActive,
                    },
                    { [styles.pickerLarge]: size === DatePickerSize.Large },
                    { [styles.pickerMedium]: size === DatePickerSize.Medium },
                    { [styles.pickerSmall]: size === DatePickerSize.Small },
                    classNames,
                    {
                        ['picker-partial-has-range']:
                            rangedValue && rangedValue[0] && rangedValue[1],
                    },
                    {
                        ['picker-partial-has-range-hover']:
                            hoverRangedValue &&
                            hoverRangedValue[0] &&
                            hoverRangedValue[1],
                    },
                    { [styles.pickerPartialRtl]: direction === 'rtl' },
                ])}
                style={style}
                onKeyDown={onInternalKeyDown}
                onBlur={onInternalBlur}
                onMouseDown={onMouseDown}
                ref={partialDivRef}
            >
                {partialNode}
                {extraFooter && (
                    <div className={styles.pickerFooterExtra}>
                        {extraFooter}
                    </div>
                )}
                {rangesNode || todayNode ? (
                    <div className={styles.pickerFooter}>
                        {rangesNode}
                        {todayNode}
                    </div>
                ) : null}
            </div>
        </PartialContext.Provider>
    );
}

export default OcPickerPartial;
