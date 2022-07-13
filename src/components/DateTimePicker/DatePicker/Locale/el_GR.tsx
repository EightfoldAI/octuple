import CalendarLocale from '../../Internal/Locale/el_GR';
import TimePickerLocale from '../../TimePicker/Locale/el_GR';
import type { PickerLocale } from '../Generate/Generate.types';

// Merge into a locale object
const locale: PickerLocale = {
    lang: {
        placeholder: 'Επιλέξτε ημερομηνία',
        rangePlaceholder: ['Αρχική ημερομηνία', 'Τελική ημερομηνία'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
