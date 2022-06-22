import type * as React from 'react';
import type {
    ColumnType as OcColumnType,
    RenderedCell as OcRenderedCell,
    FixedType,
    OcTableProps,
} from './Internal/OcTable.types';
import { GetRowKey, ExpandableConfig } from './Internal/OcTable.types';
import type { TooltipProps } from '../Tooltip/Tooltip.types';
import type { CheckboxProps } from '../Selectors';
import type { PaginationProps } from '../Pagination';
import type { Breakpoint } from '../../shared/utilities';
import { tuple } from '../../shared/utilities';
import type { INTERNAL_SELECTION_ITEM } from './Hooks/useSelection';
import { FilterState } from './Hooks/useFilter';
import { SortState } from './Hooks/useSorter';
import { SpinnerProps } from '../Spinner';
import type { SizeType } from './Internal/Context/SizeContext';

export { GetRowKey, ExpandableConfig };

export type Key = React.Key;

export type RowSelectionType = 'checkbox' | 'radio';

export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void;

export type ExpandType = null | 'row' | 'nest';

export type SortOrder = 'descend' | 'ascend' | null;

const TableActions = tuple('paginate', 'sort', 'filter');
export type TableAction = typeof TableActions[number];

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

export interface ColumnFilterItem {
    text: React.ReactNode;
    value: string | number | boolean;
    children?: ColumnFilterItem[];
}

export interface ColumnTitleProps<RecordType> {
    sortColumns?: { column: ColumnType<RecordType>; order: SortOrder }[];
    filters?: Record<string, string[]>;
}

export type ColumnTitle<RecordType> =
    | React.ReactNode
    | ((props: ColumnTitleProps<RecordType>) => React.ReactNode);

export type FilterValue = (Key | boolean)[];
export type FilterKey = Key[] | null;
export type FilterSearchType =
    | boolean
    | ((input: string, record: {}) => boolean);
export interface FilterConfirmProps {
    closeDropdown: boolean;
}

export interface FilterDropdownProps {
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedKeys: React.Key[];
    confirm: (param?: FilterConfirmProps) => void;
    clearFilters?: () => void;
    filters?: ColumnFilterItem[];
    visible: boolean;
}

export interface ColumnType<RecordType>
    extends Omit<OcColumnType<RecordType>, 'title'> {
    title?: ColumnTitle<RecordType>;
    // Sorter
    sorter?:
        | boolean
        | CompareFn<RecordType>
        | {
              compare?: CompareFn<RecordType>;
              /** Config multiple sorter order priority */
              multiple?: number;
          };
    sortOrder?: SortOrder;
    defaultSortOrder?: SortOrder;
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean | TooltipProps;

    // Filter
    filtered?: boolean;
    filters?: ColumnFilterItem[];
    filterDropdown?:
        | React.ReactNode
        | ((props: FilterDropdownProps) => React.ReactNode);
    filterMultiple?: boolean;
    filteredValue?: FilterValue | null;
    defaultFilteredValue?: FilterValue | null;
    filterMode?: 'menu' | 'tree';
    filterSearch?: FilterSearchType;
    onFilter?: (
        value: string | number | boolean,
        record: RecordType
    ) => boolean;
    filterDropdownVisible?: boolean;
    onFilterDropdownVisibleChange?: (visible: boolean) => void;
    filterResetToDefaultFilteredValue?: boolean;

    // Responsive
    responsive?: Breakpoint[];
}

export interface ColumnGroupType<RecordType>
    extends Omit<ColumnType<RecordType>, 'dataIndex'> {
    children: ColumnsType<RecordType>;
}

export type ColumnsType<RecordType = unknown> = (
    | ColumnGroupType<RecordType>
    | ColumnType<RecordType>
)[];

export interface SelectionItem {
    key: string;
    text: React.ReactNode;
    onSelect?: SelectionItemSelectFn;
}

export type SelectionSelectFn<T> = (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event
) => void;

export interface TableRowSelection<T> {
    /** Keep the selection keys in list even the key not exist in `dataSource` anymore */
    preserveSelectedRowKeys?: boolean;
    type?: RowSelectionType;
    selectedRowKeys?: Key[];
    defaultSelectedRowKeys?: Key[];
    onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void;
    getCheckboxProps?: (
        record: T
    ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
    onSelect?: SelectionSelectFn<T>;
    selections?: INTERNAL_SELECTION_ITEM[] | boolean;
    hideSelectAll?: boolean;
    fixed?: FixedType;
    columnWidth?: string | number;
    columnTitle?: string | React.ReactNode;
    checkStrictly?: boolean;
    renderCell?: (
        value: boolean,
        record: T,
        index: number,
        originNode: React.ReactNode
    ) => React.ReactNode | OcRenderedCell<T>;
}

export type TransformColumns<RecordType> = (
    columns: ColumnsType<RecordType>
) => ColumnsType<RecordType>;

export interface TableCurrentDataSource<RecordType> {
    currentDataSource: RecordType[];
    action: TableAction;
}

export interface SorterResult<RecordType> {
    column?: ColumnType<RecordType>;
    order?: SortOrder;
    field?: Key | readonly Key[];
    columnKey?: Key;
}

export type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement;

type TablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';

export interface TablePaginationConfig extends Omit<PaginationProps, 'total'> {
    position?: TablePaginationPosition[];
    total?: number;
}

// =================== Table ===================

export const EMPTY_LIST: any[] = [];

export interface ChangeEventInfo<RecordType> {
    pagination: {
        currentPage?: number;
        pageSize?: number;
        total: number;
    };
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[];

    filterStates: FilterState<RecordType>[];
    sorterStates: SortState<RecordType>[];

    resetPagination: Function;
}

export interface TableProps<RecordType>
    extends Omit<
        OcTableProps<RecordType>,
        'data' | 'columns' | 'scroll' | 'emptyText'
    > {
    alternateRowColor?: boolean;
    dataSource?: OcTableProps<RecordType>['data'];
    columns?: ColumnsType<RecordType>;
    pagination?: false | TablePaginationConfig;
    loading?: boolean | SpinnerProps;
    size?: SizeType;
    bordered?: boolean;
    filterConfirmText?: string;
    filterResetText?: string;
    filterEmptyText?: string;
    filterCheckallText?: string;
    filterSearchPlaceholderText?: string;
    emptyText?: React.ReactNode | (() => React.ReactNode);
    emptyTextDetails?: string;
    selectNoneText?: string;
    selectInvertText?: string;
    selectionAllText?: string;
    expandText?: string;
    collapseText?: string;
    triggerDescText?: string;
    triggerAscText?: string;
    cancelSortText?: string;
    onChange?: (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
        extra: TableCurrentDataSource<RecordType>
    ) => void;
    rowSelection?: TableRowSelection<RecordType>;
    getPopupContainer?: GetPopupContainer;
    scroll?: OcTableProps<RecordType>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    };
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean | TooltipProps;
}
