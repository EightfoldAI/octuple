import React from 'react';
import ResizeObserver from '../../../shared/ResizeObserver';
import MeasureCell from './MeasureCell';
import { MeasureRowProps } from './Body.types';

import styles from './Table.module.scss';

export default function MeasureRow({
    columnsKey,
    onColumnResize,
}: MeasureRowProps) {
    return (
        <tr
            aria-hidden="true"
            className={styles.tableMeasureRow}
            style={{ height: 0, fontSize: 0 }}
        >
            <ResizeObserver.Collection
                onBatchResize={(infoList) => {
                    infoList.forEach(({ data: columnKey, size }) => {
                        onColumnResize(columnKey, size.offsetWidth);
                    });
                }}
            >
                {columnsKey.map((columnKey) => (
                    <MeasureCell
                        key={columnKey}
                        columnKey={columnKey}
                        onColumnResize={onColumnResize}
                    />
                ))}
            </ResizeObserver.Collection>
        </tr>
    );
}
