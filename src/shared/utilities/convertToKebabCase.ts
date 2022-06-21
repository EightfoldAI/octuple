/**
 * Helper method to convert camel case
 * to kebab case
 * @param str
 */
export const convertToKebabCase = (str: string): string =>
    str.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
    );
