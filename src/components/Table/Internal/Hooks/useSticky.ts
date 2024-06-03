import { useMemo } from 'react';
import { canUseDom } from '../../../../shared/utilities';
import type { TableSticky } from '../OcTable.types';

import styles from '../octable.module.scss';

// fix ssr render
const defaultContainer: Window & typeof globalThis = canUseDom()
  ? window
  : null;

/** Sticky header hooks */
export default function useSticky(sticky: boolean | TableSticky): {
  isSticky: boolean;
  offsetHeader: number;
  offsetSummary: number;
  offsetScroll: number;
  stickyClassName: string;
  container: Window | HTMLElement;
} {
  const {
    offsetHeader = 0,
    offsetSummary = 0,
    offsetScroll = 0,
    getContainer = () => defaultContainer,
  } = typeof sticky === 'object' ? sticky : {};

  const container = getContainer() || defaultContainer;

  return useMemo(() => {
    const isSticky = !!sticky;
    return {
      isSticky,
      stickyClassName: isSticky ? styles.tableStickyHolder : '',
      offsetHeader,
      offsetSummary,
      offsetScroll,
      container,
    };
  }, [offsetScroll, offsetHeader, offsetSummary, container]);
}
