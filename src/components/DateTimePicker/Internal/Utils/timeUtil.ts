import type { NullableDateType } from '../OcPicker.types';
import type { GenerateConfig } from '../Generate';

export function setTime<DateType>(
    generateConfig: GenerateConfig<DateType>,
    date: DateType,
    hour: number,
    minute: number,
    second: number
): DateType {
    let nextTime: DateType = generateConfig.setHour(date, hour);
    nextTime = generateConfig.setMinute(nextTime, minute);
    nextTime = generateConfig.setSecond(nextTime, second);
    return nextTime;
}

export function setDateTime<DateType>(
    generateConfig: GenerateConfig<DateType>,
    date: DateType,
    defaultDate: NullableDateType<DateType>
) {
    if (!defaultDate) {
        return date;
    }

    let newDate: DateType = date;
    newDate = generateConfig.setHour(
        newDate,
        generateConfig.getHour(defaultDate)
    );
    newDate = generateConfig.setMinute(
        newDate,
        generateConfig.getMinute(defaultDate)
    );
    newDate = generateConfig.setSecond(
        newDate,
        generateConfig.getSecond(defaultDate)
    );
    return newDate;
}

export function getLowerBoundTime(
    hour: number,
    minute: number,
    second: number,
    hourStep: number,
    minuteStep: number,
    secondStep: number
): [number, number, number] {
    const lowerBoundHour: number = Math.floor(hour / hourStep) * hourStep;
    if (lowerBoundHour < hour) {
        return [lowerBoundHour, 60 - minuteStep, 60 - secondStep];
    }
    const lowerBoundMinute: number =
        Math.floor(minute / minuteStep) * minuteStep;
    if (lowerBoundMinute < minute) {
        return [lowerBoundHour, lowerBoundMinute, 60 - secondStep];
    }
    const lowerBoundSecond: number =
        Math.floor(second / secondStep) * secondStep;
    return [lowerBoundHour, lowerBoundMinute, lowerBoundSecond];
}

export function getLastDay<DateType>(
    generateConfig: GenerateConfig<DateType>,
    date: DateType
) {
    const year: number = generateConfig.getYear(date);
    const month: number = generateConfig.getMonth(date) + 1;
    const endDate: DateType = generateConfig.getEndDate(
        generateConfig.getFixedDate(`${year}-${month}-01`)
    );
    const lastDay: number = generateConfig.getDate(endDate);
    const monthShow: string = month < 10 ? `0${month}` : `${month}`;
    return `${year}-${monthShow}-${lastDay}`;
}
