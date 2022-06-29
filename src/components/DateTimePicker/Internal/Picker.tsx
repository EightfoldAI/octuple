import React, { useEffect } from 'react';
import {
    CustomFormat,
    PartialMode,
    PickerBaseProps,
    PickerDateProps,
    PickerProps,
    PickerRefConfig,
    PickerTimeProps,
} from './Picker.types';
import { mergeClasses } from '../../../shared/utilities';
import { useMergedState } from '../../../hooks/useMergedState';
import PickerPartial from './PickerPartial';
import PickerTrigger from './PickerTrigger';
import { formatValue, isEqual, parseValue } from './Utils/dateUtil';
import getDataOrAriaProps, { toArray } from './Utils/miscUtil';
import type { ContextOperationRefProps } from './PartialContext';
import PartialContext from './PartialContext';
import type { PickerMode } from './Picker.types';
import {
    getDefaultFormat,
    getInputSize,
    elementsContains,
} from './Utils/uiUtil';
import usePickerInput from './Hooks/usePickerInput';
import useTextValueMapping from './Hooks/useTextValueMapping';
import useValueTexts from './Hooks/useValueTexts';
import useHoverValue from './Hooks/useHoverValue';

import styles from './picker.module.scss';

type OmitType<DateType> = Omit<PickerBaseProps<DateType>, 'picker'> &
    Omit<PickerDateProps<DateType>, 'picker'> &
    Omit<PickerTimeProps<DateType>, 'picker'>;
type MergedPickerProps<DateType> = {
    picker?: PickerMode;
} & OmitType<DateType>;

function InnerPicker<DateType>(props: PickerProps<DateType>) {
    const {
        id,
        tabIndex,
        style,
        classNames,
        dropdownClassNames,
        dropdownAlign,
        popupStyle,
        generateConfig,
        locale,
        inputReadOnly,
        allowClear,
        autoFocus,
        showTime,
        picker = 'date',
        format,
        use12Hours,
        value,
        defaultValue,
        open,
        defaultOpen,
        defaultOpenValue,
        suffixIcon,
        clearIcon,
        disabled,
        disabledDate,
        placeholder,
        getPopupContainer,
        pickerRef,
        partialRender,
        onChange,
        onOpenChange,
        onFocus,
        onBlur,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        onContextMenu,
        onClick,
        onKeyDown,
        onSelect,
        direction,
        autoComplete = 'off',
        inputRender,
    } = props as MergedPickerProps<DateType>;

    const inputRef: React.MutableRefObject<HTMLInputElement> =
        React.useRef<HTMLInputElement>(null);

    const needConfirmButton: boolean =
        (picker === 'date' && !!showTime) || picker === 'time';

    const formatList: (string | CustomFormat<DateType>)[] = toArray(
        getDefaultFormat(format, picker, showTime, use12Hours)
    );

    const partialDivRef: React.MutableRefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null);
    const inputDivRef: React.MutableRefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null);
    const containerRef: React.MutableRefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null);

    // Real value
    const [mergedValue, setInnerValue] = useMergedState(null, {
        value,
        defaultValue,
    });

    // Selected value
    const [selectedValue, setSelectedValue] = React.useState<DateType | null>(
        mergedValue
    );

    // Operation ref
    const operationRef: React.MutableRefObject<ContextOperationRefProps | null> =
        React.useRef<ContextOperationRefProps>(null);

    // Open
    const [mergedOpen, triggerInnerOpen] = useMergedState(false, {
        value: open,
        defaultValue: defaultOpen,
        postState: (postOpen) => (disabled ? false : postOpen),
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

    const [valueTexts, firstValueText] = useValueTexts(selectedValue, {
        formatList,
        generateConfig,
        locale,
    });

    const [text, triggerTextChange, resetText] = useTextValueMapping({
        valueTexts,
        onTextChange: (newText) => {
            const inputDate: any = parseValue(newText, {
                locale,
                formatList,
                generateConfig,
            });
            if (inputDate && (!disabledDate || !disabledDate(inputDate))) {
                setSelectedValue(inputDate);
            }
        },
    });

    const triggerChange = (newValue: DateType | null): void => {
        setSelectedValue(newValue);
        setInnerValue(newValue);

        if (onChange && !isEqual(generateConfig, mergedValue, newValue)) {
            onChange(
                newValue,
                newValue
                    ? formatValue(newValue, {
                          generateConfig,
                          locale,
                          format: formatList[0],
                      })
                    : ''
            );
        }
    };

    const triggerOpen = (newOpen: boolean): void => {
        if (disabled && newOpen) {
            return;
        }

        triggerInnerOpen(newOpen);
    };

    const forwardKeyDown = (e: React.KeyboardEvent<HTMLElement>): boolean => {
        if (mergedOpen && operationRef.current?.onKeyDown) {
            // Let popup partial handle keyboard
            return operationRef.current?.onKeyDown(e);
        }

        return null;
    };

    const onInternalMouseUp: React.MouseEventHandler<HTMLDivElement> = (
        ...args
    ) => {
        if (onMouseUp) {
            onMouseUp(...args);
        }

        if (inputRef.current) {
            inputRef.current.focus();
            triggerOpen(true);
        }
    };

    const [inputProps, { focused, typing }] = usePickerInput({
        blurToCancel: needConfirmButton,
        open: mergedOpen,
        value: text,
        triggerOpen,
        forwardKeyDown,
        isClickOutside: (target) =>
            !elementsContains(
                [
                    partialDivRef.current,
                    inputDivRef.current,
                    containerRef.current,
                ],
                target as HTMLElement
            ),
        onSubmit: () => {
            if (
                // When user typing disabledDate with keyboard and enter, this value will be empty
                !selectedValue ||
                // Normal disabled check
                (disabledDate && disabledDate(selectedValue))
            ) {
                return false;
            }

            triggerChange(selectedValue);
            triggerOpen(false);
            resetText();
            return true;
        },
        onCancel: () => {
            triggerOpen(false);
            setSelectedValue(mergedValue);
            resetText();
        },
        onKeyDown: (e, preventDefault) => {
            onKeyDown?.(e, preventDefault);
        },
        onFocus,
        onBlur,
    });

    // Close should sync back with text value
    useEffect(() => {
        if (!mergedOpen) {
            setSelectedValue(mergedValue);

            if (!valueTexts.length || valueTexts[0] === '') {
                triggerTextChange('');
            } else if (firstValueText !== text) {
                resetText();
            }
        }
    }, [mergedOpen, valueTexts]);

    // Change picker should sync back with text value
    useEffect(() => {
        if (!mergedOpen) {
            resetText();
        }
    }, [picker]);

    // Sync innerValue with control mode
    useEffect(() => {
        // Sync select value
        setSelectedValue(mergedValue);
    }, [mergedValue]);

    if (pickerRef) {
        pickerRef.current = {
            focus: () => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            },
            blur: () => {
                if (inputRef.current) {
                    inputRef.current.blur();
                }
            },
        };
    }

    const [hoverValue, onEnter, onLeave] = useHoverValue(text, {
        formatList,
        generateConfig,
        locale,
    });

    const partialProps: {
        classNames: any;
        style: any;
        pickerValue: any;
        onPickerValueChange: any;
        onChange: any;
    } = {
        // Remove `picker` & `format` here since TimePicker is little different with other partial
        ...(props as Omit<MergedPickerProps<DateType>, 'picker' | 'format'>),
        classNames: undefined,
        style: undefined,
        pickerValue: undefined,
        onPickerValueChange: undefined,
        onChange: null,
    };

    let partialNode: React.ReactNode = (
        <PickerPartial<DateType>
            {...partialProps}
            generateConfig={generateConfig}
            classNames={mergeClasses([
                { [styles.pickerPartialFocused]: !typing },
            ])}
            value={selectedValue}
            locale={locale}
            tabIndex={-1}
            onSelect={(date: DateType) => {
                onSelect?.(date);
                setSelectedValue(date);
            }}
            direction={direction}
            onPartialChange={(viewDate: DateType, mode: PartialMode) => {
                const { onPartialChange } = props;
                onLeave(true);
                onPartialChange?.(viewDate, mode);
            }}
        />
    );

    if (partialRender) {
        partialNode = partialRender(partialNode);
    }

    const partial = (
        <div
            className={styles.pickerPartialContainer}
            onMouseDown={(e) => {
                e.preventDefault();
            }}
        >
            {partialNode}
        </div>
    );

    let suffixNode: React.ReactNode;
    if (suffixIcon) {
        suffixNode = <span className={'picker-suffix'}>{suffixIcon}</span>;
    }

    let clearNode: React.ReactNode;
    if (allowClear && mergedValue && !disabled) {
        clearNode = (
            <span
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onMouseUp={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    triggerChange(null);
                    triggerOpen(false);
                }}
                className={styles.pickerClear}
                role="button"
            >
                {clearIcon || <span className={styles.pickerClearBtn} />}
            </span>
        );
    }

    const mergedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
        id,
        tabIndex,
        disabled,
        readOnly:
            inputReadOnly || typeof formatList[0] === 'function' || !typing,
        value: hoverValue || text,
        onChange: (e) => {
            triggerTextChange(e.target.value);
        },
        autoFocus,
        placeholder,
        ref: inputRef,
        title: text,
        ...inputProps,
        size: getInputSize(picker, formatList[0], generateConfig),
        ...getDataOrAriaProps(props),
        autoComplete,
    };

    const inputNode: React.ReactNode = inputRender ? (
        inputRender(mergedInputProps)
    ) : (
        <input {...mergedInputProps} />
    );

    // ============================ Return =============================
    const onContextSelect = (
        date: DateType,
        type: 'key' | 'mouse' | 'submit'
    ) => {
        if (type === 'submit' || (type !== 'key' && !needConfirmButton)) {
            // triggerChange will also update selected values
            triggerChange(date);
            triggerOpen(false);
        }
    };
    const popupPlacement = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';

    return (
        <PartialContext.Provider
            value={{
                operationRef,
                hideHeader: picker === 'time',
                partialRef: partialDivRef,
                onSelect: onContextSelect,
                open: mergedOpen,
                defaultOpenValue,
                onDateMouseEnter: onEnter,
                onDateMouseLeave: onLeave,
            }}
        >
            <PickerTrigger
                visible={mergedOpen}
                popupElement={partial}
                popupStyle={popupStyle}
                dropdownClassNames={dropdownClassNames}
                dropdownAlign={dropdownAlign}
                getPopupContainer={getPopupContainer}
                popupPlacement={popupPlacement}
                direction={direction}
            >
                <div
                    ref={containerRef}
                    className={mergeClasses([
                        styles.picker,
                        classNames,
                        { ['picker-disabled']: disabled },
                        { [styles.pickerFocused]: focused },
                        { [styles.pickerRtl]: direction === 'rtl' },
                    ])}
                    style={style}
                    onMouseDown={onMouseDown}
                    onMouseUp={onInternalMouseUp}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onContextMenu={onContextMenu}
                    onClick={onClick}
                >
                    <div
                        className={mergeClasses([
                            styles.pickerInput,
                            { [styles.pickerInputPlaceholder]: !!hoverValue },
                        ])}
                        ref={inputDivRef}
                    >
                        {inputNode}
                        {suffixNode}
                        {clearNode}
                    </div>
                </div>
            </PickerTrigger>
        </PartialContext.Provider>
    );
}

// Wrap with class component to enable pass generic with instance method
class Picker<DateType> extends React.Component<PickerProps<DateType>> {
    pickerRef = React.createRef<PickerRefConfig>();

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
            <InnerPicker<DateType>
                {...this.props}
                pickerRef={
                    this.pickerRef as React.MutableRefObject<PickerRefConfig>
                }
            />
        );
    }
}

export default Picker;
