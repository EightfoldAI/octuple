import React from 'react';
import { ArgumentArray } from '../../shared/utilities';

type OcAtomBaseProps<T> = {
  /**
   * Custom classnames of the component
   */
  classNames?: string;
  /**
   * Unique id used to target element for testing
   */
  'data-test-id'?: string;

  style?: React.CSSProperties;

  ref?: React.Ref<T>;
};

export type AtomProps<T = {}, U = React.Ref<any>> = Omit<T, 'children'> &
  OcAtomBaseProps<U> & {
    of: keyof HTMLElementTagNameMap;
    classes: ArgumentArray;
    children?: React.ReactNode;
  };
