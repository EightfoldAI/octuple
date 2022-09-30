import CalendarLocale from '../../Internal/Locale/ja_JP';
import TimePickerLocale from '../../TimePicker/Locale/ja_JP';
import type { PickerLocale } from '../Generate/Generate.types';

const locale: PickerLocale = {
    lang: {
        placeholder: '日付を選択',
        rangePlaceholder: ['開始日付', '終了日付'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export default locale;
