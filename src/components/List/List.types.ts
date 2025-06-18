import { Key, ReactNode } from 'react';
import * as React from 'react';
import { OcBaseProps } from '../OcBase';
import { ListItemProps } from './ListItem';

export type ItemLayout = 'horizontal' | 'vertical';

/**
 * Props interface for the List component
 * @template T - The type of items in the list
 */
export interface ListProps<T> extends OcBaseProps<HTMLDivElement> {
  /**
   * Additional item to be rendered at the end of the list
   */
  additionalItem?: T;
  /**
   * Disable arrow keys navigation
   * @default false
   */
  disableArrowKeys?: boolean;
  /**
   * Disable keyboard navigation
   * @default false
   */
  disableKeys?: boolean;
  /**
   * Disable keyboard handling completely (for parent components to handle)
   * @default false
   */
  disableKeyboardHandling?: boolean;
  /**
   * Items to be rendered in the list
   */
  items: ReadonlyArray<T>;
  /**
   * Footer of the list
   */
  footer?: ReactNode;
  /**
   * Layout of the list
   * @default 'vertical'
   */
  layout?: ItemLayout;
  /**
   * Render function for additional item
   */
  renderAdditionalItem?: (item: T) => ReactNode;
  /**
   * Render function for list item
   */
  renderItem?: (item: T) => ReactNode;
  /**
   * Key for the list item
   */
  rowKey?: string | ((item: T) => Key);
  /**
   * Header of the list
   */
  header?: ReactNode;
  /**
   * Class names for the list item
   */
  itemClassNames?: string;
  /**
   * Style for the list item
   */
  itemStyle?: React.CSSProperties;
  /**
   * Class names for the list
   */
  listClassNames?: string;
  /**
   * Style for the list
   */
  listStyle?: React.CSSProperties;
  /**
   * Type of the list
   * @default 'ul'
   */
  listType?: 'ul' | 'ol';
  /**
   * ARIA role of the list
   */
  role?: string;
  /**
   * Props for the list item
   */
  itemProps?: React.HTMLAttributes<HTMLLIElement>;
  /**
   * Get item function
   */
  getItem?: (item: T, index: number) => ReactNode;
  /**
   * ID of the list
   */
  id?: string;
  /**
   * Apply cyclic navigation
   * @default false
   */
  applyCyclicNavigation?: boolean;
}
