import { useCallback, useEffect, useState } from 'react';

export enum Breakpoints {
    Large = '(min-width: 1200px)',
    Medium = '(min-width: 900px)',
    Small = '(min-width: 600px)',
    XSmall = '(min-width: 0)',
}

/**
 * A Hook to do CSS Media Queries in components.
 * @param breakpoint The mobile-first '(min-width: n)' threshold.
 * @returns a boolean determining if the threshold viewport size has been hit.
 */
export const useMatchMedia = (breakpoint: Breakpoints): boolean => {
    const [threshold, setThreshold] = useState<boolean>(
        window.matchMedia(breakpoint).matches
    );
    const handleMatchMedia = useCallback((e: MediaQueryListEvent) => {
        setThreshold(e.matches);
    }, []);
    useEffect((): void => {
        if (window.matchMedia(breakpoint)?.addEventListener) {
            window
                .matchMedia(breakpoint)
                .addEventListener('change', handleMatchMedia);
        } else {
            window.matchMedia(breakpoint).addListener(handleMatchMedia);
        }
        return window.matchMedia(breakpoint)?.removeEventListener
            ? window
                  .matchMedia(breakpoint)
                  .removeEventListener('change', handleMatchMedia)
            : window.matchMedia(breakpoint).removeListener(handleMatchMedia);
    }, [handleMatchMedia]);
    return threshold;
};
