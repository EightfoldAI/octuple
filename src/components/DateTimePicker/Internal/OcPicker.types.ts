import type { GenerateConfig } from './Generate';
import type { SharedTimeProps } from './Partials/TimePartial/Time.types';
import type { DateRender } from './Partials/DatePartial/Date.types';
import type { MonthCellRender } from './Partials/MonthPartial/Month.types';
import type { AlignType } from '../../Align/Align.types';
import { IconName } from '../../Icon';
import { tuple } from '../../../shared/utilities';
import { ConfigContextProps, Shape, Size } from '../../ConfigProvider';

// TODO: move to ./Locale and use the provider.
export type Locale = {
    /**
     * The picker locale.
     */
    locale: string;
    /**
     * Determines if month should display before year.
     */
    monthBeforeYear?: boolean;
    /**
     * The picker year format.
     */
    yearFormat: string;
    /**
     * The picker month format.
     */
    monthFormat?: string;
    /**
     * The picker quarter format.
     */
    quarterFormat?: string;
    /**
     * The picker `Today` string.
     */
    today: string;
    /**
     * The picker `Now` string.
     */
    now: string;
    /**
     * The picker `Back to today` string.
     */
    backToToday: string;
    /**
     * The picker `OK` string.
     */
    ok: string;
    /**
     * The picker `Select time` string.
     */
    timeSelect: string;
    /**
     * The picker `Select date` string.
     */
    dateSelect: string;
    /**
     * The picker `Select week` string.
     */
    weekSelect?: string;
    /**
     * The picker `Clear` string.
     */
    clear: string;
    /**
     * The picker `Month` string.
     */
    month: string;
    /**
     * The picker `Year` string.
     */
    year: string;
    /**
     * The picker `Previous month (PageUp)` string.
     */
    previousMonth: string;
    /**
     * The picker `Next moth (PageDown)` string.
     */
    nextMonth: string;
    /**
     * The picker `Select month` string.
     */
    monthSelect: string;
    /**
     * The picker `Select year` string.
     */
    yearSelect: string;
    /**
     * The picker `Select decade` string.
     */
    decadeSelect: string;
    /**
     * The picker day format.
     */
    dayFormat: string;
    /**
     * The picker date format.
     */
    dateFormat: string;
    /**
     * The picker date time format.
     */
    dateTimeFormat: string;
    /**
     * The picker `Last year (Control + left)` text.
     */
    previousYear: string;
    /**
     * The picker `Next year (Control + right)` text.
     */
    nextYear: string;
    /**
     * The picker `Last decade` text.
     */
    previousDecade: string;
    /**
     * The picker `Next decade` text.
     */
    nextDecade: string;
    /**
     * The picker `Last century` text.
     */
    previousCentury: string;
    /**
     * The picker `Next century` text.
     */
    nextCentury: string;
    /**
     * The picker day abbreviation text.
     */
    shortWeekDays?: string[];
    /**
     * The picker month abbreviation text.
     */
    shortMonths?: string[];
};

export type PartialMode =
    | 'time'
    | 'date'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year'
    | 'decade';

export type OcPickerMode = Exclude<PartialMode, 'datetime' | 'decade'>;

export type PartialRefProps = {
    /**
     * Callback executes when the partial ref loses focus.
     */
    onBlur?: React.FocusEventHandler<HTMLElement>;
    /**
     * Callback executes when the partial ref is closed.
     */
    onClose?: () => void;
    /**
     * Callback executes when the partial ref detects on key down event.
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean;
};

export type NullableDateType<DateType> = DateType | null | undefined;

export type OnSelect<DateType> = (
    /**
     * The date value.
     */
    value: DateType,
    /**
     * The select type.
     */
    type: 'key' | 'mouse' | 'submit'
) => void;

const DataPickerPlacements = tuple(
    'bottomLeft',
    'bottomRight',
    'topLeft',
    'topRight'
);
export type DataPickerPlacement = typeof DataPickerPlacements[number];

export enum DatePickerShape {
    Pill = 'pill',
    Rectangle = 'rectangle',
    Underline = 'underline',
}

export enum DatePickerSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export type OcPickerTriggerProps = {
    /**
     * The dropdown children.
     */
    children: React.ReactElement;
    /**
     * The html canvas direction of the picker trigger.
     */
    direction?: 'ltr' | 'rtl';
    /**
     * The dropdown alignment.
     */
    dropdownAlign?: AlignType;
    /**
     * Custom classnames of the dropdown.
     */
    dropdownClassNames?: string;
    /**
     * Gets the container of the surface UI.
     * The default is a div element child of body
     */
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    /**
     * The popup element.
     */
    popupElement: React.ReactElement;
    /**
     * The picker dropdown placement.
     */
    popupPlacement?: DataPickerPlacement;
    /**
     * The popup style.
     */
    popupStyle?: React.CSSProperties;
    /**
     * The popup is range.
     */
    range?: boolean;
    /**
     * The picker trigger shape.
     */
    shape?: DatePickerShape | Shape;
    /**
     * The picker trigger size.
     */
    size?: DatePickerSize | Size;
    /**
     * The dropdown visible state.
     */
    visible: boolean;
};

export type PartialSharedProps<DateType> = {
    /**
     * Specify a date that may not be selected.
     */
    disabledDate?: (date: DateType) => boolean;
    /**
     * The default date.
     */
    defaultPickerValue?: DateType;
    /**
     * Generates the configured dates.
     */
    generateConfig: GenerateConfig<DateType>;
    /**
     * Localization configuration.
     */
    locale: Locale;
    /**
     * The custom next icon.
     */
    nextIcon?: IconName;
    /**
     * The partial ref.
     */
    operationRef: React.MutableRefObject<PartialRefProps>;
    /**
     * Callback when partial is changed.
     */
    onPartialChange: (mode: PartialMode | null, viewValue: DateType) => void;
    /**
     * Callback executes on partial select event.
     */
    onSelect: OnSelect<DateType>;
    /**
     * Callback executes when the partial view date is changed.
     */
    onViewDateChange: (value: DateType) => void;
    /**
     * The custom previous icon.
     */
    prevIcon?: IconName;
    /**
     * The partial shape.
     */
    shape?: DatePickerShape | Shape;
    /**
     * The partial size.
     */
    size?: DatePickerSize | Size;
    /**
     * The custom super next icon.
     */
    superNextIcon?: IconName;
    /**
     * The custom super prev icon.
     */
    superPrevIcon?: IconName;
    /**
     * The partial date value.
     */
    value?: NullableDateType<DateType>;
    /**
     * The partial view date value.
     */
    viewDate: DateType;
};

export type DisabledTimes = {
    /**
     * The disabled hours.
     */
    disabledHours?: () => number[];
    /**
     * The disabled minutes.
     */
    disabledMinutes?: (hour: number) => number[];
    /**
     * The disabled seconds.
     */
    disabledSeconds?: (hour: number, minute: number) => number[];
};

export type DisabledTime<DateType> = (date: DateType | null) => DisabledTimes;

export type OnPartialChange<DateType> = (
    /**
     * The date value.
     */
    value: DateType,
    /**
     * The picker partial mode.
     */
    mode: PartialMode
) => void;

export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> =
    | [EventValue<DateType>, EventValue<DateType>]
    | null;

export type Components = {
    /**
     * The button component.
     */
    button?: React.ComponentType | string;
    /**
     * The range item component.
     */
    rangeItem?: React.ComponentType | string;
};

export type RangeList = {
    /**
     * The range list label.
     */
    label: string;
    /**
     * Callback executed on range list click event.
     */
    onClick: () => void;
    /**
     * Callback executed on range list mouse enter event.
     */
    onMouseEnter: () => void;
    /**
     * Callback executed on range list mouse leave event.
     */
    onMouseLeave: () => void;
}[];

export type CustomFormat<DateType> = (value: DateType) => string;

export type OcPickerPartialSharedProps<DateType> = {
    /**
     * Custom classnames of the component.
     */
    classNames?: string;
    /**
     * Custom rendering function for date cells.
     */
    dateRender?: DateRender<DateType>;
    /**
     * The default picker date.
     */
    defaultPickerValue?: DateType;
    /**
     * The default date.
     */
    defaultValue?: DateType;
    /**
     * The html canvas direction of the partial.
     */
    direction?: 'ltr' | 'rtl';
    /**
     * Specify a date that may not be selected.
     */
    disabledDate?: (date: DateType) => boolean;
    /**
     * Generates the configured dates.
     */
    generateConfig: GenerateConfig<DateType>;
    /**
     * Localization configuration.
     */
    locale: Locale;
    /**
     * The picker partial mode.
     */
    mode?: PartialMode;
    /**
     * Custom month cell content render method.
     */
    monthCellRender?: MonthCellRender<DateType>;
    /**
     * 	Callback executed when the selected time is changing.
     */
    onChange?: (value: DateType) => void;
    /**
     * 	Callback executed on the partial mouse down event.
     */
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback when ok button is clicked.
     */
    onOk?: (date: DateType) => void;
    /**
     * Callback when partial is changed.
     */
    onPartialChange?: OnPartialChange<DateType>;
    /**
     * Callback executes on partial select event.
     */
    onSelect?: (value: DateType) => void;
    /**
     * The default picker date.
     */
    pickerValue?: DateType;
    /**
     * Renders extra footer in the partial.
     */
    renderExtraFooter?: (mode: PartialMode) => React.ReactNode;
    /**
     * The partial shape.
     */
    shape?: DatePickerShape | Shape;
    /**
     * The partial size.
     */
    size?: DatePickerSize | Size;
    /**
     * The partial style.
     */
    style?: React.CSSProperties;
    /**
     * The partial tab index.
     */
    tabIndex?: number;
    /**
     * The partial date value.
     */
    value?: DateType | null;
    /**
     * @private Internal usage only.
     * Do not use in production.
     */
    components?: Components;
    /**
     * @private Internal usage only.
     * Do not use in production.
     */
    hideHeader?: boolean;
    /**
     * @private Internal usage only.
     * Do not use in production.
     */
    onPickerValueChange?: (date: DateType) => void;
};

export type OcPickerPartialBaseProps<DateType> = {
    picker: Exclude<OcPickerMode, 'date' | 'time'>;
} & OcPickerPartialSharedProps<DateType>;

export type OcPickerPartialDateProps<DateType> = {
    /**
     * Specify time that may not be selected.
     */
    disabledTime?: DisabledTime<DateType>;
    /**
     * The picker type.
     * @default date
     */
    picker?: 'date';
    /**
     * Show 'Now' button in partial when `showTime` is set.
     */
    showNow?: boolean;
    /**
     * Enables time selection partial.
     */
    showTime?: boolean | SharedTimeProps<DateType>;
    /**
     * Show the `Today` button.
     */
    showToday?: boolean;
} & OcPickerPartialSharedProps<DateType>;

export type OcPickerPartialTimeProps<DateType> = {
    /**
     * The picker type.
     * @default time
     */
    picker: 'time';
} & OcPickerPartialSharedProps<DateType> &
    SharedTimeProps<DateType>;

export type OcPickerPartialProps<DateType> =
    | OcPickerPartialBaseProps<DateType>
    | OcPickerPartialDateProps<DateType>
    | OcPickerPartialTimeProps<DateType>;

export type OcPickerRefConfig = {
    /**
     * Remove focus.
     */
    blur: () => void;
    /**
     * Get focus.
     */
    focus: () => void;
};

export type OcPickerSharedProps<DateType> = {
    /**
     * Show the clear button.
     * @default true
     */
    allowClear?: boolean;
    /**
     * Configure how to provide automated assistance in filling out form field values.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     * @default 'off'
     */
    autoComplete?: string;
    /**
     * Place focus on Picker when component renders.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * Determines if the picker has a border style.
     */
    bordered?: boolean;
    /**
     * Custom clear icon.
     */
    clearIcon?: React.ReactNode;
    /**
     * Configure how contextual props are consumed.
     */
    configContextProps?: ConfigContextProps;
    /**
     * The picker is open by default.
     */
    defaultOpen?: boolean;
    /**
     * The html canvas direction of the picker.
     */
    direction?: 'ltr' | 'rtl';
    /**
     * The DatePicker disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * Specify time that may not be selected.
     */
    disabledTime?: (
        date: EventValue<DateType>,
        type: RangeType
    ) => DisabledTimes;
    /**
     * Custom classnames of the dropdown.
     */
    dropdownClassNames?: string;
    /**
     * The dropdown alignment.
     */
    dropdownAlign?: AlignType;
    /**
     * To set the date format, refer to either
     * https://momentjs.com/docs/#/parsing/special-formats/
     * or
     * https://day.js.org/docs/en/plugin/custom-parse-format
     * When an array is provided, all values are used for parsing and first value is used for formatting.
     */
    format?:
        | string
        | CustomFormat<DateType>
        | (string | CustomFormat<DateType>)[];
    /**
     * The picker is a form item.
     * @default false
     */
    formItemInput?: boolean;
    /**
     * Gets the container of the surface UI.
     * The default is a div element child of body
     */
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    /**
     * The picker id.
     */
    id?: string;
    /**
     * Make input readOnly to avoid popup keyboard in mobile.
     */
    inputReadOnly?: boolean;
    /**
     * The input render method.
     */
    inputRender?: (
        props: React.InputHTMLAttributes<HTMLInputElement>
    ) => React.ReactNode;
    /**
     * The picker aria name.
     */
    name?: string;
    /**
     * The custom next icon.
     */
    nextIcon?: IconName;
    /**
     * Callback executes on picker blur event.
     */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Callback executed when the selected time is changing.
     */
    onChange?: (value: DateType | null, dateString: string) => void;
    /**
     * Callback executes on picker click event.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on picker contextual menu event.
     */
    onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on picker focus event.
     */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Callback executes on picker key down event.
     */
    onKeyDown?: (
        event: React.KeyboardEvent<HTMLInputElement>,
        preventDefault: () => void
    ) => void;
    /**
     * Callback executes on picker mouse down event.
     */
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on picker mouse enter event.
     */
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on picker mouse leave event.
     */
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on picker mouse up event.
     */
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback when the popup calendar is opened or closed.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The open state of the picker.
     */
    open?: boolean;
    /**
     * Custom partial render.
     */
    partialRender?: (originPartial: React.ReactNode) => React.ReactNode;
    /**
     * The placeholder text of the input.
     */
    placeholder?: string;
    /**
     * The picker dropdown placement.
     */
    popupPlacement?: DataPickerPlacement;
    /**
     * The popup style.
     */
    popupStyle?: React.CSSProperties;
    /**
     * The custom previous icon.
     */
    prevIcon?: IconName;
    /**
     * The picker aria role.
     */
    role?: string;
    /**
     * The picker shape.
     */
    shape?: DatePickerShape | Shape;
    /**
     * The picker size.
     */
    size?: DatePickerSize | Size;
    /**
     * The custom suffix icon.
     */
    suffixIcon?: React.ReactNode;
    /**
     * The custom super next icon.
     */
    superNextIcon?: IconName;
    /**
     * The custom super prev icon.
     */
    superPrevIcon?: IconName;
    /**
     * The picker tab index.
     */
    tabIndex?: number;
    /**
     * @private Internal usage, do not use in production.
     */
    pickerRef?: React.MutableRefObject<OcPickerRefConfig>;
} & React.AriaAttributes;

type OmitPartialProps<Props> = Omit<
    Props,
    'onChange' | 'hideHeader' | 'pickerValue' | 'onPickerValueChange'
>;

export type OcPickerBaseProps<DateType> = {} & OcPickerSharedProps<DateType> &
    OmitPartialProps<OcPickerPartialBaseProps<DateType>>;

export type OcPickerDateProps<DateType> = {} & OcPickerSharedProps<DateType> &
    OmitPartialProps<OcPickerPartialDateProps<DateType>>;

export type OcPickerTimeProps<DateType> = {
    /**
     * The picker type.
     * @default time
     */
    picker: 'time';
} & OcPickerSharedProps<DateType> &
    Omit<OmitPartialProps<OcPickerPartialTimeProps<DateType>>, 'format'>;

export type OcPickerProps<DateType> =
    | OcPickerBaseProps<DateType>
    | OcPickerDateProps<DateType>
    | OcPickerTimeProps<DateType>;

type OmitPickerProps<Props> = Omit<
    Props,
    | 'value'
    | 'defaultValue'
    | 'defaultPickerValue'
    | 'placeholder'
    | 'disabled'
    | 'disabledTime'
    | 'showToday'
    | 'showTime'
    | 'mode'
    | 'onChange'
    | 'onSelect'
    | 'onPartialChange'
    | 'pickerValue'
    | 'onPickerValueChange'
    | 'onOk'
    | 'dateRender'
>;

type RangeShowTimeObject<DateType> = Omit<
    SharedTimeProps<DateType>,
    'defaultValue'
> & {
    /**
     * The default date.
     */
    defaultValue?: DateType[];
};

export type RangeType = 'start' | 'end';

export type RangeInfo = {
    /**
     * The type of range
     * may be `start` or `end`.
     */
    range: RangeType;
};

export type RangeDateRender<DateType> = (
    /**
     * The current date.
     */
    currentDate: DateType,
    /**
     * Today's date.
     */
    today: DateType,
    /**
     * The type of range.
     */
    info: RangeInfo
) => React.ReactNode;

export type OcRangePickerSharedProps<DateType> = {
    /**
     * Allow start or end input leave empty.
     */
    allowEmpty?: [boolean, boolean];
    /**
     * Configure how to provide automated assistance in filling out form field values.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     * @default 'off'
     */
    autoComplete?: string;
    /**
     * Custom rendering function for date cells.
     */
    dateRender?: RangeDateRender<DateType>;
    /**
     * The default date.
     */
    defaultValue?: RangeValue<DateType>;
    /**
     * The default range picker date.
     */
    defaultPickerValue?: [DateType, DateType];
    /**
     * The html canvas direction of the range picker.
     */
    direction?: 'ltr' | 'rtl';
    /**
     * The range picker disabled state.
     * @default false
     */
    disabled?: boolean | [boolean, boolean];
    /**
     * Specify time that may not be selected.
     */
    disabledTime?: (
        date: EventValue<DateType>,
        type: RangeType
    ) => DisabledTimes;
    /**
     * The range picker id
     */
    id?: string;
    /**
     * The picker partial mode.
     */
    mode?: [PartialMode, PartialMode];
    /**
     * Callback executes on range picker blur event.
     */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Callback executed when the start time or the end time of the range is changing.
     */
    onCalendarChange?: (
        values: RangeValue<DateType>,
        formatString: [string, string],
        info: RangeInfo
    ) => void;
    /**
     * Callback executed when the selected time is changing.
     */
    onChange?: (
        values: RangeValue<DateType>,
        formatString: [string, string]
    ) => void;
    /**
     * Callback executes on range picker click event.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on range picker focus event.
     */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Callback executes on range picker mouse down event.
     */
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on range picker mouse enter event.
     */
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on range picker mouse leave event.
     */
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback executes on range picker mouse up event.
     */
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Callback when ok button is clicked.
     */
    onOk?: (dates: RangeValue<DateType>) => void;
    /**
     * Callback when partial is changed.
     */
    onPartialChange?: (
        values: RangeValue<DateType>,
        modes: [PartialMode, PartialMode]
    ) => void;
    partialRender?: (originPartial: React.ReactNode) => React.ReactNode;
    /**
     * The placeholder text of the range inputs.
     */
    placeholder?: [string, string];
    /**
     * The range picker dropdown placement.
     */
    popupPlacement?: DataPickerPlacement;
    /**
     * The preset ranges for quick selection.
     */
    ranges?: Record<
        string,
        | Exclude<RangeValue<DateType>, null>
        | (() => Exclude<RangeValue<DateType>, null>)
    >;
    /**
     * Custom separator between inputs.
     */
    separator?: React.ReactNode;
    /**
     * The range picker shape.
     */
    shape?: DatePickerShape | Shape;
    /**
     * The range picker size.
     */
    size?: DatePickerSize | Size;
    /**
     * Enables time selection partial.
     */
    showTime?: any;
    /**
     * The date range value.
     */
    value?: RangeValue<DateType>;
    /**
     * @private Internal control of active picker
     * Do not use in prod
     */
    activePickerIndex?: 0 | 1;
};

export type OcRangePickerBaseProps<DateType> =
    {} & OcRangePickerSharedProps<DateType> &
        OmitPickerProps<OcPickerBaseProps<DateType>>;

export type OcRangePickerDateProps<DateType> = {
    /**
     * Enables time selection partial.
     */
    showTime?: boolean | RangeShowTimeObject<DateType>;
} & OcRangePickerSharedProps<DateType> &
    OmitPickerProps<OcPickerDateProps<DateType>>;

export type OcRangePickerTimeProps<DateType> = {
    /**
     * Re-order values.
     */
    order?: boolean;
} & OcRangePickerSharedProps<DateType> &
    OmitPickerProps<OcPickerTimeProps<DateType>>;

export type OcRangePickerProps<DateType> =
    | OcRangePickerBaseProps<DateType>
    | OcRangePickerDateProps<DateType>
    | OcRangePickerTimeProps<DateType>;
