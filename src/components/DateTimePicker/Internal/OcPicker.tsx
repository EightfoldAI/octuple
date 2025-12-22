'use client';

import React, { useEffect, useRef } from 'react';
import {
  CustomFormat,
  DatePickerShape,
  DatePickerSize,
  PartialMode,
  OcPickerBaseProps,
  OcPickerDateProps,
  OcPickerProps,
  OcPickerRefConfig,
  OcPickerTimeProps,
} from './OcPicker.types';
import { mergeClasses } from '../../../shared/utilities';
import visuallyHidden from '../../../shared/utilities/visuallyHidden';
import { FocusTrap } from '../../../shared/FocusTrap';
import { useMergedState } from '../../../hooks/useMergedState';
import OcPickerPartial from './OcPickerPartial';
import OcPickerTrigger from './OcPickerTrigger';
import { formatValue, isEqual, parseValue } from './Utils/dateUtil';
import getDataOrAriaProps, { getDatePickerId, toArray } from './Utils/miscUtil';
import type { ContextOperationRefProps } from './PartialContext';
import PartialContext from './PartialContext';
import type { OcPickerMode } from './OcPicker.types';
import {
  getDefaultFormat,
  getInputSize,
  elementsContains,
} from './Utils/uiUtil';
import usePickerInput from './Hooks/usePickerInput';
import useTextValueMapping from './Hooks/useTextValueMapping';
import useValueTexts from './Hooks/useValueTexts';
import useHoverValue from './Hooks/useHoverValue';

import styles from './ocpicker.module.scss';

type OmitType<DateType> = Omit<OcPickerBaseProps<DateType>, 'picker'> &
  Omit<OcPickerDateProps<DateType>, 'picker'> &
  Omit<OcPickerTimeProps<DateType>, 'picker'>;
type MergedOcPickerProps<DateType> = {
  picker?: OcPickerMode;
} & OmitType<DateType>;

function InnerPicker<DateType>(props: OcPickerProps<DateType>) {
  const {
    allowClear,
    announceArrowKeyNavigation,
    autoComplete = 'off',
    autoFocus,
    bordered = true,
    changeOnBlur = true,
    classNames,
    clearIcon,
    clearIconAriaLabelText,
    defaultOpen,
    defaultValue,
    direction,
    disabled,
    readonly,
    disabledDate,
    dropdownAlign,
    dropdownClassNames,
    format,
    generateConfig,
    getPopupContainer,
    id,
    label,
    inputReadOnly,
    inputRender,
    locale,
    nowButtonProps,
    nowText,
    okButtonProps,
    okText,
    onBlur,
    onChange,
    onClick,
    onContextMenu,
    onFocus,
    onKeyDown,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    onOpenChange,
    onSelect,
    open,
    partialRender,
    picker = 'date',
    pickerRef,
    placeholder,
    popupPlacement,
    popupStyle,
    shape = DatePickerShape.Rectangle,
    showNow,
    showOk,
    showTime,
    showToday,
    size = DatePickerSize.Medium,
    style,
    suffixIcon,
    tabIndex,
    todayButtonProps,
    todayActive,
    todayText,
    trapFocus = true,
    use12Hours,
    value,
  } = props as MergedOcPickerProps<DateType>;

  const inputRef: React.MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const closedByEscRef: React.MutableRefObject<boolean> =
    useRef<boolean>(false);

  const needConfirmButton: boolean =
    (picker === 'date' && !!showTime) || picker === 'time';

  const formatList: (string | CustomFormat<DateType>)[] = toArray(
    getDefaultFormat(format, picker, showTime, use12Hours)
  );

  // Generate unique ID if not provided
  const datePickerId: string = id || getDatePickerId();
  // Check if this is a time picker
  const isTimePicker: boolean = picker === 'time';
  // Generate listbox ID for time picker
  const listboxId: string = `${datePickerId}-listbox`;

  const partialDivRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const inputDivRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const containerRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

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
    useRef<ContextOperationRefProps>(null);

  // Open
  const [mergedOpen, triggerInnerOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
    postState: (postOpen) => (disabled || readonly ? false : postOpen),
    onChange: (newOpen) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      }

      if (!newOpen && operationRef.current && operationRef.current.onClose) {
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
    if ((disabled || readonly) && newOpen) {
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

  const onInternalBlur: React.FocusEventHandler<HTMLInputElement> = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ): void => {
    if (changeOnBlur) {
      triggerChange(selectedValue);
    }

    onBlur?.(e);
  };

  const [inputProps, { focused, typing, trap, setTrap }] = usePickerInput({
    trapFocus,
    blurToCancel: needConfirmButton,
    open: mergedOpen,
    value: text,
    triggerOpen,
    forwardKeyDown,
    isClickOutside: (target: EventTarget): boolean =>
      !elementsContains(
        [partialDivRef.current, inputDivRef.current, containerRef.current],
        target as HTMLElement
      ),
    onSubmit: (): boolean | void => {
      if (
        // When user typing disabledDate with keyboard and enter, this value will be empty
        !selectedValue ||
        // Normal disabled check
        disabledDate?.(selectedValue)
      ) {
        return false;
      }

      triggerChange(selectedValue);
      triggerOpen(false);
      resetText();
      return true;
    },
    onCancel: (): void => {
      triggerOpen(false);
      setSelectedValue(mergedValue);
      resetText();
    },
    onKeyDown: (
      e: React.KeyboardEvent<HTMLInputElement>,
      preventDefault: () => void
    ): void => {
      onKeyDown?.(e, preventDefault);
    },
    onFocus,
    onBlur: onInternalBlur,
    changeOnBlur,
    closedByEscRef,
  });

  // Close should sync back with text value
  useEffect((): void => {
    if (!mergedOpen) {
      if (closedByEscRef.current) {
        closedByEscRef.current = false;
        return;
      }

      setSelectedValue(mergedValue);

      if (!valueTexts.length || valueTexts[0] === '') {
        triggerTextChange('');
      } else if (firstValueText !== text) {
        resetText();
      }
    }
  }, [mergedOpen, valueTexts]);

  // Change picker should sync back with text value
  useEffect((): void => {
    if (!mergedOpen) {
      resetText();
    }
  }, [picker]);

  // Sync innerValue with control mode
  useEffect((): void => {
    // Sync select value
    setSelectedValue(mergedValue);
  }, [mergedValue]);

  if (pickerRef) {
    pickerRef.current = {
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
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
    // Remove `picker` & `format` here since TimePicker partial isn't much different than other partials.
    ...(props as Omit<MergedOcPickerProps<DateType>, 'picker' | 'format'>),
    classNames: undefined,
    style: undefined,
    pickerValue: undefined,
    onPickerValueChange: undefined,
    onChange: null,
  };

  let partialNode: React.ReactNode = (
    <OcPickerPartial<DateType>
      {...partialProps}
      generateConfig={generateConfig}
      classNames={mergeClasses([{ [styles.pickerPartialFocused]: !typing }])}
      value={selectedValue}
      locale={locale}
      tabIndex={-1}
      nowButtonProps={nowButtonProps}
      nowText={nowText}
      okButtonProps={okButtonProps}
      okText={okText}
      showNow={showNow}
      showOk={showOk}
      showToday={showToday}
      todayButtonProps={todayButtonProps}
      todayActive={todayActive}
      todayText={todayText}
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
      size={size}
      visible={mergedOpen}
      trap={trap}
      announceArrowKeyNavigation={announceArrowKeyNavigation}
      {...(isTimePicker && { listboxId })}
    />
  );

  if (partialRender) {
    partialNode = partialRender(partialNode);
  }

  const partial: JSX.Element = trapFocus ? (
    <FocusTrap
      data-testid="picker-dialog"
      {...(!isTimePicker && { role: 'dialog' })}
      {...(isTimePicker && { id: listboxId })}
      {...(!isTimePicker && { 'aria-modal': 'true' })}
      {...(!isTimePicker && { 'aria-labelledby': 'dp-dialog-1-label' })}
      trap={trap}
      className={styles.pickerPartialContainer}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          triggerOpen(false);
          setTrap(false);
        }
      }}
    >
      {partialNode}
    </FocusTrap>
  ) : (
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
    suffixNode = (
      <span
        className={styles.pickerSuffix}
        onMouseDown={(
          e: React.MouseEvent<HTMLSpanElement, MouseEvent>
        ): void => {
          e.preventDefault();
        }}
      >
        {suffixIcon}
      </span>
    );
  }

  let clearNode: React.ReactNode;
  if (allowClear && mergedValue && !disabled && !readonly) {
    clearNode = (
      <span
        aria-label={clearIconAriaLabelText}
        onMouseDown={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseUp={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
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

  // For time picker, use listbox role; for others, use dialog
  const popupRole: 'listbox' | 'dialog' = isTimePicker ? 'listbox' : 'dialog';
  const popupId: string = isTimePicker ? listboxId : 'dp-dialog-1';

  const mergedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    role: 'combobox',
    'aria-expanded': mergedOpen,
    'aria-haspopup': popupRole,
    ...(mergedOpen && { 'aria-controls': popupId }),
    'aria-label':
      label ||
      placeholder ||
      (isTimePicker ? locale.timeSelect : locale.dateSelect),
    id: datePickerId,
    tabIndex,
    disabled,
    readOnly:
      readonly ||
      inputReadOnly ||
      typeof formatList[0] === 'function' ||
      !typing,
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

  const onContextSelect = (
    date: DateType,
    type: 'key' | 'mouse' | 'submit'
  ) => {
    if (type === 'submit' || (type !== 'key' && !needConfirmButton)) {
      // triggerChange will also update selected values
      triggerChange(date);
      triggerOpen(false);
      if (trapFocus) {
        setTrap(false);
      }
    }
  };

  return (
    <PartialContext.Provider
      value={{
        operationRef,
        hideHeader: picker === 'time',
        partialRef: partialDivRef,
        onSelect: onContextSelect,
        open: mergedOpen,
        onDateMouseEnter: onEnter,
        onDateMouseLeave: onLeave,
        trapFocus: trapFocus && trap,
      }}
    >
      <OcPickerTrigger
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
            {
              [styles.pickerUnderline]: shape === DatePickerShape.Underline,
            },
            { [styles.pickerBorderless]: !bordered },
            { [styles.pickerDisabled]: disabled },
            { [styles.pickerReadonly]: readonly },
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
          {(label || placeholder) && (
            <label htmlFor={datePickerId} style={visuallyHidden}>
              {label || placeholder}
            </label>
          )}
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
      </OcPickerTrigger>
    </PartialContext.Provider>
  );
}

// Wrap with class component to enable pass generic with instance method
class OcPicker<DateType> extends React.Component<OcPickerProps<DateType>> {
  pickerRef: React.RefObject<OcPickerRefConfig> =
    React.createRef<OcPickerRefConfig>();

  focus = (): void => {
    if (this.pickerRef.current) {
      this.pickerRef.current.focus();
    }
  };

  blur = (): void => {
    if (this.pickerRef.current) {
      this.pickerRef.current.blur();
    }
  };

  render() {
    return (
      <InnerPicker<DateType>
        {...this.props}
        pickerRef={this.pickerRef as React.MutableRefObject<OcPickerRefConfig>}
      />
    );
  }
}

export default OcPicker;
