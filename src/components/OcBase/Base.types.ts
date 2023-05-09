import React, { HTMLAttributes, Ref } from 'react';

export interface OcBaseProps<T> extends HTMLAttributes<T> {
  /**
   * Custom classnames of the component
   */
  classNames?: string;
  /**
   * Unique id used to target element for testing
   * @deprecated Use 'data-testid' instead to better map to react testing library.
   */
  'data-test-id'?: string;
  /**
   * Unique id used to target element for testing
   */
  'data-testid'?: string;
  /**
   * The component ref
   */
  ref?: Ref<T>;
}
