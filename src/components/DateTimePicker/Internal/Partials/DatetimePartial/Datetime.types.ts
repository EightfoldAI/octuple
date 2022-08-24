import type { DatePartialProps } from '../DatePartial/Date.types';
import type { SharedTimeProps } from '../TimePartial/Time.types';
import type {
    DatePickerShape,
    DatePickerSize,
    DisabledTime,
} from '../../OcPicker.types';
import { ShapeType, SizeType } from '../../../../ConfigProvider';

export type DatetimePartialProps<DateType> = {
    disabledTime?: DisabledTime<DateType>;
    showTime?: boolean | SharedTimeProps<DateType>;
    defaultValue?: DateType;
    shape?: DatePickerShape | ShapeType;
    size?: DatePickerSize | SizeType;
} & Omit<
    DatePartialProps<DateType>,
    'disabledHours' | 'disabledMinutes' | 'disabledSeconds'
>;
