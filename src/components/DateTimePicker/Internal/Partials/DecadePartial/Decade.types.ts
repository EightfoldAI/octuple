import type {
  DatePickerShape,
  DatePickerSize,
  Locale,
  PartialSharedProps,
} from '../../OcPicker.types';
import type { GenerateConfig } from '../../Generate';
import { Shape, Size } from '../../../../ConfigProvider';

export const DECADE_UNIT_DIFF: number = 10;
export const DECADE_DISTANCE_COUNT: number = DECADE_UNIT_DIFF * 10;
export const DECADE_COL_COUNT: number = 3;
export const DECADE_ROW_COUNT: number = 4;

export type DecadePartialProps<DateType> = PartialSharedProps<DateType>;

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
   * Callback executed onNextDecades event.
   */
  onNextDecades: () => void;
  /**
   * Callback executed onPrevDecades event.
   */
  onPrevDecades: () => void;
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

export type YearBodyProps<DateType> = {
  /**
   * Whether the date is disabled.
   */
  disabledDate?: (date: DateType) => boolean;
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
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
   * The current decade year.
   */
  viewDate: DateType;
};
