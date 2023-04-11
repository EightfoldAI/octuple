import React from 'react';
import { ArgumentArray } from '../../shared/utilities';

type OcAtomBaseProps<T> = {
  /**
   * Custom classnames of the component.
   */
  classNames?: string;
  /**
   * Unique id used to target element for testing.
   * @deprecated Use 'data-testid' instead to better map to react testing library.
   */
  'data-test-id'?: string;
  /**
   * Unique id used to target element for testing.
   */
  'data-testid'?: string;
  /**
   * Custom style of the component.
   */
  style?: React.CSSProperties;
  /**
   * The component ref.
   */
  ref?: React.Ref<T>;
};

export type AtomProps<T = {}, U = React.Ref<any>> = Omit<T, 'children'> &
  OcAtomBaseProps<U> & {
    of: keyof HTMLElementTagNameMap;
    classes: ArgumentArray;
    children?: React.ReactNode;
  };
