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

const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

// A ref on these lands on a real DOM node (host elements, forwardRef that
// forwards to one). Class refs yield instances and plain function
// components drop refs, so both still need the DomWrapper marker on 19.
export const isDomRefable = (
  element: React.ReactElement | null | undefined
): boolean => {
  if (!element || !React.isValidElement(element)) {
    return false;
  }
  const { type } = element as { type: unknown };
  return (
    typeof type === 'string' ||
    (typeof type === 'object' &&
      type !== null &&
      (type as { $$typeof?: symbol }).$$typeof === REACT_FORWARD_REF_TYPE)
  );
};

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
