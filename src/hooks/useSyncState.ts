import React, { useRef } from 'react';
import { useForceUpdate } from './useForceUpdate';

type UseSyncStateProps<T> = [() => T, (newValue: T) => void];

export const useSyncState: <T>(initialValue: T) => UseSyncStateProps<T> = <T>(
    initialValue: T
): UseSyncStateProps<T> => {
    const ref: React.MutableRefObject<T> = useRef<T>(initialValue);
    const forceUpdate: React.DispatchWithoutAction = useForceUpdate();

    return [
        () => ref.current,
        (newValue: T) => {
            ref.current = newValue;
            forceUpdate();
        },
    ];
};
