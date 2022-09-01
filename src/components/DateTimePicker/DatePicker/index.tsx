import type { Dayjs } from 'dayjs';
import dayjsGenerateConfig from '../Internal/Generate/dayjs';
import type {
    OcPickerDateProps,
    OcPickerProps,
    OcRangePickerProps as BaseRangePickerProps,
} from '../Internal/OcPicker.types';
import generatePicker from './Generate/Generate';

export { DatePickerShape, DatePickerSize } from '../Internal/OcPicker.types';

export type DatePickerProps = OcPickerProps<Dayjs>;
export type MonthPickerProps = Omit<OcPickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<OcPickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
