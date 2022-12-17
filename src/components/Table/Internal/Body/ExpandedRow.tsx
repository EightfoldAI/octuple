import React, { useContext, useMemo } from 'react';
import { ExpandedRowProps } from './Body.types';
import Cell from '../Cell';
import TableContext from '../Context/TableContext';
import ExpandedRowContext from '../Context/ExpandedRowContext';

import styles from '../octable.module.scss';

function ExpandedRow({
  children,
  component: Component,
  cellComponent,
  classNames,
  expanded,
  colSpan,
  isEmpty,
}: ExpandedRowProps) {
  const { scrollbarSize } = useContext(TableContext);
  const { fixHeader, fixColumn, componentWidth, horizonScroll } =
    useContext(ExpandedRowContext);

  // Cache render node
  return useMemo(() => {
    let contentNode = children;

    if (isEmpty ? horizonScroll : fixColumn) {
      contentNode = (
        <div
          style={{
            width: componentWidth - (fixHeader ? scrollbarSize : 0),
            position: 'sticky',
            left: 0,
            overflow: 'hidden',
          }}
          className={styles.tableExpandedRowFixed}
        >
          {contentNode}
        </div>
      );
    }

    return (
      <Component
        className={classNames}
        style={{
          display: expanded ? null : 'none',
        }}
      >
        <Cell component={cellComponent} colSpan={colSpan}>
          {contentNode}
        </Cell>
      </Component>
    );
  }, [
    children,
    Component,
    classNames,
    expanded,
    colSpan,
    isEmpty,
    scrollbarSize,
    componentWidth,
    fixColumn,
    fixHeader,
    horizonScroll,
  ]);
}

export default ExpandedRow;
