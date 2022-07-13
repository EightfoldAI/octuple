import type { Moment } from 'moment';
import type {
    PickerTimeProps,
    RangePickerTimeProps,
} from '../DatePicker/Generate/Generate.types';

export interface TimePickerLocale {
    placeholder?: string;
    rangePlaceholder?: [string, string];
}

export interface TimeRangePickerProps
    extends Omit<RangePickerTimeProps<Moment>, 'picker'> {
    popupClassNames?: string;
}

export interface TimePickerProps
    extends Omit<PickerTimeProps<Moment>, 'picker'> {
    addon?: () => React.ReactNode;
    popupClassNames?: string;
}
