/**
 * Utility to verify if the window object exists
 * @returns {boolean}
 */
export const hasWindow = (): boolean => {
    return typeof window !== 'undefined';
};
