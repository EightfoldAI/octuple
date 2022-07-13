import type { Moment } from 'moment';
import momentGenerateConfig from '../Internal/Generate/moment';
import type {
    OcPickerDateProps,
    OcPickerProps,
    OcRangePickerProps as BaseRangePickerProps,
} from '../Internal/OcPicker.types';
import generatePicker from './Generate/Generate';

export type DatePickerProps = OcPickerProps<Moment>;
export type MonthPickerProps = Omit<OcPickerDateProps<Moment>, 'picker'>;
export type WeekPickerProps = Omit<OcPickerDateProps<Moment>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Moment>;

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export default DatePicker;
