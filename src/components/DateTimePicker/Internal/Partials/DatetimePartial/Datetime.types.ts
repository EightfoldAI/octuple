import type { DatePartialProps } from '../DatePartial/Date.types';
import type { SharedTimeProps } from '../TimePartial/Time.types';
import type { DatePickerSize, DisabledTime } from '../../OcPicker.types';

export type DatetimePartialProps<DateType> = {
    disabledTime?: DisabledTime<DateType>;
    showTime?: boolean | SharedTimeProps<DateType>;
    defaultValue?: DateType;
    size?: DatePickerSize;
} & Omit<
    DatePartialProps<DateType>,
    'disabledHours' | 'disabledMinutes' | 'disabledSeconds'
>;
