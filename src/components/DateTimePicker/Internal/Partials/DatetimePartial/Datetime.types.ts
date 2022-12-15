import type { DatePartialProps } from '../DatePartial/Date.types';
import type { SharedTimeProps } from '../TimePartial/Time.types';
import type {
  DatePickerShape,
  DatePickerSize,
  DisabledTime,
} from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';

export type DatetimePartialProps<DateType> = {
  /**
   * The default date value.
   */
  defaultValue?: DateType;
  /**
   * Specified time that may not be selected.
   */
  disabledTime?: DisabledTime<DateType>;
  /**
   * The DatePicker shape.
   */
  shape?: DatePickerShape | Shape;
  /**
   * Enables time selection partial.
   */
  showTime?: boolean | SharedTimeProps<DateType>;
  /**
   * The DatePicker size.
   * @default DatePickerSize.Medium
   */
  size?: DatePickerSize | Size;
} & Omit<
  DatePartialProps<DateType>,
  'disabledHours' | 'disabledMinutes' | 'disabledSeconds'
>;
