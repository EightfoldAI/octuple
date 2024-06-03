import { ArgumentArray } from './utilities.types';

/**
 *  Generates a string of class names.
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
