import React from 'react';
import { mount as originMount, ReactWrapper } from 'enzyme';
import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import OcPicker, { OcPickerProps, OcPickerPartial } from '../../';
import dayjsGenerateConfig from '../../Generate/dayjs';
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

export function getDayjs(str: string): Dayjs {
    const formatList = [FULL_FORMAT, 'YYYY-MM-DD', 'HH:mm:ss', 'YYYY'];
    for (let i = 0; i < formatList.length; i += 1) {
        const date = dayjs(str, formatList[i], true);
        if (date.isValid()) {
            return date;
        }
    }
    throw new Error(`Format not match with: ${str}`);
}

export function isSame(
    date: Dayjs | null,
    dateStr: string,
    type: OpUnitType = 'date'
) {
    if (!date) {
        return false;
    }

    if (date.isSame(getDayjs(dateStr), type)) {
        return true;
    }

    throw new Error(
        `${date.format(FULL_FORMAT)} is not same as expected: ${dateStr}`
    );
}

interface DayjsDefaultProps {
    locale?: OcPickerProps<Dayjs>['locale'];
    generateConfig?: OcPickerProps<Dayjs>['generateConfig'];
}

type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig'> &
    DayjsDefaultProps;

// Dayjs Picker
export type DayjsPickerProps =
    | InjectDefaultProps<OcPickerBaseProps<Dayjs>>
    | InjectDefaultProps<OcPickerDateProps<Dayjs>>
    | InjectDefaultProps<OcPickerTimeProps<Dayjs>>;

export class DayjsPicker extends React.Component<DayjsPickerProps> {
    pickerRef = React.createRef<OcPicker<Dayjs>>();

    render() {
        return (
            <OcPicker<Dayjs>
                generateConfig={dayjsGenerateConfig}
                locale={enUS}
                ref={this.pickerRef}
                {...this.props}
            />
        );
    }
}

// Dayjs Partial Picker
export type DayjsPickerPartialProps =
    | InjectDefaultProps<OcPickerPartialBaseProps<Dayjs>>
    | InjectDefaultProps<OcPickerPartialDateProps<Dayjs>>
    | InjectDefaultProps<OcPickerPartialTimeProps<Dayjs>>;

export const DayjsPickerPartial = (props: DayjsPickerPartialProps) => (
    <OcPickerPartial<Dayjs>
        generateConfig={dayjsGenerateConfig}
        locale={enUS}
        {...props}
    />
);

// Dayjs Range Picker
export type DayjsRangePickerProps =
    | InjectDefaultProps<OcRangePickerBaseProps<Dayjs>>
    | InjectDefaultProps<OcRangePickerDateProps<Dayjs>>
    | InjectDefaultProps<OcRangePickerTimeProps<Dayjs>>;

export class DayjsRangePicker extends React.Component<DayjsRangePickerProps> {
    rangePickerRef = React.createRef<OcRangePicker<Dayjs>>();

    render() {
        return (
            <OcRangePicker<Dayjs>
                generateConfig={dayjsGenerateConfig}
                locale={enUS}
                ref={this.rangePickerRef}
                {...this.props}
            />
        );
    }
}
