import type {
  DatePickerShape,
  DatePickerSize,
  Locale,
  NullableDateType,
  PartialSharedProps,
  PartialMode,
} from '../../OcPicker.types';
import type { GenerateConfig } from '../../Generate';
import { Shape, Size } from '../../../../ConfigProvider';

/**
 * Increment of 10 years.
 */
export const YEAR_DECADE_COUNT: number = 10;

/**
 * The number of columns in the year partial.
 */
export const YEAR_COL_COUNT: number = 3;

export type YearPartialProps<DateType> = {
  /**
   * The picker partial mode.
   */
  sourceMode: PartialMode;
} & PartialSharedProps<DateType>;

export type YearHeaderProps<DateType> = {
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
  /**
   * The DatePicker locale.
   */
  locale: Locale;
  /**
   * Callback executed onDecadeClick event.
   */
  onDecadeClick: () => void;
  /**
   * Callback executed onNextDecade event.
   */
  onNextDecade: () => void;
  /**
   * Callback executed onPrevDecade event.
   */
  onPrevDecade: () => void;
  /**
   * The DatePicker shape.
   */
  shape?: DatePickerShape | Shape;
  /**
   * The DatePicker size.
   */
  size?: DatePickerSize | Size;
  /**
   * The partial date value.
   */
  value?: DateType | null;
  /**
   * The partial view date value.
   */
  viewDate: DateType;
};

export type YearBodyProps<DateType> = {
  /**
   * Function that returns true or false to apply disabled year styles.
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
   */
  size?: DatePickerSize | Size;
  /**
   * The partial date value.
   */
  value?: NullableDateType<DateType>;
  /**
   * The partial view date value.
   */
  viewDate: DateType;
};
