import { Key, ReactNode } from 'react';
import * as React from 'react';

export type ItemLayout = 'horizontal' | 'vertical';

export interface ListProps<T> {
    /**
     * Array off items
     */
    items: T[];
    /**
     * Render method for list item
     * @param item
     */
    renderItem: (item: T) => ReactNode;
    /**
     * Unique key for the item
     * @param item
     */
    rowKey?: (item: T) => Key | keyof T;
    /**
     * Custom class for the list container
     */
    className?: string;
    /**
     * Custom class for list item
     */
    itemClassName?: string;
    /**
     * Style of list container
     */
    style?: React.CSSProperties;
    /**
     * Style of the item
     */
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
    /**
     * @default ul
     */
    listType?: 'ul' | 'ol';
    /**
     * Role of the list
     */
    role?: string;
    /**
     * Role of the list item
     */
    itemRole?: string;
}
