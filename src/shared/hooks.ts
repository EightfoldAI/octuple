import React, { useState, useEffect } from 'react';
import { debounce } from './utilities';

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

/**
 *
 * @param fn Accepted argument and return, a function.
 * @param ms The delay time.
 * @returns a debounced function that resolves to a value after certain amount of time. Or never resolves if terminated.
 */
export const useDebounce = <A = unknown, R = void>(
    fn: (args: A) => R,
    ms: number
): ((args: A) => Promise<R>) => {
    const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

    useEffect(() => () => teardown(), []);

    return debouncedFun;
};
