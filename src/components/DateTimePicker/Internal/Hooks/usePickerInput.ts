import type * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  canUseDocElement,
  canUseDom,
  eventKeys,
  requestAnimationFrameWrapper,
} from '../../../../shared/utilities';
import { addGlobalMouseDownEvent, getTargetFromEvent } from '../Utils/uiUtil';

export default function usePickerInput({
  trapFocus,
  open,
  value,
  isClickOutside,
  triggerOpen,
  forwardKeyDown,
  onKeyDown,
  blurToCancel,
  onSubmit,
  onCancel,
  onFocus,
  onBlur,
  changeOnBlur,
  closedByEscRef,
}: {
  trapFocus?: boolean;
  open: boolean;
  value: string;
  isClickOutside: (clickElement: EventTarget | null) => boolean;
  triggerOpen: (open: boolean) => void;
  forwardKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => boolean;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    preventDefault: () => void
  ) => void;
  blurToCancel?: boolean;
  onSubmit: () => void | boolean;
  onCancel: () => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  changeOnBlur?: boolean;
  closedByEscRef?: React.MutableRefObject<boolean>;
}): [
  React.DOMAttributes<HTMLInputElement>,
  {
    focused: boolean;
    typing: boolean;
    trap: boolean;
    setTrap: (value: boolean) => void;
  }
] {
  const [typing, setTyping] = useState(false);
  const [focused, setFocused] = useState(false);
  const [trap, setTrap] = useState(false);

  const isTrapEnabled = trapFocus && trap;

  /**
   * Prevent blur to handle open event when user click outside,
   * since this will repeat trigger `onOpenChange` event.
   */
  const preventBlurRef: React.MutableRefObject<boolean> =
    useRef<boolean>(false);

  const valueChangedRef: React.MutableRefObject<boolean> =
    useRef<boolean>(false);

  const preventDefaultRef: React.MutableRefObject<boolean> =
    useRef<boolean>(false);

  const updateFocusTrap = (value: boolean) => {
    if (!trapFocus) {
      return;
    }
    setTrap(value);
  };

  const inputProps: React.DOMAttributes<HTMLInputElement> = {
    onMouseDown: () => {
      setTyping(true);
      triggerOpen(true);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>): void => {
      const preventDefault = (): void => {
        preventDefaultRef.current = true;
      };

      onKeyDown(e, preventDefault);

      if (preventDefaultRef.current) return;

      switch (e?.key) {
        case eventKeys.ENTER: {
          if (!open) {
            triggerOpen(true);
          } else if (onSubmit() !== false) {
            setTyping(true);
          }

          e.preventDefault();
          return;
        }

        case eventKeys.TAB: {
          if (typing && open && !e.shiftKey) {
            setTyping(false);
            updateFocusTrap(true);
            e.preventDefault();
          } else if (!typing && open) {
            if (!forwardKeyDown(e) && e.shiftKey) {
              setTyping(true);
              e.preventDefault();
            }
          }
          return;
        }

        case eventKeys.ESCAPE: {
          if (closedByEscRef) {
            closedByEscRef.current = true;
          }
          updateFocusTrap(false);
          setTyping(true);
          triggerOpen(false);
          return;
        }
      }

      if (!open && ![eventKeys.SHIFTLEFT].includes(e.key)) {
        requestAnimationFrameWrapper(() => {
          triggerOpen(true);
        });
      } else if (!typing) {
        // Let popup partial handle keyboard
        forwardKeyDown(e);
      }
    },

    onFocus: (e: React.FocusEvent<HTMLInputElement, Element>): void => {
      setTyping(true);
      setFocused(true);
      updateFocusTrap(false);

      if (onFocus) {
        onFocus(e);
      }
    },

    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>): void => {
      if (
        isTrapEnabled ||
        preventBlurRef.current ||
        (canUseDocElement() && !isClickOutside(document.activeElement))
      ) {
        preventBlurRef.current = false;
        return;
      }

      if (blurToCancel) {
        setTimeout(() => {
          if (canUseDocElement()) {
            let { activeElement } = document;
            while (activeElement && activeElement.shadowRoot) {
              activeElement = activeElement.shadowRoot.activeElement;
            }

            if (isClickOutside(activeElement)) {
              onCancel();
            }
          }
        }, 0);
      } else if (open) {
        triggerOpen(false);

        if (valueChangedRef.current) {
          onSubmit();
        }
      }
      setFocused(false);

      if (onBlur) {
        onBlur(e);
      }
    },
  };

  // check if value changed
  useEffect((): void => {
    valueChangedRef.current = false;
  }, [open]);

  useEffect((): void => {
    valueChangedRef.current = true;
  }, [value]);

  // Global click handler
  useEffect((): (() => void) =>
    addGlobalMouseDownEvent((e: MouseEvent): void => {
      const target: HTMLElement = getTargetFromEvent(e);

      if (open) {
        const clickedOutside: boolean = isClickOutside(target);

        if (!clickedOutside) {
          preventBlurRef.current = true;

          // Always set back in case `onBlur` prevented by user
          requestAnimationFrameWrapper(() => {
            preventBlurRef.current = false;
          });
        } else if (!changeOnBlur && (!focused || clickedOutside)) {
          triggerOpen(false);
        } else if (isTrapEnabled && clickedOutside) {
          updateFocusTrap(false);
          triggerOpen(false);
        }
      }
    })
  );

  return [inputProps, { focused, typing, trap, setTrap: updateFocusTrap }];
}
