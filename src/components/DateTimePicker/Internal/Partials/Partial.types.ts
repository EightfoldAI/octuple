import type { GenerateConfig } from '../Generate';
import type {
  DatePickerShape,
  DatePickerSize,
  NullableDateType,
  PartialMode,
} from '../OcPicker.types';
import { IconName } from '../../../Icon';
import { Shape, Size } from '../../../ConfigProvider';

type CellProps = {
  buttonProps: {
    tabIndex: number;
    'aria-label': string;
  };
  isCellFocused: boolean;
};

export type HeaderProps = {
  /**
   * The renderer.
   */
  children?: React.ReactNode;
  /**
   * The prev icon.
   * @default IconName.mdiChevronRight
   */
  nextIcon?: IconName;
  /**
   * The prev icon.
   * @default IconName.mdiChevronLeft
   */
  prevIcon?: IconName;
  /**
   * Callback executed onNext event.
   */
  onNext?: () => void;
  /**
   * Callback executed onPrev event.
   */
  onPrev?: () => void;
  /**
   * Callback executed onSuperNext event.
   */
  onSuperNext?: () => void;
  /**
   * Callback executed onSuperPrev event.
   */
  onSuperPrev?: () => void;
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
   * The super prev icon.
   * @default IconName.mdiChevronDoubleLeft
   */
  superPrevIcon?: IconName;
  /**
   * The super next icon.
   * @default IconName.mdiChevronDoubleRight
   */
  superNextIcon?: IconName;
  /**
   * The prev aria label.
   */
  prevAriaLabel?: string;
  /**
   * The next aria label.
   */
  nextAriaLabel?: string;
  /**
   * The super prev aria label.
   */
  superPrevAriaLabel?: string;
  /**
   * The super next aria label.
   */
  superNextAriaLabel?: string;

  superPrevAriaProps?: React.AriaAttributes;
};

export type PartialBodyProps<DateType> = {
  /**
   * The current date.
   */
  baseDate: DateType;
  /**
   * The number of columns in the calendar.
   */
  colNum: number;
  /**
   * Function that returns true or false to apply disabled cell styles.
   */
  disabledDate?: (date: DateType) => boolean;
  /**
   * Generates the configured dates.
   */
  generateConfig: GenerateConfig<DateType>;
  /**
   * Get the cell class names using the current date.
   */
  getCellClassNames: (date: DateType) => Record<string, boolean | undefined>;
  /**
   * Get the cell date using the current date and offset.
   */
  getCellDate: (date: DateType, offset: number) => DateType;
  /**
   * Get the calendar cell node using the current date.
   */
  getCellNode?: (date: DateType) => React.ReactNode;
  /**
   * Get the calendar cell text using the current date.
   */
  getCellText: (date: DateType) => React.ReactNode;
  /**
   * Gets the header cells.
   */
  headerCells?: React.ReactNode;
  /**
   * Callback executed on cell select event.
   */
  onSelect: (value: DateType) => void;
  /**
   * The picker partial mode.
   */
  picker?: PartialMode;
  /**
   * The row class names.
   */
  rowClassNames?: (date: DateType) => string;
  /**
   * The number of rows in the calendar.
   */
  rowNum: number;
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
   * The title cell text content.
   */
  titleCell?: (date: DateType) => string;
  /**
   *
   */
  getCellProps?: (currentDate: DateType) => CellProps;
  /**
   * The selected value to determine aria-selected state.
   */
  value?: NullableDateType<DateType>;
};

export type PickerCellProps<DateType> = {
  title: string;
  disabled: boolean;
  getCellText: (date: DateType) => React.ReactNode;
  currentDate: DateType;
  picker?: PartialMode;
  getCellClassNames: (date: DateType) => Record<string, boolean | undefined>;
  onSelect: (value: DateType) => void;
  generateConfig: GenerateConfig<DateType>;
  onDateMouseEnter: (date: any) => void;
  onDateMouseLeave: (date: any) => void;
  getCellNode?: (date: DateType) => React.ReactNode;
  getCellProps?: (currentDate: DateType) => CellProps;
  value?: NullableDateType<DateType>;
};
