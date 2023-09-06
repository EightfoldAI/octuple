import React, { useCallback } from 'react';
import type { GenerateConfig } from '../Generate';
import type { Locale, OcPickerMode, RangeValue } from '../OcPicker.types';
import { getQuarter, isSameDate } from '../Utils/dateUtil';
import { getValue } from '../Utils/miscUtil';

export default function useRangeDisabled<DateType>(
  {
    picker,
    locale,
    selectedValue,
    disabledDate,
    disabled,
    generateConfig,
  }: {
    picker: OcPickerMode;
    selectedValue: RangeValue<DateType>;
    disabledDate?: (date: DateType) => boolean;
    disabled: [boolean, boolean];
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
  },
  firstTimeOpen: boolean
) {
  const startDate: DateType = getValue(selectedValue, 0);
  const endDate: DateType = getValue(selectedValue, 1);

  function weekFirstDate(date: DateType): DateType {
    return generateConfig.locale.getWeekFirstDate(locale.locale, date);
  }

  function monthNumber(date: DateType): number {
    const year = generateConfig.getYear(date);
    const month = generateConfig.getMonth(date);
    return year * 100 + month;
  }

  function quarterNumber(date: DateType): number {
    const year = generateConfig.getYear(date);
    const quarter = getQuarter(generateConfig, date);
    return year * 10 + quarter;
  }

  const disabledStartDate = useCallback(
    (date: DateType): boolean => {
      if (disabled[0] || (disabledDate && disabledDate(date))) {
        return true;
      }

      // Disabled range
      if (disabled[1] && endDate) {
        return (
          !isSameDate(generateConfig, date, endDate) &&
          generateConfig.isAfter(date, endDate)
        );
      }

      // Disabled part
      if (!firstTimeOpen && endDate) {
        switch (picker) {
          case 'quarter':
            return quarterNumber(date) > quarterNumber(endDate);
          case 'month':
            return monthNumber(date) > monthNumber(endDate);
          case 'week':
            return weekFirstDate(date) > weekFirstDate(endDate);
          default:
            return (
              !isSameDate(generateConfig, date, endDate) &&
              generateConfig.isAfter(date, endDate)
            );
        }
      }

      return false;
    },
    [disabledDate, disabled[1], endDate, firstTimeOpen]
  );

  const disabledEndDate = useCallback(
    (date: DateType): boolean => {
      if (disabled[1] || (disabledDate && disabledDate(date))) {
        return true;
      }

      // Disabled range
      if (disabled[0] && startDate) {
        return (
          !isSameDate(generateConfig, date, endDate) &&
          generateConfig.isAfter(startDate, date)
        );
      }

      // Disabled part
      if (!firstTimeOpen && startDate) {
        switch (picker) {
          case 'quarter':
            return quarterNumber(date) < quarterNumber(startDate);
          case 'month':
            return monthNumber(date) < monthNumber(startDate);
          case 'week':
            return weekFirstDate(date) < weekFirstDate(startDate);
          default:
            return (
              !isSameDate(generateConfig, date, startDate) &&
              generateConfig.isAfter(startDate, date)
            );
        }
      }

      return false;
    },
    [disabledDate, disabled[0], startDate, firstTimeOpen]
  );

  return [disabledStartDate, disabledEndDate];
}
