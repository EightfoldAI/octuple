import CalendarLocale from '../../Internal/Locale/sv_SE';
import TimePickerLocale from '../../TimePicker/Locale/sv_SE';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
    lang: {
        placeholder: 'Välj datum',
        yearPlaceholder: 'Välj år',
        quarterPlaceholder: 'Välj kvartal',
        monthPlaceholder: 'Välj månad',
        weekPlaceholder: 'Välj vecka',
        rangePlaceholder: ['Startdatum', 'Slutdatum'],
        rangeYearPlaceholder: ['Startår', 'Slutår'],
        rangeMonthPlaceholder: ['Startmånad', 'Slutmånad'],
        rangeWeekPlaceholder: ['Startvecka', 'Slutvecka'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
