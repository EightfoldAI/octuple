import React from 'react';
import ReactDOM from 'react-dom';

let cached: number;

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
 *  Utility that generates a string of class names.
 *  @param {ArgumentArray} args - ClassName input.
 *  @returns {string} - a concatenated string of class names.
 */
export function mergeClasses(...args: ArgumentArray): string {
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
                const inner = mergeClasses.apply(null, arg);
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
 * Utility that debouces a function.
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
 * Utility that Generates a simple unique id
 * @param prefix The sting prefix
 */
export const uniqueId = ((): ((prefix: string) => string) => {
    let counter: number = 0;
    return (prefix: string): string => `${prefix}${++counter}`;
})();

/**
 * Utility to verify if the DOM exists
 * @returns {boolean}
 */
export const canUseDom = (): boolean => {
    return !!(
        typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement
    );
};

/**
 * Utility that stops propagation on MouseEvent
 * @param e {React.MouseEvent}
 */
export const stopPropagation = (e: React.MouseEvent<any>) =>
    e.stopPropagation();

/**
 * Get unique id
 */
export const generateId = ((): ((prefix?: string) => string) => {
    return (prefix?: string): string =>
        `${prefix}${Math.random().toString(36).substring(2, 9)}`;
})();

/**
 * Utility to determine the visibility of an element.
 * @param element - The element to check isVisible.
 * @returns {boolean}
 */
export const isVisible = (
    element: HTMLElement | SVGGraphicsElement
): boolean => {
    if (!element) {
        return false;
    }

    if ((element as HTMLElement).offsetParent) {
        return true;
    }

    if ((element as SVGGraphicsElement).getBBox) {
        const box = (element as SVGGraphicsElement).getBBox();
        if (box.width || box.height) {
            return true;
        }
    }

    if ((element as HTMLElement).getBoundingClientRect) {
        const box = (element as HTMLElement).getBoundingClientRect();
        if (box.width || box.height) {
            return true;
        }
    }

    return false;
};

/**
 * Utility to determine if the browser supprts a given style name.
 * Takes a single styleName string or an array.
 * @param styleName the name of the style.
 * @returns {boolean}
 */
export const isStyleNameSupport = (styleName: string | string[]): boolean => {
    if (canUseDom() && window.document.documentElement) {
        const styleNameList = Array.isArray(styleName)
            ? styleName
            : [styleName];
        const { documentElement } = window.document;

        return styleNameList.some((name) => name in documentElement.style);
    }
    return false;
};

/**
 * Utility to determine if the browser supprts a given style value.
 * Takes a single styleName string.
 * @param styleName - the name of the style.
 * @param value - The value of the style
 * @returns {boolean}
 */
export const isStyleValueSupport = (styleName: string, value: any): boolean => {
    if (!isStyleNameSupport(styleName)) {
        return false;
    }

    const ele = document.createElement('div');
    const origin = (<any>ele.style)[styleName];
    (<any>ele.style)[styleName] = value;
    return (<any>ele.style)[styleName] !== origin;
};

/**
 * Utility to determine if the browser supprts a given style name and/or its value.
 * Takes a single styleName string or an array.
 * @param styleName - Name of the style.
 * @param styleValue - Value of the style.
 * @returns {boolean}
 */
export const isStyleSupport = (
    styleName: string | string[],
    styleValue?: any
): boolean => {
    if (!Array.isArray(styleName) && styleValue !== undefined) {
        return isStyleValueSupport(styleName, styleValue);
    }

    return isStyleNameSupport(styleName);
};

/**
 * Utility the gets the scroll bar size.
 * @param fresh - boolean to determine whether to get the size or use the cached size.
 * @returns {number}
 */
export const getScrollBarSize = (fresh?: boolean): number => {
    if (typeof document === 'undefined') {
        return 0;
    }

    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = '0';
        outerStyle.left = '0';
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
};

const ensureSize = (str: string): number => {
    const match = str.match(/^(.*)px$/);
    const value = Number(match?.[1]);
    return Number.isNaN(value) ? getScrollBarSize() : value;
};

/**
 * Utility that gets the scroll bar size of a given element.
 * @param target - the target element to get the scroll bar size.
 * @returns {number, number}
 */
export const getTargetScrollBarSize = (
    target: HTMLElement
): {
    width: number;
    height: number;
} => {
    if (
        typeof document === 'undefined' ||
        !target ||
        !(target instanceof Element)
    ) {
        return { width: 0, height: 0 };
    }

    const { width, height } = getComputedStyle(target, '::-webkit-scrollbar');
    return {
        width: ensureSize(width),
        height: ensureSize(height),
    };
};

/**
 * Utility that gets the offset position of a given node.
 * @param node - The node.
 * @returns The offset position of a given node.
 */
export const getOffset = (
    node: any
): {
    left: number;
    top: number;
} => {
    const box = node.getBoundingClientRect();
    const docElem: HTMLElement = document.documentElement;

    return {
        left:
            box.left +
            (window.pageXOffset || docElem.scrollLeft) -
            (docElem.clientLeft || document.body.clientLeft || 0),
        top:
            box.top +
            (window.pageYOffset || docElem.scrollTop) -
            (docElem.clientTop || document.body.clientTop || 0),
    };
};

/**
 *
 * @param node Utility to return if a node is a DOM node. Else will return by `findDOMNode`
 * @returns node
 */
export const findDOMNode = <T = Element | Text>(
    node: React.ReactInstance | HTMLElement
): T => {
    if (node instanceof HTMLElement) {
        return node as unknown as T;
    }
    return ReactDOM.findDOMNode(node) as unknown as T;
};
