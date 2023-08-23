import React from 'react';
import { DatetimePartialProps } from './Datetime.types';
import { mergeClasses } from '../../../../../shared/utilities';
import { eventKeys } from '../../../../../shared/utilities';
import DatePartial from '../DatePartial/Date';
import TimePartial from '../TimePartial/Time';
import { tuple } from '../../Utils/miscUtil';
import { setDateTime as setTime } from '../../Utils/timeUtil';
import type {
  DatePickerShape,
  DisabledTimes,
  PartialRefProps,
} from '../../OcPicker.types';
import { DatePickerSize } from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';
import { ButtonProps } from '../../../../Button';

import styles from '../../ocpicker.module.scss';

const ACTIVE_PARTIAL: ['date', 'time'] = tuple('date', 'time');
type ActivePartialType = typeof ACTIVE_PARTIAL[number];

function DatetimePartial<DateType>(props: DatetimePartialProps<DateType>) {
  const {
    defaultValue,
    disabledTime,
    generateConfig,
    onSelect,
    operationRef,
    showTime,
    size = DatePickerSize.Medium,
    value,
  } = props;
  const [activePartial, setActivePartial] =
    React.useState<ActivePartialType | null>(null);

  const dateOperationRef: React.MutableRefObject<PartialRefProps> =
    React.useRef<PartialRefProps>({});
  const timeOperationRef: React.MutableRefObject<PartialRefProps> =
    React.useRef<PartialRefProps>({});

  const timeProps: {
    format?: string;
    nowButtonProps?: ButtonProps;
    okButtonProps?: ButtonProps;
    showNow?: boolean;
    showOk?: boolean;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    use12Hours?: boolean;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    hideDisabledOptions?: boolean;
    defaultValue?: DateType;
    disabledTime?: (date: DateType) => DisabledTimes;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
  } = typeof showTime === 'object' ? { ...showTime } : {};

  const getNextActive = (offset: number): 'time' | 'date' => {
    const activeIndex: number = ACTIVE_PARTIAL.indexOf(activePartial!) + offset;
    const nextActivePartial: 'date' | 'time' =
      ACTIVE_PARTIAL[activeIndex] || null;
    return nextActivePartial;
  };

  const onBlur = (event?: React.FocusEvent<HTMLElement>): void => {
    if (timeOperationRef.current.onBlur) {
      timeOperationRef.current.onBlur(event!);
    }
    setActivePartial(null);
  };

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>): boolean => {
      // Switch active partial
      if (event.key === eventKeys.TAB) {
        const nextActivePartial: 'date' | 'time' = getNextActive(
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
        const ref: React.MutableRefObject<PartialRefProps> =
          activePartial === 'date' ? dateOperationRef : timeOperationRef;

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

  const onInternalSelect = (date: DateType, source: 'date' | 'time'): void => {
    let selectedDate: DateType = date;

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

  const disabledTimes: DisabledTimes = disabledTime
    ? disabledTime(value || null)
    : {};

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
        onSelect={(date: DateType): void => {
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
        onSelect={(date: DateType): void => {
          onInternalSelect(date, 'time');
        }}
        size={size}
      />
    </div>
  );
}

export default DatetimePartial;
