import CalendarLocale from '../../Internal/Locale/vi_VN';
import TimePickerLocale from '../../TimePicker/Locale/vi_VN';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Chọn ngày',
    yearPlaceholder: 'Chọn năm',
    quarterPlaceholder: 'Chọn quý',
    monthPlaceholder: 'Chọn tháng',
    weekPlaceholder: 'Chọn tuần',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
    rangeYearPlaceholder: ['Năm bắt đầu', 'Năm kết thúc'],
    rangeQuarterPlaceholder: ['Quý bắt đầu', 'Quý kết thúc'],
    rangeMonthPlaceholder: ['Tháng bắt đầu', 'Tháng kết thúc'],
    rangeWeekPlaceholder: ['Tuần bắt đầu', 'Tuần kết thúc'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
