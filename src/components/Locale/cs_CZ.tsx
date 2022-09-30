import type { Locale } from '../LocaleProvider';
import DatePicker from '../DateTimePicker/DatePicker/Locale/cs_CZ';
import Pagination from '../Pagination/Locale/cs_CZ';
import Table from '../Table/Locale/cs_CZ';
import TimePicker from '../DateTimePicker/TimePicker/Locale/cs_CZ';

const localeValues: Locale = {
    locale: 'cs',
    global: {
        placeholder: 'Prosím vyber',
    },
    DatePicker,
    Pagination,
    Table,
    TimePicker,
};

export default localeValues;
