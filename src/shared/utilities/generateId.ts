/**
 * Generates a simple unique id.
 * Because this helper is currently used by other helpers, we can't use hooks.
 * However, it should work with functional components and SSR.
 * TODO: Remove this once we upgrade to React 18 and replace all references with React's `useId()`.
 * @param prefix The string prefix
 */
export const generateId = (prefix?: string) => {
  return `${prefix ?? ''}${Math.random().toString(36).substring(2, 9)}`;
};
