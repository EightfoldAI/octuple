/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';

const typeTemplate = '${label} geçerli bir ${type} değil';

const localeValues: Locale = {
    locale: 'tr',
    global: {
        placeholder: 'Lütfen seçiniz',
    },
    Form: {
        optional: '(opsiyonel)',
        defaultValidateMessages: {
            default: 'Alan doğrulama hatası ${label}',
            required: '${label} gerekli bir alan',
            enum: '${label} şunlardan biri olmalı: [${enum}]',
            whitespace: '${label} sadece boşluk olamaz',
            date: {
                format: '${label} tarih biçimi geçersiz',
                parse: '${label} bir tarihe dönüştürülemedi',
                invalid: '${label} geçersiz bir tarih',
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
                len: '${label} ${len} karakter olmalı',
                min: '${label} en az ${min} karakter olmalı',
                max: '${label} en çok ${max} karakter olmalı',
                range: '${label} ${min}-${max} karakter arası olmalı',
            },
            number: {
                len: '${label} ${len} olmalı',
                min: '${label} en az ${min} olmalı',
                max: '${label} en çok ${max} olmalı',
                range: '${label} ${min}-${max} arası olmalı',
            },
            array: {
                len: '${label} sayısı ${len} olmalı',
                min: '${label} sayısı en az ${min} olmalı',
                max: '${label} sayısı en çok ${max} olmalı',
                range: '${label} sayısı ${min}-${max} arası olmalı',
            },
            pattern: {
                mismatch: '${label} şu kalıpla eşleşmeli: ${pattern}',
            },
        },
    },
};

export default localeValues;
