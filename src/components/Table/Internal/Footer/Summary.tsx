import type * as React from 'react';
import { SummaryProps } from './Footer.types';
import Cell from './Cell';
import Row from './Row';

/**
 * Syntactic sugar. Does not support HOC.
 */
function Summary({ children }: SummaryProps) {
  return children as React.ReactElement;
}

Summary.Row = Row;
Summary.Cell = Cell;

export default Summary;
