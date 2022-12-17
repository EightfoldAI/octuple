import CalendarLocale from '../../Internal/Locale/cs_CZ';
import TimePickerLocale from '../../TimePicker/Locale/cs_CZ';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Vybrat datum',
    rangePlaceholder: ['Od', 'Do'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
