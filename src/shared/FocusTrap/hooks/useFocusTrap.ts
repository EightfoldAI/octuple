// Based on https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
import { useRef, useEffect } from 'react';
import { eventKeys } from '../../utilities/eventKeys';

const SELECTORS =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), iframe, object, embed';

const INITIAL_FOCUS_DELAY = 100;

export function useFocusTrap(
  visible = true
): React.MutableRefObject<HTMLDivElement> {
  const elRef = useRef<any>(null);
  const restoreFocusRef = useRef<any>(null);

  const getFocusableElements = () => {
    return [...elRef.current.querySelectorAll(SELECTORS)].filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    );
  };

  const handleFocus = (e: React.KeyboardEvent) => {
    const isTabPressed = e.key === eventKeys.TAB;
    const isShiftPressed = e.key === eventKeys.SHIFTLEFT;

    const focusableEls = getFocusableElements();

    if (!isTabPressed || !focusableEls.length) {
      return;
    }

    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    if (isShiftPressed) {
      if (document.activeElement === firstFocusableEl) {
        /* shift + tab */
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      /* tab */
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  };

  const setUpFocus = () => {
    if (!elRef.current) {
      return;
    }
    restoreFocusRef.current = document.activeElement;
    const elementToFocus = getFocusableElements()?.[0];
    setTimeout(() => {
      elementToFocus?.focus();
    }, INITIAL_FOCUS_DELAY);
  };

  useEffect(() => {
    if (visible) {
      setUpFocus();
      elRef.current?.addEventListener('keydown', handleFocus);
    }
    return () => {
      restoreFocusRef.current?.focus();
      elRef.current?.removeEventListener('keydown', handleFocus);
    };
  }, [visible]);

  return elRef;
}
