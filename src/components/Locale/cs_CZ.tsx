import type { Locale } from '../LocaleProvider';
import DatePicker from '../DateTimePicker/DatePicker/Locale/cs_CZ';
import Dialog from '../Dialog/BaseDialog/Locale/cs_CZ';
import InfoBar from '../InfoBar/Locale/cs_CZ';
import Pagination from '../Pagination/Locale/cs_CZ';
import Panel from '../Panel/Locale/cs_CZ';
import Stepper from '../Stepper/Locale/cs_CZ';
import Table from '../Table/Locale/cs_CZ';
import TimePicker from '../DateTimePicker/TimePicker/Locale/cs_CZ';
import Upload from '../Upload/Locale/cs_CZ';

const localeValues: Locale = {
    locale: 'cs',
    global: {
        placeholder: 'Prosím vyber',
    },
    DatePicker,
    Dialog,
    InfoBar,
    Pagination,
    Panel,
    Stepper,
    Table,
    TimePicker,
    Upload,
};

export default localeValues;
