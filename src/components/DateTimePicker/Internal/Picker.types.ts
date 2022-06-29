import type { GenerateConfig } from './generate';
import type { SharedTimeProps } from './Partials/TimePartial/Time.types';
import type { DateRender } from './Partials/DatePartial/Date.types';
import type { MonthCellRender } from './Partials/MonthPartial/Month.types';
import type { AlignType } from '../../Align/Align.types';
import { IconName } from '../../Icon';

export type Locale = {
    locale: string;
    monthBeforeYear?: boolean;
    yearFormat: string;
    monthFormat?: string;
    quarterFormat?: string;
    today: string;
    now: string;
    backToToday: string;
    ok: string;
    timeSelect: string;
    dateSelect: string;
    weekSelect?: string;
    clear: string;
    month: string;
    year: string;
    previousMonth: string;
    nextMonth: string;
    monthSelect: string;
    yearSelect: string;
    decadeSelect: string;
    dayFormat: string;
    dateFormat: string;
    dateTimeFormat: string;
    previousYear: string;
    nextYear: string;
    previousDecade: string;
    nextDecade: string;
    previousCentury: string;
    nextCentury: string;
    shortWeekDays?: string[];
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

export type PickerMode = Exclude<PartialMode, 'datetime' | 'decade'>;

export type PartialRefProps = {
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClose?: () => void;
};

export type NullableDateType<DateType> = DateType | null | undefined;

export type OnSelect<DateType> = (
    value: DateType,
    type: 'key' | 'mouse' | 'submit'
) => void;

type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

export type PickerTriggerProps = {
    visible: boolean;
    popupElement: React.ReactElement;
    popupStyle?: React.CSSProperties;
    children: React.ReactElement;
    dropdownClassNames?: string;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    dropdownAlign?: AlignType;
    range?: boolean;
    popupPlacement?: Placement;
    direction?: 'ltr' | 'rtl';
};

export type PartialSharedProps<DateType> = {
    generateConfig: GenerateConfig<DateType>;
    value?: NullableDateType<DateType>;
    viewDate: DateType;
    /** [Legacy] Set default display picker view date */
    defaultPickerValue?: DateType;
    locale: Locale;
    disabledDate?: (date: DateType) => boolean;

    prevIcon?: IconName;
    nextIcon?: IconName;
    superPrevIcon?: IconName;
    superNextIcon?: IconName;

    operationRef: React.MutableRefObject<PartialRefProps>;

    onSelect: OnSelect<DateType>;
    onViewDateChange: (value: DateType) => void;
    onPartialChange: (mode: PartialMode | null, viewValue: DateType) => void;
};

export type DisabledTimes = {
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
};

export type DisabledTime<DateType> = (date: DateType | null) => DisabledTimes;

export type OnPartialChange<DateType> = (
    value: DateType,
    mode: PartialMode
) => void;

export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> =
    | [EventValue<DateType>, EventValue<DateType>]
    | null;

export type Components = {
    button?: React.ComponentType | string;
    rangeItem?: React.ComponentType | string;
};

export type RangeList = {
    label: string;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}[];

export type CustomFormat<DateType> = (value: DateType) => string;

export type PickerPartialSharedProps<DateType> = {
    classNames?: string;
    style?: React.CSSProperties;
    mode?: PartialMode;
    tabIndex?: number;

    // Locale
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;

    // Value
    value?: DateType | null;
    defaultValue?: DateType;
    /** [Legacy] Set default display picker view date */
    pickerValue?: DateType;
    /** [Legacy] Set default display picker view date */
    defaultPickerValue?: DateType;

    // Date
    disabledDate?: (date: DateType) => boolean;

    // Render
    dateRender?: DateRender<DateType>;
    monthCellRender?: MonthCellRender<DateType>;
    renderExtraFooter?: (mode: PartialMode) => React.ReactNode;

    // Event
    onSelect?: (value: DateType) => void;
    onChange?: (value: DateType) => void;
    onPartialChange?: OnPartialChange<DateType>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onOk?: (date: DateType) => void;

    direction?: 'ltr' | 'rtl';

    /** @private This is internal usage. Do not use in your production env */
    hideHeader?: boolean;
    /** @private This is internal usage. Do not use in your production env */
    onPickerValueChange?: (date: DateType) => void;

    /** @private Internal usage. Do not use in your production env */
    components?: Components;
};

export type PickerPartialBaseProps<DateType> = {
    picker: Exclude<PickerMode, 'date' | 'time'>;
} & PickerPartialSharedProps<DateType>;

export type PickerPartialDateProps<DateType> = {
    picker?: 'date';
    showToday?: boolean;
    showNow?: boolean;

    // Time
    showTime?: boolean | SharedTimeProps<DateType>;
    disabledTime?: DisabledTime<DateType>;
} & PickerPartialSharedProps<DateType>;

export type PickerPartialTimeProps<DateType> = {
    picker: 'time';
} & PickerPartialSharedProps<DateType> &
    SharedTimeProps<DateType>;

export type PickerPartialProps<DateType> =
    | PickerPartialBaseProps<DateType>
    | PickerPartialDateProps<DateType>
    | PickerPartialTimeProps<DateType>;

export type PickerRefConfig = {
    focus: () => void;
    blur: () => void;
};

export type PickerSharedProps<DateType> = {
    dropdownClassNames?: string;
    dropdownAlign?: AlignType;
    popupStyle?: React.CSSProperties;
    placeholder?: string;
    allowClear?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    open?: boolean;
    defaultOpen?: boolean;
    /** Make input readOnly to avoid popup keyboard in mobile */
    inputReadOnly?: boolean;
    id?: string;

    // Value
    format?:
        | string
        | CustomFormat<DateType>
        | (string | CustomFormat<DateType>)[];

    // Render
    suffixIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    prevIcon?: IconName;
    nextIcon?: IconName;
    superPrevIcon?: IconName;
    superNextIcon?: IconName;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    partialRender?: (originPartial: React.ReactNode) => React.ReactNode;
    inputRender?: (
        props: React.InputHTMLAttributes<HTMLInputElement>
    ) => React.ReactNode;

    // Events
    onChange?: (value: DateType | null, dateString: string) => void;
    onOpenChange?: (open: boolean) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: (
        event: React.KeyboardEvent<HTMLInputElement>,
        preventDefault: () => void
    ) => void;

    // Internal
    /** @private Internal usage, do not use in production mode!!! */
    pickerRef?: React.MutableRefObject<PickerRefConfig>;

    // aria
    role?: string;
    name?: string;

    autoComplete?: string;
    direction?: 'ltr' | 'rtl';
} & React.AriaAttributes;

type OmitPartialProps<Props> = Omit<
    Props,
    'onChange' | 'hideHeader' | 'pickerValue' | 'onPickerValueChange'
>;

export type PickerBaseProps<DateType> = {} & PickerSharedProps<DateType> &
    OmitPartialProps<PickerPartialBaseProps<DateType>>;

export type PickerDateProps<DateType> = {} & PickerSharedProps<DateType> &
    OmitPartialProps<PickerPartialDateProps<DateType>>;

export type PickerTimeProps<DateType> = {
    picker: 'time';
    /**
     * @deprecated Please use `defaultValue` directly instead
     * since `defaultOpenValue` will confuse user of current value status
     */
    defaultOpenValue?: DateType;
} & PickerSharedProps<DateType> &
    Omit<OmitPartialProps<PickerPartialTimeProps<DateType>>, 'format'>;

export type PickerProps<DateType> =
    | PickerBaseProps<DateType>
    | PickerDateProps<DateType>
    | PickerTimeProps<DateType>;

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
    defaultValue?: DateType[];
};

export type RangeType = 'start' | 'end';

export type RangeInfo = {
    range: RangeType;
};

export type RangeDateRender<DateType> = (
    currentDate: DateType,
    today: DateType,
    info: RangeInfo
) => React.ReactNode;

export type RangePickerSharedProps<DateType> = {
    id?: string;
    value?: RangeValue<DateType>;
    defaultValue?: RangeValue<DateType>;
    defaultPickerValue?: [DateType, DateType];
    placeholder?: [string, string];
    disabled?: boolean | [boolean, boolean];
    disabledTime?: (
        date: EventValue<DateType>,
        type: RangeType
    ) => DisabledTimes;
    ranges?: Record<
        string,
        | Exclude<RangeValue<DateType>, null>
        | (() => Exclude<RangeValue<DateType>, null>)
    >;
    separator?: React.ReactNode;
    allowEmpty?: [boolean, boolean];
    mode?: [PartialMode, PartialMode];
    onChange?: (
        values: RangeValue<DateType>,
        formatString: [string, string]
    ) => void;
    onCalendarChange?: (
        values: RangeValue<DateType>,
        formatString: [string, string],
        info: RangeInfo
    ) => void;
    onPartialChange?: (
        values: RangeValue<DateType>,
        modes: [PartialMode, PartialMode]
    ) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onOk?: (dates: RangeValue<DateType>) => void;
    direction?: 'ltr' | 'rtl';
    autoComplete?: string;
    /** @private Internal control of active picker. Do not use since it's private usage */
    activePickerIndex?: 0 | 1;
    dateRender?: RangeDateRender<DateType>;
    partialRender?: (originPartial: React.ReactNode) => React.ReactNode;
};

export type RangePickerBaseProps<DateType> =
    {} & RangePickerSharedProps<DateType> &
        OmitPickerProps<PickerBaseProps<DateType>>;

export type RangePickerDateProps<DateType> = {
    showTime?: boolean | RangeShowTimeObject<DateType>;
} & RangePickerSharedProps<DateType> &
    OmitPickerProps<PickerDateProps<DateType>>;

export type RangePickerTimeProps<DateType> = {
    order?: boolean;
} & RangePickerSharedProps<DateType> &
    OmitPickerProps<PickerTimeProps<DateType>>;

export type RangePickerProps<DateType> =
    | RangePickerBaseProps<DateType>
    | RangePickerDateProps<DateType>
    | RangePickerTimeProps<DateType>;
