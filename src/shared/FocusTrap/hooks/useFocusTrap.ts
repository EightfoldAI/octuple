// Based on https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
import { useRef, useEffect } from 'react';
import { eventKeys } from '../../utilities/eventKeys';

const SELECTORS =
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"], iframe, object, embed';

export function useFocusTrap(
    visible = true
): React.MutableRefObject<HTMLDivElement> {
    const elRef = useRef<any>(null);
    const handleFocus = (e: React.KeyboardEvent) => {
        const focusableEls = [
            ...elRef.current.querySelectorAll(SELECTORS),
        ].filter(
            (el) =>
                !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
        );

        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];

        const isTabPressed = e.key === eventKeys.TAB;
        const isShiftPressed = e.key === eventKeys.SHIFTLEFT;

        if (!isTabPressed) {
            return;
        }

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
