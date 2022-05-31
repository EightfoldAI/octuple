import type * as React from 'react';
import useMemo from '../hooks/useMemo';

export function fillRef<T>(ref: React.Ref<T>, node: T) {
    if (typeof ref === 'function') {
        ref(node);
    } else if (typeof ref === 'object' && ref && 'current' in ref) {
        (ref as any).current = node;
    }
}

/**
 * Merge refs into one ref function to support ref passing.
 */
export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
    const refList = refs.filter((ref) => ref);
    if (refList.length <= 1) {
        return refList[0];
    }

    return (node: T) => {
        refs.forEach((ref) => {
            fillRef(ref, node);
        });
    };
}

export function useComposeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
    return useMemo(
        () => composeRef(...refs),
        refs,
        (prev, next) =>
            prev.length === next.length &&
            prev.every((ref, i) => ref === next[i])
    );
}
