export const SELECTORS: string =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), iframe, object, embed';

export const NON_TABBABLE_SELECTORS: string = '[tabindex="-1"]';

export const focusable = (el: HTMLElement | null): boolean => {
  return (
    !el?.hasAttribute('data-disabled') && // optionally use a data attribute as a way to exclude certain elements without hiding them from screen readers to improve usability.
    !el?.hasAttribute('disabled') &&
    !el?.getAttribute('aria-hidden')
  );
};

// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

/**
 * https://stackoverflow.com/a/59187769 Extract the type of an element of an array/tuple without
 * performing indexing
 */
export type ElementOf<T> = T extends (infer E)[]
  ? E
  : T extends readonly (infer F)[]
  ? F
  : never;

/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends U, U> = T | (U & {});
