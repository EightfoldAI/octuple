import React, { useCallback, useMemo, useState } from 'react';
import type {
    TransformColumns,
    ColumnTitleProps,
    ColumnsType,
} from '../Table.types';
import { CheckBox } from '../../CheckBox';
import { renderColumnTitle } from '../utlities';

function injectSelectAllCheckbox<RecordType>(columns: ColumnsType<RecordType>) {
    return columns.map((column) => {
        const cloneColumn = { ...column };
        if ('allowSelectAll' in cloneColumn) {
            const { onChange } = cloneColumn.allowSelectAll;
            cloneColumn.title = (renderProps: ColumnTitleProps<RecordType>) => (
                <div style={{ display: 'flex' }}>
                    <CheckBox onChange={onChange} />
                    {renderColumnTitle(column.title, renderProps)}
                </div>
            );
        }
        return cloneColumn;
    });
}

export default function useTitleColumns<RecordType>(
    columnTitleProps: ColumnTitleProps<RecordType>,
    onChange: () => void
): [TransformColumns<RecordType>] {
    const transformColumns = useCallback(
        (columns: ColumnsType<RecordType>) => injectSelectAllCheckbox(columns),
        [columnTitleProps]
    );
    return [transformColumns];
}
