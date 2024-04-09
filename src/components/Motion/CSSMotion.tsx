'use client';

import React, { useRef } from 'react';
import {
  DomWrapper,
  findDOMNode,
  fillRef,
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
    // Ref to the dom wrapper in case ref can not pass to HTMLElement
    const wrapperNodeRef: React.MutableRefObject<undefined> = useRef();

    function getDomElement(): HTMLElement {
      try {
        // Here we're avoiding call for findDOMNode since it's deprecated
        // in strict mode. We're calling it only when node ref is not
        // an instance of DOM HTMLElement. Otherwise use
        // findDOMNode as a final resort
        return nodeRef.current instanceof HTMLElement
          ? nodeRef.current
          : findDOMNode<HTMLElement>(wrapperNodeRef.current);
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

    // Auto inject ref if child node doesn't have `ref` props
    if (React.isValidElement(motionChildren)) {
      const { ref: originNodeRef } = motionChildren as any;

      if (!originNodeRef) {
        motionChildren = React.cloneElement(motionChildren, {
          ref: setNodeRef,
        });
      }
    }

    return <DomWrapper ref={wrapperNodeRef}>{motionChildren}</DomWrapper>;
  });

  CSSMotion.displayName = 'CSSMotion';

  return CSSMotion;
}

export default genCSSMotion();
