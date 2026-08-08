'use client';

import React, {
  isValidElement,
  Ref,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
} from 'react';
import {
  canAttachRef,
  composeRef,
  DomWrapper,
  DomWrapperRef,
  getElementRef,
} from '../../utilities';
import { observe, unobserve } from '../utils/observerUtil';
import type { ResizeObserverProps } from '../ResizeObserver';
import { CollectionContext } from '../Collection';

export interface SingleObserverProps extends ResizeObserverProps {
  children:
    | React.ReactElement
    | ((ref: React.RefObject<Element>) => React.ReactElement);
}

/** Shape of the subset of element props we care about when resolving a ref. */
interface ElementWithRefProps {
  ref?: React.Ref<Element>;
  [key: string]: unknown;
}

export function SingleObserver(props: SingleObserverProps): JSX.Element {
  const { children, disabled } = props;
  const elementRef = useRef<Element>(null);
  const wrapperRef = useRef<DomWrapperRef>(null);

  const onCollectionResize = useContext(CollectionContext);

  // =========================== Children ===========================
  const isRenderProps = typeof children === 'function';
  const mergedChildren = isRenderProps ? children(elementRef) : children;

  // ============================= Size =============================
  const sizeRef = useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1,
  });

  // ============================= Ref ==============================
  // `canRef` tells us whether we can attach a ref directly to `mergedChildren`
  // and rely on it for measurement. React 19 removed `ReactDOM.findDOMNode`,
  // which used to let us fall back to resolving the DOM node from *any*
  // component instance (even ones that can't accept a ref, like a plain
  // function component — e.g. `Select.tsx`'s `ThemeContextProvider` child).
  // For that fallback case we render `DomWrapper`, which resolves the DOM
  // node via a hidden marker sibling instead of `findDOMNode` (see
  // `domWrapper.tsx`). When a direct ref is attachable we skip `DomWrapper`
  // entirely so no extra DOM node is introduced — this matters for children
  // like `<td>` that must remain a direct child of `<tr>` (see `Table`'s
  // `MeasureCell`).
  const isValidRefElement = isValidElement<ElementWithRefProps>(mergedChildren);
  const canRef =
    !isRenderProps && isValidRefElement && canAttachRef(mergedChildren);
  const originRef: Ref<Element> =
    canRef && isValidRefElement
      ? getElementRef<Element>(mergedChildren) ?? null
      : null;

  const mergedRef = useMemo(
    () => composeRef<Element>(originRef, elementRef),
    [originRef, elementRef]
  );

  // =========================== Observe ============================
  const propsRef = useRef<SingleObserverProps>(props);
  propsRef.current = props;

  // Handler
  const onInternalResize = useCallback((target: HTMLElement) => {
    const { onResize, data } = propsRef.current;

    const { width, height } = target.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = target;

    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);

    if (
      sizeRef.current.width !== fixedWidth ||
      sizeRef.current.height !== fixedHeight ||
      sizeRef.current.offsetWidth !== offsetWidth ||
      sizeRef.current.offsetHeight !== offsetHeight
    ) {
      const size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth,
        offsetHeight,
      };
      sizeRef.current = size;

      // IE is strange, right?
      const mergedOffsetWidth =
        offsetWidth === Math.round(width) ? width : offsetWidth;
      const mergedOffsetHeight =
        offsetHeight === Math.round(height) ? height : offsetHeight;

      const sizeInfo = {
        ...size,
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight,
      };

      // Let collection know what happened
      onCollectionResize?.(sizeInfo, target, data);

      if (onResize) {
        // defer the callback but not defer to next frame
        Promise.resolve().then(() => {
          onResize(sizeInfo, target);
        });
      }
    }
  }, []);

  // Dynamic observe
  useEffect(() => {
    const currentElement: HTMLElement | null =
      (elementRef.current as unknown as HTMLElement) ||
      wrapperRef.current?.getDOMNode() ||
      null;

    if (currentElement && !disabled) {
      observe(currentElement, onInternalResize);
    }

    return () => {
      if (currentElement) {
        unobserve(currentElement, onInternalResize);
      }
    };
  }, [elementRef.current, disabled]);

  // ============================ Render ============================
  if (canRef) {
    return React.cloneElement(mergedChildren as React.ReactElement, {
      ref: mergedRef,
    });
  }

  return <DomWrapper ref={wrapperRef}>{mergedChildren}</DomWrapper>;
}
