import type { GenerateConfig } from '../../Generate';
import type { Locale } from '../../OcPicker.types';
import type {
  DatePickerShape,
  DatePickerSize,
  PartialSharedProps,
} from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';

/**
 * The number of columns in the quarter partial.
 */
export const QUARTER_COL_COUNT: number = 4;

export type QuarterPartialProps<DateType> = {} & PartialSharedProps<DateType>;

export type QuarterHeaderProps<DateType> = {
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
  /**
   * The DatePicker locale.
   */
  locale: Locale;
  /**
   * Callback executed onNextYear event.
   */
  onNextYear: () => void;
  /**
   * Callback executed onPrevYear event.
   */
  onPrevYear: () => void;
  /**
   * Callback executed onYearClick event.
   */
  onYearClick: () => void;
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
   * The current year.
   */
  viewDate: DateType;
};

export type QuarterBodyProps<DateType> = {
  /**
   * Whether the date is disabled.
   */
  disabledDate?: (date: DateType) => boolean;
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
  /**
   * The DatePicker locale.
   */
  locale: Locale;
  /**
   * Callback executed onSelect event.
   */
  onSelect: (value: DateType) => void;
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
   * The current date value.
   */
  value?: DateType | null;
  /**
   * The current quarter.
   */
  viewDate: DateType;
};
