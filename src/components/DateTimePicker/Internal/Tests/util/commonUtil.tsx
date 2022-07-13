import React from 'react';
import { mount as originMount, ReactWrapper } from 'enzyme';
import moment, { Moment, unitOfTime } from 'moment';
import OcPicker, { OcPickerProps, OcPickerPartial } from '../../';
import momentGenerateConfig from '../../Generate/moment';
import enUS from '../../Locale/en_US';
import {
    OcPickerBaseProps,
    OcPickerDateProps,
    OcPickerTimeProps,
    OcPickerPartialBaseProps,
    OcPickerPartialDateProps,
    OcPickerPartialTimeProps,
    OcRangePickerBaseProps,
    OcRangePickerDateProps,
    OcRangePickerTimeProps,
} from '../../OcPicker.types';
import OcRangePicker from '../../OcRangePicker';

const FULL_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

export type Wrapper = ReactWrapper & {
    confirmOK: () => void;
    openPicker: (index?: number) => void;
    closePicker: (index?: number) => void;
    isOpen: () => boolean;
    findCell: (text: number | string, index?: number) => Wrapper;
    selectCell: (text: number | string, index?: number) => Wrapper;
    clearValue: (index?: number) => void;
    keyDown: (key: string, info?: object, index?: number) => void;
    clickButton: (
        type: 'prev' | 'next' | 'super-prev' | 'super-next'
    ) => Wrapper;
    inputValue: (text: string, index?: number) => Wrapper;
};

export const mount = originMount as (
    ...args: Parameters<typeof originMount>
) => Wrapper;

export function getMoment(str: string): Moment {
    const formatList = [FULL_FORMAT, 'YYYY-MM-DD', 'HH:mm:ss', 'YYYY'];
    for (let i = 0; i < formatList.length; i += 1) {
        const date = moment(str, formatList[i], true);
        if (date.isValid()) {
            return date;
        }
    }
    throw new Error(`Format not match with: ${str}`);
}

export function isSame(
    date: Moment | null,
    dateStr: string,
    type: unitOfTime.StartOf = 'date'
) {
    if (!date) {
        return false;
    }

    if (date.isSame(getMoment(dateStr), type)) {
        return true;
    }

    throw new Error(
        `${date.format(FULL_FORMAT)} is not same as expected: ${dateStr}`
    );
}

interface MomentDefaultProps {
    locale?: OcPickerProps<Moment>['locale'];
    generateConfig?: OcPickerProps<Moment>['generateConfig'];
}

type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig'> &
    MomentDefaultProps;

// Moment Picker
export type MomentPickerProps =
    | InjectDefaultProps<OcPickerBaseProps<Moment>>
    | InjectDefaultProps<OcPickerDateProps<Moment>>
    | InjectDefaultProps<OcPickerTimeProps<Moment>>;

export class MomentPicker extends React.Component<MomentPickerProps> {
    pickerRef = React.createRef<OcPicker<Moment>>();

    render() {
        return (
            <OcPicker<Moment>
                generateConfig={momentGenerateConfig}
                locale={enUS}
                ref={this.pickerRef}
                {...this.props}
            />
        );
    }
}

// Moment Partial Picker
export type MomentPickerPartialProps =
    | InjectDefaultProps<OcPickerPartialBaseProps<Moment>>
    | InjectDefaultProps<OcPickerPartialDateProps<Moment>>
    | InjectDefaultProps<OcPickerPartialTimeProps<Moment>>;

export const MomentPickerPartial = (props: MomentPickerPartialProps) => (
    <OcPickerPartial<Moment>
        generateConfig={momentGenerateConfig}
        locale={enUS}
        {...props}
    />
);

// Moment Range Picker
export type MomentRangePickerProps =
    | InjectDefaultProps<OcRangePickerBaseProps<Moment>>
    | InjectDefaultProps<OcRangePickerDateProps<Moment>>
    | InjectDefaultProps<OcRangePickerTimeProps<Moment>>;

export class MomentRangePicker extends React.Component<MomentRangePickerProps> {
    rangePickerRef = React.createRef<OcRangePicker<Moment>>();

    render() {
        return (
            <OcRangePicker<Moment>
                generateConfig={momentGenerateConfig}
                locale={enUS}
                ref={this.rangePickerRef}
                {...this.props}
            />
        );
    }
}
