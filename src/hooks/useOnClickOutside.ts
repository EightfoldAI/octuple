'use client';

import { RefObject, useCallback, useEffect } from 'react';
import { canUseDocElement } from '../shared/utilities';

/**
 * Helper hook for detecting clicks outside the ref element
 * @param ref The ref of the element we want to detect outside clicks on
 * @param handler Callback fired when an outside click is detected
 * @param visible Only activate on click listeners if the element is visible
 */
export const useOnClickOutside = (
  ref: RefObject<any>,
  handler: (event: MouseEvent) => void,
  visible: boolean = true
): void => {
  const listener: (event: MouseEvent) => void = useCallback(
    (event: MouseEvent): void => {
      if (ref?.current?.contains(event.target)) {
        return;
      }
      handler(event);
    },
    []
  );

  const removeEventListeners = (): void => {
    if (canUseDocElement()) {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    }
  };

  const addEventListeners = (): void => {
    if (canUseDocElement()) {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    }
  };

  useEffect(() => {
    if (visible) {
      addEventListeners();
    } else {
      removeEventListeners();
    }
    return () => {
      removeEventListeners();
    };
  }, [ref, handler, visible]);
};
