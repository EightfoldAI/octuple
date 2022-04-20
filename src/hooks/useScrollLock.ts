import React from 'react';

/**
 * Hook to lock scroll on the given element
 * @param element
 */
export const useScrollLock = (element: HTMLElement) => {
    let originalOverflow: string;

    const lockScroll = React.useCallback(() => {
        originalOverflow = element.style.overflow;
        element.style.overflow = 'hidden';
    }, []);

    const unlockScroll = React.useCallback(() => {
        element.style.overflow = originalOverflow;
    }, []);

    return {
        lockScroll,
        unlockScroll,
    };
};
