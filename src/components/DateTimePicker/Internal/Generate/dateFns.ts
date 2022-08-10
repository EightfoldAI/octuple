import {
    getDay,
    getYear,
    getMonth,
    getDate,
    endOfMonth,
    getHours,
    getMinutes,
    getSeconds,
    addYears,
    addMonths,
    addDays,
    setYear,
    setMonth,
    setDate,
    setHours,
    setMinutes,
    setSeconds,
    isAfter,
    isValid,
    getWeek,
    startOfWeek,
    format as formatDate,
    parse as parseDate,
} from 'date-fns';
import * as Locale from 'date-fns/locale';
import type { GenerateConfig } from '.';

const dealLocal = (str: string) => {
    return str.replace(/_/g, '');
};

const localeParse = (format: string) => {
    return format
        .replace(/Y/g, 'y')
        .replace(/D/g, 'd')
        .replace(/gggg/, 'yyyy')
        .replace(/g/g, 'G')
        .replace(/([Ww])o/g, 'wo');
};

const generateConfig: GenerateConfig<Date> = {
    // get
    getNow: () => new Date(),
    getFixedDate: (string) => new Date(string),
    getEndDate: (date) => endOfMonth(date),
    getWeekDay: (date) => getDay(date),
    getYear: (date) => getYear(date),
    getMonth: (date) => getMonth(date),
    getDate: (date) => getDate(date),
    getHour: (date) => getHours(date),
    getMinute: (date) => getMinutes(date),
    getSecond: (date) => getSeconds(date),

    // set
    addYear: (date, diff) => addYears(date, diff),
    addMonth: (date, diff) => addMonths(date, diff),
    addDate: (date, diff) => addDays(date, diff),
    setYear: (date, year) => setYear(date, year),
    setMonth: (date, month) => setMonth(date, month),
    setDate: (date, num) => setDate(date, num),
    setHour: (date, hour) => setHours(date, hour),
    setMinute: (date, minute) => setMinutes(date, minute),
    setSecond: (date, second) => setSeconds(date, second),

    // Compare
    isAfter: (date1, date2) => isAfter(date1, date2),
    isValidate: (date) => isValid(date),

    locale: {
        getWeekFirstDay: (locale) => {
            const clone: any = (Locale as any)[dealLocal(locale)];
            return clone.options.weekStartsOn;
        },
        getWeekFirstDate: (locale, date) => {
            return startOfWeek(date, {
                locale: (Locale as any)[dealLocal(locale)],
            });
        },
        getWeek: (locale, date) => {
            return getWeek(date, {
                locale: (Locale as any)[dealLocal(locale)],
            });
        },
        getShortWeekDays: (locale) => {
            const clone: any = (Locale as any)[dealLocal(locale)];
            return Array.from({ length: 7 }).map((_, i) =>
                clone.localize.day(i, { width: 'short' })
            );
        },
        getShortMonths: (locale) => {
            const clone: any = (Locale as any)[dealLocal(locale)];
            return Array.from({ length: 12 }).map((_, i) =>
                clone.localize.month(i, { width: 'abbreviated' })
            );
        },
        format: (locale, date, format) => {
            if (!isValid(date)) {
                return null;
            }
            return formatDate(date, localeParse(format), {
                locale: (Locale as any)[dealLocal(locale)],
            });
        },
        parse: (locale, text, formats) => {
            for (let i = 0; i < formats.length; i += 1) {
                const format: string = localeParse(formats[i]);
                const formatText: string = text;
                const date: Date = parseDate(formatText, format, new Date(), {
                    locale: (Locale as any)[dealLocal(locale)],
                });
                if (isValid(date)) {
                    return date;
                }
            }
            return null;
        },
    },
};

export default generateConfig;
