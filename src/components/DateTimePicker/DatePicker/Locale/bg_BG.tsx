import CalendarLocale from '../../Internal/Locale/bg_BG';
import TimePickerLocale from '../../TimePicker/Locale/bg_BG';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Изберете дата',
    yearPlaceholder: 'Изберете година',
    quarterPlaceholder: 'Изберете тримесечие',
    monthPlaceholder: 'Изберете месец',
    weekPlaceholder: 'Изберете седмица',
    rangePlaceholder: ['Начална дата', 'Крайна дата'],
    rangeYearPlaceholder: ['Начална година', 'Крайна година'],
    rangeQuarterPlaceholder: ['Начално тримесечие', 'Крайно тримесечие'],
    rangeMonthPlaceholder: ['Начален месец', 'Краен месец'],
    rangeWeekPlaceholder: ['Начална седмица', 'Крайна седмица'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
