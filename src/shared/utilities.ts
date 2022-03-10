type Value = string | number | boolean | undefined | null;
type Mapping = Record<string, unknown>;
interface ArgumentArray extends Array<Argument> {}
type Argument = Value | Mapping | ArgumentArray;

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