import type * as React from 'react';
import type {
    ColumnType as OcColumnType,
    RenderedCell as OcRenderedCell,
    FixedType,
    OcTableProps,
} from './Internal/OcTable.types';
import { GetRowKey, ExpandableConfig } from './Internal/OcTable.types';
import type { TooltipProps } from '../Tooltip';
import type { CheckboxProps } from '../CheckBox';
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
    filters?: Record<string, string[]>;
    sortColumns?: { column: ColumnType<RecordType>; order: SortOrder }[];
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
    clearFilters?: () => void;
    confirm: (param?: FilterConfirmProps) => void;
    filters?: ColumnFilterItem[];
    selectedKeys: React.Key[];
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    visible: boolean;
}

export interface ColumnType<RecordType>
    extends Omit<OcColumnType<RecordType>, 'title'> {
    defaultFilteredValue?: FilterValue | null;
    defaultSortOrder?: SortOrder;
    filtered?: boolean;
    filteredValue?: FilterValue | null;
    filterDropdown?:
        | React.ReactNode
        | ((props: FilterDropdownProps) => React.ReactNode);
    filterMode?: 'menu' | 'tree';
    filterMultiple?: boolean;
    filters?: ColumnFilterItem[];
    filterSearch?: FilterSearchType;
    onFilter?: (
        value: string | number | boolean,
        record: RecordType
    ) => boolean;
    filterDropdownVisible?: boolean;
    filterResetToDefaultFilteredValue?: boolean;
    onFilterDropdownVisibleChange?: (visible: boolean) => void;
    /**
     * Determines the breakpoint when the colomn will hide/show
     */
    responsive?: Breakpoint[];
    showSorterTooltip?: boolean | TooltipProps;
    sortDirections?: SortOrder[];
    sorter?:
        | boolean
        | CompareFn<RecordType>
        | {
              compare?: CompareFn<RecordType>;
              /** Config multiple sorter order priority */
              multiple?: number;
          };
    sortOrder?: SortOrder;
    title?: ColumnTitle<RecordType>;
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
    onSelect?: SelectionItemSelectFn;
    text: React.ReactNode;
}

export type SelectionSelectFn<T> = (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event
) => void;

export interface TableRowSelection<T> {
    checkStrictly?: boolean;
    columnWidth?: string | number;
    columnTitle?: string | React.ReactNode;
    defaultSelectedRowKeys?: Key[];
    fixed?: FixedType;
    getCheckboxProps?: (
        record: T
    ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
    hideSelectAll?: boolean;
    /** Keep the selection keys in list
     * even the key not exist in `dataSource` anymore
     **/
    preserveSelectedRowKeys?: boolean;
    selectedRowKeys?: Key[];
    selections?: INTERNAL_SELECTION_ITEM[] | boolean;
    type?: RowSelectionType;
    onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void;
    onSelect?: SelectionSelectFn<T>;
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
    action: TableAction;
    currentDataSource: RecordType[];
}

export interface SorterResult<RecordType> {
    column?: ColumnType<RecordType>;
    columnKey?: Key;
    field?: Key | readonly Key[];
    order?: SortOrder;
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
    bordered?: boolean;
    cancelSortText?: string;
    cellBordered?: boolean;
    collapseText?: string;
    columns?: ColumnsType<RecordType>;
    dataSource?: OcTableProps<RecordType>['data'];
    emptyText?: React.ReactNode | (() => React.ReactNode);
    emptyTextDetails?: string;
    expandText?: string;
    innerBordered?: boolean;
    loading?: boolean | SpinnerProps;
    pagination?: false | TablePaginationConfig;
    filterCheckallText?: string;
    filterConfirmText?: string;
    filterEmptyText?: string;
    filterResetText?: string;
    filterSearchPlaceholderText?: string;
    getPopupContainer?: GetPopupContainer;
    headerBordered?: boolean;
    /**
     * Adds border to the bottom of the header
     * @default false
     */
    headerBottomBordered?: boolean;
    onChange?: (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
        extra: TableCurrentDataSource<RecordType>
    ) => void;
    outerBordered?: boolean;
    rowBordered?: boolean;
    rowSelection?: TableRowSelection<RecordType>;
    scroll?: OcTableProps<RecordType>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    };
    selectionAllText?: string;
    selectInvertText?: string;
    selectNoneText?: string;
    showSorterTooltip?: boolean | TooltipProps;
    size?: SizeType;
    sortDirections?: SortOrder[];
    triggerAscText?: string;
    triggerDescText?: string;
}
