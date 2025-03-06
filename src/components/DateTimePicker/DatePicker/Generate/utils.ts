import type { ButtonProps } from '../../../Button';
import { Shape, Size } from '../../../ConfigProvider';
import type {
  DatePickerShape,
  DatePickerSize,
  OcPickerMode,
} from '../../Internal/OcPicker.types';
import type { SharedTimeProps } from '../../Internal/Partials/TimePartial/Time.types';

function toArray<T>(list: T | T[]): T[] {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
}

export function getTimeProps<DateType, DisabledTime>(
  props: { format?: string; picker?: OcPickerMode } & Omit<
    SharedTimeProps<DateType>,
    'disabledTime'
  > & {
      disabledTime?: DisabledTime;
    }
) {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } =
    props;

  const firstFormat: string = toArray(format)[0];
  const showTimeObj: {
    format?: string;
    nowButtonProps?: ButtonProps;
    okButtonProps?: ButtonProps;
    picker?: OcPickerMode;
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
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
    disabledTime?: DisabledTime;
  } = { ...props };

  if (firstFormat && typeof firstFormat === 'string') {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false;
    }
    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false;
    }
    if (
      !firstFormat.includes('H') &&
      !firstFormat.includes('h') &&
      showHour === undefined
    ) {
      showTimeObj.showHour = false;
    }

    if (
      (firstFormat.includes('a') || firstFormat.includes('A')) &&
      use12Hours === undefined
    ) {
      showTimeObj.use12Hours = true;
    }
  }

  if (picker === 'time') {
    return showTimeObj;
  }

  if (typeof firstFormat === 'function') {
    delete showTimeObj.format;
  }

  return {
    showTime: showTimeObj,
  };
}
