'use client';

import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Breakpoint } from '../../shared/utilities';
import { mergeClasses, omit, scrollTo } from '../../shared/utilities';
import OcTable, { Summary } from './Internal';
import type { OcTableProps } from './Internal/OcTable.types';
import { convertChildrenToColumns } from './Internal/Hooks/useColumns';
import { Spinner } from '../Spinner';
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
  TableLocale,
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
import type { FilterState } from './Hooks/useFilter/utils';
import useFilter, { getFilterData } from './Hooks/useFilter';
import useTitleColumns from './Hooks/useTitleColumns';
import renderExpandIcon from './ExpandIcon';
import { Size, SizeContext } from '../ConfigProvider';
import Column from './Internal/Column';
import ColumnGroup from './Internal/ColumnGroup';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { Empty, EmptyMode } from '../Empty/index';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './Styles/table.module.scss';

export { ColumnsType, TablePaginationConfig };

function InternalTable<RecordType extends object = any>(
  props: TableProps<RecordType>,
  ref: React.MutableRefObject<HTMLDivElement>
) {
  const {
    alternateRowColor = true,
    bordered = false,
    cancelSortText: defaultCancelSortText,
    cellBordered = false,
    children,
    classNames,
    collapseText: defaultCollapseText,
    columnBordered = false,
    columns,
    dataSource,
    emptyText: defaultEmptyText,
    emptyTextDetails: defaultEmptyTextDetails,
    expandableConfig,
    expandText: defaultExpandText,
    filterCheckallText: defaultFilterCheckallText,
    filterConfirmText: defaultFilterConfirmText,
    filterEmptyText: defaultFilterEmptyText,
    filterResetText: defaultFilterResetText,
    filterSearchPlaceholderText: defaultFilterSearchPlaceholderText,
    scrollLeftAriaLabelText: defaultScrollLeftAriaLabelText,
    scrollRightAriaLabelText: defaultScrollRightAriaLabelText,
    getPopupContainer,
    headerBordered = false,
    headerBottomBordered = false,
    indentSize,
    innerBordered = false,
    loading,
    locale = enUS,
    onChange,
    outerBordered = false,
    pagination,
    rowBordered = false,
    rowClassName,
    rowHoverBackgroundEnabled = true,
    rowKey,
    rowSelection,
    scroll,
    selectAllRowsText: defaultSelectAllRowsText,
    selectInvertText: defaultSelectInvertText,
    selectionAllText: defaultSelectionAllText,
    selectNoneText: defaultSelectNoneText,
    selectRowText: defaultSelectRowText,
    showSorterDefaultIcon = true,
    showSorterTooltip = true,
    size = TableSize.Medium,
    sortDirections,
    style,
    triggerAscText: defaultTriggerAscText,
    triggerDescText: defaultTriggerDescText,
    onRowHoverEnter,
    onRowHoverLeave,
    sortedAscendingText: defaultSortedAscendingText,
    sortedDescendingText: defaultSortedDescendingText,
    notSortedText: defaultNotSortedText,
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
        !c.responsive || c.responsive.some((r: Breakpoint) => matched.has(r))
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

  // ============================ Strings ===========================
  const [tableLocale] = useLocaleReceiver('Table');
  let mergedLocale: TableLocale;

  if (props.locale) {
    mergedLocale = props.locale;
  } else {
    mergedLocale = tableLocale || props.locale;
  }

  const [filterConfirmText, setFilterConfirmText] = useState<string>(
    defaultFilterConfirmText
  );
  const [filterResetText, setFilterResetText] = useState<string>(
    defaultFilterResetText
  );
  const [filterEmptyText, setFilterEmptyText] = useState<string>(
    defaultFilterEmptyText
  );
  const [filterCheckallText, setFilterCheckallText] = useState<string>(
    defaultFilterCheckallText
  );
  const [filterSearchPlaceholderText, setFilterSearchPlaceholderText] =
    useState<string>(defaultFilterSearchPlaceholderText);
  const [emptyText, setEmptyText] = useState<ReactNode | (() => ReactNode)>(
    defaultEmptyText
  );
  const [emptyTextDetails, setEmptyTextDetails] = useState<string>(
    defaultEmptyTextDetails
  );
  const [selectAllRowsText, setSelectAllRowsText] = useState<string>(
    defaultSelectAllRowsText
  );
  const [selectInvertText, setSelectInvertText] = useState<string>(
    defaultSelectInvertText
  );
  const [selectNoneText, setSelectNoneText] = useState<string>(
    defaultSelectNoneText
  );
  const [selectionAllText, setSelectionAllText] = useState<string>(
    defaultSelectionAllText
  );
  const [selectRowText, setSelectRowText] =
    useState<string>(defaultSelectRowText);
  const [expandText, setExpandText] = useState<string>(defaultExpandText);
  const [collapseText, setCollapseText] = useState<string>(defaultCollapseText);
  const [triggerDescText, setTriggerDescText] = useState<string>(
    defaultTriggerDescText
  );
  const [triggerAscText, setTriggerAscText] = useState<string>(
    defaultTriggerAscText
  );
  const [cancelSortText, setCancelSortText] = useState<string>(
    defaultCancelSortText
  );
  const [sortedAscendingText, setSortedAscendingText] = useState<string>(
    defaultSortedAscendingText
  );
  const [sortedDescendingText, setSortedDescendingText] = useState<string>(
    defaultSortedDescendingText
  );
  const [notSortedText, setNotSortedText] =
    useState<string>(defaultNotSortedText);
  const [scrollLeftAriaLabelText, setScrollLeftAriaLabel] = useState<string>(
    defaultScrollLeftAriaLabelText
  );
  const [scrollRightAriaLabelText, setScrollRightAriaLabel] = useState<string>(
    defaultScrollRightAriaLabelText
  );

  // Locs: if the prop isn't provided use the loc defaults.
  // If the mergedLocale is changed, update.
  useEffect(() => {
    setFilterConfirmText(
      props.filterConfirmText
        ? props.filterConfirmText
        : mergedLocale.lang!.filterConfirmText
    );
    setFilterResetText(
      props.filterResetText
        ? props.filterResetText
        : mergedLocale.lang!.filterResetText
    );
    setFilterEmptyText(
      props.filterEmptyText
        ? props.filterEmptyText
        : mergedLocale.lang!.filterEmptyText
    );
    setFilterCheckallText(
      props.filterCheckallText
        ? props.filterCheckallText
        : mergedLocale.lang!.filterCheckallText
    );
    setFilterSearchPlaceholderText(
      props.filterSearchPlaceholderText
        ? props.filterSearchPlaceholderText
        : mergedLocale.lang!.filterSearchPlaceholderText
    );
    setEmptyText(
      props.emptyText ? props.emptyText : mergedLocale.lang!.emptyText
    );
    setEmptyTextDetails(
      props.emptyTextDetails
        ? props.emptyTextDetails
        : mergedLocale.lang!.emptyTextDetails
    );
    setSelectAllRowsText(
      props.selectAllRowsText
        ? props.selectAllRowsText
        : mergedLocale.lang!.selectAllRowsText
    );
    setSelectInvertText(
      props.selectInvertText
        ? props.selectInvertText
        : mergedLocale.lang!.selectInvertText
    );
    setSelectNoneText(
      props.selectNoneText
        ? props.selectNoneText
        : mergedLocale.lang!.selectNoneText
    );
    setSelectionAllText(
      props.selectionAllText
        ? props.selectionAllText
        : mergedLocale.lang!.selectionAllText
    );
    setSelectRowText(
      props.selectRowText
        ? props.selectRowText
        : mergedLocale.lang!.selectRowText
    );
    setExpandText(
      props.expandText ? props.expandText : mergedLocale.lang!.expandText
    );
    setCollapseText(
      props.collapseText ? props.collapseText : mergedLocale.lang!.collapseText
    );
    setTriggerDescText(
      props.triggerDescText
        ? props.triggerDescText
        : mergedLocale.lang!.triggerDescText
    );
    setTriggerAscText(
      props.triggerAscText
        ? props.triggerAscText
        : mergedLocale.lang!.triggerAscText
    );
    setCancelSortText(
      props.cancelSortText
        ? props.cancelSortText
        : mergedLocale.lang!.cancelSortText
    );
    setSortedAscendingText(
      props.sortedAscendingText ?? mergedLocale.lang?.sortedAscendingText
    );
    setSortedDescendingText(
      props.sortedDescendingText ?? mergedLocale.lang?.sortedDescendingText
    );
    setNotSortedText(props.notSortedText ?? mergedLocale.lang?.notSortedText);
    setScrollLeftAriaLabel(
      props.scrollLeftAriaLabelText ??
        mergedLocale.lang!.scrollLeftAriaLabelText
    );
    setScrollRightAriaLabel(
      props.scrollRightAriaLabelText ??
        mergedLocale.lang!.scrollRightAriaLabelText
    );
  }, [mergedLocale]);

  // ============================ RowKey ============================
  const getRowKey = useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => (record as any)?.[rowKey as string];
  }, [rowKey]);

  const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName, getRowKey);

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
        pagination.onCurrentChange?.(changeInfo.pagination!.currentPage!);

        const pages: number[] = changeInfo.pagination!.pageSizes!;

        if (pages) {
          for (let i: number = 0; i < pages.length; ++i) {
            pagination.onSizeChange?.(changeInfo.pagination!.pageSizes[i]);
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
          getSortData(rawData, changeInfo.sorterStates!, childrenColumnName),
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
      sortedAscendingText,
      sortedDescendingText,
      notSortedText,
      showSorterDefaultIcon,
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
      currentPage = 1,
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
  const [transformSelectionColumns, selectedKeySet] = useSelection<RecordType>(
    rowSelection,
    {
      data: mergedData,
      emptyText,
      emptyTextDetails,
      pageData,
      getRowKey,
      getRecordByKey,
      expandType,
      childrenColumnName,
      getPopupContainer,
      selectAllRowsText,
      selectionAllText,
      selectInvertText,
      selectNoneText,
      selectRowText,
    }
  );

  const internalRowClassName = (
    record: RecordType,
    index: number,
    indent: number
  ) => {
    let mergedRowClassName;
    if (typeof rowClassName === 'function') {
      mergedRowClassName = mergeClasses([rowClassName(record, index, indent)]);
    } else {
      mergedRowClassName = mergeClasses([rowClassName]);
    }

    return mergeClasses(
      {
        [styles.tableRowSelected]: selectedKeySet.has(getRowKey(record, index)),
      },
      mergedRowClassName
    );
  };

  // ========================== Expandable ==========================

  mergedExpandableConfig.expandIcon =
    mergedExpandableConfig?.expandIcon ||
    renderExpandIcon(collapseText, expandText);

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
    [transformSorterColumns, transformFilterColumns, transformSelectionColumns]
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
            [styles.tablePaginationLeft]: position.indexOf('left') !== -1,
          },
          {
            [styles.tablePaginationCenter]: position.indexOf('center') !== -1,
          },
          {
            [styles.tablePaginationRight]: position.indexOf('right') !== -1,
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

  if (typeof loading === 'boolean' && loading) {
    return (
      <div className={styles.tableSpinner}>
        <Spinner />
      </div>
    );
  } else if (typeof loading === 'object') {
    return (
      <div className={styles.tableSpinner}>
        <Spinner {...loading} />
      </div>
    );
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
    <LocaleReceiver componentName={'Table'} defaultLocale={enUS}>
      {(contextLocale: TableLocale) => {
        const locale = { ...contextLocale, ...mergedLocale };

        return (
          <div ref={ref} className={wrapperClassNames} style={style}>
            {topPaginationNode}
            <OcTable<RecordType>
              alternateRowColor={alternateRowColor}
              {...tableProps}
              columns={mergedColumns as OcTableProps<RecordType>['columns']}
              direction={htmlDir}
              expandableConfig={mergedExpandableConfig}
              classNames={mergeClasses([
                styles.table,
                { [styles.tableRtl]: htmlDir === 'rtl' },
                {
                  [styles.tableLarge]: mergedSize === TableSize.Large,
                },
                {
                  [styles.tableMedium]: mergedSize === TableSize.Medium,
                },
                {
                  [styles.tableSmall]: mergedSize === TableSize.Small,
                },
                { [styles.tableBordered]: bordered },
                {
                  [styles.tableCellBordered]:
                    !bordered &&
                    !rowBordered &&
                    !innerBordered &&
                    !columnBordered &&
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
                    !bordered &&
                    !rowBordered &&
                    !columnBordered &&
                    innerBordered,
                },
                {
                  [styles.tableOuterBordered]: !bordered && outerBordered,
                },
                {
                  [styles.tableRowBordered]:
                    !bordered && !innerBordered && rowBordered,
                },
                {
                  [styles.tableColumnBordered]:
                    !bordered && !innerBordered && columnBordered,
                },
                {
                  [styles.tableRowHover]: rowHoverBackgroundEnabled,
                },
                { [styles.tableEmpty]: rawData.length === 0 },
              ])}
              bordered={bordered}
              data={pageData}
              locale={locale!.lang}
              rowKey={getRowKey}
              rowClassName={internalRowClassName}
              emptyText={renderEmpty(emptyText, emptyTextDetails)}
              transformColumns={
                transformColumns as OcTableProps<RecordType>['transformColumns']
              }
              onRowHoverEnter={onRowHoverEnter}
              onRowHoverLeave={onRowHoverLeave}
              scrollLeftAriaLabelText={scrollLeftAriaLabelText}
              scrollRightAriaLabelText={scrollRightAriaLabelText}
            />
            {bottomPaginationNode}
          </div>
        );
      }}
    </LocaleReceiver>
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
  displayName?: string;
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

Table.displayName = 'Table';

export default Table;
