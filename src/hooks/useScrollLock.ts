import React, { useCallback, useEffect, useRef } from 'react';

/**
 * Hook to lock scroll on the given element
 * @param element
 * @param shouldLock
 */
export const useScrollLock = (
  element: HTMLElement,
  shouldLock: boolean,
  direction?: string
): void => {
  let originalOverflow: React.MutableRefObject<string> = useRef<string>('');
  let originalPaddingLeft: React.MutableRefObject<string> = useRef<string>('');
  let originalPaddingRight: React.MutableRefObject<string> = useRef<string>('');

  const getScrollbarWidth = (): number => {
    const outer: HTMLDivElement = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';

    document.body.appendChild(outer);

    const widthNoScroll: number = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    const inner: HTMLDivElement = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll: number = inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  };

  const lockScroll = useCallback(() => {
    originalOverflow.current = element.style.overflow;
    element.style.overflow = 'hidden';

    if (direction) {
      if (direction === 'rtl') {
        originalPaddingLeft.current = element.style.paddingLeft;
        element.style.paddingLeft = `${getScrollbarWidth()}px`;
      } else {
        originalPaddingRight.current = element.style.paddingRight;
        element.style.paddingRight = `${getScrollbarWidth()}px`;
      }
    }
  }, [direction]);

  const unlockScroll = useCallback(() => {
    element.style.overflow = originalOverflow.current;

    if (direction) {
      if (direction === 'rtl') {
        element.style.paddingLeft = originalPaddingLeft.current;
      } else {
        element.style.paddingRight = originalPaddingRight.current;
      }
    }
  }, [direction]);

  useEffect(() => {
    if (shouldLock) {
      lockScroll();
    }
    return unlockScroll;
  }, [element, shouldLock, direction]);
};
