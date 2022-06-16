import React, { createContext, useCallback, useContext, useRef } from 'react';
import type { SizeInfo } from './ResizeObserver';

type onCollectionResize = (
    size: SizeInfo,
    element: HTMLElement,
    data: any
) => void;

export const CollectionContext: React.Context<onCollectionResize> =
    createContext<onCollectionResize>(null);

export interface ResizeInfo {
    size: SizeInfo;
    data: any;
    element: HTMLElement;
}

export interface CollectionProps {
    /** Trigger when some children ResizeObserver changed. Collect by frame render level */
    onBatchResize?: (resizeInfo: ResizeInfo[]) => void;
    children?: React.ReactNode;
}

/**
 * Collect all the resize event from children ResizeObserver
 */
export const Collection = ({
    children,
    onBatchResize,
}: CollectionProps): JSX.Element => {
    const resizeIdRef: React.MutableRefObject<number> = useRef(0);
    const resizeInfosRef: React.MutableRefObject<ResizeInfo[]> = useRef<
        ResizeInfo[]
    >([]);

    const onCollectionResize: onCollectionResize =
        useContext(CollectionContext);

    const onResize: onCollectionResize = useCallback<onCollectionResize>(
        (size, element, data) => {
            resizeIdRef.current += 1;
            const currentId: number = resizeIdRef.current;

            resizeInfosRef.current.push({
                size,
                element,
                data,
            });

            Promise.resolve().then(() => {
                if (currentId === resizeIdRef.current) {
                    onBatchResize?.(resizeInfosRef.current);
                    resizeInfosRef.current = [];
                }
            });

            // Continue bubbling if parent exist
            onCollectionResize?.(size, element, data);
        },
        [onBatchResize, onCollectionResize]
    );

    return (
        <CollectionContext.Provider value={onResize}>
            {children}
        </CollectionContext.Provider>
    );
};
