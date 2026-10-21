import React from 'react';

export const { isValidElement } = React;

type AnyObject = Record<any, any>;

export type RenderProps =
  | undefined
  | AnyObject
  | ((originProps: AnyObject) => AnyObject | undefined);

export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props: RenderProps
): React.ReactNode {
  if (!isValidElement(element)) return replacement;

  return React.cloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props
  );
}

export function cloneElement(
  element: React.ReactNode,
  props?: RenderProps
): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement;
}

/**
 * Whether the node renders only text (no elements that may be interactive).
 * @param node The React node to check.
 */
export function isTextOnly(node: React.ReactNode): boolean {
  return (typeof node === 'string' && node !== '') || typeof node === 'number';
}
