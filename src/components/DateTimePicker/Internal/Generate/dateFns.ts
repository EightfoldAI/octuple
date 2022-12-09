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

const dealLocal = (str: string): string => {
    return str.replace(/_/g, '');
};

const localeParse = (format: string): string => {
    return format
        .replace(/Y/g, 'y')
        .replace(/D/g, 'd')
        .replace(/gggg/, 'yyyy')
        .replace(/g/g, 'G')
        .replace(/([Ww])o/g, 'wo');
};

const generateConfig: GenerateConfig<Date> = {
    // Get
    getNow: (): Date => new Date(),
    getFixedDate: (string: string): Date => new Date(string),
    getEndDate: (date: Date): Date => endOfMonth(date),
    getWeekDay: (date: Date): number => getDay(date),
    getYear: (date: Date): number => getYear(date),
    getMonth: (date: Date): number => getMonth(date),
    getDate: (date: Date): number => getDate(date),
    getHour: (date: Date): number => getHours(date),
    getMinute: (date: Date): number => getMinutes(date),
    getSecond: (date: Date): number => getSeconds(date),

    // Set
    addYear: (date: Date, diff: number): Date => addYears(date, diff),
    addMonth: (date: Date, diff: number): Date => addMonths(date, diff),
    addDate: (date: Date, diff: number): Date => addDays(date, diff),
    setYear: (date: Date, year: number): Date => setYear(date, year),
    setMonth: (date: Date, month: number): Date => setMonth(date, month),
    setDate: (date: Date, num: number): Date => setDate(date, num),
    setHour: (date: Date, hour: number): Date => setHours(date, hour),
    setMinute: (date: Date, minute: number): Date => setMinutes(date, minute),
    setSecond: (date: Date, second: number): Date => setSeconds(date, second),

    // Compare
    isAfter: (date1: Date, date2: Date): boolean => isAfter(date1, date2),
    isValidate: (date: Date): boolean => isValid(date),

    locale: {
        getWeekFirstDay: (locale: string): number => {
            const clone: Locale = (Locale as any)[dealLocal(locale)];
            return clone.options.weekStartsOn;
        },
        getWeekFirstDate: (locale: string, date: Date): Date => {
            return startOfWeek(date, {
                locale: (Locale as any)[dealLocal(locale)],
            });
        },
        getWeek: (locale: string, date: Date): number => {
            return getWeek(date, {
                locale: (Locale as any)[dealLocal(locale)],
            });
        },
        getShortWeekDays: (locale: string): string[] => {
            const clone: Locale = (Locale as any)[dealLocal(locale)];
            return Array.from({ length: 7 }).map((_, i) =>
                clone.localize.day(i, { width: 'short' })
            );
        },
        getShortMonths: (locale: string): string[] => {
            const clone: Locale = (Locale as any)[dealLocal(locale)];
            return Array.from({ length: 12 }).map((_, i: number) =>
                clone.localize.month(i, { width: 'abbreviated' })
            );
        },
        format: (locale: string, date: Date, format: string): string => {
            if (!isValid(date)) {
                return null;
            }
            return formatDate(date, localeParse(format), {
                locale: (Locale as any)[dealLocal(locale)],
            });
        },
        parse: (locale: string, text: string, formats): Date => {
            for (let i: number = 0; i < formats.length; i += 1) {
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
