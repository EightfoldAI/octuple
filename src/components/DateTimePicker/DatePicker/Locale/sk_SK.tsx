import CalendarLocale from '../../Internal/Locale/sk_SK';
import TimePickerLocale from '../../TimePicker/Locale/sk_SK';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Vyberte dátum',
    yearPlaceholder: 'Vyberte rok',
    quarterPlaceholder: 'Vyberte štvrťrok',
    monthPlaceholder: 'Vyberte mesiac',
    weekPlaceholder: 'Vyberte týždeň',
    rangePlaceholder: ['Dátum začiatku', 'Dátum ukončenia'],
    rangeYearPlaceholder: ['Rok začiatku', 'Rok ukončenia'],
    rangeQuarterPlaceholder: ['Štvrťrok začiatku', 'Štvrťrok ukončenia'],
    rangeMonthPlaceholder: ['Mesiac začiatku', 'Mesiac ukončenia'],
    rangeWeekPlaceholder: ['Týždeň začiatku', 'Týždeň ukončenia'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
