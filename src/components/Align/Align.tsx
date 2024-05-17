'use client';

import React from 'react';
import {
  addEventListenerWrapper,
  canUseDocElement,
  canUseDom,
  composeRef,
  isVisible,
} from '../../shared/utilities';
import { alignElement, alignPoint } from 'dom-align';
import { isSamePoint, restoreFocus, onViewportResize } from './util';
import type {
  AlignType,
  AlignResult,
  TargetType,
  TargetPoint,
} from './Align.types';
import useBuffer from './Hooks/useBuffer';
import { isEqual } from '../../shared/utilities';

type OnAlign = (source: HTMLElement, result: AlignResult) => void;

export interface AlignProps {
  align: AlignType;
  target: TargetType;
  onAlign?: OnAlign;
  viewportBufferTime?: number;
  viewportResize?: boolean;
  disabled?: boolean;
  children: React.ReactElement;
}

export interface ChildNode extends React.ReactElement {
  ref: React.Ref<any>;
}

interface ViewportRef {
  element?: HTMLElement;
  cancel: () => void;
}

export interface RefAlign {
  forceAlign: () => void;
}

function getElement(func: TargetType) {
  if (typeof func !== 'function') return null;
  return func();
}

function getPoint(point: TargetType) {
  if (typeof point !== 'object' || !point) return null;
  return point;
}

const Align: React.ForwardRefRenderFunction<RefAlign, AlignProps> = (
  {
    children,
    disabled,
    target,
    align,
    onAlign,
    viewportResize,
    viewportBufferTime = 0,
  },
  ref
) => {
  const cacheRef = React.useRef<{
    element?: HTMLElement;
    point?: TargetPoint;
    align?: AlignType;
  }>({});
  const nodeRef = React.useRef();
  let childNode = React.Children.only(children);

  // ===================== Align ======================
  // We save the props here to avoid closure makes props ood
  const forceAlignPropsRef = React.useRef<{
    disabled?: boolean;
    target?: TargetType;
    align?: AlignType;
    onAlign?: OnAlign;
  }>({});
  forceAlignPropsRef.current.disabled = disabled;
  forceAlignPropsRef.current.target = target;
  forceAlignPropsRef.current.align = align;
  forceAlignPropsRef.current.onAlign = onAlign;

  const [forceAlign, cancelForceAlign] = useBuffer(() => {
    const {
      disabled: latestDisabled,
      target: latestTarget,
      align: latestAlign,
      onAlign: latestOnAlign,
    } = forceAlignPropsRef.current;
    if (!latestDisabled && latestTarget) {
      const source = nodeRef.current;

      let result: AlignResult;
      const element = getElement(latestTarget);
      const point = getPoint(latestTarget);

      cacheRef.current.element = element;
      cacheRef.current.point = point;
      cacheRef.current.align = latestAlign;

      // IE lose focus after element realign
      // We should record activeElement and restore later
      let activeElement: Element;
      if (canUseDocElement()) {
        activeElement = document.activeElement;
      }

      // We only align when element is visible
      if (element && isVisible(element)) {
        result = alignElement(source, element, latestAlign);
      } else if (point) {
        result = alignPoint(source, point, latestAlign);
      }

      if (activeElement) {
        restoreFocus(activeElement, source);
      }

      if (latestOnAlign && result) {
        latestOnAlign(source, result);
      }

      return true;
    }

    return false;
  }, viewportBufferTime);

  // Listen for target updated
  const resizeViewport = React.useRef<ViewportRef>({
    cancel: () => {},
  });
  // Listen for source updated
  const sourceResizeViewport = React.useRef<ViewportRef>({
    cancel: () => {},
  });
  React.useEffect(() => {
    const element = getElement(target);
    const point = getPoint(target);

    if (nodeRef.current !== sourceResizeViewport.current.element) {
      sourceResizeViewport.current.cancel();
      sourceResizeViewport.current.element = nodeRef.current;
      sourceResizeViewport.current.cancel = onViewportResize(
        nodeRef.current,
        forceAlign
      );
    }

    if (
      cacheRef.current.element !== element ||
      !isSamePoint(cacheRef.current.point, point) ||
      !isEqual(cacheRef.current.align, align)
    ) {
      forceAlign();

      // Add resize observer
      if (resizeViewport.current.element !== element) {
        resizeViewport.current.cancel();
        resizeViewport.current.element = element;
        resizeViewport.current.cancel = onViewportResize(element, forceAlign);
      }
    }
  });

  // Listen for disabled change
  React.useEffect(() => {
    if (!disabled) {
      forceAlign();
    } else {
      cancelForceAlign();
    }
  }, [disabled]);

  // Listen for window resize
  const winResizeRef = React.useRef<{ remove: Function }>(null);
  React.useEffect(() => {
    if (canUseDom() && viewportResize) {
      if (!winResizeRef.current) {
        winResizeRef.current = addEventListenerWrapper(
          window,
          'resize',
          forceAlign
        );
      }
    } else if (winResizeRef.current) {
      winResizeRef.current.remove();
      winResizeRef.current = null;
    }
  }, [viewportResize]);

  // Clear all if unmount
  React.useEffect(
    () => () => {
      resizeViewport.current.cancel();
      sourceResizeViewport.current.cancel();
      if (winResizeRef.current) winResizeRef.current.remove();
      cancelForceAlign();
    },
    []
  );

  // ====================== Ref =======================
  React.useImperativeHandle(ref, () => ({
    forceAlign: () => forceAlign(true),
  }));

  // ===================== Render =====================
  if (React.isValidElement(childNode)) {
    childNode = React.cloneElement(childNode, {
      ref: composeRef((childNode as any).ref, nodeRef),
    } as React.Attributes & { ref?: React.Ref<unknown> });
  }

  return childNode;
};

const OcAlign = React.forwardRef(Align);
OcAlign.displayName = 'Align';

export default OcAlign;
