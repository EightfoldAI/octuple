import type * as React from 'react';
import { RefObject } from 'react';

export const VERTICAL_SCROLL_OFFSET: number = 16;

export type Key = React.Key;

export type FixedType = 'left' | 'right' | boolean;

export type DefaultRecordType = Record<string, any>;

export type TableLayout = 'auto' | 'fixed';

export type Locale = {
  /**
   * The Table locale.
   */
  locale: string;
  /**
   * The Table filter `OK` string.
   */
  filterConfirmText?: string;
  /**
   * The Table filter `Reset` string.
   */
  filterResetText?: string;
  /**
   * The Table filter `No filters` string.
   */
  filterEmptyText?: string;
  /**
   * The Table filter `Select all items` string.
   */
  filterCheckallText?: string;
  /**
   * The Table filter `Search in filters` string.
   */
  filterSearchPlaceholderText?: string;
  /**
   * The empty Table `No data found` string.
   */
  emptyText?: string;
  /**
   * The empty Table details string.
   * This is not localized as its specific to your scenario.
   * Must be passed via props.
   */
  emptyTextDetails?: string;
  /**
   * The Table `Clear all data` string.
   */
  selectNoneText?: string;
  /**
   * The Table `Invert current page` string.
   */
  selectInvertText?: string;
  /**
   * The Table `Select all data` string.
   */
  selectionAllText?: string;
  /**
   * The Table `Expand row` string.
   */
  expandText?: string;
  /**
   * The Table `Collapse row` string.
   */
  collapseText?: string;
  /**
   * The Table `Click to sort descending` string.
   */
  triggerDescText?: string;
  /**
   * The Table `Click to sort ascending` string.
   */
  triggerAscText?: string;
  /**
   * The Table `Click to cancel sorting` string.
   */
  cancelSortText?: string;
  /**
   * The Table `sorted ascending` string for screen reader announcements.
   */
  sortedAscendingText?: string;
  /**
   * The Table `sorted descending` string for screen reader announcements.
   */
  sortedDescendingText?: string;
  /**
   * The Table `not sorted` string for screen reader announcements.
   */
  notSortedText?: string;
  /**
   * The Table `Scroll right` string
   */
  scrollRightAriaLabelText?: string;
  /**
   * The Table `Scroll left` string
   */
  scrollLeftAriaLabelText?: string;
  /**
   * The Table `Select all rows` string
   */
  selectAllRowsText?: string;
  /**
   * The Table `Select row` string
   */
  selectRowText?: string;
};

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
  /**
   * Set the Table Column text alignment.
   * @default 'left'
   */
  align?: AlignType;
  /**
   * The custom class names of the Table Column.
   */
  classNames?: string;
  /**
   * The ellipsis configuration of the Table cell content.
   * `tableLayout` is `fixed` when ellipsis is true or { showTitle?: boolean }
   */
  ellipsis?: CellEllipsisType;
  /**
   * Set Column to fixed.
   */
  fixed?: FixedType;
  /**
   * Unique key of the Table Column.
   * May be ignored if you've set a unique `dataIndex`.
   */
  key?: Key;
  /**
   * Set props on header cell.
   */
  onHeaderCell?: GetComponentProps<ColumnsType<RecordType>[number]>;
  /**
   * @private
   * The Column title.
   */
  title?: React.ReactNode;
  /**
   * Set the Table Column vertical alignment.
   */
  verticalAlign?: VerticalAlignType;
}

export interface ColumnGroupType<RecordType>
  extends ColumnSharedType<RecordType> {
  children: ColumnsType<RecordType>;
}

export type AlignType =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';

export type VerticalAlignType =
  | 'baseline'
  | 'bottom'
  | 'middle'
  | 'sub'
  | 'super'
  | 'text-bottom'
  | 'text-top'
  | 'top'
  | string;

export interface ColumnType<RecordType> extends ColumnSharedType<RecordType> {
  /**
   * Span of the Table Column's title
   */
  colSpan?: number;
  /**
   * Display field of the data record.
   * Supports nest path by string array.
   */
  dataIndex?: DataIndex;
  /**
   * Set props on cell.
   */
  onCell?: GetComponentProps<RecordType>;
  /**
   * Renderer of the Table cell.
   * The return value should be a ReactNode.
   */
  render?: (
    value: any,
    record: RecordType,
    index: number
  ) => React.ReactNode | RenderedCell<RecordType>;
  /**
   * Span of the Table Column row.
   */
  rowSpan?: number;
  /**
   * Control the Table cell render logic.
   */
  shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;
  /**
   * The Table Column width.
   */
  width?: number | string;
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
  /**
   * Whether the expand icon button row is expandable.
   */
  expandable: boolean;
  /**
   * Whether the expand icon button row is expanded.
   */
  expanded: boolean;
  /**
   * The expand icon row onExpand callback.
   */
  onExpand: TriggerEventHandler<RecordType>;
  /**
   * The expand icon row record.
   */
  record: RecordType;
  /**
   * Whether the expand icon button is disabled.
   */
  disabled?: boolean;
}

export type RenderExpandIcon<RecordType> = (
  props: RenderExpandIconProps<RecordType>
) => React.ReactNode;

export interface ExpandableConfig<RecordType> {
  /**
   * The Column contains children to display.
   * @default 'children'
   */
  childrenColumnName?: string;
  /**
   * The width of the expand Column
   */
  columnWidth?: number | string;
  /**
   * Expand all rows by default.
   * @default false
   */
  defaultExpandAllRows?: boolean;
  /**
   * Expanded row keys by default.
   */
  defaultExpandedRowKeys?: readonly Key[];
  /**
   * The expanded row's custom class name.
   */
  expandedRowClassName?: RowClassName<RecordType>;
  /**
   * Current expanded row keys.
   */
  expandedRowKeys?: readonly Key[];
  /**
   * Custom expand row Icon.
   */
  expandIcon?: RenderExpandIcon<RecordType>;
  /**
   * Whether to expand row by clicking anywhere in the row.
   * @default false
   */
  expandRowByClick?: boolean;
  /**
   * Expanded container render for each row.
   */
  expandedRowRender?: ExpandedRowRender<RecordType>;
  /**
   * Whether the expansion icon is fixed.
   * true | left | right
   * @default false
   */
  fixed?: FixedType;
  /**
   * Indent size in pixels of Table tree data.
   * @default 15
   */
  indentSize?: number;
  /**
   * Callback executed when the expand row icon is clicked.
   */
  onExpand?: (expanded: boolean, record: RecordType) => void;
  /**
   * Callback executed when the expanded rows change.
   */
  onExpandedRowsChange?: (expandedKeys: readonly Key[]) => void;
  /**
   * Enable row expandable.
   */
  rowExpandable?: (record: RecordType) => boolean;
  /**
   * Whether the expandability of a row is disabled.
   */
  rowExpandDisabled?: (record: RecordType) => boolean;
  /**
   * Show expand column.
   * @default true
   */
  showExpandColumn?: boolean;
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

export interface ScrollerProps<RecordType> {
  columns: ColumnsType<RecordType>;
  flattenColumns: readonly ColumnType<RecordType>[];
  scrollBodyRef: RefObject<HTMLDivElement>;
  stickyOffsets: StickyOffsets;
  /**
   * The Table canvas direction.
   * options: 'ltr', 'rtl'
   */
  direction?: string;
  scrollHeaderRef?: RefObject<HTMLDivElement>;
  /**
   * The Table scroller left button aria label.
   * @default 'Scroll left'
   */
  scrollLeftAriaLabelText?: string;
  /**
   * The Table scroller right button aria label.
   * @default 'Scroll right'
   */
  scrollRightAriaLabelText?: string;
  /**
   * Ref of the table title.
   */
  titleRef?: RefObject<HTMLDivElement>;
  /**
   * The Table is vertically scrollable.
   * @default false
   */
  verticalScroll?: boolean;
}

export type ScrollerRef = {
  /**
   * Helper method to handle body scroll changes
   */
  onBodyScroll: () => void;
  /**
   * Helper method triggered on hover of a row
   */
  onRowHover: (boundingRect: DOMRect) => void;
};

export interface OcTableProps<RecordType = unknown> {
  /**
   * The Table Row background colors alternate.
   * @default true
   */
  alternateRowColor?: boolean;
  /**
   * Show all Table borders.
   */
  bordered?: boolean;
  /**
   * The Table custom class names.
   */
  classNames?: string;
  /**
   * The Table children.
   */
  children?: React.ReactNode;
  /**
   * Override default Table elements.
   */
  components?: TableComponents<RecordType>;
  /**
   * The Table canvas direction.
   * options: 'ltr', 'rtl'
   */
  direction?: string;
  /**
   * Configure expandable content.
   */
  expandableConfig?: ExpandableConfig<RecordType>;
  /**
   * The Table footer renderer.
   */
  footer?: FrameWrapperRender<RecordType>;
  /**
   * The custom class name of Table header.
   */
  headerClassName?: string;
  /**
   * The Table id.
   */
  id?: string;
  /**
   * Indent size in pixels of Table tree data.
   */
  indentSize?: number;
  /**
   * Localization configuration.
   */
  locale?: Locale;
  /**
   * Set props on header row.
   */
  onHeaderRow?: GetComponentProps<readonly ColumnType<RecordType>[]>;
  /**
   * Set props on row.
   */
  onRow?: GetComponentProps<RecordType>;
  /**
   * The custom class name of Table row.
   */
  rowClassName?: string | RowClassName<RecordType>;
  /**
   * Enables row background hover color.
   * @default true
   */
  rowHoverBackgroundEnabled?: boolean;
  /**
   * Table Row's unique key.
   * May be a string or function that returns a string.
   */
  rowKey?: string | GetRowKey<RecordType>;
  /**
   * Show the Table header.
   * @default true
   */
  showHeader?: boolean;
  /**
   * Set Table sticky header and scroll bar.
   */
  sticky?: boolean | TableSticky;
  /**
   * The Table custom style.
   */
  style?: React.CSSProperties;
  /**
   * The Table summary content.
   */
  summary?: (data: readonly RecordType[]) => React.ReactNode;
  /**
   * The table-layout attribute of <table> element.
   * options: `fixed`, `auto`.
   */
  tableLayout?: TableLayout;
  /**
   * The Table title renderer.
   */
  title?: FrameWrapperRender<RecordType>;
  /**
   * @private
   * The internal Table transform column with an additional debug column.
   * TODO: investigate removing this internal prop if not needed.
   */
  transformColumns?: (
    columns: ColumnsType<RecordType>
  ) => ColumnsType<RecordType>;
  /**
   * @private
   * The internal Table columns.
   */
  columns?: ColumnsType<RecordType>;
  /**
   * @private
   * The Table Data record array to be displayed.
   */
  data?: readonly RecordType[];
  /**
   * @private
   * The Table empty text renderer.
   */
  emptyText?: React.ReactNode | (() => React.ReactNode);
  /**
   * @private
   * Set if the Table is scrollable. May be used for fixed content.
   * `x` sets horizontal scrolling, can also be used to specify the width of
   * the scroll area, could be number, percent value, true and 'max-content'.
   * `y` sets vertical scrolling, can also be used to specify the height of
   * the scroll area, could be string or number.
   */
  scroll?: { x?: number | true | string; y?: number | string };
  /**
   * Button scroller for a horizontal scroll table
   * @default false
   */
  showScroller?: boolean;
  /**
   * Callback fired on row hover
   * @param index - Index of the row element
   * @param rowKey - Unique row identifier
   * @param event - Mouse over event
   */
  onRowHoverEnter?: (
    index: number,
    rowKey: React.Key,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  /**
   * Callback fired on row hover leave
   * @param index - Index of the row element
   * @param rowKey - Unique row identifier
   * @param event - Mouse over event
   */
  onRowHoverLeave?: (
    index: number,
    rowKey: React.Key,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  /**
   * The Table scroller right button aria label
   * @default 'Scroll right'
   */
  scrollRightAriaLabelText?: string;
  /**
   * The Table scroller left button aria label
   * @default 'Scroll left'
   */
  scrollLeftAriaLabelText?: string;
}
