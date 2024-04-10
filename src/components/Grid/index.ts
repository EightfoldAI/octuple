'use client';

import { Col } from './Col';
import { useBreakpoint as useInternalBreakpoint } from '../../hooks/useBreakpoint';
import { Row } from './Row';

function useBreakpoint() {
  return useInternalBreakpoint();
}

export { ColProps, ColSize, RowProps } from './Grid.types';

export { Row, Col };

export default { useBreakpoint };
