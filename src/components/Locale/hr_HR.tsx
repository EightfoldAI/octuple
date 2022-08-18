/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';

const typeTemplate = '${label} nije valjan ${type}';

const localeValues: Locale = {
    locale: 'hr',
    global: {
        placeholder: 'Molimo označite',
    },
    Form: {
        optional: '(neobavezno)',
        defaultValidateMessages: {
            default: 'Pogreška provjere valjanosti polja za ${label}',
            required: 'Molimo unesite ${label}',
            enum: '${label} mora biti jedan od [${enum}]',
            whitespace: '${label} ne može biti prazan znak',
            date: {
                format: '${label} format datuma je nevažeći',
                parse: '${label} ne može se pretvoriti u datum',
                invalid: '${label} je nevažeći datum',
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
                len: '${label} mora biti ${len} slova',
                min: '${label} mora biti najmanje ${min} slova',
                max: '${label} mora biti do ${max} slova',
                range: '${label} mora biti između ${min}-${max} slova',
            },
            number: {
                len: '${label} mora biti jednak ${len}',
                min: '${label} mora biti minimalano ${min}',
                max: '${label} mora biti maksimalano ${max}',
                range: '${label} mora biti između ${min}-${max}',
            },
            array: {
                len: 'Mora biti ${len} ${label}',
                min: 'Najmanje ${min} ${label}',
                max: 'Najviše ${max} ${label}',
                range: 'Količina ${label} mora biti između ${min}-${max}',
            },
            pattern: {
                mismatch: '${label} ne odgovara obrascu ${pattern}',
            },
        },
    },
};

export default localeValues;
