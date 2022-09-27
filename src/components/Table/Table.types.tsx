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
import type { Size } from '../ConfigProvider/SizeContext';

export enum TableSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

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
    /**
     * The default filtered values.
     */
    defaultFilteredValue?: FilterValue | null;
    /**
     * The default order of sorted values.
     */
    defaultSortOrder?: SortOrder;
    /**
     * Customized filter overlay.
     */
    filterDropdown?:
        | React.ReactNode
        | ((props: FilterDropdownProps) => React.ReactNode);
    /**
     * Whether `filterDropdown` is visible.
     */
    filterDropdownVisible?: boolean;
    /**
     * Whether the `dataSource` is filtered.
     */
    filtered?: boolean;
    /**
     * Controlled filtered value.
     */
    filteredValue?: FilterValue | null;
    /**
     * Specify the filter UI.
     */
    filterMode?: 'menu' | 'tree';
    /**
     * Whether multiple filters can be selected.
     */
    filterMultiple?: boolean;
    /**
     * After filter reset, whether to restore the default filter.
     */
    filterResetToDefaultFilteredValue?: boolean;
    /**
     * Filter menu configuration.
     */
    filters?: ColumnFilterItem[];
    /**
     * Whether to be searchable for filter menu.
     */
    filterSearch?: FilterSearchType;
    /**
     * Function that determines if the row is displayed when filtered.
     */
    onFilter?: (
        value: string | number | boolean,
        record: RecordType
    ) => boolean;
    /**
     * Callback executed when `filterDropdownVisible` is changed.
     */
    onFilterDropdownVisibleChange?: (visible: boolean) => void;
    /**
     * Determines the breakpoint where the column will hide/show.
     * Column is always visible if not set.
     */
    responsive?: Breakpoint[];
    /**
     * The Table header column show next sorter direction tooltip.
     * Set as the property of Tooltip if its type is object.
     * overrides `showSorterTooltip` in Table.
     * @default true
     */
    showSorterTooltip?: boolean | TooltipProps;
    /**
     * The Table Column sort directions.
     * options: `ascend`, `descend`.
     * overrides `sortDirections` in Table.
     */
    sortDirections?: SortOrder[];
    /**
     * Sort function for local sort, see `Array.sort` compareFunction.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * If you need sort buttons only, set to true.
     */
    sorter?:
        | boolean
        | CompareFn<RecordType>
        | {
              compare?: CompareFn<RecordType>;
              /** Config multiple sorter order priority */
              multiple?: number;
          };
    /**
     * Order of sorted values.
     */
    sortOrder?: SortOrder;
    /**
     * The Column title.
     */
    title?: ColumnTitle<RecordType>;
}

export interface ColumnGroupType<RecordType>
    extends Omit<ColumnType<RecordType>, 'dataIndex'> {
    /**
     * The ColumnGroup children.
     */
    children: ColumnsType<RecordType>;
}

export type ColumnsType<RecordType = unknown> = (
    | ColumnGroupType<RecordType>
    | ColumnType<RecordType>
)[];

export interface SelectionItem {
    /**
     * Unique key of the selection item.
     */
    key: string;
    /**
     * Callback executed when the selection item is clicked.
     */
    onSelect?: SelectionItemSelectFn;
    /**
     * Display text of the selection item.
     */
    text: React.ReactNode;
}

export type SelectionSelectFn<T> = (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event
) => void;

export interface TableRowSelection<T> {
    /**
     * Check the Table row precisely;
     * parent row and children rows are not associated.
     * @default true
     */
    checkStrictly?: boolean;
    /**
     * The selection Column width.
     */
    columnWidth?: string | number;
    /**
     * The selection Column title.
     */
    columnTitle?: string | React.ReactNode;
    /**
     * The default selected row keys.
     */
    defaultSelectedRowKeys?: Key[];
    /**
     * Fixed selection column.
     * @default 'left'
     */
    fixed?: FixedType;
    /**
     * Get CheckBox or Radio Button props.
     */
    getCheckboxProps?: (
        record: T
    ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
    /**
     * Hide the selectAll CheckBox and custom selection.
     * @default false
     */
    hideSelectAll?: boolean;
    /**
     * Callback executed when selected rows change.
     */
    onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void;
    /**
     * Callback executed when select/deselect one row.
     */
    onSelect?: SelectionSelectFn<T>;
    /**
     * Keep the selection keys in list
     * even if the key no longer exists in `dataSource`.
     **/
    preserveSelectedRowKeys?: boolean;
    /**
     * Renderer of the Table cell. Same as render in Column.
     */
    renderCell?: (
        value: boolean,
        record: T,
        index: number,
        originNode: React.ReactNode
    ) => React.ReactNode | OcRenderedCell<T>;
    /**
     * Controlled selected row keys.
     * @default []
     */
    selectedRowKeys?: Key[];
    /**
     * Custom selection configuration.
     * Only displays default selections when set to true.
     */
    selections?: INTERNAL_SELECTION_ITEM[] | boolean;
    /**
     * The row selection type.
     * options: checkbox | radio
     */
    type?: RowSelectionType;
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
    /**
     * Specify the position of Table Pagination.
     * [topLeft | topCenter | topRight |bottomLeft | bottomCenter | bottomRight]
     * @default [bottomRight]
     */
    position?: TablePaginationPosition[];
    /**
     * Specify the Table Pagination total.
     */
    total?: number;
}

// =================== Table ===================

export const EMPTY_LIST: any[] = [];

export interface ChangeEventInfo<RecordType> {
    /**
     * The chnage event params of filters.
     */
    filters: Record<string, FilterValue | null>;
    /**
     * The filter state.
     */
    filterStates: FilterState<RecordType>[];
    /**
     * The change event params of pagination.
     */
    pagination: {
        currentPage?: number;
        pageSize?: number;
        pageSizes?: number[];
        total: number;
    };
    /**
     * The reset pagination function.
     */
    resetPagination: Function;
    /**
     * The change event params of sorter.
     */
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[];
    /**
     * The sorter state.
     */
    sorterStates: SortState<RecordType>[];
}

export interface TableProps<RecordType>
    extends Omit<
        OcTableProps<RecordType>,
        'data' | 'columns' | 'scroll' | 'emptyText' | 'transformColumns'
    > {
    /**
     * The Table Row background colors alternate.
     * @default true
     */
    alternateRowColor?: boolean;
    /**
     * Show all Table borders.
     * @default false
     */
    bordered?: boolean;
    /**
     * The Table cancel sort text.
     * @default 'Click to cancel sorting'
     */
    cancelSortText?: string;
    /**
     * Show only the Table body cell borders.
     */
    cellBordered?: boolean;
    /**
     * The Table collapse text.
     * @default 'Collapse row'
     */
    collapseText?: string;
    /**
     * The Table columns.
     */
    columns?: ColumnsType<RecordType>;
    /**
     * The Table Data record array to be displayed.
     */
    dataSource?: OcTableProps<RecordType>['data'];
    /**
     * The Table empty text renderer.
     */
    emptyText?: React.ReactNode | (() => React.ReactNode);
    /**
     * The Table empty text details.
     * Use this to display more information when the Tabel is empty.
     * @default 'Short Message Here'
     */
    emptyTextDetails?: string;
    /**
     * The Table expand text.
     * @default 'Expand row'
     */
    expandText?: string;
    /**
     * The Table filter checkall text.
     * @default 'Select all items'
     */
    filterCheckallText?: string;
    /**
     * The Table filter confirm text.
     * @default 'OK'
     */
    filterConfirmText?: string;
    /**
     * The Table filter empty text.
     * @default 'No filters'
     */
    filterEmptyText?: string;
    /**
     * The Table filter reset text.
     * @default 'Reset'
     */
    filterResetText?: string;
    /**
     * The Table filter search placeholder text.
     * @default 'Search in filters'
     */
    filterSearchPlaceholderText?: string;
    /**
     * The render container of Table dropdowns.
     */
    getPopupContainer?: GetPopupContainer;
    /**
     * Show only the Table inner header cell borders.
     */
    headerBordered?: boolean;
    /**
     * Show only the Table inner header cell bottom borders.
     * headerBordered must be `false`
     * @default false
     */
    headerBottomBordered?: boolean;
    /**
     * Show only the Table header and body cell inner borders.
     */
    innerBordered?: boolean;
    /**
     * The Table loading state.
     */
    loading?: boolean | SpinnerProps;
    /**
     * Callback executed when Table pagination, filters, or sort is changed.
     */
    onChange?: (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
        extra: TableCurrentDataSource<RecordType>
    ) => void;
    /**
     * Show only the Table outer border.
     */
    outerBordered?: boolean;
    /**
     * Configure Table pagination.
     * May be hidden if `false`.
     */
    pagination?: false | TablePaginationConfig;
    /**
     * Show only the Table cell bottom borders.
     */
    rowBordered?: boolean;
    /**
     * Configure Table Row selection.
     */
    rowSelection?: TableRowSelection<RecordType>;
    /**
     * Set if the Table is scrollable.
     * `scrollToFirstRowOnChange` determines whether to scroll to
     * the top of the table when paging, sorting, filtering changes.
     * `x` sets horizontal scrolling, can also be used to specify the width of
     * the scroll area, could be number, percent value, true and 'max-content'.
     * `y` sets vertical scrolling, can also be used to specify the height of
     * the scroll area, could be string or number.
     */
    scroll?: OcTableProps<RecordType>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    };
    /**
     * The Table select all text.
     * @default 'Select all data'
     */
    selectionAllText?: string;
    /**
     * The Table invert select text.
     * @default 'Invert current page'
     */
    selectInvertText?: string;
    /**
     * The Table select none text.
     * @default 'Clear all data'
     */
    selectNoneText?: string;
    /**
     * The Table header column show next sorter direction tooltip.
     * Set as the property of Tooltip if its type is object.
     * @default true
     */
    showSorterTooltip?: boolean | TooltipProps;
    /**
     * The Table size.
     * @default TableSize.Medium
     */
    size?: TableSize | Size;
    /**
     * The Table column sort directions.
     * options: `ascend`, `descend`.
     */
    sortDirections?: SortOrder[];
    /**
     * The Table trigger sort ascending text.
     * @default 'Click to sort ascending'
     */
    triggerAscText?: string;
    /**
     * The Table trigger sort descending text.
     * @default 'Click to sort descending'
     */
    triggerDescText?: string;
}
