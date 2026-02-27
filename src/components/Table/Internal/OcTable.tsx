import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getTargetScrollBarSize,
  isStyleSupport,
  isVisible,
  mergeClasses,
  pickAttrs,
} from '../../../shared/utilities';
import shallowEqual from 'shallowequal';
import {
  ResizeObserver,
  SizeInfo,
} from '../../../shared/ResizeObserver/ResizeObserver';
import ColumnGroup from './ColumnGroup';
import Column from './Column';
import Header from './Header/Header';
import type {
  ColumnType,
  ColumnsType,
  CustomizeComponent,
  CustomizeScrollBody,
  DefaultRecordType,
  ExpandableType,
  GetComponent,
  GetRowKey,
  Key,
  MemoTableContentProps,
  OcTableProps,
  ScrollerRef,
  StickyOffsets,
  TableComponents,
  TableLayout,
  TriggerEventHandler,
} from './OcTable.types';
import TableContext from './Context/TableContext';
import BodyContext from './Context/BodyContext';
import Body from './Body';
import useColumns from './Hooks/useColumns';
import { useLayoutState, useTimeoutLock } from './Hooks/useFrame';
import {
  getPathValue,
  mergeObject,
  validateValue,
  getColumnsKey,
} from './Utilities/valueUtil';
import ResizeContext from './Context/ResizeContext';
import useStickyOffsets from './Hooks/useStickyOffsets';
import ColGroup from './ColGroup';
import { FrameWrapper } from './FrameWrapper/FrameWrapper';
import Footer, { FooterComponents } from './Footer';
import { findAllChildrenKeys, renderExpandIcon } from './Utilities/expandUtil';
import { getCellFixedInfo } from './Utilities/fixUtil';
import StickyScrollBar from './stickyScrollBar';
import useSticky from './Hooks/useSticky';
import FixedHolder from './FixedHolder';
import type { SummaryProps } from './Footer/Footer.types';
import Summary from './Footer/Summary';
import StickyContext from './Context/StickyContext';
import ExpandedRowContext from './Context/ExpandedRowContext';
import { EXPAND_COLUMN } from './constant';
import { Scroller } from './Body/Scroller';

import styles from './octable.module.scss';

// Used for conditions cache
const EMPTY_DATA: any[] = [];

// Used for customize scroll
const EMPTY_SCROLL_TARGET: Object = {};

const MemoTableContent = memo<MemoTableContentProps>(
  ({ children }) => children as React.ReactElement,

  (prev, next) => {
    if (!shallowEqual(prev.props, next.props)) {
      return false;
    }

    // No additional render when pinged status change.
    // This is not a bug.
    return prev.pingLeft !== next.pingLeft || prev.pingRight !== next.pingRight;
  }
);

function OcTable<RecordType extends DefaultRecordType>(
  props: OcTableProps<RecordType>
) {
  const {
    alternateRowColor,
    bordered,
    caption,
    captionClassName,
    captionSide = 'top',
    classNames,
    rowClassName,
    style,
    data,
    rowKey,
    scroll,
    tableLayout,
    direction,

    // Additional Part
    title,
    footer,
    summary,

    // Customize
    id,
    showHeader,
    components,
    emptyText,
    onRow,
    onHeaderRow,
    transformColumns,
    rowHoverBackgroundEnabled = true,
    sticky,
    headerClassName,
    onRowHoverEnter,
    onRowHoverLeave,
    showScroller,
    scrollLeftAriaLabelText,
    scrollRightAriaLabelText,
  } = props;

  const mergedData = data || EMPTY_DATA;
  const hasData = !!mergedData.length;

  // ==================== Customize =====================
  const mergedComponents = useMemo(
    () => mergeObject<TableComponents<RecordType>>(components, {}),
    [components]
  );

  const getComponent = useCallback<GetComponent>(
    (path, defaultComponent) =>
      getPathValue<CustomizeComponent, TableComponents<RecordType>>(
        mergedComponents,
        path
      ) || defaultComponent,
    [mergedComponents]
  );

  const getRowKey = useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: RecordType) => {
      const key = record && record[rowKey];
      return key;
    };
  }, [rowKey]);

  // ====================== Expand ======================
  const expandableConfig = props.expandableConfig;

  const {
    expandIcon,
    expandedRowKeys,
    defaultExpandedRowKeys,
    defaultExpandAllRows,
    expandedRowRender,
    onExpand,
    onExpandedRowsChange,
    expandRowByClick,
    rowExpandable,
    rowExpandDisabled,
    expandedRowClassName,
    childrenColumnName,
    indentSize,
  } = expandableConfig;

  const mergedExpandIcon = expandIcon || renderExpandIcon;
  const mergedChildrenColumnName = childrenColumnName || 'children';
  const expandableType = useMemo<ExpandableType>(() => {
    if (expandedRowRender) {
      return 'row';
    }

    /* eslint-disable no-underscore-dangle */
    /**
     * TODO: investigate removal of use `__PARENT_RENDER_ICON__` condition.
     * This is required to remove the hidden icon button in the first cell
     * of each row when the row is not expandable in tree mode.
     */
    if (
      (props.expandableConfig &&
        (props.expandableConfig as any).__PARENT_RENDER_ICON__) ||
      mergedData.some(
        (record) =>
          record &&
          typeof record === 'object' &&
          record[mergedChildrenColumnName]
      )
    ) {
      return 'nest';
    }
    /* eslint-enable */

    return false;
  }, [!!expandedRowRender, mergedData]);

  const [innerExpandedKeys, setInnerExpandedKeys] = useState(() => {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }

    if (defaultExpandAllRows) {
      return findAllChildrenKeys<RecordType>(
        mergedData,
        getRowKey,
        mergedChildrenColumnName
      );
    }

    return [];
  });
  const mergedExpandedKeys = useMemo(
    () => new Set(expandedRowKeys || innerExpandedKeys || []),
    [expandedRowKeys, innerExpandedKeys]
  );

  const onTriggerExpand: TriggerEventHandler<RecordType> = useCallback(
    (record: RecordType) => {
      const key = getRowKey(record, mergedData.indexOf(record));

      let newExpandedKeys: Key[];
      const hasKey = mergedExpandedKeys.has(key);
      if (hasKey) {
        mergedExpandedKeys.delete(key);
        newExpandedKeys = [...mergedExpandedKeys];
      } else {
        newExpandedKeys = [...mergedExpandedKeys, key];
      }

      setInnerExpandedKeys(newExpandedKeys);
      if (onExpand) {
        onExpand(!hasKey, record);
      }
      if (onExpandedRowsChange) {
        onExpandedRowsChange(newExpandedKeys);
      }
    },
    [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange]
  );

  // ====================== Column ======================
  const [componentWidth, setComponentWidth] = useState(0);

  const [columns, flattenColumns] = useColumns(
    {
      ...props,
      ...expandableConfig,
      expandable: !!expandedRowRender,
      expandedKeys: mergedExpandedKeys,
      getRowKey,
      onTriggerExpand,
      expandIcon: mergedExpandIcon,
      direction,
    },
    transformColumns
  );

  const columnContext: {
    columns: ColumnsType<RecordType>;
    flattenColumns: readonly ColumnType<RecordType>[];
  } = useMemo(
    () => ({
      columns,
      flattenColumns,
    }),
    [columns, flattenColumns]
  );

  // ====================== Scroll ======================
  const fullTableRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>();
  const scrollHeaderRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>();
  const scrollBodyRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>();
  const scrollSummaryRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>();
  const titleRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const scrollerRef: React.MutableRefObject<ScrollerRef> =
    useRef<ScrollerRef>(null);
  const [pingedLeft, setPingedLeft] = useState<boolean>(false);
  const [pingedRight, setPingedRight] = useState<boolean>(false);
  const [colsWidths, updateColsWidths] = useLayoutState(
    new Map<React.Key, number>()
  );

  // Convert map to number width
  const colsKeys: React.Key[] = getColumnsKey(flattenColumns);
  const pureColWidths: number[] = colsKeys.map((columnKey) =>
    colsWidths.get(columnKey)
  );
  const colWidths: number[] = useMemo(
    () => pureColWidths,
    [pureColWidths.join('_')]
  );
  const stickyOffsets: StickyOffsets = useStickyOffsets(
    colWidths,
    flattenColumns.length,
    direction
  );
  const fixHeader: boolean = scroll && validateValue(scroll.y);
  const horizontalScroll: boolean =
    (scroll && validateValue(scroll.x)) || Boolean(expandableConfig.fixed);
  const verticalScroll: boolean =
    (scroll && validateValue(scroll.y)) || Boolean(expandableConfig.fixed);
  const fixColumn =
    horizontalScroll && flattenColumns.some(({ fixed }) => fixed);

  // Sticky
  const stickyRef: React.MutableRefObject<{
    setScrollLeft: (left: number) => void;
  }> = useRef<{ setScrollLeft: (left: number) => void }>();
  const {
    isSticky,
    offsetHeader,
    offsetSummary,
    offsetScroll,
    stickyClassName,
    container,
  } = useSticky(sticky);

  // Footer (Fix footer must fixed header)
  const summaryNode: React.ReactNode = summary?.(mergedData);
  const fixFooter: boolean | '' | 'top' | 'bottom' =
    (fixHeader || isSticky) &&
    React.isValidElement(summaryNode) &&
    summaryNode.type === Summary &&
    (summaryNode.props as SummaryProps).fixed;

  // Scroll
  let scrollXStyle: React.CSSProperties;
  let scrollYStyle: React.CSSProperties;
  let scrollTableStyle: React.CSSProperties;

  if (fixHeader) {
    scrollYStyle = {
      overflow: 'auto',
      maxHeight: scroll.y,
    };
  }

  if (horizontalScroll) {
    scrollXStyle = { overflow: 'auto' };
    // When no vertical scrollbar, should hide it
    if (!fixHeader) {
      scrollYStyle = { overflowY: 'hidden' };
    }
    scrollTableStyle = {
      width: scroll?.x === true ? 'auto' : scroll?.x,
      minWidth: '100%',
    };
  }

  const onColumnResize = useCallback((columnKey: React.Key, width: number) => {
    if (isVisible?.(fullTableRef.current)) {
      updateColsWidths((widths) => {
        if (widths.get(columnKey) !== width) {
          const newWidths = new Map(widths);
          newWidths.set(columnKey, width);
          return newWidths;
        }
        return widths;
      });
    }
  }, []);

  const [setScrollTarget, getScrollTarget] = useTimeoutLock(null);

  function forceScroll(
    scrollLeft: number,
    target: HTMLDivElement | ((left: number) => void)
  ) {
    if (!target) {
      return;
    }
    if (typeof target === 'function') {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      // eslint-disable-next-line no-param-reassign
      target.scrollLeft = scrollLeft;
    }
  }

  const onScroll = ({
    currentTarget,
    scrollLeft,
  }: {
    currentTarget: HTMLElement;
    scrollLeft?: number;
  }) => {
    const isRTL = direction === 'rtl';
    const mergedScrollLeft =
      typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;

    const compareTarget = currentTarget || EMPTY_SCROLL_TARGET;
    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      setScrollTarget(compareTarget);

      forceScroll(mergedScrollLeft, scrollHeaderRef.current);
      forceScroll(mergedScrollLeft, scrollBodyRef.current);
      forceScroll(mergedScrollLeft, scrollSummaryRef.current);
      forceScroll(mergedScrollLeft, stickyRef.current?.setScrollLeft);
    }

    if (currentTarget) {
      const { scrollWidth, clientWidth } = currentTarget;
      // There is no space to scroll
      if (scrollWidth === clientWidth) {
        return;
      }
      if (isRTL) {
        setPingedLeft(-mergedScrollLeft < scrollWidth - clientWidth);
        setPingedRight(-mergedScrollLeft > 0);
      } else {
        setPingedLeft(mergedScrollLeft > 0);
        setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
      }
    }

    scrollerRef.current?.onBodyScroll?.();
  };

  const triggerOnScroll = (): void => {
    if (horizontalScroll && scrollBodyRef.current) {
      onScroll({
        currentTarget: scrollBodyRef.current,
      } as React.UIEvent<HTMLDivElement>);
    } else {
      setPingedLeft(false);
      setPingedRight(false);
    }
  };

  const onFullTableResize = ({ width }: SizeInfo): void => {
    if (width !== componentWidth) {
      triggerOnScroll();
      setComponentWidth(
        fullTableRef.current ? fullTableRef.current.offsetWidth : width
      );
    }
  };

  // Sync scroll bar when init or `horizonScroll`, `data` and `columns.length` changed
  const mounted = useRef(false);
  useEffect(() => {
    // onFullTableResize will be trigger once when ResizeObserver is mounted
    // This will reduce one duplicated triggerOnScroll time
    if (mounted.current) {
      triggerOnScroll();
    }
  }, [horizontalScroll, data, columns.length]);
  useEffect(() => {
    mounted.current = true;
  }, []);

  // ===================== Effects ======================
  const [scrollbarSize, setScrollbarSize] = useState(0);
  const [supportSticky, setSupportSticky] = useState(true); // Only IE not support, we mark as support first

  useEffect(() => {
    setScrollbarSize(getTargetScrollBarSize?.(scrollBodyRef.current).width);
    setSupportSticky(isStyleSupport?.('position', 'sticky'));
  }, []);

  // ====================== Render ======================
  const TableComponent = getComponent(['table'], 'table');

  // Table layout
  const mergedTableLayout = useMemo<TableLayout>(() => {
    if (tableLayout) {
      return tableLayout;
    }
    // When scroll.x is max-content, no need to fix table layout
    // it's width should stretch out to fit content
    if (fixColumn) {
      return scroll?.x === 'max-content' ? 'auto' : 'fixed';
    }
    if (
      fixHeader ||
      isSticky ||
      flattenColumns.some(({ ellipsis }) => ellipsis)
    ) {
      return 'fixed';
    }
    return 'auto';
  }, [fixHeader, fixColumn, flattenColumns, tableLayout, isSticky]);

  let groupTableNode: React.ReactNode;

  // Header props
  const headerProps = {
    colWidths,
    columCount: flattenColumns.length,
    stickyOffsets,
    onHeaderRow,
    fixHeader,
    scroll,
    classNames: headerClassName,
  };

  // Empty
  const emptyNode: React.ReactNode = useMemo(() => {
    if (hasData) {
      return null;
    }

    if (typeof emptyText === 'function') {
      return emptyText();
    }
    return emptyText;
  }, [hasData, emptyText]);

  const _onRowHoverEnter = useCallback(
    (index: number, key: Key, event: React.MouseEvent<HTMLElement>) => {
      const hoveredCell = event.target as HTMLElement;
      scrollerRef.current?.onRowHover?.(hoveredCell.getBoundingClientRect());
      onRowHoverEnter?.(index, key, event);
    },
    []
  );

  const bodyTable = (
    <Body
      data={mergedData}
      measureColumnWidth={fixHeader || horizontalScroll || isSticky}
      expandedKeys={mergedExpandedKeys}
      rowExpandable={rowExpandable}
      rowExpandDisabled={rowExpandDisabled}
      getRowKey={getRowKey}
      onRow={onRow}
      emptyNode={emptyNode}
      childrenColumnName={mergedChildrenColumnName}
      onRowHoverEnter={_onRowHoverEnter}
      onRowHoverLeave={onRowHoverLeave}
    />
  );

  const bodyColGroup = (
    <ColGroup
      colWidths={flattenColumns.map(({ width }) => width)}
      columns={flattenColumns}
    />
  );

  const customizeScrollBody = getComponent([
    'body',
  ]) as CustomizeScrollBody<RecordType>;

  if (fixHeader || isSticky) {
    // Fixed Header
    let bodyContent: React.ReactNode;

    if (typeof customizeScrollBody === 'function') {
      bodyContent = customizeScrollBody(mergedData, {
        scrollbarSize,
        ref: scrollBodyRef,
        onScroll,
      });

      headerProps.colWidths = flattenColumns.map(({ width }, index) => {
        const colWidth =
          index === columns.length - 1
            ? (width as number) - scrollbarSize
            : width;
        if (typeof colWidth === 'number' && !Number.isNaN(colWidth)) {
          return colWidth;
        }
        return 0;
      }) as number[];
    } else {
      bodyContent = (
        <div
          style={{
            ...scrollXStyle,
            ...scrollYStyle,
          }}
          onScroll={onScroll}
          ref={scrollBodyRef}
          className={styles.tableBody}
        >
          {horizontalScroll && showScroller && (
            <Scroller
              ref={scrollerRef}
              {...columnContext}
              direction={direction}
              scrollBodyRef={scrollBodyRef}
              scrollHeaderRef={scrollHeaderRef}
              scrollLeftAriaLabelText={scrollLeftAriaLabelText}
              scrollRightAriaLabelText={scrollRightAriaLabelText}
              stickyOffsets={stickyOffsets}
              titleRef={titleRef}
              verticalScroll={verticalScroll}
            />
          )}
          <TableComponent
            style={{
              ...scrollTableStyle,
              tableLayout: mergedTableLayout,
            }}
          >
            {caption && (
              <caption
                className={mergeClasses([styles.tableCaption, captionClassName])}
                style={{ captionSide }}
              >
                {caption}
              </caption>
            )}
            {bodyColGroup}
            {bodyTable}
            {!fixFooter && summaryNode && (
              <Footer
                stickyOffsets={stickyOffsets}
                flattenColumns={flattenColumns}
              >
                {summaryNode}
              </Footer>
            )}
          </TableComponent>
        </div>
      );
    }

    // Fixed holder share the props
    const fixedHolderProps = {
      noData: !mergedData.length,
      maxContentScroll: horizontalScroll && scroll.x === 'max-content',
      ...headerProps,
      ...columnContext,
      direction,
      stickyClassName,
      onScroll,
    };

    groupTableNode = (
      <>
        {/* Header Table */}
        {showHeader !== false && (
          <FixedHolder
            {...fixedHolderProps}
            stickyTopOffset={offsetHeader}
            classNames={styles.tableHeader}
            ref={scrollHeaderRef}
          >
            {(fixedHolderPassProps) => (
              <>
                <Header
                  {...fixedHolderPassProps}
                  classNames={headerClassName}
                />
                {fixFooter === 'top' && (
                  <Footer {...fixedHolderPassProps}>{summaryNode}</Footer>
                )}
              </>
            )}
          </FixedHolder>
        )}

        {/* Body Table */}
        {bodyContent}

        {/* Summary Table */}
        {fixFooter && fixFooter !== 'top' && (
          <FixedHolder
            {...fixedHolderProps}
            stickyBottomOffset={offsetSummary}
            classNames={styles.tableSummary}
            ref={scrollSummaryRef}
          >
            {(fixedHolderPassProps) => (
              <Footer {...fixedHolderPassProps}>{summaryNode}</Footer>
            )}
          </FixedHolder>
        )}

        {isSticky && (
          <StickyScrollBar
            ref={stickyRef}
            offsetScroll={offsetScroll}
            scrollBodyRef={scrollBodyRef}
            onScroll={onScroll}
            container={container}
          />
        )}
      </>
    );
  } else {
    // Unique table
    groupTableNode = (
      <div
        style={{
          ...scrollXStyle,
          ...scrollYStyle,
        }}
        className={styles.tableContent}
        onScroll={onScroll}
        ref={scrollBodyRef}
      >
        {horizontalScroll && showScroller && (
          <Scroller
            ref={scrollerRef}
            {...columnContext}
            direction={direction}
            scrollBodyRef={scrollBodyRef}
            scrollLeftAriaLabelText={scrollLeftAriaLabelText}
            scrollRightAriaLabelText={scrollRightAriaLabelText}
            stickyOffsets={stickyOffsets}
            titleRef={titleRef}
            verticalScroll={verticalScroll}
          />
        )}
        <TableComponent
          style={{
            ...scrollTableStyle,
            tableLayout: mergedTableLayout,
          }}
        >
          {caption && (
            <caption
              className={mergeClasses([styles.tableCaption, captionClassName])}
              style={{ captionSide }}
            >
              {caption}
            </caption>
          )}
          {bodyColGroup}
          {showHeader !== false && (
            <Header {...headerProps} {...columnContext} />
          )}
          {bodyTable}
          {summaryNode && (
            <Footer
              stickyOffsets={stickyOffsets}
              flattenColumns={flattenColumns}
            >
              {summaryNode}
            </Footer>
          )}
        </TableComponent>
      </div>
    );
  }

  const ariaProps = pickAttrs(props, { aria: true, data: true });

  let fullTable = (
    <div
      className={mergeClasses([
        styles.table,
        { [styles.tableAlternate]: alternateRowColor },
        { [styles.tableBordered]: bordered },
        {
          [styles.tableRowHover]: rowHoverBackgroundEnabled,
        },
        { [styles.tableRtl]: direction === 'rtl' },
        { [styles.tablePingLeft]: pingedLeft },
        { [styles.tablePingRight]: pingedRight },
        { ['table-layout-fixed']: tableLayout === 'fixed' },
        { ['table-fixed-header']: fixHeader },
        { [styles.tableFixedColumn]: fixColumn },
        { ['table-scroll-horizontal']: horizontalScroll },
        {
          ['table-has-fix-left']: flattenColumns[0] && flattenColumns[0].fixed,
        },
        {
          ['table-has-fix-right']:
            flattenColumns[flattenColumns.length - 1] &&
            flattenColumns[flattenColumns.length - 1].fixed === 'right',
        },
        classNames,
      ])}
      style={style}
      id={id}
      ref={fullTableRef}
      {...ariaProps}
    >
      <MemoTableContent
        pingLeft={pingedLeft}
        pingRight={pingedRight}
        props={{ ...props, stickyOffsets, mergedExpandedKeys }}
      >
        {title && (
          <FrameWrapper ref={titleRef} classNames={styles.tableTitle}>
            {title(mergedData)}
          </FrameWrapper>
        )}
        <div
          className={mergeClasses([
            styles.tableContainer,
            { [styles.tableContainerHorizontallyScrollable]: horizontalScroll },
          ])}
          {...(horizontalScroll && {
            role: 'region',
            tabIndex: 0,
          })}
        >
          {groupTableNode}
        </div>
        {footer && (
          <FrameWrapper classNames={styles.tableFooter}>
            {footer(mergedData)}
          </FrameWrapper>
        )}
      </MemoTableContent>
    </div>
  );

  if (horizontalScroll) {
    fullTable = (
      <ResizeObserver onResize={onFullTableResize}>{fullTable}</ResizeObserver>
    );
  }

  const TableContextValue = useMemo(
    () => ({
      getComponent,
      scrollbarSize,
      direction,
      fixedInfoList: flattenColumns.map((_, colIndex) =>
        getCellFixedInfo(
          colIndex,
          colIndex,
          flattenColumns,
          stickyOffsets,
          direction
        )
      ),
      isSticky,
    }),
    [
      getComponent,
      scrollbarSize,
      direction,
      flattenColumns,
      stickyOffsets,
      direction,
      isSticky,
    ]
  );

  const BodyContextValue = useMemo(
    () => ({
      ...columnContext,
      tableLayout: mergedTableLayout,
      rowClassName,
      expandedRowClassName,
      expandIcon: mergedExpandIcon,
      expandableType,
      expandRowByClick,
      expandedRowRender,
      onTriggerExpand,
      indentSize,
    }),
    [
      columnContext,
      mergedTableLayout,
      rowClassName,
      expandedRowClassName,
      mergedExpandIcon,
      expandableType,
      expandRowByClick,
      expandedRowRender,
      onTriggerExpand,
      indentSize,
    ]
  );

  const ExpandedRowContextValue = useMemo(
    () => ({
      componentWidth,
      fixHeader,
      fixColumn,
      horizonScroll: horizontalScroll,
    }),
    [componentWidth, fixHeader, fixColumn, horizontalScroll]
  );

  const ResizeContextValue = useMemo(
    () => ({ onColumnResize }),
    [onColumnResize]
  );

  return (
    <StickyContext.Provider value={supportSticky}>
      <TableContext.Provider value={TableContextValue}>
        <BodyContext.Provider value={BodyContextValue}>
          <ExpandedRowContext.Provider value={ExpandedRowContextValue}>
            <ResizeContext.Provider value={ResizeContextValue}>
              {fullTable}
            </ResizeContext.Provider>
          </ExpandedRowContext.Provider>
        </BodyContext.Provider>
      </TableContext.Provider>
    </StickyContext.Provider>
  );
}

OcTable.EXPAND_COLUMN = EXPAND_COLUMN;

OcTable.Column = Column;

OcTable.ColumnGroup = ColumnGroup;

OcTable.Summary = FooterComponents;

OcTable.defaultProps = {
  rowKey: 'key',
  emptyText: () => 'No data found',
};

export default OcTable;
