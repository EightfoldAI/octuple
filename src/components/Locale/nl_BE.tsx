/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';

const typeTemplate = '${label} is geen geldige ${type}';

const localeValues: Locale = {
    locale: 'nl-be',
    global: {
        placeholder: 'Maak een selectie',
    },
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
};

export default localeValues;
