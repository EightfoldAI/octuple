import { HTMLAttributes } from 'react';
import * as React from 'react';

export interface ExternalListItemProps {
  /**
   * The keydown event handler applied to the cloned list item.
   * @param event The keyboard event.
   * @param index The list item index.
   * @param external Informs the keyboard handler this is an external item.
   */
  handleItemKeyDown?: (
    event: KeyboardEvent | React.KeyboardEvent<HTMLElement>,
    index: number,
    external?: boolean
  ) => void;
  /**
   * The id of the cloned list item.
   */
  id?: string;
  /**
   * The index of the cloned list item.
   */
  index?: number;
  /**
   * The list item.
   */
  item?: React.ReactElement<
    HTMLElement,
    string | React.JSXElementConstructor<any>
  >;
  /**
   * The cloned list item refs.
   */
  itemRefs?: React.MutableRefObject<HTMLElement[]>;
  /**
   * The cloned list item ref.
   * @param el The list item element.
   */
  itemRef?: (el: HTMLElement | null) => void;
}

export interface ListItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {}
