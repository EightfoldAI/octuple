import CalendarLocale from '../../Internal/Locale/nb_NO';
import TimePickerLocale from '../../TimePicker/Locale/nb_NO';
import type { PickerLocale } from '../Generate/Generate.types';

// Merge into a locale object
const locale: PickerLocale = {
    lang: {
        placeholder: 'Velg dato',
        yearPlaceholder: 'Velg år',
        quarterPlaceholder: 'Velg kvartal',
        monthPlaceholder: 'Velg måned',
        weekPlaceholder: 'Velg uke',
        rangePlaceholder: ['Startdato', 'Sluttdato'],
        rangeYearPlaceholder: ['Startår', 'Sluttår'],
        rangeMonthPlaceholder: ['Startmåned', 'Sluttmåned'],
        rangeWeekPlaceholder: ['Start uke', 'Sluttuke'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
