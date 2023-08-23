import { isInRange } from '../Utils/dateUtil';
import type { GenerateConfig } from '../Generate';
import type { RangeValue, NullableDateType } from '../OcPicker.types';
import { getValue } from '../Utils/miscUtil';

import styles from '../ocpicker.module.scss';

export default function useCellClassNames<DateType>({
  generateConfig,
  rangedValue,
  hoverRangedValue,
  isInView,
  isSameCell,
  offsetCell,
  today,
  todayActive,
  value,
}: {
  generateConfig: GenerateConfig<DateType>;
  isSameCell: (
    current: NullableDateType<DateType>,
    target: NullableDateType<DateType>
  ) => boolean;
  offsetCell: (date: DateType, offset: number) => DateType;
  isInView: (date: DateType) => boolean;
  rangedValue?: RangeValue<DateType>;
  hoverRangedValue?: RangeValue<DateType>;
  today?: NullableDateType<DateType>;
  todayActive?: boolean;
  value?: NullableDateType<DateType>;
}) {
  function getClassName(currentDate: DateType) {
    const prevDate: DateType = offsetCell(currentDate, -1);
    const nextDate: DateType = offsetCell(currentDate, 1);

    const rangeStart: DateType = getValue(rangedValue, 0);
    const rangeEnd: DateType = getValue(rangedValue, 1);

    const hoverStart: DateType = getValue(hoverRangedValue, 0);
    const hoverEnd: DateType = getValue(hoverRangedValue, 1);

    const isRangeHovered: boolean = isInRange(
      generateConfig,
      hoverStart,
      hoverEnd,
      currentDate
    );

    function isRangeStart(date: DateType) {
      return isSameCell(rangeStart, date);
    }
    function isRangeEnd(date: DateType) {
      return isSameCell(rangeEnd, date);
    }
    const isHoverStart: boolean = isSameCell(hoverStart, currentDate);
    const isHoverEnd: boolean = isSameCell(hoverEnd, currentDate);

    const isHoverEdgeStart: boolean =
      (isRangeHovered || isHoverEnd) &&
      (!isInView(prevDate) || isRangeEnd(prevDate));
    const isHoverEdgeEnd: boolean =
      (isRangeHovered || isHoverStart) &&
      (!isInView(nextDate) || isRangeStart(nextDate));

    return {
      // In view
      [styles.pickerCellInView]: isInView(currentDate),

      // Range
      [styles.pickerCellInRange]: isInRange<DateType>(
        generateConfig,
        rangeStart,
        rangeEnd,
        currentDate
      ),
      [styles.pickerCellRangeStart]: isRangeStart(currentDate),
      [styles.pickerCellRangeEnd]: isRangeEnd(currentDate),
      ['picker-cell-range-start-single']:
        isRangeStart(currentDate) && !rangeEnd,
      ['picker-cell-range-end-single']: isRangeEnd(currentDate) && !rangeStart,
      ['picker-cell-range-start-near-hover']:
        isRangeStart(currentDate) &&
        (isSameCell(prevDate, hoverStart) ||
          isInRange(generateConfig, hoverStart, hoverEnd, prevDate)),
      ['picker-cell-range-end-near-hover']:
        isRangeEnd(currentDate) &&
        (isSameCell(nextDate, hoverEnd) ||
          isInRange(generateConfig, hoverStart, hoverEnd, nextDate)),

      // Range Hover
      [styles.pickerCellRangeHover]: isRangeHovered,
      [styles.pickerCellRangeHoverStart]: isHoverStart,
      [styles.pickerCellRangeHoverEnd]: isHoverEnd,

      // Range Edge
      ['picker-cell-range-hover-edge-start']: isHoverEdgeStart,
      ['picker-cell-range-hover-edge-end']: isHoverEdgeEnd,
      ['picker-cell-range-hover-edge-start-near-range']:
        isHoverEdgeStart && isSameCell(prevDate, rangeEnd),
      ['picker-cell-range-hover-edge-end-near-range']:
        isHoverEdgeEnd && isSameCell(nextDate, rangeStart),

      // Others
      [styles.pickerCellToday]: isSameCell(today, currentDate) && todayActive,
      [styles.pickerCellSelected]: isSameCell(value, currentDate),
    };
  }

  return getClassName;
}
