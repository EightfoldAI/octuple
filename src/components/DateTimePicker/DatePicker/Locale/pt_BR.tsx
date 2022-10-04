import CalendarLocale from '../../Internal/Locale/pt_BR';
import TimePickerLocale from '../../TimePicker/Locale/pt_BR';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
    lang: {
        placeholder: 'Selecionar data',
        rangePlaceholder: ['Data inicial', 'Data final'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
