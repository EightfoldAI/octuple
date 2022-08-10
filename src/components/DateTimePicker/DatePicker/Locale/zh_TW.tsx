import CalendarLocale from '../../Internal/Locale/zh_TW';
import TimePickerLocale from '../../TimePicker/Locale/zh_TW';
import type { PickerLocale } from '../Generate/Generate.types';

// 统一合并为完整的 Locale
const locale: PickerLocale = {
    lang: {
        placeholder: '請選擇日期',
        yearPlaceholder: '請選擇年份',
        quarterPlaceholder: '請選擇季度',
        monthPlaceholder: '請選擇月份',
        weekPlaceholder: '請選擇周',
        rangePlaceholder: ['開始日期', '結束日期'],
        rangeYearPlaceholder: ['開始年份', '結束年份'],
        rangeMonthPlaceholder: ['開始月份', '結束月份'],
        rangeQuarterPlaceholder: ['開始季度', '結束季度'],
        rangeWeekPlaceholder: ['開始周', '結束周'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

locale.lang.ok = '確 定';

export default locale;
