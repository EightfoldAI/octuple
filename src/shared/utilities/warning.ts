/* eslint-disable no-console */
let warned: Record<string, boolean> = {};

export const warning = (valid: boolean, message: string): void => {
    if (
        process.env.NODE_ENV !== 'production' &&
        !valid &&
        console !== undefined
    ) {
        console.warn(`Warning: ${message}`);
    }
};

export const note = (valid: boolean, message: string): void => {
    if (
        process.env.NODE_ENV !== 'production' &&
        !valid &&
        console !== undefined
    ) {
        console.info(`Note: ${message}`);
    }
};

export const resetWarned = (): void => {
    warned = {};
};

export const call = (
    method: (valid: boolean, message: string) => void,
    valid: boolean,
    message: string
): void => {
    if (!valid && !warned[message]) {
        method(false, message);
        warned[message] = true;
    }
};

export const warningOnce = (valid: boolean, message: string): void => {
    call(warning, valid, message);
};

export const noteOnce = (valid: boolean, message: string): void => {
    call(note, valid, message);
};

export default warningOnce;
/* eslint-enable */
