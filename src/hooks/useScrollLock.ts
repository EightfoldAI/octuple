'use client';

import React, { useCallback, useEffect, useRef } from 'react';

/**
 * Hook to lock scroll on the given element
 * @param element
 * @param shouldLock
 */
export const useScrollLock = (
  element: HTMLElement,
  shouldLock: boolean
): void => {
  let originalOverflow: React.MutableRefObject<string> = useRef<string>('');

  const lockScroll = useCallback(() => {
    originalOverflow.current = element.style.overflow;
    element.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    element.style.overflow = originalOverflow.current;
  }, []);

  useEffect(() => {
    if (shouldLock) {
      lockScroll();
    }
    return unlockScroll;
  }, [element, shouldLock]);
};
