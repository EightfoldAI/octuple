import CalendarLocale from '../../Internal/Locale/fr_CA';
import TimePickerLocale from '../../TimePicker/Locale/fr_CA';
import type { PickerLocale } from '../Generate/Generate.types';

// Merge into a locale object
const locale: PickerLocale = {
    lang: {
        placeholder: 'Sélectionner une date',
        yearPlaceholder: 'Sélectionner une année',
        quarterPlaceholder: 'Sélectionner un trimestre',
        monthPlaceholder: 'Sélectionner un mois',
        weekPlaceholder: 'Sélectionner une semaine',
        rangePlaceholder: ['Date de début', 'Date de fin'],
        rangeYearPlaceholder: ['Année de début', 'Année de fin'],
        rangeMonthPlaceholder: ['Mois de début', 'Mois de fin'],
        rangeWeekPlaceholder: ['Semaine de début', 'Semaine de fin'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
