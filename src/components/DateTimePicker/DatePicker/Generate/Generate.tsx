import type { GenerateConfig } from '../../Internal/Generate';
import type { SharedTimeProps } from '../../Internal/Partials/TimePartial/Time.types';
import type { OcPickerMode } from '../../Internal/OcPicker.types';
import generateRangePicker from './generateRangePicker';
import generateSinglePicker from './generateSinglePicker';

function toArray<T>(list: T | T[]): T[] {
    if (!list) {
        return [];
    }
    return Array.isArray(list) ? list : [list];
}

export function getTimeProps<DateType, DisabledTime>(
    props: { format?: string; picker?: OcPickerMode } & Omit<
        SharedTimeProps<DateType>,
        'disabledTime'
    > & {
            disabledTime?: DisabledTime;
        }
) {
    const { format, picker, showHour, showMinute, showSecond, use12Hours } =
        props;

    const firstFormat = toArray(format)[0];
    const showTimeObj = { ...props };

    if (firstFormat && typeof firstFormat === 'string') {
        if (!firstFormat.includes('s') && showSecond === undefined) {
            showTimeObj.showSecond = false;
        }
        if (!firstFormat.includes('m') && showMinute === undefined) {
            showTimeObj.showMinute = false;
        }
        if (
            !firstFormat.includes('H') &&
            !firstFormat.includes('h') &&
            showHour === undefined
        ) {
            showTimeObj.showHour = false;
        }

        if (
            (firstFormat.includes('a') || firstFormat.includes('A')) &&
            use12Hours === undefined
        ) {
            showTimeObj.use12Hours = true;
        }
    }

    if (picker === 'time') {
        return showTimeObj;
    }

    if (typeof firstFormat === 'function') {
        // format of showTime should use default when format is custom format function
        delete showTimeObj.format;
    }

    return {
        showTime: showTimeObj,
    };
}

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
    const {
        DatePicker,
        WeekPicker,
        MonthPicker,
        YearPicker,
        TimePicker,
        QuarterPicker,
    } = generateSinglePicker(generateConfig);

    const RangePicker = generateRangePicker(generateConfig);

    type MergedDatePickerType = typeof DatePicker & {
        WeekPicker: typeof WeekPicker;
        MonthPicker: typeof MonthPicker;
        YearPicker: typeof YearPicker;
        RangePicker: typeof RangePicker;
        TimePicker: typeof TimePicker;
        QuarterPicker: typeof QuarterPicker;
    };

    const MergedDatePicker = DatePicker as MergedDatePickerType;
    MergedDatePicker.WeekPicker = WeekPicker;
    MergedDatePicker.MonthPicker = MonthPicker;
    MergedDatePicker.YearPicker = YearPicker;
    MergedDatePicker.RangePicker = RangePicker;
    MergedDatePicker.TimePicker = TimePicker;
    MergedDatePicker.QuarterPicker = QuarterPicker;

    return MergedDatePicker;
}

export default generatePicker;
