import React, { useEffect, useRef } from 'react';

/**
 * Hook to lock scroll on the given element
 * @param element
 * @param shouldLock
 */
export const useScrollLock = (element: HTMLElement, shouldLock: boolean) => {
  let originalOverflow = useRef<string>('');

  const lockScroll = React.useCallback(() => {
    originalOverflow.current = element.style.overflow;
    element.style.overflow = 'hidden';
  }, []);

  const unlockScroll = React.useCallback(() => {
    element.style.overflow = originalOverflow.current;
  }, []);

  useEffect(() => {
    if (shouldLock) {
      lockScroll();
    }
    return unlockScroll;
  }, [element, shouldLock]);
};
