import type { GenerateConfig } from './Generate';
import type { SharedTimeProps } from './Partials/TimePartial/Time.types';
import type { DateRender } from './Partials/DatePartial/Date.types';
import type { MonthCellRender } from './Partials/MonthPartial/Month.types';
import type { AlignType } from '../../Align/Align.types';
import { IconName } from '../../Icon';
import { tuple } from '../../../shared/utilities';
import { ConfigContextProps, Shape, Size } from '../../ConfigProvider';

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

export type OcPickerMode = Exclude<PartialMode, 'datetime' | 'decade'>;

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
    visible: boolean;
    popupElement: React.ReactElement;
    popupStyle?: React.CSSProperties;
    children: React.ReactElement;
    dropdownClassNames?: string;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    dropdownAlign?: AlignType;
    range?: boolean;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
    popupPlacement?: DataPickerPlacement;
    direction?: 'ltr' | 'rtl';
};

export type PartialSharedProps<DateType> = {
    generateConfig: GenerateConfig<DateType>;
    value?: NullableDateType<DateType>;
    viewDate: DateType;
    defaultPickerValue?: DateType;
    locale: Locale;
    disabledDate?: (date: DateType) => boolean;
    prevIcon?: IconName;
    nextIcon?: IconName;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
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

export type OcPickerPartialSharedProps<DateType> = {
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
    pickerValue?: DateType;
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
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};

export type OcPickerPartialBaseProps<DateType> = {
    picker: Exclude<OcPickerMode, 'date' | 'time'>;
} & OcPickerPartialSharedProps<DateType>;

export type OcPickerPartialDateProps<DateType> = {
    picker?: 'date';
    showToday?: boolean;
    showNow?: boolean;
    // Time
    showTime?: boolean | SharedTimeProps<DateType>;
    disabledTime?: DisabledTime<DateType>;
} & OcPickerPartialSharedProps<DateType>;

export type OcPickerPartialTimeProps<DateType> = {
    picker: 'time';
} & OcPickerPartialSharedProps<DateType> &
    SharedTimeProps<DateType>;

export type OcPickerPartialProps<DateType> =
    | OcPickerPartialBaseProps<DateType>
    | OcPickerPartialDateProps<DateType>
    | OcPickerPartialTimeProps<DateType>;

export type OcPickerRefConfig = {
    focus: () => void;
    blur: () => void;
};

export type OcPickerSharedProps<DateType> = {
    /**
     * Configure how contextual props are consumed
     */
    configContextProps?: ConfigContextProps;
    dropdownClassNames?: string;
    dropdownAlign?: AlignType;
    /**
     * The picker is a form item
     * @default false
     */
    formItemInput?: boolean;
    popupStyle?: React.CSSProperties;
    placeholder?: string;
    allowClear?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    disabledTime?: (
        date: EventValue<DateType>,
        type: RangeType
    ) => DisabledTimes;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
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
    popupPlacement?: DataPickerPlacement;
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
    pickerRef?: React.MutableRefObject<OcPickerRefConfig>;
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

export type OcPickerBaseProps<DateType> = {} & OcPickerSharedProps<DateType> &
    OmitPartialProps<OcPickerPartialBaseProps<DateType>>;

export type OcPickerDateProps<DateType> = {} & OcPickerSharedProps<DateType> &
    OmitPartialProps<OcPickerPartialDateProps<DateType>>;

export type OcPickerTimeProps<DateType> = {
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

export type OcRangePickerSharedProps<DateType> = {
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
    popupPlacement?: DataPickerPlacement;
    ranges?: Record<
        string,
        | Exclude<RangeValue<DateType>, null>
        | (() => Exclude<RangeValue<DateType>, null>)
    >;
    separator?: React.ReactNode;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
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
    /**
     * @private Internal control of active picker
     * Do not use in prod
     */
    activePickerIndex?: 0 | 1;
    dateRender?: RangeDateRender<DateType>;
    partialRender?: (originPartial: React.ReactNode) => React.ReactNode;
    showTime?: any;
};

export type OcRangePickerBaseProps<DateType> =
    {} & OcRangePickerSharedProps<DateType> &
        OmitPickerProps<OcPickerBaseProps<DateType>>;

export type OcRangePickerDateProps<DateType> = {
    showTime?: boolean | RangeShowTimeObject<DateType>;
} & OcRangePickerSharedProps<DateType> &
    OmitPickerProps<OcPickerDateProps<DateType>>;

export type OcRangePickerTimeProps<DateType> = {
    order?: boolean;
} & OcRangePickerSharedProps<DateType> &
    OmitPickerProps<OcPickerTimeProps<DateType>>;

export type OcRangePickerProps<DateType> =
    | OcRangePickerBaseProps<DateType>
    | OcRangePickerDateProps<DateType>
    | OcRangePickerTimeProps<DateType>;
