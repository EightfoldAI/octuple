import CalendarLocale from '../../Internal/Locale/te_IN';
import TimePickerLocale from '../../TimePicker/Locale/te_IN';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'తేదీని ఎంచుకోండి',
    yearPlaceholder: 'సంవత్సరాన్ని ఎంచుకోండి',
    quarterPlaceholder: 'త్రైమాసికాన్ని ఎంచుకోండి',
    monthPlaceholder: 'నెలను ఎంచుకోండి',
    weekPlaceholder: 'వారాన్ని ఎంచుకోండి',
    rangePlaceholder: ['ప్రారంభ తేదీ', 'ముగింపు తేదీ'],
    rangeYearPlaceholder: ['ప్రారంభ సంవత్సరం', 'ముగింపు సంవత్సరం'],
    rangeQuarterPlaceholder: ['ప్రారంభ త్రైమాసికం', 'ముగింపు త్రైమాసికం'],
    rangeMonthPlaceholder: ['ప్రారంభ నెల', 'ముగింపు నెల'],
    rangeWeekPlaceholder: ['ప్రారంభ వారం', 'ముగింపు వారం'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
