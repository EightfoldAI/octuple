'use client';

// Based on https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
import { useRef, useEffect } from 'react';
import { eventKeys } from '../../utilities/eventKeys';
import { canUseDocElement, focusable, SELECTORS } from '../../utilities';

const FOCUS_DELAY_INTERVAL: number = 100;

export function useFocusTrap(
  visible: boolean = true,
  firstFocusableSelector?: string,
  lastFocusableSelector?: string,
  skipFocusableSelectorsFromIndex?: number
): React.MutableRefObject<HTMLDivElement> {
  const elRef: React.MutableRefObject<any> = useRef<any>(null);
  const intervalRef: React.MutableRefObject<NodeJS.Timer> =
    useRef<NodeJS.Timer>(null);
  const restoreFocusRef: React.MutableRefObject<any> = useRef<any>(null);

  const getFocusableElements = (): HTMLElement[] => {
    return [...elRef.current.querySelectorAll(SELECTORS)].filter(
      (el: HTMLElement) => focusable(el)
    );
  };

  const handleFocus = (e: React.KeyboardEvent): void => {
    const isTabPressed: boolean = e?.key === eventKeys.TAB;
    const isShiftPressed: boolean = e?.key === eventKeys.TAB && e?.shiftKey;

    const focusableEls: HTMLElement[] = getFocusableElements?.();

    if (!isTabPressed || !focusableEls?.length) {
      return;
    }

    if (lastFocusableSelector) {
      focusableEls.push(elRef.current?.querySelector(lastFocusableSelector));
    }

    const firstFocusableEl: HTMLElement = focusableEls[0];
    const lastFocusableEl: HTMLElement =
      focusableEls[
        skipFocusableSelectorsFromIndex
          ? focusableEls.length - skipFocusableSelectorsFromIndex
          : focusableEls.length - 1
      ];

    if (canUseDocElement()) {
      if (isShiftPressed) {
        if (document.activeElement === firstFocusableEl) {
          /* shift + tab */
          lastFocusableEl?.focus();
          e?.preventDefault();
        }
      } else {
        /* tab */
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl?.focus();
          e?.preventDefault();
        }
      }
    }
  };

  const setUpFocus = (): void => {
    if (!elRef.current || !canUseDocElement()) {
      return;
    }
    restoreFocusRef.current = document.activeElement;
    let elementToFocus: HTMLElement = getFocusableElements()?.[0];
    if (firstFocusableSelector) {
      elementToFocus = elRef.current?.querySelector(firstFocusableSelector);
    }
    clearInterval(intervalRef?.current);
    intervalRef.current = setInterval((): void => {
      elementToFocus?.focus();
      if (document.activeElement === elementToFocus) {
        clearInterval(intervalRef?.current);
      }
    }, FOCUS_DELAY_INTERVAL);
  };

  useEffect(() => {
    if (visible) {
      setUpFocus();
      elRef.current?.addEventListener('keydown', handleFocus);
    }
    return () => {
      restoreFocusRef.current?.focus();
      elRef.current?.removeEventListener('keydown', handleFocus);
      clearInterval(intervalRef?.current);
    };
  }, [visible]);

  return elRef;
}
