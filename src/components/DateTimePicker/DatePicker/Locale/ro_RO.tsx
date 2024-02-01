import CalendarLocale from '../../Internal/Locale/ro_RO';
import TimePickerLocale from '../../TimePicker/Locale/ro_RO';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Selectați data',
    yearPlaceholder: 'Selectați anul',
    quarterPlaceholder: 'Selectați trimestrul',
    monthPlaceholder: 'Selectați luna',
    weekPlaceholder: 'Selectați săptămâna',
    rangePlaceholder: ['Data de început', 'Data de sfârșit'],
    rangeYearPlaceholder: ['Anul de început', 'Anul de sfârșit'],
    rangeQuarterPlaceholder: ['Trimestrul de început', 'Trimestrul de sfârșit'],
    rangeMonthPlaceholder: ['Luna de început', 'Luna de sfârșit'],
    rangeWeekPlaceholder: ['Săptămâna de început', 'Săptămâna de sfârșit'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
