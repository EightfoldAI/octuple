import React from 'react';

export type PortalRef = {};

export interface PortalProps {
  /**
   * Child that needs to be portaled
   */
  children?: React.ReactNode;
  /**
   * HTMLElement to which to attach the child
   */
  getContainer: () => HTMLElement;
  /**
   * Position to insert the portal container
   * 'prepend' - Insert at the start
   * 'append' - Insert at the end (default)
   * @default 'append'
   */
  insertPosition?: 'prepend' | 'append';
  /**
   * Additional attributes to apply to the portal wrapper element
   */
  wrapperAttributes?: Record<string, string>;
}
