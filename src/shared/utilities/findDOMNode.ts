import React from 'react';

/**
 * Utility to return if a node is a DOM node.
 *
 * React 19 removed `ReactDOM.findDOMNode`, so this no longer attempts to
 * resolve a DOM node from an arbitrary class component instance. Callers
 * must already hold a real DOM ref (or use `DomWrapper` — see
 * `domWrapper.tsx` — for the rare case where a component cannot accept a
 * ref directly).
 *
 * @param node Node to resolve. Returns it unchanged when it is already a
 * DOM node, otherwise returns `null`.
 * @returns The DOM node, or `null` when one is not available.
 */
export const findDOMNode = <T = Element | Text>(
  node: React.ReactInstance | HTMLElement | Text | null | undefined
): T | null => {
  if (node == null) {
    return null;
  }
  if (node instanceof HTMLElement || node instanceof Text) {
    return node as unknown as T;
  }
  return null;
};
