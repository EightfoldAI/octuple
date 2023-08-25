import type { GenerateConfig } from '../../Generate';
import type {
  DatePickerShape,
  DatePickerSize,
  PartialSharedProps,
} from '../../OcPicker.types';
import type { KeyboardConfig } from '../../Utils/uiUtil';
import type { Locale } from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';

export type DateRender<DateType> = (
  /**
   * The current date.
   */
  currentDate: DateType,
  /**
   * Today's date. Styles the today cell.
   */
  today: DateType
) => React.ReactNode;

export type DatePartialProps<DateType> = {
  /**
   * Whether the date partial is active.
   */
  active?: boolean;
  /**
   * The date renderer.
   */
  dateRender?: DateRender<DateType>;
  /**
   * The date partial keyboard configuration.
   */
  keyboardConfig?: KeyboardConfig;
  /**
   * The partial name. e.g. "week", "month" ...
   */
  partialName?: string;
} & PartialSharedProps<DateType> &
  DateBodyPassProps<DateType>;

export type DateHeaderProps<DateType> = {
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
  /**
   * The DatePicker locale.
   */
  locale: Locale;
  /**
   * Callback executed onMonthClick event.
   */
  onMonthClick: () => void;
  /**
   * Callback executed onNextMonth event.
   */
  onNextMonth: () => void;
  /**
   * Callback executed onNextYear event.
   */
  onNextYear: () => void;
  /**
   * Callback executed onPrevMonth event.
   */
  onPrevMonth: () => void;
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
   * The current date value.
   */
  value?: DateType | null;
  /**
   * The current view date.
   */
  viewDate: DateType;
};

export type DateBodyPassProps<DateType> = {
  /**
   * The renderer.
   */
  dateRender?: DateRender<DateType>;
  /**
   * Whether the date is disabled.
   */
  disabledDate?: (date: DateType) => boolean;
  /**
   * Function that returns the calendar row class names.
   */
  rowClassNames?: (date: DateType) => string;
};

export type DateBodyProps<DateType> = {
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
   * The number of rows in the calendar.
   */
  rowCount: number;
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
   * The current day appears to be active.
   * @default true
   */
  todayActive?: boolean;
  /**
   * The current date value.
   */
  value?: DateType | null;
  /**
   * The current view date.
   */
  viewDate: DateType;
} & DateBodyPassProps<DateType>;
