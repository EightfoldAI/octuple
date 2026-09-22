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

    const focusIsAlreadyInside: boolean = elRef.current.contains(
      document.activeElement
    );

    // Only capture a restore target when focus is truly outside the trap -- if it's
    // already inside, there's no prior external focus state worth restoring on close,
    // and a stale target from an earlier activation must be cleared so close doesn't
    // yank focus to it.
    if (!focusIsAlreadyInside) {
      restoreFocusRef.current = document.activeElement;
    } else {
      restoreFocusRef.current = null;
    }

    let elementToFocus: HTMLElement = getFocusableElements()?.[0];
    if (firstFocusableSelector) {
      elementToFocus = elRef.current?.querySelector(firstFocusableSelector);
    }

    // If focus is already inside the trap and either no specific target was
    // requested, or it's already on the resolved target -- respect it instead of
    // redirecting.
    if (
      focusIsAlreadyInside &&
      (!firstFocusableSelector || document.activeElement === elementToFocus)
    ) {
      return;
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
    // Only register a cleanup when this effect instance actually activated the
    // trap -- otherwise a run with `visible` false still tears down as though it
    // had, restoring focus and clearing the interval for an activation that
    // isn't its own (and racing a subsequent activation's own setup).
    if (!visible) {
      return undefined;
    }
    setUpFocus();
    elRef.current?.addEventListener('keydown', handleFocus);
    return () => {
      restoreFocusRef.current?.focus();
      elRef.current?.removeEventListener('keydown', handleFocus);
      clearInterval(intervalRef?.current);
    };
  }, [visible]);

  return elRef;
}
