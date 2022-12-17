import React, { useEffect, useRef } from 'react';
import { ResizeObserver } from '../../../../shared/ResizeObserver/ResizeObserver';
import { MeasureCellProps } from './Body.types';

export default function MeasureCell({
  columnKey,
  onColumnResize,
}: MeasureCellProps) {
  const cellRef = useRef<HTMLTableCellElement>();

  useEffect(() => {
    if (cellRef.current) {
      onColumnResize(columnKey, cellRef.current.offsetWidth);
    }
  }, []);

  return (
    <ResizeObserver data={columnKey}>
      <td ref={cellRef} style={{ padding: 0, border: 0, height: 0 }}>
        <div style={{ height: 0, overflow: 'hidden' }}>&nbsp;</div>
      </td>
    </ResizeObserver>
  );
}
