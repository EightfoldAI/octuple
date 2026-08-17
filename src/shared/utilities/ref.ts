import * as React from 'react';
import { useMemo } from '../../hooks/useMemo';

const isReact19Plus: boolean =
  Number.parseInt((React.version || '').split('.')[0], 10) >= 19;

// React 19 moved element refs onto props.ref; earlier majors keep the
// legacy top-level element.ref, where props.ref never exists.
export const getElementRef = <T = unknown>(
  element: React.ReactElement | null | undefined
): React.Ref<T> | null => {
  if (!element) {
    return null;
  }
  if (isReact19Plus) {
    return (element.props as { ref?: React.Ref<T> })?.ref ?? null;
  }
  return (element as unknown as { ref?: React.Ref<T> }).ref ?? null;
};

// Host elements are the only children whose ref is guaranteed to land on a
// DOM node. Every component type can send a ref elsewhere -- classes yield
// instances, plain functions drop it, and forwardRef may expose an imperative
// handle -- so they all keep the DomWrapper marker on React 19.
export const isDomRefable = (
  element: React.ReactElement | null | undefined
): boolean =>
  !!element &&
  React.isValidElement(element) &&
  typeof (element as { type: unknown }).type === 'string';

export const fillRef = <T>(ref: React.Ref<T>, node: T): void => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    (ref as any).current = node;
  }
};

/**
 * Merge refs into one ref function to support ref passing.
 */
export const composeRef = <T>(...refs: React.Ref<T>[]): React.Ref<T> => {
  const refList = refs.filter((ref) => ref);
  if (refList.length <= 1) {
    return refList[0];
  }

  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node);
    });
  };
};

export const useComposeRef = <T>(...refs: React.Ref<T>[]): React.Ref<T> => {
  return useMemo(
    () => composeRef(...refs),
    refs,
    (prev, next) =>
      prev.length === next.length && prev.every((ref, i) => ref === next[i])
  );
};
