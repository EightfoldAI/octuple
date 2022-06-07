import React, { useContext } from 'react';
import SummaryContext from './SummaryContext';
import Cell from '../Cell';
import TableContext from '../Context/TableContext';
import { SummaryCellProps } from './Footer.types';
import { getCellFixedInfo } from '../Utilities/fixUtil';

export default function SummaryCell({
    classNames,
    index,
    children,
    colSpan = 1,
    rowSpan,
    align,
}: SummaryCellProps) {
    const { direction } = useContext(TableContext);
    const { scrollColumnIndex, stickyOffsets, flattenColumns } =
        useContext(SummaryContext);
    const lastIndex = index + colSpan - 1;
    const mergedColSpan =
        lastIndex + 1 === scrollColumnIndex ? colSpan + 1 : colSpan;

    const fixedInfo = getCellFixedInfo(
        index,
        index + mergedColSpan - 1,
        flattenColumns,
        stickyOffsets,
        direction
    );

    return (
        <Cell
            classNames={classNames}
            index={index}
            component="td"
            record={null}
            dataIndex={null}
            align={align}
            colSpan={mergedColSpan}
            rowSpan={rowSpan}
            render={() => children}
            {...fixedInfo}
        />
    );
}
