/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import DatePicker from '../DateTimePicker/DatePicker/Locale/nl_NL';
import Dialog from '../Dialog/BaseDialog/Locale/nl_NL';
import InfoBar from '../InfoBar/Locale/nl_NL';
import Pagination from '../Pagination/Locale/nl_NL';
import Panel from '../Panel/Locale/nl_NL';
import Stepper from '../Stepper/Locale/nl_NL';
import Table from '../Table/Locale/nl_NL';
import TimePicker from '../DateTimePicker/TimePicker/Locale/nl_NL';
import Upload from '../Upload/Locale/nl_NL';

const typeTemplate = '${label} is geen geldige ${type}';

const localeValues: Locale = {
    locale: 'nl',
    global: {
        placeholder: 'Maak een selectie',
    },
    DatePicker,
    Dialog,
    Form: {
        optional: '(optioneel)',
        defaultValidateMessages: {
            default: 'Validatiefout voor ${label}',
            required: 'Gelieve ${label} in te vullen',
            enum: '${label} moet één van [${enum}] zijn',
            whitespace: '${label} mag geen blanco teken zijn',
            date: {
                format: '${label} heeft een ongeldig formaat',
                parse: '${label} kan niet naar een datum omgezet worden',
                invalid: '${label} is een ongeldige datum',
            },
            types: {
                string: typeTemplate,
                method: typeTemplate,
                array: typeTemplate,
                object: typeTemplate,
                number: typeTemplate,
                date: typeTemplate,
                boolean: typeTemplate,
                integer: typeTemplate,
                float: typeTemplate,
                regexp: typeTemplate,
                email: typeTemplate,
                url: typeTemplate,
                hex: typeTemplate,
            },
            string: {
                len: '${label} moet ${len} karakters lang zijn',
                min: '${label} moet minimaal ${min} karakters lang zijn',
                max: '${label} mag maximaal ${max} karakters lang zijn',
                range: '${label} moet tussen ${min}-${max} karakters lang zijn',
            },
            number: {
                len: '${label} moet gelijk zijn aan ${len}',
                min: '${label} moet minimaal ${min} zijn',
                max: '${label} mag maximaal ${max} zijn',
                range: '${label} moet tussen ${min}-${max} liggen',
            },
            array: {
                len: 'Moeten ${len} ${label} zijn',
                min: 'Minimaal ${min} ${label}',
                max: 'maximaal ${max} ${label}',
                range: 'Het aantal ${label} moet tussen ${min}-${max} liggen',
            },
            pattern: {
                mismatch:
                    '${label} komt niet overeen met het patroon ${pattern}',
            },
        },
    },
    InfoBar,
    Pagination,
    Panel,
    Stepper,
    Table,
    TimePicker,
    Upload,
};

export default localeValues;
