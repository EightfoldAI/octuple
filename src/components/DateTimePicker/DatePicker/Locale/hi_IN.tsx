import CalendarLocale from '../../Internal/Locale/hi_IN';
import TimePickerLocale from '../../TimePicker/Locale/hi_IN';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'दिनांक का चयन करें',
    yearPlaceholder: 'वर्ष का चयन करें',
    quarterPlaceholder: 'तिमाही का चयन करें',
    monthPlaceholder: 'महीने का चयन करें',
    weekPlaceholder: 'सप्ताह का चयन करें',
    rangePlaceholder: ['प्रारंभ दिनांक', 'समाप्ति दिनांक'],
    rangeYearPlaceholder: ['वर्ष प्रारंभ करें', 'वर्ष के अंत में'],
    rangeQuarterPlaceholder: ['प्रारंभ तिमाही', 'अंत तिमाही'],
    rangeMonthPlaceholder: ['महीना शुरू करें', 'अंत माह'],
    rangeWeekPlaceholder: ['सप्ताह की शुरुआत', 'सप्ताह के अंत में'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
