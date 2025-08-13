import type { NullableDateType } from '../OcPicker.types';
import type { GenerateConfig } from '../Generate';
import type { RangeValue } from '../OcPicker.types';

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
  const lowerBoundMinute: number = Math.floor(minute / minuteStep) * minuteStep;
  if (lowerBoundMinute < minute) {
    return [lowerBoundHour, lowerBoundMinute, 60 - secondStep];
  }
  const lowerBoundSecond: number = Math.floor(second / secondStep) * secondStep;
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

export function normalizeRangeTimes<DateType>(
  generateConfig: GenerateConfig<DateType>,
  values: RangeValue<DateType>
): RangeValue<DateType> {
  if (!values) {
    return values;
  }

  let normalizedValues: [DateType, DateType] = values;

  // Set start date to beginning of day (00:00:00)
  if (normalizedValues?.[0]) {
    normalizedValues[0] = setTime(
      generateConfig,
      normalizedValues[0],
      0, // hour
      0, // minute
      0 // second
    );
  }

  // Set end date to end of day (23:59:59)
  if (normalizedValues?.[1]) {
    normalizedValues[1] = setTime(
      generateConfig,
      normalizedValues[1],
      23, // hour
      59, // minute
      59 // second
    );
  }

  return normalizedValues;
}

export function normalizeSingleTime<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date: DateType,
  isStartDate: boolean
): DateType {
  if (isStartDate) {
    // Set to beginning of day (00:00:00)
    return setTime(generateConfig, date, 0, 0, 0);
  } else {
    // Set to end of day (23:59:59)
    return setTime(generateConfig, date, 23, 59, 59);
  }
}
