import CalendarLocale from '../../Internal/Locale/uk_UA';
import TimePickerLocale from '../../TimePicker/Locale/uk_UA';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
    lang: {
        placeholder: 'Оберіть дату',
        rangePlaceholder: ['Початкова дата', 'Кінцева дата'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
