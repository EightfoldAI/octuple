import React from 'react';
import { PartialBodyProps } from './Partial.types';
import { mergeClasses } from '../../../../shared/utilities';
import PartialContext from '../PartialContext';
import { getLastDay } from '../Utils/timeUtil';
import { getCellDateDisabled } from '../Utils/dateUtil';

import styles from '../picker.module.scss';

export default function PartialBody<DateType>({
    disabledDate,
    onSelect,
    picker,
    rowNum,
    colNum,
    prefixColumn,
    rowClassNames,
    baseDate,
    getCellClassNames,
    getCellText,
    getCellNode,
    getCellDate,
    generateConfig,
    titleCell,
    headerCells,
}: PartialBodyProps<DateType>) {
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

                if (prefixColumn) {
                    row.push(prefixColumn(rowStartDate));
                }
            }

            const title: string = titleCell && titleCell(currentDate);

            row.push(
                <td
                    key={j}
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
                                title ===
                                    getLastDay(generateConfig, currentDate) ||
                                (picker === 'year' && Number(title) % 10 === 9),
                        },
                        { ...getCellClassNames?.(currentDate) },
                    ])}
                    onClick={() => {
                        if (!disabled) {
                            onSelect(currentDate);
                        }
                    }}
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
                        <div className={styles.pickerCellInner}>
                            {getCellText(currentDate)}
                        </div>
                    )}
                </td>
            );
        }

        rows.push(
            <tr key={i} className={rowClassNames?.(rowStartDate!)}>
                {row}
            </tr>
        );
    }

    return (
        <div className={styles.pickerBody}>
            <table className={styles.pickerContent}>
                {headerCells && (
                    <thead>
                        <tr>{headerCells}</tr>
                    </thead>
                )}
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
