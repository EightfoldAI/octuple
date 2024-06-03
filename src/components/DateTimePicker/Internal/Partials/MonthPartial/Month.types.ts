import type { Locale } from '../../OcPicker.types';
import type { GenerateConfig } from '../../Generate';
import type {
  DatePickerShape,
  DatePickerSize,
  PartialSharedProps,
} from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';

/**
 * The number of columns in the month partial.
 */
export const MONTH_COL_COUNT: number = 3;

export type MonthCellRender<DateType> = (
  /**
   * The current date.
   */
  currentDate: DateType,
  /**
   * The DatePicker locale.
   */
  locale: Locale
) => React.ReactNode;

export type MonthPartialProps<DateType> = {
  /**
   * The month cell renderer.
   */
  monthCellContentRender?: MonthCellRender<DateType>;
} & PartialSharedProps<DateType>;

export type MonthHeaderProps<DateType> = {
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

export type MonthBodyProps<DateType> = {
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
   * The month cell renderer.
   */
  monthCellRender?: MonthCellRender<DateType>;
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
   * The current month.
   */
  viewDate: DateType;
};
