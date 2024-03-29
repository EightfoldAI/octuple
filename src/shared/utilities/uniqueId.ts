import { useMemo } from 'react';
/**
 * Generates a simple unique id
 * @param prefix The sting prefix
 */
export const uniqueId = ((): ((prefix: string) => string) => {
  let counter: number = 0;
  return (prefix: string): string =>
    useMemo(() => `${prefix}${++counter}`, [prefix]);
})();
