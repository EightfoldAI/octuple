import React, {
    forwardRef,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useRef,
} from 'react';
import type { Breakpoint } from '../../shared/utilities';
import { mergeClasses, omit, scrollTo } from '../../shared/utilities';
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
import type {
    ChangeEventInfo,
    ColumnGroupType,
    ColumnType,
    ExpandableConfig,
    ExpandType,
    FilterValue,
    GetRowKey,
    SorterResult,
    TableAction,
    TableProps,
} from './Table.types';
import {
    EMPTY_LIST,
    ColumnsType,
    TablePaginationConfig,
    TableSize,
} from './Table.types';
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
import { Size, SizeContext } from '../ConfigProvider';
import Column from './Internal/Column';
import ColumnGroup from './Internal/ColumnGroup';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { Empty, EmptyMode } from '../Empty/index';

import styles from './Styles/table.module.scss';

export { ColumnsType, TablePaginationConfig };

function InternalTable<RecordType extends object = any>(
    props: TableProps<RecordType>,
    ref: React.MutableRefObject<HTMLDivElement>
) {
    const {
        alternateRowColor = true,
        bordered,
        cancelSortText,
        cellBordered = false,
        children,
        classNames,
        collapseText,
        columns,
        dataSource,
        emptyText,
        emptyTextDetails,
        expandableConfig,
        expandText,
        filterCheckallText,
        filterConfirmText,
        filterEmptyText,
        filterResetText,
        filterSearchPlaceholderText,
        getPopupContainer,
        headerBordered = false,
        headerBottomBordered = false,
        indentSize,
        innerBordered = false,
        loading,
        onChange,
        outerBordered = false,
        pagination,
        rowBordered = false,
        rowClassName,
        rowKey,
        rowSelection,
        scroll,
        selectInvertText,
        selectionAllText,
        selectNoneText,
        showSorterTooltip = true,
        size = TableSize.Medium,
        sortDirections,
        style,
        triggerAscText,
        triggerDescText,
    } = props;

    const baseColumns: ColumnsType<RecordType> = useMemo(
        () =>
            columns ||
            (convertChildrenToColumns(children) as ColumnsType<RecordType>),
        [columns, children]
    );
    const needResponsive: boolean = useMemo(
        () => baseColumns.some((col: ColumnType<RecordType>) => col.responsive),
        [baseColumns]
    );

    const screens: Partial<Record<Breakpoint, boolean>> =
        useBreakpoint(needResponsive);

    const mergedColumns: (
        | ColumnGroupType<RecordType>
        | ColumnType<RecordType>
    )[] = useMemo(() => {
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

    const contextuallySized: Size = useContext(SizeContext);
    const mergedSize = contextuallySized || size;

    const htmlDir: string = useCanvasDirection();
    const rawData: readonly RecordType[] = dataSource || EMPTY_LIST;

    const mergedExpandableConfig: ExpandableConfig<RecordType> = {
        ...expandableConfig,
    };

    const { childrenColumnName = 'children' } = mergedExpandableConfig;

    const expandType: ExpandType = useMemo<ExpandType>(() => {
        if (rawData.some((item) => (item as any)?.[childrenColumnName])) {
            return 'nest';
        }

        if (expandableConfig?.expandedRowRender) {
            return 'row';
        }

        return null;
    }, [rawData]);

    const internalRefs = {
        body: useRef<HTMLDivElement>(),
    };

    // ============================ RowKey ============================
    const getRowKey = useMemo<GetRowKey<RecordType>>(() => {
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
            if (changeInfo.pagination!.currentPage) {
                changeInfo.pagination!.currentPage = 1;
            }

            // Trigger pagination events
            if (pagination) {
                pagination.onCurrentChange?.(
                    changeInfo.pagination!.currentPage!
                );

                const pages: number[] = changeInfo.pagination!.pageSizes!;

                if (pages) {
                    for (let i: number = 0; i < pages.length; ++i) {
                        pagination.onSizeChange?.(
                            changeInfo.pagination!.pageSizes[i]
                        );
                    }
                } else {
                    pagination.onSizeChange?.(changeInfo.pagination!.pageSize!);
                }
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
    const sortedData = useMemo(
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
    const columnTitleProps = useMemo(
        () => ({
            ...sorterTitleProps,
        }),
        [sorterTitleProps]
    );
    const [transformTitleColumns] = useTitleColumns(columnTitleProps);

    // ========================== Pagination ==========================
    const onPaginationChange = (
        currentPage: number,
        pageSize: number,
        pageSizes: number[]
    ) => {
        triggerOnChange(
            {
                pagination: {
                    ...changeEventInfo.pagination,
                    currentPage,
                    pageSize,
                    pageSizes,
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
    const pageData = useMemo<RecordType[]>(() => {
        if (
            pagination === false ||
            (!mergedPagination.pageSize && !mergedPagination.pageSizes)
        ) {
            return mergedData;
        }

        const {
            currentPage = mergedPagination.pageSizes
                ? mergedPagination.currentPage || 1
                : 1,
            total,
            pageSize = mergedPagination.pageSizes
                ? mergedPagination.pageSizes[0]
                : DEFAULT_PAGE_SIZE,
            pageSizes,
        } = mergedPagination;

        // Dynamic table data
        if (pageSizes) {
            for (let i: number = 0; i < pageSizes.length; ++i) {
                if (pageSize === pageSizes[i]) {
                    mergedPagination.pageSize = pageSizes[i];
                    if (mergedData.length < total!) {
                        if (mergedData.length > pageSizes[i]) {
                            return mergedData.slice(
                                (currentPage - 1) * pageSizes[i],
                                currentPage * pageSizes[i]
                            );
                        }
                        return mergedData;
                    }

                    return mergedData.slice(
                        (currentPage - 1) * pageSizes[i],
                        currentPage * pageSizes[i]
                    );
                }
            }
        } else {
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
        }
        return null;
    }, [
        !!pagination,
        mergedData,
        mergedPagination?.currentPage,
        mergedPagination?.pageSize,
        mergedPagination?.pageSizes,
        mergedPagination?.total,
    ]);

    // ========================== Selections ==========================
    const [transformSelectionColumns, selectedKeySet] =
        useSelection<RecordType>(rowSelection, {
            data: mergedData,
            emptyText,
            emptyTextDetails,
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

    mergedExpandableConfig.expandIcon = renderExpandIcon(
        expandText,
        collapseText
    );

    // Indent size
    if (typeof mergedExpandableConfig.indentSize !== 'number') {
        mergedExpandableConfig.indentSize =
            typeof indentSize === 'number' ? indentSize : 15;
    }

    // ============================ Render ============================
    const transformColumns = useCallback(
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
        let paginationSizes: TablePaginationConfig['pageSizes'];

        if (mergedPagination.pageSize) {
            paginationSize = mergedPagination.pageSize;
        } else {
            paginationSize = undefined;
        }
        if (mergedPagination.pageSizes) {
            paginationSizes = mergedPagination.pageSizes;
        } else {
            paginationSizes = undefined;
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
                pageSizes={paginationSizes}
                total={mergedPagination?.total}
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

    const renderEmpty = (
        emptyText: ReactNode,
        emptyTextDetails?: string
    ): ReactNode => {
        if (typeof emptyText === 'string') {
            if (emptyTextDetails) {
                return (
                    <Empty
                        title={emptyText}
                        description={emptyTextDetails}
                        mode={EmptyMode.data}
                    />
                );
            }
            return <Empty title={emptyText} mode={EmptyMode.data} />;
        } else {
            return emptyText;
        }
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
                expandableConfig={mergedExpandableConfig}
                classNames={mergeClasses([
                    styles.table,
                    { [styles.tableRtl]: htmlDir === 'rtl' },
                    { [styles.tableLarge]: mergedSize === TableSize.Large },
                    { [styles.tableMedium]: mergedSize === TableSize.Medium },
                    { [styles.tableSmall]: mergedSize === TableSize.Small },
                    { [styles.tableAlternate]: alternateRowColor },
                    { [styles.tableBordered]: bordered },
                    {
                        [styles.tableCellBordered]:
                            !bordered &&
                            !rowBordered &&
                            !innerBordered &&
                            cellBordered,
                    },
                    {
                        [styles.tableHeaderBordered]:
                            !bordered &&
                            !rowBordered &&
                            !innerBordered &&
                            headerBordered,
                    },
                    {
                        [styles.tableHeaderBottomBordered]:
                            !bordered &&
                            !rowBordered &&
                            !innerBordered &&
                            !headerBordered &&
                            headerBottomBordered,
                    },
                    {
                        [styles.tableInnerBordered]:
                            !bordered && !rowBordered && innerBordered,
                    },
                    { [styles.tableOuterBordered]: !bordered && outerBordered },
                    {
                        [styles.tableRowBordered]:
                            !bordered && !innerBordered && rowBordered,
                    },
                    { [styles.tableEmpty]: rawData.length === 0 },
                ])}
                data={pageData}
                rowKey={getRowKey}
                rowClassName={internalRowClassName}
                emptyText={renderEmpty(emptyText, emptyTextDetails)}
                transformColumns={
                    transformColumns as OcTableProps<RecordType>['transformColumns']
                }
            />
            {bottomPaginationNode}
        </div>
    );
}

const ForwardTable = forwardRef(InternalTable) as <
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
    emptyText: 'Short Message Here',
    emptyTextDetails:
        'More detail on how might the user be able to get around this',
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
