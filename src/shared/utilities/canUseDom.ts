/**
 * Utility to verify if the window object exists
 * @returns {boolean}
 */
export const canUseDom = (): boolean => {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
};
