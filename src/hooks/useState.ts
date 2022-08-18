import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

declare type Updater<T> = T | ((prevValue: T) => T);

export declare type SetState<T> = (
    nextValue: Updater<T>,
    /**
     * Will not update state when destroyed.
     * Developer should make sure this is safe to ignore.
     */
    ignoreDestroy?: boolean
) => void;

/**
 * Same as React.useState but `setState` accept `ignoreDestroy` param to not to setState after destroyed.
 * We do not make this auto is to avoid a real memory leak.
 * Developer should confirm it's safe to ignore themselves.
 */
export const useSafeState = <T>(
    defaultValue?: T | (() => T)
): [T, SetState<T>] => {
    const destroyRef: React.MutableRefObject<boolean> = React.useRef(false);
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        destroyRef.current = false;

        return () => {
            destroyRef.current = true;
        };
    }, []);

    const safeSetState = (
        updater: Updater<T>,
        ignoreDestroy?: boolean
    ): void => {
        if (ignoreDestroy && destroyRef.current) {
            return;
        }

        setValue(updater);
    };

    return [value, safeSetState];
};

export const useRefState = <T>(defaultValue: T): [T, SetState<T>] => {
    const [state, setState] = useState<T>(defaultValue);
    const stateRef = useRef<T>(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [stateRef.current, setState];
};
