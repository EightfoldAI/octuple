// Based on https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
import { useRef, useEffect } from 'react';

const KEYCODE_TAB = 9;

export function useFocusTrap(visible = true) {
    const elRef = useRef(null);
    const handleFocus = (e: KeyboardEvent) => {
        var focusableEls = elRef.current.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            ),
            firstFocusableEl = focusableEls[0],
            lastFocusableEl = focusableEls[focusableEls.length - 1];

        var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) {
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

    useEffect(() => {
        if (visible) {
            elRef.current?.addEventListener('keydown', handleFocus);
        }
        return () => {
            elRef.current?.removeEventListener('keydown', handleFocus);
        };
    }, [visible]);

    return elRef;
}
