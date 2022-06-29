import type { DatePartialProps } from '../DatePartial/Date.types';
import type { SharedTimeProps } from '../TimePartial/Time.types';
import type { DisabledTime } from '../../Picker.types';

export type DatetimePartialProps<DateType> = {
    disabledTime?: DisabledTime<DateType>;
    showTime?: boolean | SharedTimeProps<DateType>;
    defaultValue?: DateType;
} & Omit<
    DatePartialProps<DateType>,
    'disabledHours' | 'disabledMinutes' | 'disabledSeconds'
>;
