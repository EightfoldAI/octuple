import CalendarLocale from '../../Internal/Locale/sr_RS';
import TimePickerLocale from '../../TimePicker/Locale/sr_RS';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Izaberite datum',
    yearPlaceholder: 'Izaberite godinu',
    quarterPlaceholder: 'Izaberite kvartal',
    monthPlaceholder: 'Izaberite mesec',
    weekPlaceholder: 'Izaberite nedelju',
    rangePlaceholder: ['Početni datum', 'Datum završetka'],
    rangeYearPlaceholder: ['Početna godina', 'Godina završetka'],
    rangeQuarterPlaceholder: ['Početni kvartal', 'Kvartal završetka'],
    rangeMonthPlaceholder: ['Početni mesec', 'Mesec završetka'],
    rangeWeekPlaceholder: ['Početna nedelja', 'Nedelja završetka'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
