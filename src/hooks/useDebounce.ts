import { useEffect, useRef } from 'react';

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
  // The timer lives in a ref so it outlives re-renders: calls made across renders cancel each
  // other and only the last one fires, with the `fn` from the render that made it.
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (args: A): Promise<R> =>
    new Promise((resolve) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => resolve(fn(args)), ms);
    });
};
