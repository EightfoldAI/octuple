import React, { useRef, useEffect, useState } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { useMergedState } from '../../../hooks/useMergedState';
import type {
    EventValue,
    PartialMode,
    OcPickerMode,
    OcPickerRefConfig,
    RangeInfo,
    RangeValue,
} from './OcPicker.types';
import {
    OcRangePickerBaseProps,
    OcRangePickerDateProps,
    OcRangePickerTimeProps,
    OcRangePickerProps,
} from './OcPicker.types';
import type { SharedTimeProps } from './Partials/TimePartial/Time.types';
import OcPickerTrigger from './OcPickerTrigger';
import OcPickerPartial from './OcPickerPartial';
import usePickerInput from './Hooks/usePickerInput';
import getDataOrAriaProps, {
    toArray,
    getValue,
    updateValues,
} from './Utils/miscUtil';
import {
    getDefaultFormat,
    getInputSize,
    elementsContains,
} from './Utils/uiUtil';
import type { ContextOperationRefProps } from './PartialContext';
import PartialContext from './PartialContext';
import {
    isEqual,
    getClosingViewDate,
    isSameDate,
    isSameWeek,
    isSameQuarter,
    formatValue,
    parseValue,
} from './Utils/dateUtil';
import useValueTexts from './Hooks/useValueTexts';
import useTextValueMapping from './Hooks/useTextValueMapping';
import type { GenerateConfig } from './Generate';
import type { OcPickerPartialProps } from './';
import RangeContext from './RangeContext';
import useRangeDisabled from './Hooks/useRangeDisabled';
import { getExtraFooter } from './Utils/getExtraFooter';
import getRanges from './Utils/getRanges';
import useRangeViewDates from './Hooks/useRangeViewDates';
import type { DateRender } from './Partials/DatePartial/Date.types';
import useHoverValue from './Hooks/useHoverValue';
import { DatePickerShape, DatePickerSize } from './OcPicker.types';

import styles from './ocpicker.module.scss';

function reorderValues<DateType>(
    values: RangeValue<DateType>,
    generateConfig: GenerateConfig<DateType>
): RangeValue<DateType> {
    if (
        values &&
        values[0] &&
        values[1] &&
        generateConfig.isAfter(values[0], values[1])
    ) {
        return [values[1], values[0]];
    }

    return values;
}

function canValueTrigger<DateType>(
    value: EventValue<DateType>,
    index: number,
    disabled: [boolean, boolean],
    allowEmpty?: [boolean, boolean] | null
): boolean {
    if (value) {
        return true;
    }

    if (allowEmpty && allowEmpty[index]) {
        return true;
    }

    if (disabled[(index + 1) % 2]) {
        return true;
    }

    return false;
}

type OmitType<DateType> = Omit<OcRangePickerBaseProps<DateType>, 'picker'> &
    Omit<OcRangePickerDateProps<DateType>, 'picker'> &
    Omit<OcRangePickerTimeProps<DateType>, 'picker'>;

type MergedOcRangePickerProps<DateType> = {
    picker?: OcPickerMode;
} & OmitType<DateType>;

function InnerRangePicker<DateType>(props: OcRangePickerProps<DateType>) {
    const {
        id,
        style,
        bordered = true,
        classNames,
        popupStyle,
        dropdownClassNames,
        dropdownAlign,
        getPopupContainer,
        generateConfig,
        locale,
        placeholder,
        autoFocus,
        disabled,
        format,
        picker = 'date',
        showTime,
        use12Hours,
        separator = ',',
        value,
        defaultValue,
        defaultPickerValue,
        open,
        defaultOpen,
        disabledDate,
        disabledTime,
        dateRender,
        partialRender,
        ranges,
        allowEmpty,
        allowClear,
        suffixIcon,
        clearIcon,
        pickerRef,
        inputReadOnly,
        mode,
        renderExtraFooter,
        onChange,
        onOpenChange,
        onPartialChange,
        onCalendarChange,
        onFocus,
        onBlur,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        onClick,
        onOk,
        onKeyDown,
        popupPlacement,
        components,
        order,
        direction,
        activePickerIndex,
        autoComplete = 'off',
        shape = DatePickerShape.Rectangle,
        size = DatePickerSize.Medium,
    } = props as MergedOcRangePickerProps<DateType>;

    const needConfirmButton: boolean =
        (picker === 'date' && !!showTime) || picker === 'time';

    // We record opened status here in case repeat open with picker
    const openRecordsRef = useRef<Record<number, boolean>>({});

    const containerRef = useRef<HTMLDivElement>(null);
    const partialDivRef = useRef<HTMLDivElement>(null);
    const startInputDivRef = useRef<HTMLDivElement>(null);
    const endInputDivRef = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    const formatList = toArray(
        getDefaultFormat<DateType>(format, picker, showTime, use12Hours)
    );

    // Active picker
    const [mergedActivePickerIndex, setMergedActivePickerIndex] =
        useMergedState<0 | 1>(0, {
            value: activePickerIndex,
        });

    // Operation ref
    const operationRef: React.MutableRefObject<ContextOperationRefProps | null> =
        useRef<ContextOperationRefProps>(null);

    const mergedDisabled = React.useMemo<[boolean, boolean]>(() => {
        if (Array.isArray(disabled)) {
            return disabled;
        }

        return [disabled || false, disabled || false];
    }, [disabled]);

    const [mergedValue, setInnerValue] = useMergedState<RangeValue<DateType>>(
        null,
        {
            value,
            defaultValue,
            postState: (values) =>
                picker === 'time' && !order
                    ? values
                    : reorderValues(values, generateConfig),
        }
    );

    // Config view partial
    const [getViewDate, setViewDate] = useRangeViewDates({
        values: mergedValue,
        picker,
        defaultDates: defaultPickerValue,
        generateConfig,
    });

    const [selectedValue, setSelectedValue] = useMergedState(mergedValue, {
        postState: (values) => {
            let postValues = values;

            if (mergedDisabled[0] && mergedDisabled[1]) {
                return postValues;
            }

            // Fill disabled unit
            for (let i = 0; i < 2; i += 1) {
                if (
                    mergedDisabled[i] &&
                    !getValue(postValues, i) &&
                    !getValue(allowEmpty, i)
                ) {
                    postValues = updateValues(
                        postValues,
                        generateConfig.getNow(),
                        i
                    );
                }
            }
            return postValues;
        },
    });

    const [mergedModes, setInnerModes] = useMergedState<
        [PartialMode, PartialMode]
    >([picker, picker], {
        value: mode,
    });

    useEffect(() => {
        setInnerModes([picker, picker]);
    }, [picker]);

    const triggerModesChange = (
        modes: [PartialMode, PartialMode],
        values: RangeValue<DateType>
    ) => {
        setInnerModes(modes);

        if (onPartialChange) {
            onPartialChange(values, modes);
        }
    };

    const [disabledStartDate, disabledEndDate] = useRangeDisabled(
        {
            picker,
            selectedValue,
            locale,
            disabled: mergedDisabled,
            disabledDate,
            generateConfig,
        },
        openRecordsRef.current[1],
        openRecordsRef.current[0]
    );

    const [mergedOpen, triggerInnerOpen] = useMergedState(false, {
        value: open,
        defaultValue: defaultOpen,
        postState: (postOpen) =>
            mergedDisabled[mergedActivePickerIndex] ? false : postOpen,
        onChange: (newOpen) => {
            if (onOpenChange) {
                onOpenChange(newOpen);
            }

            if (
                !newOpen &&
                operationRef.current &&
                operationRef.current.onClose
            ) {
                operationRef.current.onClose();
            }
        },
    });

    const startOpen = mergedOpen && mergedActivePickerIndex === 0;
    const endOpen = mergedOpen && mergedActivePickerIndex === 1;

    // Popup min width
    const [popupMinWidth, setPopupMinWidth] = useState(0);
    useEffect(() => {
        if (!mergedOpen && containerRef.current) {
            setPopupMinWidth(containerRef.current.offsetWidth);
        }
    }, [mergedOpen]);

    const triggerRef = React.useRef<any>();

    function triggerOpen(newOpen: boolean, index: 0 | 1) {
        if (newOpen) {
            clearTimeout(triggerRef.current);
            openRecordsRef.current[index] = true;

            setMergedActivePickerIndex(index);
            triggerInnerOpen(newOpen);

            // Open to reset view date
            if (!mergedOpen) {
                setViewDate(null, index);
            }
        } else if (mergedActivePickerIndex === index) {
            triggerInnerOpen(newOpen);

            // Clean up async
            // This makes ref not quick refresh in case user open another input with blur trigger
            const openRecords = openRecordsRef.current;
            triggerRef.current = setTimeout(() => {
                if (openRecords === openRecordsRef.current) {
                    openRecordsRef.current = {};
                }
            });
        }
    }

    function triggerOpenAndFocus(index: 0 | 1) {
        triggerOpen(true, index);
        // Use setTimeout to make sure partial DOM exists
        setTimeout(() => {
            const inputRef = [startInputRef, endInputRef][index];
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    }

    function triggerChange(newValue: RangeValue<DateType>, sourceIndex: 0 | 1) {
        let values = newValue;
        let startValue = getValue(values, 0);
        let endValue = getValue(values, 1);

        // Format start & end values
        if (
            startValue &&
            endValue &&
            generateConfig.isAfter(startValue, endValue)
        ) {
            if (
                // WeekPicker only compare week
                (picker === 'week' &&
                    !isSameWeek(
                        generateConfig,
                        locale.locale,
                        startValue,
                        endValue
                    )) ||
                // QuotaPicker only compare week
                (picker === 'quarter' &&
                    !isSameQuarter(generateConfig, startValue, endValue)) ||
                // Other non-TimePicker compare date
                (picker !== 'week' &&
                    picker !== 'quarter' &&
                    picker !== 'time' &&
                    !isSameDate(generateConfig, startValue, endValue))
            ) {
                // Clean up end date when start date is after end date
                if (sourceIndex === 0) {
                    values = [startValue, null];
                    endValue = null;
                } else {
                    startValue = null;
                    values = [null, endValue];
                }

                // Clean up cache since invalidate
                openRecordsRef.current = {
                    [sourceIndex]: true,
                };
            } else if (picker !== 'time' || order !== false) {
                // Reorder when in same date
                values = reorderValues(values, generateConfig);
            }
        }

        setSelectedValue(values);

        const startStr =
            values && values[0]
                ? formatValue(values[0], {
                      generateConfig,
                      locale,
                      format: formatList[0],
                  })
                : '';
        const endStr =
            values && values[1]
                ? formatValue(values[1], {
                      generateConfig,
                      locale,
                      format: formatList[0],
                  })
                : '';

        if (onCalendarChange) {
            const info: RangeInfo = {
                range: sourceIndex === 0 ? 'start' : 'end',
            };

            onCalendarChange(values, [startStr, endStr], info);
        }

        // >>>>> Trigger `onChange` event
        const canStartValueTrigger = canValueTrigger(
            startValue,
            0,
            mergedDisabled,
            allowEmpty
        );
        const canEndValueTrigger = canValueTrigger(
            endValue,
            1,
            mergedDisabled,
            allowEmpty
        );

        const canTrigger =
            values === null || (canStartValueTrigger && canEndValueTrigger);

        if (canTrigger) {
            // Trigger onChange only when value is validate
            setInnerValue(values);

            if (
                onChange &&
                (!isEqual(
                    generateConfig,
                    getValue(mergedValue, 0),
                    startValue
                ) ||
                    !isEqual(
                        generateConfig,
                        getValue(mergedValue, 1),
                        endValue
                    ))
            ) {
                onChange(values, [startStr, endStr]);
            }
        }

        // Always open another picker if possible
        let nextOpenIndex: 0 | 1 = null;
        if (sourceIndex === 0 && !mergedDisabled[1]) {
            nextOpenIndex = 1;
        } else if (sourceIndex === 1 && !mergedDisabled[0]) {
            nextOpenIndex = 0;
        }

        if (
            nextOpenIndex !== null &&
            nextOpenIndex !== mergedActivePickerIndex &&
            (!openRecordsRef.current[nextOpenIndex] ||
                !getValue(values, nextOpenIndex)) &&
            getValue(values, sourceIndex)
        ) {
            // Delay to focus to avoid input blur trigger expired selectedValues
            triggerOpenAndFocus(nextOpenIndex);
        } else {
            triggerOpen(false, sourceIndex);
        }
    }

    const forwardKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (
            mergedOpen &&
            operationRef.current &&
            operationRef.current.onKeyDown
        ) {
            // Let popup partial handle keyboard
            return operationRef.current.onKeyDown(e);
        }

        return null;
    };

    const sharedTextHooksProps = {
        formatList,
        generateConfig,
        locale,
    };

    const [startValueTexts, firstStartValueText] = useValueTexts<DateType>(
        getValue(selectedValue, 0),
        sharedTextHooksProps
    );

    const [endValueTexts, firstEndValueText] = useValueTexts<DateType>(
        getValue(selectedValue, 1),
        sharedTextHooksProps
    );

    const onTextChange = (newText: string, index: 0 | 1) => {
        const inputDate = parseValue(newText, {
            locale,
            formatList,
            generateConfig,
        });

        const disabledFunc = index === 0 ? disabledStartDate : disabledEndDate;

        if (inputDate && !disabledFunc(inputDate)) {
            setSelectedValue(updateValues(selectedValue, inputDate, index));
            setViewDate(inputDate, index);
        }
    };

    const [startText, triggerStartTextChange, resetStartText] =
        useTextValueMapping({
            valueTexts: startValueTexts,
            onTextChange: (newText) => onTextChange(newText, 0),
        });

    const [endText, triggerEndTextChange, resetEndText] = useTextValueMapping({
        valueTexts: endValueTexts,
        onTextChange: (newText) => onTextChange(newText, 1),
    });

    const [rangeHoverValue, setRangeHoverValue] =
        useState<RangeValue<DateType>>(null);

    const [hoverRangedValue, setHoverRangedValue] =
        useState<RangeValue<DateType>>(null);

    const [startHoverValue, onStartEnter, onStartLeave] = useHoverValue(
        startText,
        {
            formatList,
            generateConfig,
            locale,
        }
    );

    const [endHoverValue, onEndEnter, onEndLeave] = useHoverValue(endText, {
        formatList,
        generateConfig,
        locale,
    });

    const onDateMouseEnter = (date: DateType) => {
        setHoverRangedValue(
            updateValues(selectedValue, date, mergedActivePickerIndex)
        );
        if (mergedActivePickerIndex === 0) {
            onStartEnter(date);
        } else {
            onEndEnter(date);
        }
    };

    const onDateMouseLeave = () => {
        setHoverRangedValue(
            updateValues(selectedValue, null, mergedActivePickerIndex)
        );
        if (mergedActivePickerIndex === 0) {
            onStartLeave();
        } else {
            onEndLeave();
        }
    };

    const getSharedInputHookProps = (index: 0 | 1, resetText: () => void) => ({
        blurToCancel: needConfirmButton,
        forwardKeyDown,
        onBlur,
        isClickOutside: (target: EventTarget | null) =>
            !elementsContains(
                [
                    partialDivRef.current,
                    startInputDivRef.current,
                    endInputDivRef.current,
                    containerRef.current,
                ],
                target as HTMLElement
            ),
        onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
            setMergedActivePickerIndex(index);
            if (onFocus) {
                onFocus(e);
            }
        },
        triggerOpen: (newOpen: boolean) => {
            triggerOpen(newOpen, index);
        },
        onSubmit: (): boolean => {
            if (
                // When user typing disabledDate with keyboard and enter, this value will be empty
                !selectedValue ||
                // Normal disabled check
                (disabledDate && disabledDate(selectedValue[index]))
            ) {
                return false;
            }

            triggerChange(selectedValue, index);
            resetText();

            return null;
        },
        onCancel: () => {
            triggerOpen(false, index);
            setSelectedValue(mergedValue);
            resetText();
        },
    });

    const [startInputProps, { focused: startFocused, typing: startTyping }] =
        usePickerInput({
            ...getSharedInputHookProps(0, resetStartText),
            open: startOpen,
            value: startText,
            onKeyDown: (e, preventDefault) => {
                onKeyDown?.(e, preventDefault);
            },
        });

    const [endInputProps, { focused: endFocused, typing: endTyping }] =
        usePickerInput({
            ...getSharedInputHookProps(1, resetEndText),
            open: endOpen,
            value: endText,
            onKeyDown: (e, preventDefault) => {
                onKeyDown?.(e, preventDefault);
            },
        });

    const onPickerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // When click inside the picker & outside the picker's input elements
        // the partial should still be opened
        if (onClick) {
            onClick(e);
        }
        if (
            !mergedOpen &&
            !startInputRef.current.contains(e.target as Node) &&
            !endInputRef.current.contains(e.target as Node)
        ) {
            if (!mergedDisabled[0]) {
                triggerOpenAndFocus(0);
            } else if (!mergedDisabled[1]) {
                triggerOpenAndFocus(1);
            }
        }
    };

    const onPickerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // shouldn't affect input elements if picker is active
        if (onMouseDown) {
            onMouseDown(e);
        }
        if (
            mergedOpen &&
            (startFocused || endFocused) &&
            !startInputRef.current.contains(e.target as Node) &&
            !endInputRef.current.contains(e.target as Node)
        ) {
            e.preventDefault();
        }
    };

    // Close should sync back with text value
    const startStr =
        mergedValue && mergedValue[0]
            ? formatValue(mergedValue[0], {
                  locale,
                  format: 'YYYYMMDDHHmmss',
                  generateConfig,
              })
            : '';
    const endStr =
        mergedValue && mergedValue[1]
            ? formatValue(mergedValue[1], {
                  locale,
                  format: 'YYYYMMDDHHmmss',
                  generateConfig,
              })
            : '';

    useEffect(() => {
        if (!mergedOpen) {
            setSelectedValue(mergedValue);

            if (!startValueTexts.length || startValueTexts[0] === '') {
                triggerStartTextChange('');
            } else if (firstStartValueText !== startText) {
                resetStartText();
            }
            if (!endValueTexts.length || endValueTexts[0] === '') {
                triggerEndTextChange('');
            } else if (firstEndValueText !== endText) {
                resetEndText();
            }
        }
    }, [mergedOpen, startValueTexts, endValueTexts]);

    // Sync innerValue with control mode
    useEffect(() => {
        setSelectedValue(mergedValue);
    }, [startStr, endStr]);

    if (pickerRef) {
        pickerRef.current = {
            focus: () => {
                if (startInputRef.current) {
                    startInputRef.current.focus();
                }
            },
            blur: () => {
                if (startInputRef.current) {
                    startInputRef.current.blur();
                }
                if (endInputRef.current) {
                    endInputRef.current.blur();
                }
            },
        };
    }

    const rangeLabels = Object.keys(ranges || {});

    const rangeList = rangeLabels.map((label) => {
        const range = ranges![label];
        const newValues = typeof range === 'function' ? range() : range;

        return {
            label,
            onClick: () => {
                triggerChange(newValues, null);
                triggerOpen(false, mergedActivePickerIndex);
            },
            onMouseEnter: () => {
                setRangeHoverValue(newValues);
            },
            onMouseLeave: () => {
                setRangeHoverValue(null);
            },
        };
    });

    function renderPartial(
        partialPosition: 'left' | 'right' | false = false,
        partialProps: Partial<OcPickerPartialProps<DateType>> = {}
    ) {
        let partialHoverRangedValue: RangeValue<DateType> = null;
        if (
            mergedOpen &&
            hoverRangedValue &&
            hoverRangedValue[0] &&
            hoverRangedValue[1] &&
            generateConfig.isAfter(hoverRangedValue[1], hoverRangedValue[0])
        ) {
            partialHoverRangedValue = hoverRangedValue;
        }

        let partialShowTime: boolean | SharedTimeProps<DateType> | undefined =
            showTime as SharedTimeProps<DateType>;
        if (showTime && typeof showTime === 'object' && showTime.defaultValue) {
            const timeDefaultValues: DateType[] = showTime.defaultValue!;
            partialShowTime = {
                ...showTime,
                defaultValue:
                    getValue(timeDefaultValues, mergedActivePickerIndex) ||
                    undefined,
            };
        }

        let partialDateRender: DateRender<DateType> | null = null;
        if (dateRender) {
            partialDateRender = (date, today) =>
                dateRender(date, today, {
                    range: mergedActivePickerIndex ? 'end' : 'start',
                });
        }

        return (
            <RangeContext.Provider
                value={{
                    inRange: true,
                    partialPosition,
                    rangedValue: rangeHoverValue || selectedValue,
                    hoverRangedValue: partialHoverRangedValue,
                }}
            >
                <OcPickerPartial<DateType>
                    {...(props as any)}
                    {...partialProps}
                    dateRender={partialDateRender}
                    showTime={partialShowTime}
                    mode={mergedModes[mergedActivePickerIndex]}
                    generateConfig={generateConfig}
                    style={undefined}
                    direction={direction}
                    disabledDate={
                        mergedActivePickerIndex === 0
                            ? disabledStartDate
                            : disabledEndDate
                    }
                    disabledTime={(date) => {
                        if (disabledTime) {
                            return disabledTime(
                                date,
                                mergedActivePickerIndex === 0 ? 'start' : 'end'
                            );
                        }
                        return false;
                    }}
                    classNames={mergeClasses([
                        {
                            [styles.pickerPartialFocused]:
                                mergedActivePickerIndex === 0
                                    ? !startTyping
                                    : !endTyping,
                        },
                    ])}
                    value={getValue(selectedValue, mergedActivePickerIndex)}
                    locale={locale}
                    tabIndex={-1}
                    onPartialChange={(date: DateType, newMode: PartialMode) => {
                        // clear hover value when partial change
                        if (mergedActivePickerIndex === 0) {
                            onStartLeave(true);
                        }
                        if (mergedActivePickerIndex === 1) {
                            onEndLeave(true);
                        }
                        triggerModesChange(
                            updateValues(
                                mergedModes,
                                newMode,
                                mergedActivePickerIndex
                            ),
                            updateValues(
                                selectedValue,
                                date,
                                mergedActivePickerIndex
                            )
                        );

                        let viewDate = date;
                        if (
                            partialPosition === 'right' &&
                            mergedModes[mergedActivePickerIndex] === newMode
                        ) {
                            viewDate = getClosingViewDate(
                                viewDate,
                                newMode as any,
                                generateConfig,
                                -1
                            );
                        }
                        setViewDate(viewDate, mergedActivePickerIndex);
                    }}
                    onOk={null}
                    onSelect={undefined}
                    onChange={undefined}
                    defaultValue={
                        mergedActivePickerIndex === 0
                            ? getValue(selectedValue, 1)
                            : getValue(selectedValue, 0)
                    }
                    size={size}
                />
            </RangeContext.Provider>
        );
    }

    let arrowLeft: number = 0;
    let partialLeft: number = 0;
    if (
        mergedActivePickerIndex &&
        startInputDivRef.current &&
        separatorRef.current &&
        partialDivRef.current
    ) {
        // Arrow offset
        arrowLeft =
            startInputDivRef.current.offsetWidth +
            separatorRef.current.offsetWidth;

        // If partialWidth - arrowWidth - arrowMarginLeft < arrowLeft, partial should move to right side.
        // If offsetLeft > arrowLeft, arrow position is absolutely right, because arrowLeft is not calculated with arrow margin.
        if (
            partialDivRef.current.offsetWidth &&
            arrowRef.current.offsetWidth &&
            arrowLeft >
                partialDivRef.current.offsetWidth -
                    arrowRef.current.offsetWidth -
                    (direction === 'rtl' ||
                    arrowRef.current.offsetLeft > arrowLeft
                        ? 0
                        : arrowRef.current.offsetLeft)
        ) {
            partialLeft = arrowLeft;
        }
    }

    const arrowPositionStyle =
        direction === 'rtl' ? { right: arrowLeft } : { left: arrowLeft };

    function renderPartials() {
        let partials: React.ReactNode;
        const extraNode = getExtraFooter(
            mergedModes[mergedActivePickerIndex],
            renderExtraFooter
        );

        const rangesNode = getRanges({
            components,
            needConfirmButton,
            okDisabled:
                !getValue(selectedValue, mergedActivePickerIndex) ||
                (disabledDate &&
                    disabledDate(selectedValue[mergedActivePickerIndex])),
            locale,
            rangeList,
            onOk: () => {
                if (getValue(selectedValue, mergedActivePickerIndex)) {
                    // triggerChangeOld(selectedValue);
                    triggerChange(selectedValue, mergedActivePickerIndex);
                    if (onOk) {
                        onOk(selectedValue);
                    }
                }
            },
            size: size,
        });

        if (picker !== 'time' && !showTime) {
            const viewDate = getViewDate(mergedActivePickerIndex);
            const nextViewDate = getClosingViewDate(
                viewDate,
                picker,
                generateConfig
            );
            const currentMode = mergedModes[mergedActivePickerIndex];

            const showDoublePartial = currentMode === picker;
            const leftPartial = renderPartial(
                showDoublePartial ? 'left' : false,
                {
                    pickerValue: viewDate,
                    onPickerValueChange: (newViewDate: DateType) => {
                        setViewDate(newViewDate, mergedActivePickerIndex);
                    },
                }
            );
            const rightPartial = renderPartial('right', {
                pickerValue: nextViewDate,
                onPickerValueChange: (newViewDate: DateType) => {
                    setViewDate(
                        getClosingViewDate(
                            newViewDate,
                            picker,
                            generateConfig,
                            -1
                        ),
                        mergedActivePickerIndex
                    );
                },
            });

            if (direction === 'rtl') {
                partials = (
                    <>
                        {rightPartial}
                        {showDoublePartial && leftPartial}
                    </>
                );
            } else {
                partials = (
                    <>
                        {leftPartial}
                        {showDoublePartial && rightPartial}
                    </>
                );
            }
        } else {
            partials = renderPartial();
        }

        let mergedNodes: React.ReactNode = (
            <>
                <div className={styles.pickerPartials}>{partials}</div>
                {extraNode && (
                    <div className={styles.pickerFooterExtra}>{extraNode}</div>
                )}
                {rangesNode && (
                    <div className={styles.pickerFooter}>{rangesNode}</div>
                )}
            </>
        );

        if (partialRender) {
            mergedNodes = partialRender(mergedNodes);
        }

        return (
            <div
                className={styles.pickerPartialContainer}
                style={{ marginLeft: partialLeft }}
                ref={partialDivRef}
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
            >
                {mergedNodes}
            </div>
        );
    }

    const rangePartial = (
        <div
            className={mergeClasses([
                styles.pickerRangeWrapper,
                `picker-${picker}-range-wrapper`,
            ])}
            style={{ minWidth: popupMinWidth }}
        >
            <div
                ref={arrowRef}
                className={styles.pickerRangeArrow}
                style={arrowPositionStyle}
            />
            {renderPartials()}
        </div>
    );

    let suffixNode: React.ReactNode;
    if (suffixIcon) {
        suffixNode = <span className={styles.pickerSuffix}>{suffixIcon}</span>;
    }

    let clearNode: React.ReactNode;
    if (
        allowClear &&
        ((getValue(mergedValue, 0) && !mergedDisabled[0]) ||
            (getValue(mergedValue, 1) && !mergedDisabled[1]))
    ) {
        clearNode = (
            <span
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onMouseUp={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    let values = mergedValue;

                    if (!mergedDisabled[0]) {
                        values = updateValues(values, null, 0);
                    }
                    if (!mergedDisabled[1]) {
                        values = updateValues(values, null, 1);
                    }

                    triggerChange(values, null);
                    triggerOpen(false, mergedActivePickerIndex);
                }}
                className={styles.pickerClear}
            >
                {clearIcon || <span className={styles.pickerClearBtn} />}
            </span>
        );
    }

    const inputSharedProps = {
        size: getInputSize(picker, formatList[0], generateConfig),
    };

    let activeBarLeft: number = 0;
    let activeBarWidth: number = 0;
    if (
        startInputDivRef.current &&
        endInputDivRef.current &&
        separatorRef.current
    ) {
        if (
            mergedActivePickerIndex === 0 &&
            shape === DatePickerShape.Underline
        ) {
            activeBarWidth = startInputDivRef.current.offsetWidth + 20;
        } else if (
            mergedActivePickerIndex === 0 &&
            shape === DatePickerShape.Pill
        ) {
            activeBarLeft = 14;
            activeBarWidth = startInputDivRef.current.offsetWidth - 14;
        } else if (mergedActivePickerIndex === 0) {
            activeBarLeft = 8;
            activeBarWidth = startInputDivRef.current.offsetWidth - 8;
        } else if (shape === DatePickerShape.Underline) {
            activeBarLeft = arrowLeft;
            activeBarWidth = endInputDivRef.current.offsetWidth + 20;
        } else {
            activeBarLeft = arrowLeft;
            activeBarWidth = endInputDivRef.current.offsetWidth;
        }
    }
    const activeBarPositionStyle =
        direction === 'rtl'
            ? { right: activeBarLeft }
            : { left: activeBarLeft };
    const onContextSelect = (
        date: DateType,
        type: 'key' | 'mouse' | 'submit'
    ) => {
        const values = updateValues(
            selectedValue,
            date,
            mergedActivePickerIndex
        );

        if (type === 'submit' || (type !== 'key' && !needConfirmButton)) {
            // triggerChange will also update selected values
            triggerChange(values, mergedActivePickerIndex);
            // clear hover value style
            if (mergedActivePickerIndex === 0) {
                onStartLeave();
            } else {
                onEndLeave();
            }
        } else {
            setSelectedValue(values);
        }
    };

    return (
        <PartialContext.Provider
            value={{
                operationRef,
                hideHeader: picker === 'time',
                onDateMouseEnter,
                onDateMouseLeave,
                hideRanges: true,
                onSelect: onContextSelect,
                open: mergedOpen,
            }}
        >
            <OcPickerTrigger
                visible={mergedOpen}
                popupElement={rangePartial}
                popupStyle={popupStyle}
                popupPlacement={popupPlacement}
                dropdownClassNames={dropdownClassNames}
                dropdownAlign={dropdownAlign}
                getPopupContainer={getPopupContainer}
                range
                direction={direction}
            >
                <div
                    ref={containerRef}
                    className={mergeClasses([
                        styles.picker,
                        styles.pickerRange,
                        classNames,
                        {
                            [styles.pickerUnderline]:
                                shape === DatePickerShape.Underline,
                        },
                        { [styles.pickerBorderless]: !bordered },
                        {
                            [styles.pickerDisabled]:
                                mergedDisabled[0] && mergedDisabled[1],
                        },
                        {
                            [styles.pickerFocused]:
                                mergedActivePickerIndex === 0
                                    ? startFocused
                                    : endFocused,
                        },
                        { [styles.pickerRtl]: direction === 'rtl' },
                    ])}
                    style={style}
                    onClick={onPickerClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseDown={onPickerMouseDown}
                    onMouseUp={onMouseUp}
                    {...getDataOrAriaProps(props)}
                >
                    <div
                        className={mergeClasses([
                            styles.pickerInput,
                            {
                                ['picker-input-active']:
                                    mergedActivePickerIndex === 0,
                            },
                            {
                                [styles.pickerInputPlaceholder]:
                                    !!startHoverValue,
                            },
                        ])}
                        ref={startInputDivRef}
                    >
                        <input
                            id={id}
                            disabled={mergedDisabled[0]}
                            readOnly={
                                inputReadOnly ||
                                typeof formatList[0] === 'function' ||
                                !startTyping
                            }
                            value={startHoverValue || startText}
                            onChange={(e) => {
                                triggerStartTextChange(e.target.value);
                            }}
                            autoFocus={autoFocus}
                            placeholder={getValue(placeholder, 0) || ''}
                            ref={startInputRef}
                            {...startInputProps}
                            {...inputSharedProps}
                            autoComplete={autoComplete}
                        />
                    </div>
                    <div
                        className={'picker-range-separator'}
                        ref={separatorRef}
                    >
                        {separator}
                    </div>
                    <div
                        className={mergeClasses([
                            styles.pickerInput,
                            {
                                ['picker-input-active']:
                                    mergedActivePickerIndex === 1,
                            },
                            {
                                [styles.pickerInputPlaceholder]:
                                    !!endHoverValue,
                            },
                        ])}
                        ref={endInputDivRef}
                    >
                        <input
                            disabled={mergedDisabled[1]}
                            readOnly={
                                inputReadOnly ||
                                typeof formatList[0] === 'function' ||
                                !endTyping
                            }
                            value={endHoverValue || endText}
                            onChange={(e) => {
                                triggerEndTextChange(e.target.value);
                            }}
                            placeholder={getValue(placeholder, 1) || ''}
                            ref={endInputRef}
                            {...endInputProps}
                            {...inputSharedProps}
                            autoComplete={autoComplete}
                        />
                    </div>
                    <div
                        className={styles.pickerActiveBar}
                        style={{
                            ...activeBarPositionStyle,
                            width: activeBarWidth,
                            position: 'absolute',
                        }}
                    />
                    {suffixNode}
                    {clearNode}
                </div>
            </OcPickerTrigger>
        </PartialContext.Provider>
    );
}

// Wrap with class component to enable pass generic with instance method
class OcRangePicker<DateType> extends React.Component<
    OcRangePickerProps<DateType>
> {
    pickerRef = React.createRef<OcPickerRefConfig>();

    focus = () => {
        if (this.pickerRef.current) {
            this.pickerRef.current.focus();
        }
    };

    blur = () => {
        if (this.pickerRef.current) {
            this.pickerRef.current.blur();
        }
    };

    render() {
        return (
            <InnerRangePicker<DateType>
                {...this.props}
                pickerRef={
                    this.pickerRef as React.MutableRefObject<OcPickerRefConfig>
                }
            />
        );
    }
}

export default OcRangePicker;
