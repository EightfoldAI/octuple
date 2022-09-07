import type { Component, ComponentClass, ForwardedRef } from 'react';
import type {
    DataPickerPlacement,
    DatePickerShape,
    DatePickerSize,
    Locale as OcPickerLocale,
    OcPickerBaseProps,
    OcPickerDateProps,
    OcPickerTimeProps,
    OcRangePickerBaseProps,
    OcRangePickerDateProps,
    OcRangePickerTimeProps,
} from '../../Internal/OcPicker.types';
import type { TimePickerLocale } from '../../TimePicker/TimePicker.types';
import PickerButton from '../PickerButton';
import type { InputStatus } from '../../../../shared/utilities';
import { Shape, Size } from '../../../ConfigProvider';

type InjectDefaultProps<Props> = Omit<
    Props,
    'locale' | 'generateConfig' | 'hideHeader' | 'components'
> & {
    /**
     * Determines if the picker has a border style.
     */
    bordered?: boolean;
    /**
     * Localization configuration.
     */
    locale?: PickerLocale;
    /**
     * The picker popup placement.
     */
    popupPlacement?: DataPickerPlacement;
    /**
     * The picker shape.
     */
    shape?: DatePickerShape | Shape;
    /**
     * Enables time selection partial.
     */
    showTime?: any;
    /**
     * The picker size.
     */
    size?: DatePickerSize | Size;
    /**
     * The picker validation status.
     */
    status?: InputStatus;
};

export const Components = { button: PickerButton, rangeItem: PickerButton };

export interface CommonPickerMethods {
    /**
     * Remove focus.
     */
    blur: () => void;
    /**
     * Get focus.
     */
    focus: () => void;
}

export interface PickerComponentClass<P = {}, S = unknown>
    extends ComponentClass<P, S> {
    new (...args: ConstructorParameters<ComponentClass<P, S>>): InstanceType<
        ComponentClass<P, S>
    > &
        CommonPickerMethods;
}

export type PickerRef<P> = ForwardedRef<Component<P> & CommonPickerMethods>;

export type DatePickRef<DateType> = PickerRef<PickerProps<DateType>>;

export type RangePickerRef<DateType> = PickerRef<RangePickerProps<DateType>>;

export type PickerLocale = {
    lang: OcPickerLocale & AdditionalPickerLocaleLangProps;
    timePickerLocale: TimePickerLocale;
} & AdditionalPickerLocaleProps;

export type AdditionalPickerLocaleProps = {
    /**
     * The date format.
     */
    dateFormat?: string;
    /**
     * The date time format.
     */
    dateTimeFormat?: string;
    /**
     * The month format.
     */
    monthFormat?: string;
    /**
     * The week format.
     */
    weekFormat?: string;
};

export type AdditionalPickerLocaleLangProps = {
    /**
     * The picker input placeholder text.
     */
    placeholder: string;
    /**
     * The year picker input placeholder text.
     */
    yearPlaceholder?: string;
    /**
     * The quarter picker input placeholder text.
     */
    quarterPlaceholder?: string;
    /**
     * The month picker input placeholder text.
     */
    monthPlaceholder?: string;
    /**
     * The week picker input placeholder text.
     */
    weekPlaceholder?: string;
    /**
     * The year range picker inputs placeholder text.
     */
    rangeYearPlaceholder?: [string, string];
    /**
     * The quarter range picker inputs placeholder text.
     */
    rangeQuarterPlaceholder?: [string, string];
    /**
     * The month range picker inputs placeholder text.
     */
    rangeMonthPlaceholder?: [string, string];
    /**
     * The week range picker inputs placeholder text.
     */
    rangeWeekPlaceholder?: [string, string];
    /**
     * The range picker inputs placeholder text.
     */
    rangePlaceholder?: [string, string];
};

// Picker Props
export type PickerBaseProps<DateType> = InjectDefaultProps<
    OcPickerBaseProps<DateType>
>;
export type PickerDateProps<DateType> = InjectDefaultProps<
    OcPickerDateProps<DateType>
>;
export type PickerTimeProps<DateType> = InjectDefaultProps<
    OcPickerTimeProps<DateType>
>;

export type PickerProps<DateType> =
    | PickerBaseProps<DateType>
    | PickerDateProps<DateType>
    | PickerTimeProps<DateType>;

// Range Picker Props
export type RangePickerBaseProps<DateType> = InjectDefaultProps<
    OcRangePickerBaseProps<DateType>
>;
export type RangePickerDateProps<DateType> = InjectDefaultProps<
    OcRangePickerDateProps<DateType>
>;
export type RangePickerTimeProps<DateType> = InjectDefaultProps<
    OcRangePickerTimeProps<DateType>
>;

export type RangePickerProps<DateType> =
    | RangePickerBaseProps<DateType>
    | RangePickerDateProps<DateType>
    | RangePickerTimeProps<DateType>;
