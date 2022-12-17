import { useEffect, useState } from 'react';

// A TypeScript + React Hooks version of: https://github.com/WICG/focus-visible

export const useFocusVisible = (): boolean => {
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState<boolean>(false);

  useEffect(() => {
    const onPointerDown = (): void => {
      setHadKeyboardEvent(false);
    };

    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     * @param {Event} _e
     */
    const onInitialPointerMove = (_e: Event): void => {
      const { nodeName } = _e.target as HTMLElement;

      // Work around a Safari quirk that fires a mousemove on <html> whenever the
      // window blurs, even if you're tabbing out of the page.
      if (nodeName && nodeName.toLowerCase() === 'html') {
        return;
      }

      setHadKeyboardEvent(false);
      removeInitialPointerMoveListeners();
    };

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    const addInitialPointerMoveListeners = (): void => {
      document?.addEventListener('mousemove', onInitialPointerMove);
      document?.addEventListener('mousedown', onInitialPointerMove);
      document?.addEventListener('mouseup', onInitialPointerMove);
      document?.addEventListener('pointermove', onInitialPointerMove);
      document?.addEventListener('pointerdown', onInitialPointerMove);
      document?.addEventListener('pointerup', onInitialPointerMove);
      document?.addEventListener('touchmove', onInitialPointerMove);
      document?.addEventListener('touchstart', onInitialPointerMove);
      document?.addEventListener('touchend', onInitialPointerMove);
    };

    const removeInitialPointerMoveListeners = (): void => {
      document?.removeEventListener('mousemove', onInitialPointerMove);
      document?.removeEventListener('mousedown', onInitialPointerMove);
      document?.removeEventListener('mouseup', onInitialPointerMove);
      document?.removeEventListener('pointermove', onInitialPointerMove);
      document?.removeEventListener('pointerdown', onInitialPointerMove);
      document?.removeEventListener('pointerup', onInitialPointerMove);
      document?.removeEventListener('touchmove', onInitialPointerMove);
      document?.removeEventListener('touchstart', onInitialPointerMove);
      document?.removeEventListener('touchend', onInitialPointerMove);
    };

    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     * @param {KeyboardEvent} _e
     */
    const onKeyDown = (_e: KeyboardEvent): void => {
      if (_e.metaKey || _e.altKey || _e.ctrlKey) {
        return;
      }

      setHadKeyboardEvent(true);
    };
    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     * @param {Event} e
     */
    const onVisibilityChange = (_e: Event): void => {
      if (document?.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
        setHadKeyboardEvent(true);
        addInitialPointerMoveListeners();
      }
    };

    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document?.addEventListener('keydown', onKeyDown, true);
    document?.addEventListener('mousedown', onPointerDown, true);
    document?.addEventListener('pointerdown', onPointerDown, true);
    document?.addEventListener('touchstart', onPointerDown, true);
    document?.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    return () => {
      document?.removeEventListener('keydown', onKeyDown, true);
      document?.removeEventListener('mousedown', onPointerDown, true);
      document?.removeEventListener('pointerdown', onPointerDown, true);
      document?.removeEventListener('touchstart', onPointerDown, true);
      document?.removeEventListener(
        'visibilitychange',
        onVisibilityChange,
        true
      );

      removeInitialPointerMoveListeners();
    };
  }, [setHadKeyboardEvent]);

  return hadKeyboardEvent;
};
