import React from 'react';

/**
 *  Value represented as a generic (used by classNames).
 */
type Value = string | number | boolean | undefined | null;
/**
 *  Mapping that constructs a type with a set of properties K of type T (used by classNames).
 */
type Mapping = Record<string, unknown>;

/**
 *  ArgumentArray (used by classNames).
 */
interface ArgumentArray extends Array<Argument> {}

/**
 *  Argument represented as a Value, Mapping or ArgumentArray (used by classNames).
 */
type Argument = Value | Mapping | ArgumentArray;

/**
 *  Generates a string of class names.
 *  @param {ArgumentArray} args - ClassName input.
 *  @returns {string} - a concatenated string of class names.
 */
export function classNames(...args: ArgumentArray): string {
    const hasOwn: (v: PropertyKey) => boolean = {}.hasOwnProperty;
    let classes = [];
    for (let i: number = 0; i < args.length; i++) {
        const arg: any = args[i];
        if (!arg) continue;
        const argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                const inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (argType === 'object') {
            if (arg.toString === Object.prototype.toString) {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            } else {
                classes.push(arg.toString());
            }
        }
    }
    return classes.join(' ');
}

/**
 * https://dev.to/bwca/create-a-debounce-function-from-scratch-in-typescript-560m
 * @param fn Accepted argument and return, a function.
 * @param ms The delay time.
 * @returns a debounced function that resolves to a value after certain amount of time. Or never resolves if terminated.
 */
export function debounce<A = unknown, R = void>(
    fn: (args: A) => R,
    ms: number
): [(args: A) => Promise<R>, () => void] {
    let timer: NodeJS.Timeout;

    const debouncedFunc = (args: A): Promise<R> =>
        new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                resolve(fn(args));
            }, ms);
        });

    const teardown = () => clearTimeout(timer);

    return [debouncedFunc, teardown];
}

/**
 * Generates a simple unique id
 * @param prefix The sting prefix
 */
export const uniqueId = ((): ((prefix: string) => string) => {
    let counter: number = 0;
    return (prefix: string): string => `${prefix}${++counter}`;
})();

/**
 * Utility to verify if the window object exists
 * @returns {boolean}
 */
export const hasWindow = (): boolean => {
    return typeof window !== 'undefined';
};

/**
 * Helper method to stop propagation
 * @param e {React.MouseEvent}
 */
export const stopPropagation = (e: React.MouseEvent<any>) =>
    e.stopPropagation();
