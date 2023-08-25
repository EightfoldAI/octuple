import type * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { eventKeys } from '../../../../shared/utilities';
import { addGlobalMouseDownEvent, getTargetFromEvent } from '../Utils/uiUtil';

export default function usePickerInput({
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
}: {
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
}): [
  React.DOMAttributes<HTMLInputElement>,
  { focused: boolean; typing: boolean }
] {
  const [typing, setTyping] = useState(false);
  const [focused, setFocused] = useState(false);

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
          setTyping(true);
          onCancel();
          return;
        }
      }

      if (!open && ![eventKeys.SHIFTLEFT].includes(e.key)) {
        triggerOpen(true);
      } else if (!typing) {
        // Let popup partial handle keyboard
        forwardKeyDown(e);
      }
    },

    onFocus: (e: React.FocusEvent<HTMLInputElement, Element>): void => {
      setTyping(true);
      setFocused(true);

      if (onFocus) {
        onFocus(e);
      }
    },

    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>): void => {
      if (preventBlurRef.current || !isClickOutside(document.activeElement)) {
        preventBlurRef.current = false;
        return;
      }

      if (blurToCancel) {
        setTimeout(() => {
          let { activeElement } = document;
          while (activeElement && activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }

          if (isClickOutside(activeElement)) {
            onCancel();
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
          requestAnimationFrame(() => {
            preventBlurRef.current = false;
          });
        } else if (!changeOnBlur && (!focused || clickedOutside)) {
          triggerOpen(false);
        }
      }
    })
  );

  return [inputProps, { focused, typing }];
}
