import { useCallback, useEffect, useRef } from 'react';
import { useSafeState } from './useState';

/**
 * Similar to `useState` but will use props value if provided.
 * Note that internal use util `useState` hook.
 */
export const useMergedState: <T, R = T>(
    defaultStateValue: T | (() => T),
    option?: {
        defaultValue?: T | (() => T);
        value?: T;
        onChange?: (value: T, prevValue: T) => void;
        postState?: (value: T) => T;
    }
) => [R, (value: T, ignoreDestroy?: boolean) => void] = <T, R = T>(
    defaultStateValue: T | (() => T),
    option?: {
        defaultValue?: T | (() => T);
        value?: T;
        onChange?: (value: T, prevValue: T) => void;
        postState?: (value: T) => T;
    }
): [R, (value: T, ignoreDestroy?: boolean) => void] => {
    const { defaultValue, value, onChange, postState } = option || {};
    const [innerValue, setInnerValue] = useSafeState<T>(() => {
        if (value !== undefined) {
            return value;
        }
        if (defaultValue !== undefined) {
            return typeof defaultValue === 'function'
                ? (defaultValue as any)()
                : defaultValue;
        }
        return typeof defaultStateValue === 'function'
            ? (defaultStateValue as any)()
            : defaultStateValue;
    });

    let mergedValue: T = value !== undefined ? value : innerValue;
    if (postState) {
        mergedValue = postState(mergedValue);
    }

    // setState
    const onChangeRef: React.MutableRefObject<
        (value: T, prevValue: T) => void
    > = useRef(onChange);
    onChangeRef.current = onChange;

    const triggerChange: (newValue: T, ignoreDestroy?: boolean) => void =
        useCallback(
            (newValue: T, ignoreDestroy?: boolean) => {
                setInnerValue(newValue, ignoreDestroy);
                if (mergedValue !== newValue && onChangeRef.current) {
                    onChangeRef.current(newValue, mergedValue);
                }
            },
            [mergedValue, onChangeRef]
        );

    // Effect of reset value to `undefined`
    const prevValueRef: React.MutableRefObject<T> = useRef(value);
    useEffect(() => {
        if (value === undefined && value !== prevValueRef.current) {
            setInnerValue(value);
        }

        prevValueRef.current = value;
    }, [value]);

    return [mergedValue as unknown as R, triggerChange];
};
