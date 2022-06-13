import { createContext } from 'react';
import type {
    ColumnType,
    DefaultRecordType,
    ColumnsType,
    TableLayout,
    RenderExpandIcon,
    ExpandableType,
    RowClassName,
    TriggerEventHandler,
    ExpandedRowRender,
} from '../OcTable.types';

export interface BodyContextProps<RecordType = DefaultRecordType> {
    rowClassName: string | RowClassName<RecordType>;
    expandedRowClassName: RowClassName<RecordType>;

    columns: ColumnsType<RecordType>;
    flattenColumns: readonly ColumnType<RecordType>[];

    tableLayout: TableLayout;

    indentSize: number;
    expandableType: ExpandableType;
    expandRowByClick: boolean;
    expandedRowRender: ExpandedRowRender<RecordType>;
    expandIcon: RenderExpandIcon<RecordType>;
    onTriggerExpand: TriggerEventHandler<RecordType>;
}

const BodyContext = createContext<BodyContextProps>(null);

export default BodyContext;
