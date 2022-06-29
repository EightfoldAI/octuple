import type * as React from 'react';

export type Key = React.Key;

export type FixedType = 'left' | 'right' | boolean;

export type DefaultRecordType = Record<string, any>;

export type TableLayout = 'auto' | 'fixed';

// ==================== Row =====================
export type RowClassName<RecordType> = (
    record: RecordType,
    index: number,
    indent: number
) => string;

// =================== Column ===================
export interface CellType<RecordType> {
    key?: Key;
    classNames?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    column?: ColumnsType<RecordType>[number];
    colSpan?: number;
    rowSpan?: number;

    /** Only used for table header */
    hasSubColumns?: boolean;
    colStart?: number;
    colEnd?: number;
}

export interface RenderedCell<RecordType> {
    props?: CellType<RecordType>;
    children?: React.ReactNode;
}

export type DataIndex = string | number | readonly (string | number)[];

export type CellEllipsisType = { showTitle?: boolean } | boolean;

interface ColumnSharedType<RecordType> {
    title?: React.ReactNode;
    key?: Key;
    classNames?: string;
    fixed?: FixedType;
    onHeaderCell?: GetComponentProps<ColumnsType<RecordType>[number]>;
    ellipsis?: CellEllipsisType;
    align?: AlignType;
}

export interface ColumnGroupType<RecordType>
    extends ColumnSharedType<RecordType> {
    children: ColumnsType<RecordType>;
}

export type AlignType = 'left' | 'center' | 'right';

export interface ColumnType<RecordType> extends ColumnSharedType<RecordType> {
    colSpan?: number;
    dataIndex?: DataIndex;
    render?: (
        value: any,
        record: RecordType,
        index: number
    ) => React.ReactNode | RenderedCell<RecordType>;
    shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;
    rowSpan?: number;
    width?: number | string;
    onCell?: GetComponentProps<RecordType>;
}

export type ColumnsType<RecordType = unknown> = readonly (
    | ColumnGroupType<RecordType>
    | ColumnType<RecordType>
)[];

export type GetRowKey<RecordType> = (record: RecordType, index?: number) => Key;

export interface ColGroupProps<RecordType> {
    colWidths: readonly (number | string)[];
    columns?: readonly ColumnType<RecordType>[];
    columCount?: number;
}

// ================= Fix Column =================
export interface StickyOffsets {
    left: readonly number[];
    right: readonly number[];
    isSticky?: boolean;
}

// ================= Customized =================
export type GetComponentProps<DataType> = (
    data: DataType,
    index?: number
) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>;

type Component<P> =
    | React.ComponentType<P>
    | React.ForwardRefExoticComponent<P>
    | React.FC<P>
    | keyof React.ReactHTML;

export type CustomizeComponent = Component<any>;

export type CustomizeScrollBody<RecordType> = (
    data: readonly RecordType[],
    info: {
        scrollbarSize: number;
        ref: React.Ref<{ scrollLeft: number }>;
        onScroll: (info: {
            currentTarget?: HTMLElement;
            scrollLeft?: number;
        }) => void;
    }
) => React.ReactNode;

export interface TableComponents<RecordType> {
    table?: CustomizeComponent;
    header?: {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
    };
    body?:
        | CustomizeScrollBody<RecordType>
        | {
              wrapper?: CustomizeComponent;
              row?: CustomizeComponent;
              cell?: CustomizeComponent;
          };
}

export type GetComponent = (
    path: readonly string[],
    defaultComponent?: CustomizeComponent
) => CustomizeComponent;

// =================== Expand ===================
export type ExpandableType = false | 'row' | 'nest';

export type ExpandedRowRender<ValueType> = (
    record: ValueType,
    index: number,
    indent: number,
    expanded: boolean
) => React.ReactNode;

export interface RenderExpandIconProps<RecordType> {
    expanded: boolean;
    record: RecordType;
    expandable: boolean;
    onExpand: TriggerEventHandler<RecordType>;
}

export type RenderExpandIcon<RecordType> = (
    props: RenderExpandIconProps<RecordType>
) => React.ReactNode;

export interface ExpandableConfig<RecordType> {
    expandedRowKeys?: readonly Key[];
    defaultExpandedRowKeys?: readonly Key[];
    expandedRowRender?: ExpandedRowRender<RecordType>;
    expandRowByClick?: boolean;
    expandIcon?: RenderExpandIcon<RecordType>;
    onExpand?: (expanded: boolean, record: RecordType) => void;
    onExpandedRowsChange?: (expandedKeys: readonly Key[]) => void;
    defaultExpandAllRows?: boolean;
    indentSize?: number;
    showExpandColumn?: boolean;
    expandedRowClassName?: RowClassName<RecordType>;
    childrenColumnName?: string;
    rowExpandable?: (record: RecordType) => boolean;
    columnWidth?: number | string;
    fixed?: FixedType;
}

// =================== Render ===================
export type FrameWrapperRender<RecordType> = (
    data: readonly RecordType[]
) => React.ReactNode;

// =================== Events ===================
export type TriggerEventHandler<RecordType> = (
    record: RecordType,
    event: React.MouseEvent<HTMLElement>
) => void;

// =================== Sticky ===================
export interface StickyScrollBarProps {
    scrollBodyRef: React.RefObject<HTMLDivElement>;
    onScroll: (params: { scrollLeft?: number }) => void;
    offsetScroll: number;
    container: HTMLElement | Window;
}

export interface TableSticky {
    offsetHeader?: number;
    offsetSummary?: number;
    offsetScroll?: number;
    getContainer?: () => Window | HTMLElement;
}

// =================== Table ===================
export interface MemoTableContentProps {
    children: React.ReactNode;
    pingLeft: boolean;
    pingRight: boolean;
    props: any;
}

export interface OcTableProps<RecordType = unknown> {
    classNames?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    data?: readonly RecordType[];
    columns?: ColumnsType<RecordType>;
    rowKey?: string | GetRowKey<RecordType>;
    tableLayout?: TableLayout;

    // Fixed Columns
    scroll?: { x?: number | true | string; y?: number | string };

    // expandableConfig
    /** Config expand rows */
    expandableConfig?: ExpandableConfig<RecordType>;
    indentSize?: number;
    rowClassName?: string | RowClassName<RecordType>;

    // Additional Part
    title?: FrameWrapperRender<RecordType>;
    footer?: FrameWrapperRender<RecordType>;
    summary?: (data: readonly RecordType[]) => React.ReactNode;

    // Customize
    id?: string;
    showHeader?: boolean;
    components?: TableComponents<RecordType>;
    onRow?: GetComponentProps<RecordType>;
    onHeaderRow?: GetComponentProps<readonly ColumnType<RecordType>[]>;
    emptyText?: React.ReactNode | (() => React.ReactNode);

    direction?: string;

    transformColumns?: (
        columns: ColumnsType<RecordType>
    ) => ColumnsType<RecordType>;

    sticky?: boolean | TableSticky;
}
