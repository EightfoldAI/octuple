/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';

const typeTemplate = '${label} הוא לא ${type} תקין';

const localeValues: Locale = {
    locale: 'he',
    global: {
        placeholder: 'אנא בחר',
    },
    Form: {
        defaultValidateMessages: {
            default: 'ערך השדה שגוי ${label}',
            required: 'בבקשה הזן ${label}',
            enum: '${label} חייב להיות אחד מערכים אלו [${enum}]',
            whitespace: '${label} לא יכול להיות ריק',
            date: {
                format: '${label} תאריך לא תקין',
                parse: '${label} לא ניתן להמיר לתאריך',
                invalid: '${label} הוא לא תאריך תקין',
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
                len: '${label} חייב להיות ${len} תווים',
                min: '${label} חייב להיות ${min} תווים',
                max: '${label} מקסימום ${max} תווים',
                range: '${label} חייב להיות בין ${min}-${max} תווים',
            },
            number: {
                len: '${label} חייב להיות שווה ל ${len}',
                min: '${label} ערך מינימלי הוא ${min}',
                max: '${label} ערך מקסימלי הוא ${max}',
                range: '${label} חייב להיות בין ${min}-${max}',
            },
            array: {
                len: 'חייב להיות ${len} ${label}',
                min: 'מינימום ${min} ${label}',
                max: 'מקסימום ${max} ${label}',
                range: 'הסכום של ${label} חייב להיות בין ${min}-${max}',
            },
            pattern: {
                mismatch: '${label} לא תואם לתבנית ${pattern}',
            },
        },
    },
};

export default localeValues;
