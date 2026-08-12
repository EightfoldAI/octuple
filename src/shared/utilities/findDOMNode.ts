import React from 'react';
import ReactDOM from 'react-dom';

type LegacyFindDOMNode = (
  instance: React.ReactInstance
) => Element | Text | null;

// Property access, not a named import: react-dom 19 removed findDOMNode and
// named imports of removed exports break consumer bundlers.
const getLegacyFindDOMNode = (): LegacyFindDOMNode | undefined =>
  (ReactDOM as { findDOMNode?: LegacyFindDOMNode }).findDOMNode;

export const supportsFindDOMNode = (): boolean =>
  typeof getLegacyFindDOMNode() === 'function';

export const findDOMNode = <T = Element | Text>(
  node: React.ReactInstance | HTMLElement | Text | null | undefined
): T | null => {
  if (node == null) {
    return null;
  }
  if (node instanceof HTMLElement || node instanceof Text) {
    return node as unknown as T;
  }
  const legacyFindDOMNode = getLegacyFindDOMNode();
  if (legacyFindDOMNode) {
    return legacyFindDOMNode(node as React.ReactInstance) as unknown as T;
  }
  return null;
};
