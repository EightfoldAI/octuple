import { RefObject, useEffect } from 'react';

/**
 * Helper hook for detecting clicks outside the ref element
 * @param ref The ref of the element we want to detect outside clicks on
 * @param handler Callback fired when an outside click is detected
 */
export const useOnClickOutside = (
    ref: RefObject<any>,
    handler: (event: MouseEvent) => void
): void => {
    useEffect(() => {
        const listener = (event: MouseEvent): void => {
            if (ref?.current?.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};
