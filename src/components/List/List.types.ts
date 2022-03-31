import { Key, ReactNode } from 'react';
import * as React from 'react';

export type ItemLayout = 'horizontal' | 'vertical';

export interface ListProps<T> {
    /**
     * Array off items
     */
    items: T[];
    renderItem: (item: T) => ReactNode;
    rowKey?: (item: T) => Key | keyof T;
    className?: string;
    itemClassName?: string;
    style?: React.CSSProperties;
    itemStyle?: React.CSSProperties;
    /**
     * List header renderer
     */
    header?: ReactNode;
    /**
     * List footer renderer
     */
    footer?: ReactNode;
    /**
     * @default vertical
     */
    layout?: ItemLayout;
}
