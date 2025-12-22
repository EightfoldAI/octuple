import React from 'react';
import { PartialBodyProps, PickerCellProps } from './Partial.types';
import { mergeClasses } from '../../../../shared/utilities';
import PartialContext from '../PartialContext';
import { getLastDay } from '../Utils/timeUtil';
import { getCellDateDisabled } from '../Utils/dateUtil';
import { Breakpoints, useMatchMedia } from '../../../../hooks/useMatchMedia';
import { DatePickerSize } from '../OcPicker.types';

import styles from '../ocpicker.module.scss';

export default function PartialBody<DateType>({
  baseDate,
  colNum,
  disabledDate,
  generateConfig,
  getCellClassNames,
  getCellDate,
  getCellNode,
  getCellText,
  headerCells,
  onSelect,
  picker,
  rowClassNames,
  rowNum,
  size = DatePickerSize.Medium,
  titleCell,
  getCellProps,
}: PartialBodyProps<DateType>) {
  const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
  const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
  const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
  const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);
  const { onDateMouseEnter, onDateMouseLeave, mode } =
    React.useContext(PartialContext);

  const rows: React.ReactNode[] = [];

  for (let i: number = 0; i < rowNum; i += 1) {
    const row: React.ReactNode[] = [];
    let rowStartDate: DateType;

    for (let j: number = 0; j < colNum; j += 1) {
      const offset: number = i * colNum + j;
      const currentDate: DateType = getCellDate(baseDate, offset);
      const disabled: boolean = getCellDateDisabled({
        cellDate: currentDate,
        mode,
        disabledDate,
        generateConfig,
      });

      if (j === 0) {
        rowStartDate = currentDate;
      }

      const title: string = titleCell && titleCell(currentDate);

      row.push(
        <PickerCell
          key={j}
          title={title}
          disabled={disabled}
          getCellText={getCellText}
          currentDate={currentDate}
          picker={picker}
          getCellClassNames={getCellClassNames}
          onSelect={onSelect}
          generateConfig={generateConfig}
          onDateMouseEnter={onDateMouseEnter}
          onDateMouseLeave={onDateMouseLeave}
          getCellNode={getCellNode}
          getCellProps={getCellProps}
        />
      );
    }

    rows.push(
      <tr key={i} role="row" className={rowClassNames?.(rowStartDate!)}>
        {row}
      </tr>
    );
  }

  const pickerBodyClassNames: string = mergeClasses([
    styles.pickerBody,
    {
      [styles.pickerSmall]: size === DatePickerSize.Flex && largeScreenActive,
    },
    {
      [styles.pickerMedium]: size === DatePickerSize.Flex && mediumScreenActive,
    },
    {
      [styles.pickerMedium]: size === DatePickerSize.Flex && smallScreenActive,
    },
    {
      [styles.pickerLarge]: size === DatePickerSize.Flex && xSmallScreenActive,
    },
    { [styles.pickerLarge]: size === DatePickerSize.Large },
    { [styles.pickerMedium]: size === DatePickerSize.Medium },
    { [styles.pickerSmall]: size === DatePickerSize.Small },
  ]);

  return (
    <div className={pickerBodyClassNames}>
      <table role="grid" className={styles.pickerContent}>
        {headerCells && (
          <thead>
            <tr role="row">{headerCells}</tr>
          </thead>
        )}
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function PickerCell<DateType>({
  title,
  disabled,
  getCellText,
  currentDate,
  picker,
  getCellClassNames,
  onSelect,
  generateConfig,
  onDateMouseEnter,
  onDateMouseLeave,
  getCellNode,
  getCellProps,
}: PickerCellProps<DateType>) {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const { isCellFocused, buttonProps = {} } = getCellProps?.(currentDate) ?? {};

  React.useEffect(() => {
    if (buttonRef.current && isCellFocused) {
      buttonRef.current.focus();
    }
  }, [isCellFocused]);

  function onKeyDown(event: React.KeyboardEvent<HTMLTableCellElement>) {
    const isValidKey = [' ', 'Enter'].includes(event.key);
    if (disabled || !isValidKey) {
      return;
    }
    onSelect(currentDate);
  }

  return (
    <td
      role="gridcell"
      title={title}
      className={mergeClasses([
        styles.pickerCell,
        { [styles.pickerCellDisabled]: disabled },
        {
          ['picker-cell-start']:
            getCellText(currentDate) === 1 ||
            (picker === 'year' && Number(title) % 10 === 0),
        },
        {
          ['picker-cell-end']:
            title === getLastDay(generateConfig, currentDate) ||
            (picker === 'year' && Number(title) % 10 === 9),
        },
        { ...getCellClassNames?.(currentDate) },
      ])}
      onClick={() => {
        if (!disabled) {
          onSelect(currentDate);
        }
      }}
      onKeyDown={onKeyDown}
      onMouseEnter={() => {
        if (!disabled && onDateMouseEnter) {
          onDateMouseEnter(currentDate);
        }
      }}
      onMouseLeave={() => {
        if (!disabled && onDateMouseLeave) {
          onDateMouseLeave(currentDate);
        }
      }}
    >
      {getCellNode ? (
        getCellNode(currentDate)
      ) : (
        <div
          ref={buttonRef}
          role="button"
          className={styles.pickerCellInner}
          {...buttonProps}
        >
          {getCellText(currentDate)}
        </div>
      )}
    </td>
  );
}
