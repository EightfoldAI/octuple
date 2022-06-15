/**
 * Get unique id
 */
export const generateId = (prefix?: string) => {
    return `${prefix ?? ''}${Math.random().toString(36).substring(2, 9)}`;
};
