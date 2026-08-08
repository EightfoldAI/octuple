'use client';

import React, { useRef } from 'react';
import {
  canAttachRef,
  DomWrapper,
  DomWrapperRef,
  fillRef,
  getElementRef,
  mergeClasses,
} from '../../shared/utilities';
import { getTransitionName } from './util/motion';
import type { CSSMotionProps } from './CSSMotion.types';
import { STATUS_NONE, STEP_PREPARE, STEP_START } from './CSSMotion.types';
import { useStatus } from './hooks/useStatus';
import { isActive } from './hooks/useStepQueue';

export function genCSSMotion(): React.ForwardRefExoticComponent<
  CSSMotionProps & { ref?: React.Ref<any> }
> {
  const CSSMotion = React.forwardRef<any, CSSMotionProps>((props, ref) => {
    const {
      children,
      eventProps,
      forceRender,
      leavedClassName,
      motionName,
      removeOnLeave = true,
      visible = true,
    } = props;

    // Ref to the react node, it may be a HTMLElement
    const nodeRef: React.MutableRefObject<any> = useRef<any>();
    // Ref to the dom wrapper in case ref can not be passed to the HTMLElement
    // (e.g. `motionChildren`'s type does not accept a ref — see
    // `canAttachRef` in `shared/utilities/ref.ts`).
    const wrapperNodeRef = useRef<DomWrapperRef>(null);

    function getDomElement(): HTMLElement {
      try {
        // React 19 removed `ReactDOM.findDOMNode`, so we no longer fall
        // back to it here. When `nodeRef` did not resolve to a real
        // HTMLElement, `DomWrapper` resolves it via a hidden marker
        // sibling instead (see `domWrapper.tsx`).
        return nodeRef.current instanceof HTMLElement
          ? nodeRef.current
          : wrapperNodeRef.current?.getDOMNode() ?? null;
      } catch (e) {
        // Only happen when `motionDeadline` trigger but element removed.
        return null;
      }
    }

    const [status, statusStep, statusStyle, mergedVisible] = useStatus(
      visible,
      getDomElement,
      props
    );

    // Record whether content has rendered
    // Will return null for un-rendered even when `removeOnLeave={false}`
    const renderedRef = React.useRef(mergedVisible);
    if (mergedVisible) {
      renderedRef.current = true;
    }

    // ====================== Refs ======================
    const setNodeRef = React.useCallback(
      (node: any) => {
        nodeRef.current = node;
        fillRef(ref, node);
      },
      [ref]
    );

    // ===================== Render =====================
    let motionChildren: React.ReactNode;
    const mergedProps = { ...eventProps, visible };

    if (!children) {
      // No children
      motionChildren = null;
    } else if (status === STATUS_NONE) {
      // Stable children
      if (mergedVisible) {
        motionChildren = children({ ...mergedProps }, setNodeRef);
      } else if (!removeOnLeave && renderedRef.current) {
        motionChildren = children(
          { ...mergedProps, classNames: leavedClassName },
          setNodeRef
        );
      } else if (forceRender) {
        motionChildren = children(
          { ...mergedProps, style: { display: 'none' } },
          setNodeRef
        );
      } else {
        motionChildren = null;
      }
    } else {
      // In motion
      let statusSuffix: string;
      if (statusStep === STEP_PREPARE) {
        statusSuffix = 'prepare';
      } else if (isActive(statusStep)) {
        statusSuffix = 'active';
      } else if (statusStep === STEP_START) {
        statusSuffix = 'start';
      }

      motionChildren = children(
        {
          ...mergedProps,
          className: mergeClasses([
            getTransitionName(motionName, status),
            {
              [getTransitionName(motionName, `${status}-${statusSuffix}`)]:
                statusSuffix,
            },
            {
              [motionName as string]: typeof motionName === 'string',
            },
          ]),
          style: statusStyle,
        },
        setNodeRef
      );
    }

    // Auto inject ref if the child node doesn't already have one and can
    // accept it.
    const canRefMotionChildren =
      React.isValidElement(motionChildren) &&
      canAttachRef(motionChildren as React.ReactElement);

    if (canRefMotionChildren) {
      const originNodeRef = getElementRef(motionChildren as React.ReactElement);

      if (!originNodeRef) {
        motionChildren = React.cloneElement(
          motionChildren as React.ReactElement,
          {
            ref: setNodeRef,
          }
        );
      }
    }

    // Only reach for the `DomWrapper` marker fallback when the child can't
    // accept a ref directly — most children are DOM elements or forwardRef
    // components, so this keeps the common case free of any extra DOM node.
    if (canRefMotionChildren) {
      return motionChildren as React.ReactElement;
    }

    return <DomWrapper ref={wrapperNodeRef}>{motionChildren}</DomWrapper>;
  });

  CSSMotion.displayName = 'CSSMotion';

  return CSSMotion;
}

export default genCSSMotion();
