import CalendarLocale from '../../Internal/Locale/es_ES';
import TimePickerLocale from '../../TimePicker/Locale/es_ES';
import type { PickerLocale } from '../Generate/Generate.types';

// Merge into a locale object
const locale: PickerLocale = {
    lang: {
        placeholder: 'Seleccionar fecha',
        rangePlaceholder: ['Fecha inicial', 'Fecha final'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
