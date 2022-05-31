import React from 'react';
import toArray from '../toArray';
import SingleObserver from './SingleObserver';
import { Collection } from './Collection';

const INTERNAL_PREFIX_KEY = 'rc-observer-key';

export interface SizeInfo {
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
}

export type OnResize = (size: SizeInfo, element: HTMLElement) => void;

export interface ResizeObserverProps {
    /** Pass to ResizeObserver.Collection with additional data */
    data?: any;
    children:
        | React.ReactNode
        | ((ref: React.RefObject<any>) => React.ReactElement);
    disabled?: boolean;
    /** Trigger if element resized. Will always trigger when first time render. */
    onResize?: OnResize;
}

function ResizeObserver(props: ResizeObserverProps) {
    const { children } = props;
    const childNodes =
        typeof children === 'function' ? [children] : toArray(children);

    return childNodes.map((child: any, index: number) => {
        const key = child?.key || `${INTERNAL_PREFIX_KEY}-${index}`;
        return (
            <SingleObserver {...props} key={key}>
                {child}
            </SingleObserver>
        );
    }) as any as React.ReactElement;
}

ResizeObserver.Collection = Collection;

export default ResizeObserver;
