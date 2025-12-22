import type {
  DatePickerShape,
  DatePickerSize,
  DisabledTimes,
  Locale,
  OnSelect,
  PartialSharedProps,
} from '../../OcPicker.types';
import type { GenerateConfig } from '../../Generate';
import { Shape, Size } from '../../../../ConfigProvider';
import { ButtonProps } from '../../../../Button';

export type Unit = {
  /**
   * Whether the unit of time is disabled.
   */
  disabled: boolean;
  /**
   * The unit of time label.
   */
  label: React.ReactText;
  /**
   * The unit of time value.
   */
  value: number;
};

export type TimeUnitColumnProps = {
  /**
   * Whether the time unit column is active.
   */
  active?: boolean;
  /**
   * Whether the time unit has disabled options.
   */
  hideDisabledOptions?: boolean;
  /**
   * Callback executed onSelect event.
   */
  onSelect?: (value: number) => void;
  /**
   * The DatePicker shape.
   */
  shape?: DatePickerShape | Shape;
  /**
   * The DatePicker size.
   * @default DatePickerSize.Medium
   */
  size?: DatePickerSize | Size;
  /**
   * Units of time.
   */
  units?: Unit[];
  /**
   * The currently picked unit value.
   */
  value?: number;
};

export type SharedTimeProps<DateType> = {
  /**
   * The default time value.
   */
  defaultValue?: DateType;
  /**
   * Function that returns disabled hours, minutes, and seconds.
   */
  disabledTime?: (date: DateType) => DisabledTimes;
  /**
   * The inherited date format string.
   */
  format?: string;
  /**
   * Whether the time unit has disabled options.
   */
  hideDisabledOptions?: boolean;
  /**
   * The hour step.
   * @default 1
   */
  hourStep?: number;
  /**
   * The minute step.
   * @default 1
   */
  minuteStep?: number;
  /**
   * The 'Now' button props.
   */
  nowButtonProps?: ButtonProps;
  /**
   * The 'OK' button props.
   */
  okButtonProps?: ButtonProps;
  /**
   * The second step
   * @default 1
   */
  secondStep?: number;
  /**
   * The DatePicker shape.
   */
  shape?: DatePickerShape | Shape;
  /**
   * Whether to show the hour column.
   */
  showHour?: boolean;
  /**
   * Whether to show the minute column.
   */
  showMinute?: boolean;
  /**
   * Show 'Now' button in partial when `showTime` is set.
   */
  showNow?: boolean;
  /**
   * Show 'OK' button in partial when `showTime` is set.
   */
  showOk?: boolean;
  /**
   * Whether to show the second column.
   */
  showSecond?: boolean;
  /**
   * The DatePicker size.
   * @default DatePickerSize.Medium
   */
  size?: DatePickerSize | Size;
  /**
   * Whether to use 12 hour (HH:MM:SS) time format.
   */
  use12Hours?: boolean;
};

export type TimePartialProps<DateType> = {
  /**
   * Whether the partial is active.
   */
  active?: boolean;
  /**
   * The inherited date format string.
   */
  format?: string;
  /**
   * The listbox ID for accessibility.
   */
  listboxId?: string;
} & PartialSharedProps<DateType> &
  SharedTimeProps<DateType>;

export type TimeHeaderProps<DateType> = {
  /**
   * The inherited date format string.
   */
  format: string;
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
  /**
   * The DatePicker locale.
   */
  locale: Locale;
  /**
   * The DatePicker shape.
   */
  shape?: DatePickerShape | Shape;
  /**
   * The DatePicker size.
   * @default DatePickerSize.Medium
   */
  size?: DatePickerSize | Size;
  /**
   * The partial time value.
   */
  value?: DateType | null;
};

export type BodyOperationRef = {
  /**
   * Callback executed onUpDown event.
   */
  onUpDown: (diff: number) => void;
};

export type TimeBodyProps<DateType> = {
  /**
   * The active time column index.
   */
  activeColumnIndex: number;
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
  /**
   * The DatePicker locale.
   */
  locale: Locale;
  /**
   * onSelect handler.
   */
  onSelect: OnSelect<DateType>;
  /**
   * The partial ref.
   */
  operationRef: React.MutableRefObject<BodyOperationRef | undefined>;
  /**
   * The partial time value.
   */
  value?: DateType | null;
  /**
   * The listbox ID for accessibility.
   */
  listboxId?: string;
} & SharedTimeProps<DateType>;
