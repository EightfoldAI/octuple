import { Key, ReactNode } from 'react';
import * as React from 'react';
import { OcBaseProps } from '../OcBase';
import { ListItemProps } from './ListItem';

export type ItemLayout = 'horizontal' | 'vertical';

export interface ListProps<T> extends OcBaseProps<HTMLDivElement> {
  /**
   * Optional additonal list item.
   */
  additionalItem?: T;
  /**
   * Optionally disable default arrow key handling.
   * @deprecated Use disableKeys instead.
   * @default false
   */
  disableArrowKeys?: boolean;
  /**
   * Optionally disable default arrow, end, and home key handling.
   * @default false
   */
  disableKeys?: boolean;
  /**
   * List footer renderer.
   */
  footer?: ReactNode;
  /**
   * Get custom list item.
   */
  getItem?: (item: T, index: number) => ReactNode;
  /**
   * List header renderer.
   */
  header?: ReactNode;
  /**
   * Custom classes for the list item.
   */
  itemClassNames?: string;
  /**
   * List item props.
   */
  itemProps?: ListItemProps;
  /**
   * Array of list items.
   */
  items: T[];
  /**
   * Style of the item.
   */
  itemStyle?: React.CSSProperties;
  /**
   * The list layout direction.
   * @default vertical
   */
  layout?: ItemLayout;
  /**
   * Custom classes for the list.
   */
  listClassNames?: string;
  /**
   * Style of the list
   */
  listStyle?: React.CSSProperties;
  /**
   * The list html type.
   * @default ul
   */
  listType?: 'ul' | 'ol';
  /**
   * Render method for list item.
   * @param item
   */
  renderItem?: (item: T) => ReactNode;
  /**
   * Render method for additional list item.
   * @param item
   */
  renderAdditionalItem?: (item: T) => ReactNode;
  /**
   * Role of the list.
   */
  role?: string;
  /**
   * Unique key for the list item.
   * @param item
   */
  rowKey?: (item: T) => Key | keyof T;
}
