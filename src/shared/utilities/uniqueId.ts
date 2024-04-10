import { useMemo } from 'react';

/**
 * Generates a simple unique id.
 * useMemo only executes on the client side,
 * so it should work with functional components and SSR.
 * TODO: Remove this once we upgrade to React 18 and replace all references with React's `useId()`.
 * @param prefix The string prefix
 */
export const uniqueId = ((): ((prefix: string) => string) => {
  let counter: number = 0;
  return (prefix: string): string =>
    useMemo(() => `${prefix}${++counter}`, [prefix]);
})();
