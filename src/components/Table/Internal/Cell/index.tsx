import React, { forwardRef, memo, Ref, useContext, useMemo } from 'react';
import { mergeClasses } from '../../../../shared/utilities';
import shallowEqual from 'shallowequal';
import { VERTICAL_SCROLL_OFFSET } from '../OcTable.types';
import type {
  RenderedCell,
  CellType,
  DefaultRecordType,
  CellEllipsisType,
} from '../OcTable.types';
import { CellProps, InternalCellProps } from './Cell.types';
import { getPathValue, validateValue } from '../Utilities/valueUtil';
import StickyContext from '../Context/StickyContext';
import HoverContext from '../Context/HoverContext';
import PerfContext from '../Context/PerfContext';

import styles from '../octable.module.scss';

/** Check if cell is in hover range */
function inHoverRange(
  cellStartRow: number,
  cellRowSpan: number,
  startRow: number,
  endRow: number
) {
  const cellEndRow = cellStartRow + cellRowSpan - 1;
  return cellStartRow <= endRow && cellEndRow >= startRow;
}

function isRenderCell<RecordType>(
  data: React.ReactNode | RenderedCell<RecordType>
): data is RenderedCell<RecordType> {
  return (
    data &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    !React.isValidElement(data)
  );
}

const getTitleFromCellRenderChildren = ({
  ellipsis,
  rowType,
  children,
}: Pick<InternalCellProps<any>, 'ellipsis' | 'rowType' | 'children'>) => {
  let title: string;
  const ellipsisConfig: CellEllipsisType =
    ellipsis === true ? { showTitle: true } : ellipsis;
  if (ellipsisConfig && (ellipsisConfig.showTitle || rowType === 'header')) {
    if (typeof children === 'string' || typeof children === 'number') {
      title = children.toString();
    } else if (
      React.isValidElement(children) &&
      typeof children.props.children === 'string'
    ) {
      title = children.props.children;
    }
  }
  return title;
};

function Cell<RecordType extends DefaultRecordType>(
  {
    classNames,
    record,
    index,
    renderIndex,
    dataIndex,
    render,
    children,
    component: Component = 'td',
    colSpan,
    rowSpan, // This is already merged on WrapperCell
    fixLeft,
    fixRight,
    firstFixLeft,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    appendNode,
    additionalProps = {},
    ellipsis,
    align,
    rowType,
    isSticky,
    hovering,
    onHover,
    verticalAlign,
  }: InternalCellProps<RecordType>,
  ref: React.Ref<any>
): React.ReactElement {
  const perfRecord = useContext(PerfContext);
  const supportSticky = useContext(StickyContext);

  // ==================== Child Node ====================
  const [childNode, legacyCellProps] = useMemo<
    [React.ReactNode, CellType<RecordType>] | [React.ReactNode]
  >(() => {
    if (validateValue(children)) {
      return [children];
    }

    const value = getPathValue<
      Record<string, unknown> | React.ReactNode,
      RecordType
    >(record, dataIndex);

    // Customize render node
    let returnChildNode = value;
    let returnCellProps: CellType<RecordType> | undefined = undefined;

    if (render) {
      const renderData = render(value, record, renderIndex);

      if (isRenderCell(renderData)) {
        returnChildNode = renderData.children;
        returnCellProps = renderData.props;
        perfRecord.renderWithProps = true;
      } else {
        returnChildNode = renderData;
      }
    }

    return [returnChildNode, returnCellProps];
  }, [
    /* eslint-disable react-hooks/exhaustive-deps */
    // Always re-render if `renderWithProps`
    perfRecord.renderWithProps ? Math.random() : 0,
    /* eslint-enable */
    children,
    dataIndex,
    perfRecord,
    record,
    render,
    renderIndex,
  ]);

  let mergedChildNode = childNode;

  // Not crash if final `childNode` is not validate ReactNode
  if (
    typeof mergedChildNode === 'object' &&
    !Array.isArray(mergedChildNode) &&
    !React.isValidElement(mergedChildNode)
  ) {
    mergedChildNode = null;
  }

  if (ellipsis && (lastFixLeft || firstFixRight)) {
    mergedChildNode = (
      <span className={styles.tableCellContent}>{mergedChildNode}</span>
    );
  }

  const {
    colSpan: cellColSpan,
    rowSpan: cellRowSpan,
    style: cellStyle,
    classNames: cellClassName,
    ...restCellProps
  } = legacyCellProps || {};
  const mergedColSpan =
    (cellColSpan !== undefined ? cellColSpan : colSpan) ?? 1;
  const mergedRowSpan =
    (cellRowSpan !== undefined ? cellRowSpan : rowSpan) ?? 1;

  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  }

  // ====================== Fixed =======================
  const fixedStyle: React.CSSProperties = {};
  const isFixLeft = typeof fixLeft === 'number' && supportSticky;
  const isFixRight = typeof fixRight === 'number' && supportSticky;

  if (isFixLeft) {
    fixedStyle.position = 'sticky';
    fixedStyle.left = fixLeft as number;
  }
  if (isFixRight) {
    fixedStyle.position = 'sticky';
    fixedStyle.right = fixRight as number;

    if (fixRight <= VERTICAL_SCROLL_OFFSET) {
      fixedStyle.borderRightColor = 'transparent';
    }
  }

  // ====================== Align =======================
  const alignStyle: React.CSSProperties = {};

  if (align) {
    alignStyle.textAlign = align;
  }

  const verticalAlignStyle: React.CSSProperties = {};

  if (verticalAlign) {
    verticalAlignStyle.verticalAlign = verticalAlign;
  }

  // ====================== Hover =======================
  const onMouseEnter: React.MouseEventHandler<HTMLTableCellElement> = (
    event
  ) => {
    if (record) {
      onHover(index, index + mergedRowSpan - 1);
    }

    additionalProps?.onMouseEnter?.(event);
  };

  const onMouseLeave: React.MouseEventHandler<HTMLTableCellElement> = (
    event
  ) => {
    if (record) {
      onHover(-1, -1);
    }

    additionalProps?.onMouseLeave?.(event);
  };

  // ====================== Render ======================
  const title = getTitleFromCellRenderChildren({
    rowType,
    ellipsis,
    children: childNode,
  });

  const componentProps: React.TdHTMLAttributes<HTMLTableCellElement> & {
    ref: Ref<any>;
  } = {
    title,
    ...restCellProps,
    ...additionalProps,
    colSpan: mergedColSpan !== 1 ? mergedColSpan : null,
    rowSpan: mergedRowSpan !== 1 ? mergedRowSpan : null,
    className: mergeClasses?.([
      styles.tableCell,
      classNames,
      { [styles.tableCellFixLeft]: isFixLeft && supportSticky },
      { [styles.tableCellFixLeftFirst]: firstFixLeft && supportSticky },
      { [styles.tableCellFixLeftLast]: lastFixLeft && supportSticky },
      { [styles.tableCellFixRight]: isFixRight && supportSticky },
      { [styles.tableCellFixRightFirst]: firstFixRight && supportSticky },
      { [styles.tableCellFixRightLast]: lastFixRight && supportSticky },
      { [styles.tableCellEllipsis]: ellipsis },
      { [styles.tableCellWithAppend]: appendNode },
      {
        [styles.tableCellFixSticky]:
          (isFixLeft || isFixRight) && isSticky && supportSticky,
      },
      { [styles.tableCellRowHover]: !legacyCellProps && hovering },
      additionalProps.className,
      cellClassName,
    ]),
    style: {
      ...additionalProps.style,
      ...alignStyle,
      ...verticalAlignStyle,
      ...fixedStyle,
      ...cellStyle,
    },
    onMouseEnter,
    onMouseLeave,
    ref: ref,
  };

  return (
    <Component {...componentProps}>
      {appendNode}
      {mergedChildNode}
    </Component>
  );
}

const RefCell = forwardRef<any, InternalCellProps<any>>(Cell);
RefCell.displayName = 'Cell';

const comparePropList: (keyof InternalCellProps<any>)[] = [
  'expanded',
  'classNames',
  'hovering',
];

const MemoCell = memo(
  RefCell,
  (prev: InternalCellProps<any>, next: InternalCellProps<any>) => {
    if (next.shouldCellUpdate) {
      return (
        // Additional handle of expanded logic
        comparePropList.every(
          (propName) => prev[propName] === next[propName]
        ) &&
        // User control update logic
        !next.shouldCellUpdate(next.record, prev.record)
      );
    }

    return shallowEqual(prev, next);
  }
);

/** Inject hover data here, we still wish MemoCell keep simple `shouldCellUpdate` logic */
const WrappedCell = forwardRef((props: CellProps<any>, ref: Ref<any>) => {
  const { onHover, startRow, endRow } = useContext(HoverContext);
  const { index, additionalProps = {}, colSpan, rowSpan } = props;
  const { colSpan: cellColSpan, rowSpan: cellRowSpan } = additionalProps;

  const mergedColSpan = colSpan ?? cellColSpan;
  const mergedRowSpan = rowSpan ?? cellRowSpan;

  const hovering = inHoverRange(index, mergedRowSpan || 1, startRow, endRow);

  return (
    <MemoCell
      {...props}
      colSpan={mergedColSpan}
      rowSpan={mergedRowSpan}
      hovering={hovering}
      ref={ref}
      onHover={onHover}
    />
  );
});
WrappedCell.displayName = 'WrappedCell';

export default WrappedCell;
