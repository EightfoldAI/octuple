const now = +new Date();

/**
 * Generates a simple unique id to be used by Upload class component
 * @param prefix The sting prefix
 */
export const uniqueId = ((): ((prefix: string) => string) => {
  let counter: number = 0;
  return (prefix: string): string => `${prefix}${++counter}`;
})();

export const uid = (): string => {
  return uniqueId(`upload-${now}`);
};
