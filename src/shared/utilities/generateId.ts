/**
 * Get unique id
 */
export const generateId = ((): ((prefix?: string) => string) => {
    return (prefix?: string): string =>
        `${prefix}${Math.random().toString(36).substring(2, 9)}`;
})();
