function cloneDeep(val: any): any {
    if (Array.isArray(val)) {
        return cloneArrayDeep(val);
    } else if (typeof val === 'object' && val !== null) {
        return cloneObjectDeep(val);
    }
    return val;
}

function cloneObjectDeep(val: { [x: string]: any }): {
    [x: string]: any;
} {
    if (Object.getPrototypeOf(val) === Object.prototype) {
        const res = {};
        for (const key in val) {
            (res as any)[key] = cloneDeep(val[key]);
        }
        return res;
    }
    return val;
}

function cloneArrayDeep(val: any[]): any[] {
    return val.map((item: any) => cloneDeep(item));
}

export default cloneDeep;
