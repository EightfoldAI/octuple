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
import PartialContext, { PartialContextProps } from './PartialContext';
import { PickerModeMap } from './Utils/uiUtil';
import RangeContext from './RangeContext';
import { getExtraFooter } from './Utils/getExtraFooter';
import getRanges from './Utils/getRanges';
import { getLowerBoundTime, setDateTime, setTime } from './Utils/timeUtil';
import { Button, ButtonSize, ButtonVariant } from '../../Button';
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
    components,
    defaultPickerValue,
    defaultValue,
    direction,
    disabledDate,
    generateConfig,
    hideHeader,
    hourStep = 1,
    locale,
    minuteStep = 1,
    mode,
    nowButtonProps,
    nowText,
    okButtonProps,
    okText,
    onChange,
    onMouseDown,
    onOk,
    onPartialChange,
    onPickerValueChange,
    onSelect,
    picker = 'date',
    pickerValue,
    renderExtraFooter,
    secondStep = 1,
    showNow,
    showOk,
    showTime,
    showToday,
    size = DatePickerSize.Medium,
    style,
    tabIndex = 0,
    todayButtonProps,
    todayActive,
    todayText,
    value,
    visible,
    trap,
    announceArrowKeyNavigation,
    listboxId,
  } = props as MergedPickerPartialProps<DateType>;
  const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
  const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
  const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
  const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);
  const needConfirmButton: boolean =
    (picker === 'date' && !!showTime) || picker === 'time';

  const isHourStepValid: boolean = 24 % hourStep === 0;
  const isMinuteStepValid: boolean = 60 % minuteStep === 0;
  const isSecondStepValid: boolean = 60 % secondStep === 0;

  const partialContext: PartialContextProps = useContext(PartialContext);
  const {
    operationRef,
    partialRef: partialDivRef,
    onSelect: onContextSelect,
    hideRanges,
  } = partialContext;

  const { inRange, partialPosition, rangedValue, hoverRangedValue } =
    useContext(RangeContext);
  const partialRef: React.MutableRefObject<PartialRefProps> =
    useRef<PartialRefProps>({});

  // Handle init logic
  const initRef: React.MutableRefObject<boolean> = useRef(true);

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
    postState: (date: DateType) => {
      const now = generateConfig.getNow();
      if (!date) {
        return now;
      }
      // When value is null and set showTime
      if (!mergedValue && showTime) {
        const defaultDateObject =
          typeof showTime === 'object' ? showTime.defaultValue : defaultValue;
        return setDateTime(
          generateConfig,
          Array.isArray(date) ? date[0] : date,
          defaultDateObject || now
        );
      }
      return Array.isArray(date) ? date[0] : date;
    },
  });

  const setViewDate = (date: DateType): void => {
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
      (mergedMode !== nextMode || isEqual(generateConfig, viewDate, viewDate))
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

  const onInternalKeyDown = (e: React.KeyboardEvent<HTMLElement>): boolean => {
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

  const onInternalBlur: React.FocusEventHandler<HTMLElement> = (
    event: React.FocusEvent<HTMLElement, Element>
  ): void => {
    if (partialRef.current?.onBlur) {
      partialRef.current.onBlur(event);
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
    locale,
    operationRef: partialRef,
    viewDate,
    value: mergedValue,
    onViewDateChange: setViewDate,
    sourceMode,
    onPartialChange: onInternalPartialChange,
    disabledDate,
    visible,
    trap,
    announceArrowKeyNavigation,
  };
  delete pickerProps.onChange;
  delete pickerProps.onSelect;

  switch (mergedMode) {
    case 'decade':
      partialNode = (
        <DecadePartial<DateType>
          {...pickerProps}
          onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
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
          onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
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
          onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
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
          onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
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
          onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
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
          onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
            setViewDate(date);
            triggerSelect(date, type);
          }}
          size={size}
          listboxId={props.listboxId}
        />
      );
      break;

    default:
      if (showTime) {
        partialNode = (
          <DateTimePartial
            {...pickerProps}
            onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
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
            onSelect={(date: DateType, type: 'key' | 'mouse' | 'submit') => {
              setViewDate(date);
              triggerSelect(date, type);
            }}
            size={size}
            todayActive={todayActive}
          />
        );
      }
  }

  let extraFooter: React.ReactNode;
  let rangesNode: React.ReactNode;

  const onNow = (): void => {
    const now: DateType = generateConfig.getNow();
    const lowerBoundTime: [number, number, number] = getLowerBoundTime(
      generateConfig.getHour(now),
      generateConfig.getMinute(now),
      generateConfig.getSecond(now),
      isHourStepValid ? hourStep : 1,
      isMinuteStepValid ? minuteStep : 1,
      isSecondStepValid ? secondStep : 1
    );
    const adjustedNow: DateType = setTime(
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
      nowButtonProps,
      nowText,
      okButtonProps,
      okDisabled: !mergedValue || (disabledDate && disabledDate(mergedValue)),
      okText,
      onNow: needConfirmButton && onNow,
      onOk: () => {
        if (mergedValue) {
          triggerSelect(mergedValue, 'submit', true);
          if (onOk) {
            onOk(mergedValue);
          }
        }
      },
      showNow,
      showOk,
      size: size,
    });
  }

  const datePickerSizeToButtonSizeMap: Map<
    DatePickerSize | Size,
    Size | ButtonSize
  > = new Map<DatePickerSize | Size, ButtonSize | Size>([
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
      <Button
        data-testid="picker-today-btn"
        text={todayText}
        variant={ButtonVariant.SystemUI}
        onKeyDown={(e) => {
          const isEventKey = [' ', 'Enter'].includes(e.key);
          if (isEventKey && !disabled) {
            triggerSelect(now, 'mouse', true);
          }
        }}
        {...todayButtonProps}
        aria-disabled={disabled}
        classNames={mergeClasses([
          'picker-today-btn',
          disabled && 'picker-today-btn-disabled',
          !!todayButtonProps?.classNames && todayButtonProps.classNames,
        ])}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (!disabled) {
            triggerSelect(now, 'mouse', true);
          }
          todayButtonProps?.onClick?.(e);
        }}
        size={datePickerSizeToButtonSizeMap.get(size)}
      />
    );
  }

  return (
    <PartialContext.Provider
      value={{
        ...partialContext,
        mode: mergedMode,
        hideHeader:
          'hideHeader' in props ? hideHeader : partialContext.hideHeader,
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
            [styles.pickerPartialHasRange]:
              rangedValue && rangedValue[0] && rangedValue[1],
          },
          {
            ['picker-partial-has-range-hover']:
              hoverRangedValue && hoverRangedValue[0] && hoverRangedValue[1],
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
            <div className={styles.pickerFooterExtraBorder}>{extraFooter}</div>
          </div>
        )}
        {rangesNode || todayNode ? (
          <div className={styles.pickerFooter}>
            <div className={styles.pickerFooterBorder}>
              {rangesNode}
              {todayNode}
            </div>
          </div>
        ) : null}
      </div>
    </PartialContext.Provider>
  );
}

export default OcPickerPartial;
