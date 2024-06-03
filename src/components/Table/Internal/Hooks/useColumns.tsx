import React, { useMemo } from 'react';
import { toArray } from '../../../../shared/utilities';
import type {
  ColumnsType,
  ColumnType,
  FixedType,
  Key,
  GetRowKey,
  TriggerEventHandler,
  RenderExpandIcon,
  ColumnGroupType,
} from '../OcTable.types';
import { EXPAND_COLUMN, INTERNAL_COL_DEFINE } from '../constant';

import styles from '../octable.module.scss';

export function convertChildrenToColumns<RecordType>(
  children: React.ReactNode
): ColumnsType<RecordType> {
  return toArray(children)
    .filter((node: any) => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      const { children: nodeChildren, ...restProps } = props;
      const column = {
        key,
        ...restProps,
      };

      if (nodeChildren) {
        column.children = convertChildrenToColumns(nodeChildren);
      }

      return column;
    });
}

function flatColumns<RecordType>(
  columns: ColumnsType<RecordType>
): ColumnType<RecordType>[] {
  return columns.reduce((list, column) => {
    const { fixed } = column;

    // Convert `fixed='true'` to `fixed='left'` instead
    const parsedFixed = fixed === true ? 'left' : fixed;

    const subColumns = (column as ColumnGroupType<RecordType>).children;
    if (subColumns && subColumns.length > 0) {
      return [
        ...list,
        ...flatColumns(subColumns).map((subColum) => ({
          fixed: parsedFixed,
          ...subColum,
        })),
      ];
    }
    return [
      ...list,
      {
        ...column,
        fixed: parsedFixed,
      },
    ];
  }, []);
}

function warningFixed(flattenColumns: readonly { fixed?: FixedType }[]) {
  let allFixLeft = true;
  for (let i = 0; i < flattenColumns.length; i += 1) {
    const col = flattenColumns[i];
    if (allFixLeft && col.fixed !== 'left') {
      allFixLeft = false;
    } else if (!allFixLeft && col.fixed === 'left') {
      break;
    }
  }

  let allFixRight = true;
  for (let i = flattenColumns.length - 1; i >= 0; i -= 1) {
    const col = flattenColumns[i];
    if (allFixRight && col.fixed !== 'right') {
      allFixRight = false;
    } else if (!allFixRight && col.fixed === 'right') {
      break;
    }
  }
}

function revertForRtl<RecordType>(
  columns: ColumnsType<RecordType>
): ColumnsType<RecordType> {
  return columns.map((column) => {
    const { fixed, ...restProps } = column;

    // Convert `fixed='left'` to `fixed='right'` instead
    let parsedFixed = fixed;
    if (fixed === 'left') {
      parsedFixed = 'right';
    } else if (fixed === 'right') {
      parsedFixed = 'left';
    }
    return {
      fixed: parsedFixed,
      ...restProps,
    };
  });
}

/**
 * Parse `columns` & `children` into `columns`.
 */
function useColumns<RecordType>(
  {
    columns,
    children,
    expandable,
    expandedKeys,
    getRowKey,
    onTriggerExpand,
    expandIcon,
    rowExpandable,
    rowExpandDisabled,
    direction,
    expandRowByClick,
    columnWidth,
    fixed,
  }: {
    columns?: ColumnsType<RecordType>;
    children?: React.ReactNode;
    expandable: boolean;
    expandedKeys: Set<Key>;
    getRowKey: GetRowKey<RecordType>;
    onTriggerExpand: TriggerEventHandler<RecordType>;
    expandIcon?: RenderExpandIcon<RecordType>;
    rowExpandable?: (record: RecordType) => boolean;
    rowExpandDisabled?: (record: RecordType) => boolean;
    direction?: string;
    expandRowByClick?: boolean;
    columnWidth?: number | string;
    fixed?: FixedType;
  },
  transformColumns: (
    columns: ColumnsType<RecordType>
  ) => ColumnsType<RecordType>
): [ColumnsType<RecordType>, readonly ColumnType<RecordType>[]] {
  const baseColumns = useMemo<ColumnsType<RecordType>>(
    () => columns || convertChildrenToColumns(children),
    [columns, children]
  );

  // ========================== Expand ==========================
  const withExpandColumns = useMemo<ColumnsType<RecordType>>(() => {
    if (expandable) {
      let cloneColumns: (
        | ColumnGroupType<RecordType>
        | ColumnType<RecordType>
      )[] = baseColumns.slice();

      // >>> Insert expand column if not exist
      if (!cloneColumns.includes(EXPAND_COLUMN)) {
        const expandColIndex = 0;
        if (expandColIndex >= 0) {
          cloneColumns.splice(expandColIndex, 0, EXPAND_COLUMN);
        }
      }

      const expandColumnIndex: number = cloneColumns.indexOf(EXPAND_COLUMN);
      cloneColumns = cloneColumns.filter(
        (column, index) =>
          column !== EXPAND_COLUMN || index === expandColumnIndex
      );

      // >>> Check if expand column need to fixed
      const prevColumn: ColumnGroupType<RecordType> | ColumnType<RecordType> =
        baseColumns[expandColumnIndex];

      let fixedColumn: FixedType | null;
      if (fixed === 'left' || fixed) {
        fixedColumn = 'left';
      } else if (fixed === 'right' || fixed) {
        fixedColumn = 'right';
      } else {
        fixedColumn = prevColumn ? prevColumn.fixed : null;
      }

      // >>> Create expandable column
      const expandColumn = {
        [INTERNAL_COL_DEFINE]: {
          className: styles.tableExpandIconCol,
          columnType: 'EXPAND_COLUMN',
        },
        title: '',
        fixed: fixedColumn,
        className: styles.tableRowExpandIconCell,
        width: columnWidth,
        render: (_: any, record: any, index: number) => {
          const rowKey: React.Key = getRowKey(record, index);
          const expanded: boolean = expandedKeys.has(rowKey);
          const recordExpandable: boolean = rowExpandable
            ? rowExpandable(record)
            : true;
          const recordExpandDisabled: boolean = rowExpandDisabled
            ? rowExpandDisabled(record)
            : false;

          const icon: React.ReactNode = expandIcon({
            expandable: recordExpandable,
            expanded,
            onExpand: onTriggerExpand,
            record,
            disabled: recordExpandDisabled,
          });

          if (expandRowByClick) {
            return (
              <span
                onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                  e?.stopPropagation()
                }
              >
                {icon}
              </span>
            );
          }
          return icon;
        },
      };

      return cloneColumns.map(
        (col: ColumnGroupType<RecordType> | ColumnType<RecordType>) =>
          col === EXPAND_COLUMN ? expandColumn : col
      );
    }

    return baseColumns.filter(
      (col: ColumnGroupType<RecordType> | ColumnType<RecordType>) =>
        col !== EXPAND_COLUMN
    );
  }, [expandable, baseColumns, getRowKey, expandedKeys, expandIcon, direction]);

  // ========================= Transform ========================
  const mergedColumns = useMemo(() => {
    let finalColumns = withExpandColumns;
    if (transformColumns) {
      finalColumns = transformColumns(finalColumns);
    }

    // Always provides at least one column for table display
    if (!finalColumns.length) {
      finalColumns = [
        {
          render: () => null,
        },
      ];
    }
    return finalColumns;
  }, [transformColumns, withExpandColumns, direction]);

  // ========================== Flatten =========================
  const flattenColumns = useMemo(() => {
    if (direction === 'rtl') {
      return revertForRtl(flatColumns(mergedColumns));
    }
    return flatColumns(mergedColumns);
  }, [mergedColumns, direction]);
  // Only check out of production since it's waste for each render
  if (process.env.NODE_ENV !== 'production') {
    warningFixed(
      direction === 'rtl' ? flattenColumns.slice().reverse() : flattenColumns
    );
  }
  return [mergedColumns, flattenColumns];
}

export default useColumns;
