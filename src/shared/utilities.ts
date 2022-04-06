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
 *  RGB object type with red, green and blue components (used by invertForegroundColor).
 */
type RGB = {
    r: number;
    g: number;
    b: number;
};
/**
 *  RGB list (array) type with red, green and blue components (used by invertForegroundColor).
 */
type RgbArray = [number, number, number];
/**
 *  Hexadecimal representation of a color (used by invertForegroundColor).
 */
type HexColor = string;
/**
 *  Color represented as hexadecimal value or as RGB object or list (used by invertForegroundColor).
 */
type Color = RGB | RgbArray | HexColor;
/**
 *  Interface for defining black and white colors; used to amplify the contrast
 *  of the color inversion (used by invertForegroundColor).
 */
interface BlackWhite {
    black: HexColor;
    white: HexColor;
    threshold?: number;
}

/**
 *  Constants used by invertForegroundColor.
 */
const DEFAULT_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;
const RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i;
const DEFAULT_BW: BlackWhite = {
    black: '#000000',
    white: '#ffffff',
    threshold: DEFAULT_THRESHOLD,
};

/**
 *  Helper methods used by invertForegroundColor.
 */
function getLuminance(c: RgbArray): number {
    let i, x;
    const a = []; // so we don't mutate
    for (i = 0; i < c.length; i++) {
        x = c[i] / 255;
        a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function hexToRgbArray(hex: string): RgbArray {
    if (hex.slice(0, 1) === '#') hex = hex.slice(1);
    if (!RE_HEX.test(hex)) throw new Error(`Invalid HEX color: "${hex}"`);
    // normalize / convert 3-chars hex to 6-chars.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [
        parseInt(hex.slice(0, 2), 16), // r
        parseInt(hex.slice(2, 4), 16), // g
        parseInt(hex.slice(4, 6), 16), // b
    ];
}

function toRgbArray(c: Color): RgbArray {
    if (!c) throw new Error('Invalid color value');
    if (Array.isArray(c)) return c as RgbArray;
    return typeof c === 'string' ? hexToRgbArray(c) : [c.r, c.g, c.b];
}

function invertToBW(color: RgbArray): HexColor {
    const options = DEFAULT_BW;
    return getLuminance(color) > options.threshold
        ? options.black
        : options.white;
}

/**
 *  Use only the needed code from https://github.com/onury/invert-color/blob/master/src/invert.ts
 *  Generates inverted (opposite) version of the given color.
 *  @param {Color} color - Color to be inverted.
 *  @returns {HexColor} - Hexadecimal representation of the inverted color.
 */
export function invertForegroundColor(color: Color): HexColor {
    color = toRgbArray(color);
    return invertToBW(color) as HexColor;
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
