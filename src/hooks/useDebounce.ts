import { useEffect, useMemo, useRef } from 'react';
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
  // The debouncer must survive re-renders: a new one per render owns a new timer, so calls made
  // across renders never cancel each other and every call fires `ms` later instead of once.
  // The latest `fn` is read through a ref so the stable debouncer never calls a stale closure.
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const [debouncedFun, teardown] = useMemo(
    () => debounce<A, R>((args: A) => fnRef.current(args), ms),
    [ms]
  );

  useEffect(() => teardown, [teardown]);

  return debouncedFun;
};
