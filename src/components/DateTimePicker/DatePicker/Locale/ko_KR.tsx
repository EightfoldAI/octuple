import CalendarLocale from '../../Internal/Locale/ko_KR';
import TimePickerLocale from '../../TimePicker/Locale/ko_KR';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
    lang: {
        placeholder: '날짜 선택',
        rangePlaceholder: ['시작일', '종료일'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
