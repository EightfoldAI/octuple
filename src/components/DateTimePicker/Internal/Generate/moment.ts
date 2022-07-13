import type { Moment } from 'moment';
import moment from 'moment';
import type { GenerateConfig } from '.';

const generateConfig: GenerateConfig<Moment> = {
    // get
    getNow: () => moment(),
    getFixedDate: (string) => moment(string, 'YYYY-MM-DD'),
    getEndDate: (date) => {
        const clone = date.clone();
        return clone.endOf('month');
    },
    getWeekDay: (date) => {
        const clone = date.clone().locale('en_US');
        return clone.weekday() + clone.localeData().firstDayOfWeek();
    },
    getYear: (date) => date.year(),
    getMonth: (date) => date.month(),
    getDate: (date) => date.date(),
    getHour: (date) => date.hour(),
    getMinute: (date) => date.minute(),
    getSecond: (date) => date.second(),

    // set
    addYear: (date, diff) => {
        const clone = date.clone();
        return clone.add(diff, 'year');
    },
    addMonth: (date, diff) => {
        const clone = date.clone();
        return clone.add(diff, 'month');
    },
    addDate: (date, diff) => {
        const clone = date.clone();
        return clone.add(diff, 'day');
    },
    setYear: (date, year) => {
        const clone = date.clone();
        return clone.year(year);
    },
    setMonth: (date, month) => {
        const clone = date.clone();
        return clone.month(month);
    },
    setDate: (date, num) => {
        const clone = date.clone();
        return clone.date(num);
    },
    setHour: (date, hour) => {
        const clone = date.clone();
        return clone.hour(hour);
    },
    setMinute: (date, minute) => {
        const clone = date.clone();
        return clone.minute(minute);
    },
    setSecond: (date, second) => {
        const clone = date.clone();
        return clone.second(second);
    },

    // Compare
    isAfter: (date1, date2) => date1.isAfter(date2),
    isValidate: (date) => date.isValid(),

    locale: {
        getWeekFirstDay: (locale = 'en_US') => {
            const date: Moment = moment().locale(locale);
            return date.localeData().firstDayOfWeek();
        },
        getWeekFirstDate: (locale = 'en_US', date) => {
            const clone: Moment = date.clone();
            const result: Moment = clone.locale(locale);
            return result.weekday(0);
        },
        getWeek: (locale = 'en_US', date) => {
            const clone: Moment = date.clone();
            const result: Moment = clone.locale(locale);
            return result.week();
        },
        getShortWeekDays: (locale = 'en_US') => {
            const date: Moment = moment().locale(locale);
            return date.localeData().weekdaysMin();
        },
        getShortMonths: (locale = 'en_US') => {
            const date: Moment = moment().locale(locale);
            return date.localeData().monthsShort();
        },
        format: (locale = 'en_US', date, format) => {
            const clone: Moment = date.clone();
            const result: Moment = clone.locale(locale);
            return result.format(format);
        },
        parse: (locale = 'en_US', text, formats) => {
            const fallbackFormatList: string[] = [];

            for (let i = 0; i < formats.length; i += 1) {
                let format: string = formats[i];
                let formatText: string = text;

                if (format.includes('wo') || format.includes('Wo')) {
                    format = format.replace(/wo/g, 'w').replace(/Wo/g, 'W');
                    const matchFormat = format.match(/[-YyMmDdHhSsWwGg]+/g);
                    const matchText = formatText.match(/[-\d]+/g);

                    if (matchFormat && matchText) {
                        format = matchFormat.join('');
                        formatText = matchText.join('');
                    } else {
                        fallbackFormatList.push(format.replace(/o/g, ''));
                    }
                }

                const date = moment(formatText, format, locale, true);
                if (date.isValid()) {
                    return date;
                }
            }

            // Fallback to fuzzy matching, this should always not reach match or need fire a issue
            for (let i = 0; i < fallbackFormatList.length; i += 1) {
                const date: Moment = moment(
                    text,
                    fallbackFormatList[i],
                    locale,
                    false
                );

                if (date.isValid()) {
                    return date;
                }
            }

            return null;
        },
    },
};

export default generateConfig;
