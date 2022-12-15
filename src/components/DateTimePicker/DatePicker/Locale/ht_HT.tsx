import CalendarLocale from '../../Internal/Locale/ht_HT';
import TimePickerLocale from '../../TimePicker/Locale/ht_HT';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Chwazi dat',
    yearPlaceholder: 'Chwazi ane',
    quarterPlaceholder: 'Chwazi trimès',
    monthPlaceholder: 'Chwazi mwa',
    weekPlaceholder: 'Chwazi semèn',
    rangePlaceholder: ['Dat kòmanse', 'Dat fen'],
    rangeYearPlaceholder: ['Kòmanse ane', 'Fen ane'],
    rangeQuarterPlaceholder: ['Kòmanse trimès', 'Fen trimès'],
    rangeMonthPlaceholder: ['Kòmanse mwa', 'Fen mwa'],
    rangeWeekPlaceholder: ['Kòmanse semèn', 'Fen semèn'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
