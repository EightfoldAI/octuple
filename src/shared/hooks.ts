import React, { useState, useEffect } from 'react';

export enum Breakpoints {
    Large = '(min-width: 1200px)',
    Medium = '(min-width: 900px)',
    Small = '(min-width: 600px)',
    XSmall = '(max-width: 599px)',
}

/**
 * A Hook to do CSS Media Queries in components.
 * @param breakpoint The mobile-first '(min-width: n)' threshold.
 * @returns a boolean determining if the threshold viewport size has been hit.
 */
export const useMatchMedia = (breakpoint: Breakpoints): boolean => {
    const [threshold, setThreshold]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ] = useState(window.matchMedia(breakpoint).matches);
    useEffect((): void => {
        window
            .matchMedia(breakpoint)
            .addEventListener('change', (e) => setThreshold(e.matches));
        return window
            .matchMedia(breakpoint)
            .removeEventListener('change', (e) => setThreshold(e.matches));
    }, []);
    return threshold;
};
