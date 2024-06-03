import React from 'react';
import type {
  CustomizeComponent,
  GetComponentProps,
  Key,
  GetRowKey,
} from '../OcTable.types';

export interface MeasureRowProps extends Omit<MeasureCellProps, 'columnKey'> {
  columnsKey: React.Key[];
}

export interface MeasureCellProps {
  columnKey: React.Key;
  onColumnResize: (key: React.Key, width: number) => void;
}

export interface ExpandedRowProps {
  component: CustomizeComponent;
  cellComponent: CustomizeComponent;
  classNames: string;
  expanded: boolean;
  children: React.ReactNode;
  colSpan: number;
  isEmpty: boolean;
}

export interface BodyRowProps<RecordType> {
  record: RecordType;
  index: number;
  renderIndex: number;
  classNames?: string;
  style?: React.CSSProperties;
  recordKey: Key;
  expandedKeys: Set<Key>;
  rowComponent: CustomizeComponent;
  cellComponent: CustomizeComponent;
  onRow: GetComponentProps<RecordType>;
  rowExpandable: (record: RecordType) => boolean;
  rowExpandDisabled?: (record: RecordType) => boolean;
  indent?: number;
  rowKey: React.Key;
  getRowKey: GetRowKey<RecordType>;
  childrenColumnName: string;
  /**
   * Callback fired on row hover
   * @param index - Index of the row element
   * @param rowKey - Unique row identifier
   * @param event - Mouse over event
   */
  onRowHoverEnter: (
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
  onRowHoverLeave: (
    index: number,
    rowKey: React.Key,
    event: React.MouseEvent<HTMLElement>
  ) => void;
}

export interface BodyProps<RecordType> {
  data: readonly RecordType[];
  getRowKey: GetRowKey<RecordType>;
  measureColumnWidth: boolean;
  expandedKeys: Set<Key>;
  onRow: GetComponentProps<RecordType>;
  rowExpandable: (record: RecordType) => boolean;
  rowExpandDisabled?: (record: RecordType) => boolean;
  emptyNode: React.ReactNode;
  childrenColumnName: string;
  /**
   * Callback fired on row hover
   * @param index - Index of the row element
   * @param rowKey - Unique row identifier
   * @param event - Mouse over event
   */
  onRowHoverEnter: (
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
}
