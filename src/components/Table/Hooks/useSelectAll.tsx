import React, { useCallback, useMemo, useState } from 'react';
import type {
    TransformColumns,
    ColumnTitleProps,
    ColumnsType,
} from '../Table.types';
import { CheckBox } from '../../CheckBox';
import { renderColumnTitle } from '../utlities';
import styles from '../Styles/table.module.scss';

function injectSelectAllCheckbox<RecordType>(columns: ColumnsType<RecordType>) {
    return columns.map((column) => {
        const cloneColumn = { ...column };
        if (cloneColumn?.allowSelectAll?.onChange) {
            const { onChange } = cloneColumn.allowSelectAll;
            cloneColumn.title = (renderProps: ColumnTitleProps<RecordType>) => (
                <div className={styles.displayFlex}>
                    <CheckBox onChange={onChange} />
                    {renderColumnTitle(column.title, renderProps)}
                </div>
            );
        }
        return cloneColumn;
    });
}

export default function useTitleColumns<RecordType>(
    columnTitleProps: ColumnTitleProps<RecordType>
): [TransformColumns<RecordType>] {
    const transformColumns = useCallback(
        (columns: ColumnsType<RecordType>) => injectSelectAllCheckbox(columns),
        [columnTitleProps]
    );
    return [transformColumns];
}
