import dayjsGenerateConfig from '../Generate/dayjs';
import { getLowerBoundTime, setTime, getLastDay } from '../Utils/timeUtil';
import { toArray } from '../Utils/miscUtil';
import { isSameTime, isSameDecade } from '../Utils/dateUtil';
import { getDayjs } from './util/commonUtil';

describe('Picker.Util', () => {
  it('toArray', () => {
    expect(toArray(null)).toEqual([]);
    expect(toArray(undefined)).toEqual([]);
    expect(toArray([1])).toEqual([1]);
    expect(toArray(1)).toEqual([1]);
  });

  // Time is only for time
  it('isSameTime', () => {
    expect(
      isSameTime(
        dayjsGenerateConfig,
        getDayjs('2000-01-01'),
        getDayjs('1989-11-28')
      )
    ).toBeTruthy();

    expect(
      isSameTime(dayjsGenerateConfig, null, getDayjs('1989-11-28'))
    ).toBeFalsy();

    expect(isSameTime(dayjsGenerateConfig, null, null)).toBeTruthy();
  });

  it('isSameDecade', () => {
    expect(isSameDecade(dayjsGenerateConfig, null, null)).toBeTruthy();
    expect(
      isSameDecade(dayjsGenerateConfig, getDayjs('2000-01-02'), null)
    ).toBeFalsy();
    expect(
      isSameDecade(
        dayjsGenerateConfig,
        getDayjs('1995-01-01'),
        getDayjs('1999-01-01')
      )
    ).toBeTruthy();
  });

  describe('getLowerBoundTime', () => {
    it('basic case', () => {
      expect(getLowerBoundTime(23, 59, 59, 1, 1, 1)).toEqual([23, 59, 59]);
    });
    it('case to lower hour #1', () => {
      expect(getLowerBoundTime(1, 4, 5, 4, 15, 15)).toEqual([0, 45, 45]);
    });
    it('case to lower hour #2', () => {
      expect(getLowerBoundTime(3, 4, 5, 4, 15, 15)).toEqual([0, 45, 45]);
    });
    it('case to same hour, lower minute #1', () => {
      expect(getLowerBoundTime(1, 31, 5, 1, 15, 15)).toEqual([1, 30, 45]);
    });
    it('case to same hour, lower minute #2', () => {
      expect(getLowerBoundTime(1, 44, 5, 1, 15, 15)).toEqual([1, 30, 45]);
    });
    it('case to same hour, same minute, lower second #1', () => {
      expect(getLowerBoundTime(1, 44, 5, 1, 1, 15)).toEqual([1, 44, 0]);
    });
    it('case to same hour, same minute, lower second #2', () => {
      expect(getLowerBoundTime(1, 44, 14, 1, 1, 15)).toEqual([1, 44, 0]);
    });
  });

  describe('setTime', () => {
    expect(
      isSameTime(
        dayjsGenerateConfig,
        setTime(dayjsGenerateConfig, getDayjs('1995-01-01 00:00:00'), 8, 7, 6),
        getDayjs('1995-01-01 08:07:06')
      )
    ).toBeTruthy();
  });

  describe('getLastDay', () => {
    expect(getLastDay(dayjsGenerateConfig, getDayjs('2020-10-01'))).toEqual(
      '2020-10-31'
    );
  });
});
