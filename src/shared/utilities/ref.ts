import * as React from 'react';
import { useMemo } from '../../hooks/useMemo';

// The `react.forward_ref` type marker itself hasn't changed across React
// versions (unlike the element wrapper's `$$typeof`, which React 19
// renamed from `Symbol.for('react.element')` to
// `Symbol.for('react.transitional.element')`). Checking it directly keeps
// this correct across every React major Octuple's `peerDependencies`
// support, rather than depending on `react-is`, whose detection is
// generation-locked to whichever symbol its matching React major uses
// (see `toArray.ts` for the same issue with Fragment detection).
const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

/**
 * React 19 removed `ReactDOM.findDOMNode`, which used to be the escape
 * hatch for resolving a DOM node from a component that could not accept a
 * ref directly. Callers now need to know up front whether attaching a ref
 * to an element will actually work, so they can fall back to `DomWrapper`
 * (see `domWrapper.tsx`) when it will not.
 *
 * Refs are only honored by the reconciler for host elements (e.g. `div`),
 * class components, and `forwardRef` components — plain function
 * components will drop a `ref` prop with a dev warning.
 */
export const canAttachRef = (element: React.ReactElement): boolean => {
  if (!element) {
    return false;
  }
  const { type } = element as { type: unknown };
  return (
    typeof type === 'string' ||
    (typeof type === 'object' &&
      type !== null &&
      (type as { $$typeof?: symbol }).$$typeof === REACT_FORWARD_REF_TYPE) ||
    (typeof type === 'function' &&
      !!(type as { prototype?: unknown }).prototype &&
      (type as { prototype: object }).prototype instanceof React.Component)
  );
};

/**
 * Reads the `ref` off a React element in a way that works across every
 * React major Octuple's `peerDependencies` support. React 19 moved `ref`
 * into `element.props.ref`; before that (16.8–18, still supported here),
 * `ref` is never copied into `props` at all — it only exists as the
 * element's own legacy top-level `.ref` field. Reading only `props.ref`
 * would silently read `undefined` and drop a real ref under React <19
 * (confirmed the hard way: it broke `Align`'s `forceAlign` ref wiring
 * inside `PopupInner` when running under this repo's React 17).
 */
export const getElementRef = <T = unknown>(
  element: React.ReactElement
): React.Ref<T> | null | undefined =>
  element?.props?.ref ?? (element as unknown as { ref?: React.Ref<T> })?.ref;

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
