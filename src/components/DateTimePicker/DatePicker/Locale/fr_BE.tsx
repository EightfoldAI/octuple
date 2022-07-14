import CalendarLocale from '../../Internal/Locale/fr_BE';
import TimePickerLocale from '../../TimePicker/Locale/fr_BE';
import type { PickerLocale } from '../Generate/Generate.types';

// Merge into a locale object
const locale: PickerLocale = {
    lang: {
        placeholder: 'Sélectionner une date',
        rangePlaceholder: ['Date de début', 'Date de fin'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
