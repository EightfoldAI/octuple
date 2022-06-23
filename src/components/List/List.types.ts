import { HTMLAttributes, Key, ReactNode } from 'react';
import * as React from 'react';
import { OcBaseProps } from '../OcBase';

export type ItemLayout = 'horizontal' | 'vertical';

export interface ListItemProps<T>
    extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
    onClick?: (item: T) => void;
}

export interface ListProps<T> extends OcBaseProps<HTMLDivElement> {
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
     * Custom classes for list item
     */
    itemClassNames?: string;
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
     * List item props
     */
    itemProps?: ListItemProps<T>;
}
