import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { GenerateConfig } from '.';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

dayjs.extend((_o, c) => {
    // todo support Wo (ISO week)
    const proto = c.prototype;
    const oldFormat = proto.format;
    proto.format = function f(formatStr: string) {
        const str = (formatStr || '').replace('Wo', 'wo');
        return oldFormat.bind(this)(str);
    };
});

// The below mappings should map to langs currently supported by Eightfold
// Dayjs currently supported langs: https://github.com/iamkun/dayjs/tree/dev/src/locale
type IlocaleMapObject = Record<string, string>;
const localeMap: IlocaleMapObject = {
    cs_CZ: 'cs', // čeština
    da_DK: 'da', // Dansk
    de_DE: 'de', // Deutsch
    el_GR: 'el', // Ελληνικά
    en_GB: 'en-gb', // English (United Kingdom)
    en_US: 'en', // English (United States)
    es_ES: 'es', // Español
    es_DO: 'es-do', // Español (Dominican Republic)
    es_MX: 'es-mx', // Español (Mexico)
    fi_FI: 'fi', // Suomi
    fr_BE: 'fr', // Français (Belgium) TODO: dayjs has no fr_BE locale, use fr
    fr_CA: 'fr-ca', // Français (Canada)
    fr_FR: 'fr', // Français
    he_IL: 'he', // עברית
    hr_HR: 'hr', // Hrvatski
    ht_HT: 'ht', // Haitian
    hu_HU: 'hu', // Magyar
    it_IT: 'it', // Italiano
    ja_JP: 'ja', // 日本語
    ko_KR: 'ko', // 한국어
    ms_MY: 'ms', // Bahasa melayu
    nb_NO: 'nb', // Norsk
    nl_BE: 'nl-be', // Nederlands (Belgium)
    nl_NL: 'nl', // Nederlands
    pl_PL: 'pl', // Polski
    pt_BR: 'pt-br', // Português (Brazil)
    pt_PT: 'pt', // Português
    ru_RU: 'ru', // Pусский
    sv_SE: 'sv', // Svenska
    th_TH: 'th', // ภาษาไทย
    tr_TR: 'tr', // Türkçe
    uk_UA: 'uk', // Yкраїнська
    zh_CN: 'zh-cn', // 中文 (简体)
    zh_TW: 'zh-tw', // 中文 (繁體)
};

const parseLocale = (locale: string) => {
    const mapLocale = localeMap[locale];
    return mapLocale || locale.split('_')[0];
};

const generateConfig: GenerateConfig<Dayjs> = {
    // get
    getNow: () => dayjs(),
    getFixedDate: (string) => dayjs(string, ['YYYY-M-DD', 'YYYY-MM-DD']),
    getEndDate: (date) => date.endOf('month'),
    getWeekDay: (date) => {
        const clone = date.locale('en');
        return clone.weekday() + clone.localeData().firstDayOfWeek();
    },
    getYear: (date) => date.year(),
    getMonth: (date) => date.month(),
    getDate: (date) => date.date(),
    getHour: (date) => date.hour(),
    getMinute: (date) => date.minute(),
    getSecond: (date) => date.second(),

    // set
    addYear: (date, diff) => date.add(diff, 'year'),
    addMonth: (date, diff) => date.add(diff, 'month'),
    addDate: (date, diff) => date.add(diff, 'day'),
    setYear: (date, year) => date.year(year),
    setMonth: (date, month) => date.month(month),
    setDate: (date, num) => date.date(num),
    setHour: (date, hour) => date.hour(hour),
    setMinute: (date, minute) => date.minute(minute),
    setSecond: (date, second) => date.second(second),

    // Compare
    isAfter: (date1, date2) => date1.isAfter(date2),
    isValidate: (date) => date.isValid(),

    locale: {
        getWeekFirstDay: (locale) =>
            dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek(),
        getWeekFirstDate: (locale, date) =>
            date.locale(parseLocale(locale)).weekday(0),
        getWeek: (locale, date) => date.locale(parseLocale(locale)).week(),
        getShortWeekDays: (locale) =>
            dayjs().locale(parseLocale(locale)).localeData().weekdaysMin(),
        getShortMonths: (locale) =>
            dayjs().locale(parseLocale(locale)).localeData().monthsShort(),
        format: (locale, date, format) =>
            date.locale(parseLocale(locale)).format(format),
        parse: (locale, text, formats) => {
            const localeStr = parseLocale(locale);
            for (let i = 0; i < formats.length; i += 1) {
                const format = formats[i];
                const formatText = text;
                if (format.includes('wo') || format.includes('Wo')) {
                    // parse Wo
                    const year = formatText.split('-')[0];
                    const weekStr = formatText.split('-')[1];
                    const firstWeek = dayjs(year, 'YYYY')
                        .startOf('year')
                        .locale(localeStr);
                    for (let j = 0; j <= 52; j += 1) {
                        const nextWeek = firstWeek.add(j, 'week');
                        if (nextWeek.format('Wo') === weekStr) {
                            return nextWeek;
                        }
                    }
                    return null;
                }
                const date = dayjs(formatText, format).locale(localeStr);
                if (date.isValid()) {
                    return date;
                }
            }

            return null;
        },
    },
};

export default generateConfig;
