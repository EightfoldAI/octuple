import CalendarLocale from '../../Internal/Locale/ar_SA';
import TimePickerLocale from '../../TimePicker/Locale/ar_SA';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'اختر التاريخ',
    yearPlaceholder: 'اختر السنة',
    quarterPlaceholder: 'اختر الربع',
    monthPlaceholder: 'اختر الشهر',
    weekPlaceholder: 'اختر الأسبوع',
    rangePlaceholder: ['تاريخ البداية', 'تاريخ النهاية'],
    rangeYearPlaceholder: ['سنة البداية', 'سنة النهاية'],
    rangeQuarterPlaceholder: ['ربع البداية', 'ربع النهاية'],
    rangeMonthPlaceholder: ['شهر البداية', 'شهر النهاية'],
    rangeWeekPlaceholder: ['أسبوع البداية', 'أسبوع النهاية'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
