import React, { ReactNode } from 'react';
import { mergeClasses } from '../../shared/utilities';
import omit from '../../shared/omit';
import OcTable, { Summary } from './Internal';
import type { OcTableProps } from './Internal/OcTable.types';
import { convertChildrenToColumns } from './Internal/Hooks/useColumns';
import { Spinner, SpinnerSize } from '../Spinner';
import { Pagination } from '../Pagination';
import usePagination, {
    DEFAULT_PAGE_SIZE,
    getPaginationParam,
} from './Hooks/usePagination';
import useLazyKVMap from './Hooks/useLazyKVMap';
import type { Breakpoint } from '../../shared/responsiveObserve';
import type {
    ChangeEventInfo,
    GetRowKey,
    ColumnType,
    SorterResult,
    ExpandableConfig,
    ExpandType,
    TableAction,
    TableProps,
    FilterValue,
} from './Table.types';
import { EMPTY_LIST, ColumnsType, TablePaginationConfig } from './Table.types';
import useSelection, {
    SELECTION_ALL,
    SELECTION_COLUMN,
    SELECTION_INVERT,
    SELECTION_NONE,
} from './Hooks/useSelection';
import type { SortState } from './Hooks/useSorter';
import useSorter, { getSortData } from './Hooks/useSorter';
import type { FilterState } from './Hooks/useFilter';
import useFilter, { getFilterData } from './Hooks/useFilter';
import useTitleColumns from './Hooks/useTitleColumns';
import renderExpandIcon from './ExpandIcon';
import scrollTo from '../../shared/scrollTo';
import SizeContext from './Internal/Context/SizeContext';
import Column from './Internal/Column';
import ColumnGroup from './Internal/ColumnGroup';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { Empty } from '../Empty/index';

import styles from './Styles/table.module.scss';

export { ColumnsType, TablePaginationConfig };

function InternalTable<RecordType extends object = any>(
    props: TableProps<RecordType>,
    ref: React.MutableRefObject<HTMLDivElement>
) {
    const {
        classNames,
        style,
        size: customizeSize,
        bordered,
        dataSource,
        filterConfirmText,
        filterResetText,
        filterEmptyText,
        filterCheckallText,
        filterSearchPlaceholderText,
        emptyText,
        selectNoneText,
        selectInvertText,
        selectionAllText,
        expandText,
        collapseText,
        triggerDescText,
        triggerAscText,
        cancelSortText,
        pagination,
        rowSelection,
        rowKey,
        rowClassName,
        columns,
        children,
        childrenColumnName: legacyChildrenColumnName,
        onChange,
        getPopupContainer,
        loading,
        expandIcon,
        expandable,
        expandedRowRender,
        expandIconColumnIndex,
        indentSize,
        scroll,
        sortDirections,
        showSorterTooltip = true,
    } = props;

    const baseColumns = React.useMemo(
        () =>
            columns ||
            (convertChildrenToColumns(children) as ColumnsType<RecordType>),
        [columns, children]
    );
    const needResponsive = React.useMemo(
        () => baseColumns.some((col: ColumnType<RecordType>) => col.responsive),
        [baseColumns]
    );

    const screens = useBreakpoint(needResponsive);

    const mergedColumns = React.useMemo(() => {
        const matched = new Set(
            Object.keys(screens).filter((m: Breakpoint) => screens[m])
        );

        return baseColumns.filter(
            (c) =>
                !c.responsive ||
                c.responsive.some((r: Breakpoint) => matched.has(r))
        );
    }, [baseColumns, screens]);

    const tableProps = omit(props, [
        'classNames',
        'style',
        'columns',
    ]) as TableProps<RecordType>;

    const size = React.useContext(SizeContext);
    const htmlDir: string = useCanvasDirection();
    const mergedSize = customizeSize || size;
    const rawData: readonly RecordType[] = dataSource || EMPTY_LIST;

    const mergedExpandable: ExpandableConfig<RecordType> = {
        childrenColumnName: legacyChildrenColumnName,
        expandIconColumnIndex,
        ...expandable,
    };
    const { childrenColumnName = 'children' } = mergedExpandable;

    const expandType: ExpandType = React.useMemo<ExpandType>(() => {
        if (rawData.some((item) => (item as any)?.[childrenColumnName])) {
            return 'nest';
        }

        if (expandedRowRender || (expandable && expandable.expandedRowRender)) {
            return 'row';
        }

        return null;
    }, [rawData]);

    const internalRefs = {
        body: React.useRef<HTMLDivElement>(),
    };

    // ============================ RowKey ============================
    const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
        if (typeof rowKey === 'function') {
            return rowKey;
        }

        return (record: RecordType) => (record as any)?.[rowKey as string];
    }, [rowKey]);

    const [getRecordByKey] = useLazyKVMap(
        rawData,
        childrenColumnName,
        getRowKey
    );

    // ============================ Events =============================
    const changeEventInfo: Partial<ChangeEventInfo<RecordType>> = {};

    const triggerOnChange = (
        info: Partial<ChangeEventInfo<RecordType>>,
        action: TableAction,
        reset: boolean = false
    ) => {
        const changeInfo = {
            ...changeEventInfo,
            ...info,
        };

        if (reset) {
            changeEventInfo.resetPagination!();

            // Reset event param
            if (changeInfo.pagination!.current) {
                changeInfo.pagination!.current = 1;
            }

            // Trigger pagination events
            if (pagination) {
                pagination.onCurrentChange?.(changeInfo.pagination!.current!);
                pagination.onSizeChange?.(changeInfo.pagination!.pageSize!);
            }
        }

        if (
            scroll &&
            scroll.scrollToFirstRowOnChange !== false &&
            internalRefs.body.current
        ) {
            scrollTo(0, {
                getContainer: () => internalRefs.body.current!,
            });
        }

        onChange?.(
            changeInfo.pagination!,
            changeInfo.filters!,
            changeInfo.sorter!,
            {
                currentDataSource: getFilterData(
                    getSortData(
                        rawData,
                        changeInfo.sorterStates!,
                        childrenColumnName
                    ),
                    changeInfo.filterStates!
                ),
                action,
            }
        );
    };

    // ============================ Sorter =============================
    const onSorterChange = (
        sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
        sorterStates: SortState<RecordType>[]
    ) => {
        triggerOnChange(
            {
                sorter,
                sorterStates,
            },
            'sort',
            false
        );
    };
    const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] =
        useSorter<RecordType>({
            cancelSortText,
            mergedColumns,
            onSorterChange,
            sortDirections: sortDirections || ['ascend', 'descend'],
            triggerAscText,
            triggerDescText,
            showSorterTooltip,
        });
    const sortedData = React.useMemo(
        () => getSortData(rawData, sortStates, childrenColumnName),
        [rawData, sortStates]
    );

    changeEventInfo.sorter = getSorters();
    changeEventInfo.sorterStates = sortStates;

    // ============================ Filter ============================
    const onFilterChange = (
        filters: Record<string, FilterValue>,
        filterStates: FilterState<RecordType>[]
    ) => {
        triggerOnChange(
            {
                filters,
                filterStates,
            },
            'filter',
            true
        );
    };

    const [transformFilterColumns, filterStates, getFilters] =
        useFilter<RecordType>({
            mergedColumns,
            filterConfirmText,
            filterResetText,
            filterEmptyText,
            filterCheckallText,
            filterSearchPlaceholderText,
            onFilterChange,
            getPopupContainer,
        });
    const mergedData = getFilterData(sortedData, filterStates);

    changeEventInfo.filters = getFilters();
    changeEventInfo.filterStates = filterStates;

    // ============================ Column ============================
    const columnTitleProps = React.useMemo(
        () => ({
            ...sorterTitleProps,
        }),
        [sorterTitleProps]
    );
    const [transformTitleColumns] = useTitleColumns(columnTitleProps);

    // ========================== Pagination ==========================
    const onPaginationChange = (pageSize: number) => {
        triggerOnChange(
            {
                pagination: {
                    ...changeEventInfo.pagination,
                    pageSize,
                },
            },
            'paginate'
        );
    };

    const [mergedPagination, resetPagination] = usePagination(
        mergedData.length,
        pagination,
        onPaginationChange
    );

    changeEventInfo.pagination =
        pagination === false
            ? {}
            : getPaginationParam(pagination, mergedPagination);

    changeEventInfo.resetPagination = resetPagination;

    // ============================= Data =============================
    const pageData = React.useMemo<RecordType[]>(() => {
        if (pagination === false || !mergedPagination.pageSize) {
            return mergedData;
        }

        const {
            currentPage = 1,
            total,
            pageSize = DEFAULT_PAGE_SIZE,
        } = mergedPagination;

        // Dynamic table data
        if (mergedData.length < total!) {
            if (mergedData.length > pageSize) {
                return mergedData.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                );
            }
            return mergedData;
        }

        return mergedData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        );
    }, [
        !!pagination,
        mergedData,
        mergedPagination && mergedPagination.currentPage,
        mergedPagination && mergedPagination.pageSize,
        mergedPagination && mergedPagination.total,
    ]);

    // ========================== Selections ==========================
    const [transformSelectionColumns, selectedKeySet] =
        useSelection<RecordType>(rowSelection, {
            data: mergedData,
            emptyText,
            pageData,
            getRowKey,
            getRecordByKey,
            expandType,
            childrenColumnName,
            getPopupContainer,
            selectionAllText,
            selectInvertText,
            selectNoneText,
        });

    const internalRowClassName = (
        record: RecordType,
        index: number,
        indent: number
    ) => {
        let mergedRowClassName;
        if (typeof rowClassName === 'function') {
            mergedRowClassName = mergeClasses([
                rowClassName(record, index, indent),
            ]);
        } else {
            mergedRowClassName = mergeClasses([rowClassName]);
        }

        return mergeClasses(
            {
                [styles.tableRowSelected]: selectedKeySet.has(
                    getRowKey(record, index)
                ),
            },
            mergedRowClassName
        );
    };

    // ========================== Expandable ==========================

    (mergedExpandable as any).__PARENT_RENDER_ICON__ =
        mergedExpandable.expandIcon;

    // Customize expandable icon
    mergedExpandable.expandIcon =
        mergedExpandable.expandIcon ||
        expandIcon ||
        renderExpandIcon(expandText, collapseText);

    // Adjust expand icon index, no overwrite expandIconColumnIndex if set.
    if (
        expandType === 'nest' &&
        mergedExpandable.expandIconColumnIndex === undefined
    ) {
        mergedExpandable.expandIconColumnIndex = rowSelection ? 1 : 0;
    } else if (mergedExpandable.expandIconColumnIndex! > 0 && rowSelection) {
        mergedExpandable.expandIconColumnIndex! -= 1;
    }

    // Indent size
    if (typeof mergedExpandable.indentSize !== 'number') {
        mergedExpandable.indentSize =
            typeof indentSize === 'number' ? indentSize : 15;
    }

    // ============================ Render ============================
    const transformColumns = React.useCallback(
        (innerColumns: ColumnsType<RecordType>): ColumnsType<RecordType> =>
            transformTitleColumns(
                transformSelectionColumns(
                    transformFilterColumns(transformSorterColumns(innerColumns))
                )
            ),
        [
            transformSorterColumns,
            transformFilterColumns,
            transformSelectionColumns,
        ]
    );

    let topPaginationNode: React.ReactNode;
    let bottomPaginationNode: React.ReactNode;
    if (pagination !== false && mergedPagination?.total) {
        let paginationSize: TablePaginationConfig['pageSize'];
        if (mergedPagination.pageSize) {
            paginationSize = mergedPagination.pageSize;
        } else {
            paginationSize = undefined;
        }

        const renderPagination = (position: string) => (
            <Pagination
                {...mergedPagination}
                classNames={mergeClasses([
                    styles.tablePagination,
                    {
                        [styles.tablePaginationLeft]:
                            position.indexOf('left') !== -1,
                    },
                    {
                        [styles.tablePaginationCenter]:
                            position.indexOf('center') !== -1,
                    },
                    {
                        [styles.tablePaginationRight]:
                            position.indexOf('right') !== -1,
                    },
                    mergedPagination.className,
                ])}
                pageSize={paginationSize}
            />
        );
        const defaultPosition = htmlDir === 'rtl' ? 'left' : 'right';
        const { position } = mergedPagination;
        if (position !== null && Array.isArray(position)) {
            const topPos = position.find((p) => p.indexOf('top') !== -1);
            const bottomPos = position.find((p) => p.indexOf('bottom') !== -1);
            const isDisable = position.every((p) => `${p}` === 'none');
            if (!topPos && !bottomPos && !isDisable) {
                bottomPaginationNode = renderPagination(defaultPosition);
            }
            if (topPos) {
                topPaginationNode = renderPagination(
                    topPos!.toLowerCase().replace('top', '')
                );
            }
            if (bottomPos) {
                bottomPaginationNode = renderPagination(
                    bottomPos!.toLowerCase().replace('bottom', '')
                );
            }
        } else {
            bottomPaginationNode = renderPagination(defaultPosition);
        }
    }

    if (typeof loading === 'boolean') {
        return <Spinner size={SpinnerSize.Large} />;
    } else if (typeof loading === 'object') {
        return <Spinner size={SpinnerSize.Large} />;
    }

    const renderEmpty = (): ReactNode => {
        return <Empty />;
    };

    const wrapperClassNames: string = mergeClasses([
        styles.tableWrapper,
        { [styles.tableWrapperRtl]: htmlDir === 'rtl' },
        classNames,
    ]);
    return (
        <div ref={ref} className={wrapperClassNames} style={style}>
            {topPaginationNode}
            <OcTable<RecordType>
                {...tableProps}
                columns={mergedColumns as OcTableProps<RecordType>['columns']}
                direction={htmlDir}
                expandable={mergedExpandable}
                classNames={mergeClasses([
                    styles.table,
                    { [styles.tableMedium]: mergedSize === 'medium' },
                    { [styles.tableSmall]: mergedSize === 'small' },
                    { [styles.tableBordered]: bordered },
                    { [styles.tableEmpty]: rawData.length === 0 },
                ])}
                data={pageData}
                rowKey={getRowKey}
                rowClassName={internalRowClassName}
                emptyText={emptyText || renderEmpty()}
                transformColumns={
                    transformColumns as OcTableProps<RecordType>['transformColumns']
                }
            />
            {bottomPaginationNode}
        </div>
    );
}

const ForwardTable = React.forwardRef(InternalTable) as <
    RecordType extends object = any
>(
    props: React.PropsWithChildren<TableProps<RecordType>> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => React.ReactElement;

type InternalTableType = typeof ForwardTable;

interface TableInterface extends InternalTableType {
    defaultProps?: Partial<TableProps<any>>;
    SELECTION_COLUMN: typeof SELECTION_COLUMN;
    EXPAND_COLUMN: typeof OcTable.EXPAND_COLUMN;
    SELECTION_ALL: 'SELECT_ALL';
    SELECTION_INVERT: 'SELECT_INVERT';
    SELECTION_NONE: 'SELECT_NONE';
    Column: typeof Column;
    ColumnGroup: typeof ColumnGroup;
    Summary: typeof Summary;
}

const Table = ForwardTable as TableInterface;

Table.defaultProps = {
    filterConfirmText: 'OK',
    filterResetText: 'Reset',
    filterEmptyText: 'No filters',
    filterCheckallText: 'Select all items',
    filterSearchPlaceholderText: 'Search in filters',
    emptyText: 'No data',
    selectInvertText: 'Invert current page',
    selectNoneText: 'Clear all data',
    selectionAllText: 'Select all data',
    expandText: 'Expand row',
    collapseText: 'Collapse row',
    triggerDescText: 'Click to sort descending',
    triggerAscText: 'Click to sort ascending',
    cancelSortText: 'Click to cancel sorting',
    rowKey: 'key',
};

Table.SELECTION_COLUMN = SELECTION_COLUMN;
Table.EXPAND_COLUMN = OcTable.EXPAND_COLUMN;
Table.SELECTION_ALL = SELECTION_ALL;
Table.SELECTION_INVERT = SELECTION_INVERT;
Table.SELECTION_NONE = SELECTION_NONE;
Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Summary = Summary;

export default Table;
