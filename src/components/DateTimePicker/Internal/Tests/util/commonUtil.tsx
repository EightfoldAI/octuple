import React from 'react';
import { mount as originMount, ReactWrapper } from 'enzyme';
import moment, { Moment, unitOfTime } from 'moment';
import Picker, { PickerProps, PickerPartial } from '../../';
import momentGenerateConfig from '../../Generate/moment';
import enUS from '../../Locale/en_US';
import {
    PickerBaseProps,
    PickerDateProps,
    PickerTimeProps,
    PickerPartialBaseProps,
    PickerPartialDateProps,
    PickerPartialTimeProps,
    RangePickerBaseProps,
    RangePickerDateProps,
    RangePickerTimeProps,
} from '../../Picker.types';
import RangePicker from '../../RangePicker';

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
    locale?: PickerProps<Moment>['locale'];
    generateConfig?: PickerProps<Moment>['generateConfig'];
}

type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig'> &
    MomentDefaultProps;

// Moment Picker
export type MomentPickerProps =
    | InjectDefaultProps<PickerBaseProps<Moment>>
    | InjectDefaultProps<PickerDateProps<Moment>>
    | InjectDefaultProps<PickerTimeProps<Moment>>;

export class MomentPicker extends React.Component<MomentPickerProps> {
    pickerRef = React.createRef<Picker<Moment>>();

    render() {
        return (
            <Picker<Moment>
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
    | InjectDefaultProps<PickerPartialBaseProps<Moment>>
    | InjectDefaultProps<PickerPartialDateProps<Moment>>
    | InjectDefaultProps<PickerPartialTimeProps<Moment>>;

export const MomentPickerPartial = (props: MomentPickerPartialProps) => (
    <PickerPartial<Moment>
        generateConfig={momentGenerateConfig}
        locale={enUS}
        {...props}
    />
);

// Moment Range Picker
export type MomentRangePickerProps =
    | InjectDefaultProps<RangePickerBaseProps<Moment>>
    | InjectDefaultProps<RangePickerDateProps<Moment>>
    | InjectDefaultProps<RangePickerTimeProps<Moment>>;

export class MomentRangePicker extends React.Component<MomentRangePickerProps> {
    rangePickerRef = React.createRef<RangePicker<Moment>>();

    render() {
        return (
            <RangePicker<Moment>
                generateConfig={momentGenerateConfig}
                locale={enUS}
                ref={this.rangePickerRef}
                {...this.props}
            />
        );
    }
}
