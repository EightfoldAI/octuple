const now = +new Date();

/**
 * Generates a simple unique id to be used by Upload class component
 * Because AjaxUploader is currently a class component, we can't use hooks.
 * However, it should work with functional components and SSR.
 * TODO: Remove this once we upgrade to React 18 and replace all references with React's `useId()`.
 * @param prefix The string prefix
 */
export const uniqueId = ((): ((prefix: string) => string) => {
  let counter: number = 0;
  return (prefix: string): string => `${prefix}${++counter}`;
})();

export const uid = (): string => {
  return uniqueId(`upload-${now}`);
};
