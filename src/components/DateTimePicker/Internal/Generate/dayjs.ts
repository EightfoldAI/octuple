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

dayjs.extend((_o: unknown, c: typeof Dayjs) => {
  // todo support Wo (ISO week)
  const proto: Dayjs = c.prototype;
  const oldFormat: (template?: string) => string = proto.format;
  proto.format = function f(formatStr: string) {
    const str: string = (formatStr || '').replace('Wo', 'wo');
    return oldFormat.bind(this)(str);
  };
});

// The below mappings should map to langs currently supported by Eightfold
// Dayjs currently supported langs: https://github.com/iamkun/dayjs/tree/dev/src/locale
type IlocaleMapObject = Record<string, string>;
const localeMap: IlocaleMapObject = {
  ar_SA: 'ar', // العربية
  bg_BG: 'bg', // Български
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
  hi_IN: 'hi', // हिंदी
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
  ro_RO: 'ro', // Română
  ru_RU: 'ru', // Pусский
  sk_SK: 'sk', // Slovenčina
  sr_RS: 'sr', // Srpski
  sv_SE: 'sv', // Svenska
  te_IN: 'te', // తెలుగు
  th_TH: 'th', // ภาษาไทย
  tr_TR: 'tr', // Türkçe
  uk_UA: 'uk', // Yкраїнська
  vi_VN: 'vi', // Tiếng Việt
  zh_CN: 'zh-cn', // 中文 (简体)
  zh_TW: 'zh-tw', // 中文 (繁體)
};

const parseLocale = (locale: string): string => {
  const mapLocale: string = localeMap[locale];
  return mapLocale || locale.split('_')[0];
};

const generateConfig: GenerateConfig<Dayjs> = {
  // Get
  getNow: (): Dayjs => dayjs(),
  getFixedDate: (string: string): Dayjs =>
    dayjs(string, ['YYYY-M-DD', 'YYYY-MM-DD']),
  getEndDate: (date: Dayjs): Dayjs => date.endOf('month'),
  getWeekDay: (date: Dayjs): number => {
    const clone: Dayjs = date.locale('en');
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: (date: Dayjs): number => date.year(),
  getMonth: (date: Dayjs): number => date.month(),
  getDate: (date: Dayjs): number => date.date(),
  getHour: (date: Dayjs): number => date.hour(),
  getMinute: (date: Dayjs): number => date.minute(),
  getSecond: (date: Dayjs): number => date.second(),

  // Set
  addYear: (date: Dayjs, diff: number): Dayjs => date.add(diff, 'year'),
  addMonth: (date: Dayjs, diff: number): Dayjs => date.add(diff, 'month'),
  addDate: (date: Dayjs, diff: number): Dayjs => date.add(diff, 'day'),
  setYear: (date: Dayjs, year: number): Dayjs => date.year(year),
  setMonth: (date: Dayjs, month: number): Dayjs => date.month(month),
  setDate: (date: Dayjs, num: number): Dayjs => date.date(num),
  setHour: (date: Dayjs, hour: number): Dayjs => date.hour(hour),
  setMinute: (date: Dayjs, minute: number): Dayjs => date.minute(minute),
  setSecond: (date: Dayjs, second: number): Dayjs => date.second(second),

  // Compare
  isAfter: (date1: Dayjs, date2: Dayjs): boolean => date1.isAfter(date2),
  isValidate: (date: Dayjs): boolean => date.isValid(),

  locale: {
    getWeekFirstDay: (locale: string): number =>
      dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek(),
    getWeekFirstDate: (locale: string, date: Dayjs): Dayjs =>
      date.locale(parseLocale(locale)).weekday(0),
    getWeek: (locale: string, date: Dayjs): number =>
      date.locale(parseLocale(locale)).week(),
    getShortWeekDays: (locale: string): string[] =>
      dayjs().locale(parseLocale(locale)).localeData().weekdaysMin(),
    getShortMonths: (locale: string): string[] =>
      dayjs().locale(parseLocale(locale)).localeData().monthsShort(),
    format: (locale: string, date: Dayjs, format: string): string =>
      date.locale(parseLocale(locale)).format(format),
    parse: (locale: string, text: string, formats: string[]): Dayjs => {
      const localeStr: string = parseLocale(locale);
      for (let i: number = 0; i < formats.length; i += 1) {
        const format: string = formats[i];
        const formatText: string = text;
        if (format.includes('wo') || format.includes('Wo')) {
          // parse Wo
          const year: string = formatText.split('-')[0];
          const weekStr: string = formatText.split('-')[1];
          const firstWeek: Dayjs = dayjs(year, 'YYYY')
            .startOf('year')
            .locale(localeStr);
          for (let j = 0; j <= 52; j += 1) {
            const nextWeek: Dayjs = firstWeek.add(j, 'week');
            if (nextWeek.format('Wo') === weekStr) {
              return nextWeek;
            }
          }
          return null;
        }
        const date: Dayjs = dayjs(formatText, format).locale(localeStr);
        if (date.isValid()) {
          return date;
        }
      }

      return null;
    },
  },
};

export default generateConfig;
