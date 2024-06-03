import type { Dayjs } from 'dayjs';
import type {
  PickerTimeProps,
  RangePickerTimeProps,
} from '../DatePicker/Generate/Generate.types';

export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export interface TimeRangePickerProps
  extends Omit<RangePickerTimeProps<Dayjs>, 'picker'> {
  popupClassNames?: string;
}

export interface TimePickerProps
  extends Omit<PickerTimeProps<Dayjs>, 'picker'> {
  addon?: () => React.ReactNode;
  popupClassNames?: string;
}
