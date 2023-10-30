import { HTMLAttributes, Key, ReactNode } from 'react';
import * as React from 'react';
import { OcBaseProps } from '../OcBase';

export type ItemLayout = 'horizontal' | 'vertical';

export interface ListItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {}

export interface ListProps<T> extends OcBaseProps<HTMLDivElement> {
  /**
   * Additonal item.
   */
  additionalItem?: T;
  /**
   * List footer renderer
   */
  footer?: ReactNode;
  /**
   * Get custom list item
   */
  getItem?: (item: T, index: number) => ReactNode;
  /**
   * List header renderer
   */
  header?: ReactNode;
  /**
   * Custom classes for the list item.
   */
  itemClassNames?: string;
  /**
   * List item props
   */
  itemProps?: ListItemProps;
  /**
   * Array of items
   */
  items: T[];
  /**
   * Style of the item
   */
  itemStyle?: React.CSSProperties;
  /**
   * The list layout direction
   * @default vertical
   */
  layout?: ItemLayout;
  /**
   * Custom classes for the list
   */
  listClassNames?: string;
  /**
   * The list html type
   * @default ul
   */
  listType?: 'ul' | 'ol';
  /**
   * Render method for list item
   * @param item
   */
  renderItem?: (item: T) => ReactNode;
  /**
   * Render method for additional list item
   * @param item
   */
  renderAdditionalItem?: (item: T) => ReactNode;
  /**
   * Role of the list
   */
  role?: string;
  /**
   * Unique key for the item
   * @param item
   */
  rowKey?: (item: T) => Key | keyof T;
}
