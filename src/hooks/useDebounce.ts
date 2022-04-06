import { useEffect } from 'react';
import { debounce } from '../shared/utilities';

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
