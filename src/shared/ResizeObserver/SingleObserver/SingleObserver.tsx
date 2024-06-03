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
import { composeRef, DomWrapper, findDOMNode } from '../../utilities';
import { observe, unobserve } from '../utils/observerUtil';
import type { ResizeObserverProps } from '../ResizeObserver';
import { CollectionContext } from '../Collection';

export interface SingleObserverProps extends ResizeObserverProps {
  children:
    | React.ReactElement
    | ((ref: React.RefObject<Element>) => React.ReactElement);
}

export function SingleObserver(props: SingleObserverProps): JSX.Element {
  const { children, disabled } = props;
  const elementRef = useRef<Element>(null);
  const wrapperRef = useRef<DomWrapper>(null);

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
  const canRef = !isRenderProps && isValidElement(mergedChildren);
  const originRef: Ref<Element> = canRef ? (mergedChildren as any).ref : null;

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
    const currentElement: HTMLElement =
      findDOMNode?.(elementRef.current) || findDOMNode?.(wrapperRef.current);

    if (currentElement && !disabled) {
      observe(currentElement, onInternalResize);
    }

    return () => unobserve(currentElement, onInternalResize);
  }, [elementRef.current, disabled]);

  // ============================ Render ============================
  return (
    <DomWrapper ref={wrapperRef}>
      {canRef
        ? React.cloneElement(mergedChildren as any, {
            ref: mergedRef,
          })
        : mergedChildren}
    </DomWrapper>
  );
}
