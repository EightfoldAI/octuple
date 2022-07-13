import CalendarLocale from '../../Internal/Locale/nl_BE';
import TimePickerLocale from '../../TimePicker/Locale/nl_BE';
import type { PickerLocale } from '../Generate/Generate.types';

// Merge into a locale object
const locale: PickerLocale = {
    lang: {
        monthPlaceholder: 'Selecteer maand',
        placeholder: 'Selecteer datum',
        quarterPlaceholder: 'Selecteer kwartaal',
        rangeMonthPlaceholder: ['Begin maand', 'Eind maand'],
        rangePlaceholder: ['Begin datum', 'Eind datum'],
        rangeWeekPlaceholder: ['Begin week', 'Eind week'],
        rangeYearPlaceholder: ['Begin jaar', 'Eind jaar'],
        weekPlaceholder: 'Selecteer week',
        yearPlaceholder: 'Selecteer jaar',
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
