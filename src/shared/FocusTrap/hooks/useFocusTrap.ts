// Based on https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
import { useRef, useEffect } from 'react';
import { eventKeys } from '../../utilities/eventKeys';

const SELECTORS =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), iframe, object, embed';

const FOCUS_DELAY_INTERVAL: number = 100;

export function useFocusTrap(
  visible = true
): React.MutableRefObject<HTMLDivElement> {
  const elRef: React.MutableRefObject<any> = useRef<any>(null);
  const intervalRef: React.MutableRefObject<NodeJS.Timer> =
    useRef<NodeJS.Timer>(null);
  const restoreFocusRef: React.MutableRefObject<any> = useRef<any>(null);

  const getFocusableElements = (): HTMLElement[] => {
    return [...elRef.current.querySelectorAll(SELECTORS)].filter(
      (el: HTMLElement) =>
        !el?.hasAttribute('disabled') && !el?.getAttribute('aria-hidden')
    );
  };

  const handleFocus = (e: React.KeyboardEvent): void => {
    const isTabPressed: boolean = e?.key === eventKeys.TAB;
    const isShiftPressed: boolean = e?.key === eventKeys.TAB && e?.shiftKey;

    const focusableEls: HTMLElement[] = getFocusableElements?.();

    if (!isTabPressed || !focusableEls?.length) {
      return;
    }

    const firstFocusableEl: HTMLElement = focusableEls[0];
    const lastFocusableEl: HTMLElement = focusableEls[focusableEls.length - 1];

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
  };

  const setUpFocus = (): void => {
    if (!elRef.current) {
      return;
    }
    restoreFocusRef.current = document.activeElement;
    const elementToFocus: HTMLElement = getFocusableElements()?.[0];
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
