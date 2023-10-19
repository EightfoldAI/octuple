import React, {
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import TableContext from '../Context/TableContext';
import ExpandedRow from './ExpandedRow';
import BodyContext from '../Context/BodyContext';
import { getColumnsKey } from '../Utilities/valueUtil';
import ResizeContext from '../Context/ResizeContext';
import BodyRow from './BodyRow';
import useFlattenRecords from '../Hooks/useFlattenRecords';
import HoverContext from '../Context/HoverContext';
import type { PerfRecord } from '../Context/PerfContext';
import PerfContext from '../Context/PerfContext';
import MeasureRow from './MeasureRow';
import { BodyProps } from './Body.types';

import styles from '../octable.module.scss';

function Body<RecordType>({
  data,
  getRowKey,
  measureColumnWidth,
  expandedKeys,
  onRow,
  rowExpandable,
  rowExpandDisabled,
  emptyNode,
  childrenColumnName,
  onRowHoverEnter,
  onRowHoverLeave,
}: BodyProps<RecordType>) {
  const { onColumnResize } = useContext(ResizeContext);
  const { getComponent } = useContext(TableContext);
  const { flattenColumns } = useContext(BodyContext);

  const flattenData: { record: RecordType; indent: number; index: number }[] =
    useFlattenRecords<RecordType>(
      data,
      childrenColumnName,
      expandedKeys,
      getRowKey
    );

  // =================== Performance ====================
  const perfRef = useRef<PerfRecord>({
    renderWithProps: false,
  });

  // ====================== Hover =======================
  const [startRow, setStartRow] = useState(-1);
  const [endRow, setEndRow] = useState(-1);

  const onHover = useCallback((start: number, end: number) => {
    setStartRow(start);
    setEndRow(end);
  }, []);

  const hoverContext = useMemo(
    () => ({ startRow, endRow, onHover }),
    [onHover, startRow, endRow]
  );

  // ====================== Render ======================
  const bodyNode = useMemo(() => {
    const WrapperComponent = getComponent(['body', 'wrapper'], 'tbody');
    const trComponent = getComponent(['body', 'row'], 'tr');
    const tdComponent = getComponent(['body', 'cell'], 'td');

    let rows: React.ReactNode;
    if (data.length) {
      rows = flattenData.map((item, idx) => {
        const { record, indent, index: renderIndex } = item;

        const key = getRowKey(record, idx);

        return (
          <BodyRow
            key={key}
            rowKey={key}
            record={record}
            recordKey={key}
            index={idx}
            renderIndex={renderIndex}
            rowComponent={trComponent}
            cellComponent={tdComponent}
            expandedKeys={expandedKeys}
            onRow={onRow}
            getRowKey={getRowKey}
            rowExpandable={rowExpandable}
            rowExpandDisabled={rowExpandDisabled}
            childrenColumnName={childrenColumnName}
            indent={indent}
            onRowHoverEnter={onRowHoverEnter}
            onRowHoverLeave={onRowHoverLeave}
          />
        );
      });
    } else {
      rows = (
        <ExpandedRow
          expanded
          classNames={styles.tablePlaceholder}
          component={trComponent}
          cellComponent={tdComponent}
          colSpan={flattenColumns.length}
          isEmpty
        >
          {emptyNode}
        </ExpandedRow>
      );
    }

    const columnsKey = getColumnsKey(flattenColumns);

    return (
      <WrapperComponent className={'table-tbody'}>
        {/* Measure body column width with additional hidden col */}
        {measureColumnWidth && (
          <MeasureRow columnsKey={columnsKey} onColumnResize={onColumnResize} />
        )}

        {rows}
      </WrapperComponent>
    );
  }, [
    data,
    onRow,
    measureColumnWidth,
    expandedKeys,
    getRowKey,
    getComponent,
    emptyNode,
    flattenColumns,
    childrenColumnName,
    onColumnResize,
    rowExpandable,
    rowExpandDisabled,
    flattenData,
  ]);

  return (
    <PerfContext.Provider value={perfRef.current}>
      <HoverContext.Provider value={hoverContext}>
        {bodyNode}
      </HoverContext.Provider>
    </PerfContext.Provider>
  );
}

const MemoBody = memo(Body);
MemoBody.displayName = 'Body';

export default MemoBody;
