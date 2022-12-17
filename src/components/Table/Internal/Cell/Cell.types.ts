import type {
  DataIndex,
  ColumnType,
  CustomizeComponent,
  DefaultRecordType,
  AlignType,
  CellEllipsisType,
  VerticalAlignType,
} from '../OcTable.types';
import type { HoverContextProps } from '../Context/HoverContext';

export interface InternalCellProps<RecordType extends DefaultRecordType>
  extends Pick<HoverContextProps, 'onHover'> {
  classNames?: string;
  record?: RecordType;
  /** `column` index is the real show rowIndex */
  index?: number;
  /** the index of the record. For the render(value, record, renderIndex) */
  renderIndex?: number;
  dataIndex?: DataIndex;
  render?: ColumnType<RecordType>['render'];
  component?: CustomizeComponent;
  children?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  ellipsis?: CellEllipsisType;
  align?: AlignType;

  shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;

  // Fixed
  fixLeft?: number | false;
  fixRight?: number | false;
  firstFixLeft?: boolean;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
  lastFixRight?: boolean;

  verticalAlign?: VerticalAlignType;

  // ====================== Private Props ======================
  /** @private Used for `expandable` with nest tree */
  appendNode?: React.ReactNode;
  additionalProps?: React.TdHTMLAttributes<HTMLTableCellElement>;
  /** @private Fixed for user use `shouldCellUpdate` which block the render */
  expanded?: boolean;

  rowType?: 'header' | 'body' | 'footer';

  isSticky?: boolean;

  hovering?: boolean;
}

export type CellProps<RecordType extends DefaultRecordType> = Omit<
  InternalCellProps<RecordType>,
  keyof HoverContextProps
>;
