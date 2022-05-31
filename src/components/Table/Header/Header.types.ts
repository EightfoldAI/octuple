import type {
    CellType,
    ColumnType,
    ColumnsType,
    CustomizeComponent,
    GetComponentProps,
    StickyOffsets,
} from '../Table.types';

export interface RowProps<RecordType> {
    cells: readonly CellType<RecordType>[];
    stickyOffsets: StickyOffsets;
    flattenColumns: readonly ColumnType<RecordType>[];
    rowComponent: CustomizeComponent;
    cellComponent: CustomizeComponent;
    onHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>;
    index: number;
}

export interface HeaderProps<RecordType> {
    columns: ColumnsType<RecordType>;
    flattenColumns: readonly ColumnType<RecordType>[];
    stickyOffsets: StickyOffsets;
    onHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>;
}
