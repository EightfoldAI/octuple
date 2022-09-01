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
    locale?: PickerLocale;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
    popupPlacement?: DataPickerPlacement;
    bordered?: boolean;
    status?: InputStatus;
    showTime?: any;
};

export const Components = { button: PickerButton, rangeItem: PickerButton };

export interface CommonPickerMethods {
    focus: () => void;
    blur: () => void;
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
    dateFormat?: string;
    dateTimeFormat?: string;
    weekFormat?: string;
    monthFormat?: string;
};

export type AdditionalPickerLocaleLangProps = {
    placeholder: string;
    yearPlaceholder?: string;
    quarterPlaceholder?: string;
    monthPlaceholder?: string;
    weekPlaceholder?: string;
    rangeYearPlaceholder?: [string, string];
    rangeQuarterPlaceholder?: [string, string];
    rangeMonthPlaceholder?: [string, string];
    rangeWeekPlaceholder?: [string, string];
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
