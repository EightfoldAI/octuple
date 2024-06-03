import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import Align from '../../Align/Align';
import type { RefAlign } from '../../Align/Align';
import { PopupInnerProps, PopupInnerRef } from './Popup.types';
import type {
  MotionEndEventHandler,
  MotionEvent,
} from '../../Motion/CSSMotion.types';
import CSSMotion from '../../Motion/CSSMotion';
import { mergeClasses } from '../../../shared/utilities';
import type { AlignType } from '../../Align/Align.types';
import useVisibleStatus from './useVisibleStatus';
import { getMotion } from '../Utils/util';
import useStretchStyle from './useStretchStyle';

import styles from '../trigger.module.scss';

const PopupInner = forwardRef<PopupInnerRef, PopupInnerProps>((props, ref) => {
  const {
    visible,
    classNames,
    style,
    children,
    zIndex,
    stretch,
    destroyPopupOnHide,
    forceRender,
    align,
    point,
    getRootDomNode,
    getClassNameFromAlign,
    onAlign,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onTouchStart,
    onClick,
  } = props;

  const alignRef = useRef<RefAlign>();
  const elementRef = useRef<HTMLDivElement>();

  const [alignedClassNames, setAlignedClassName] = useState<string>();

  const [stretchStyle, measureStretchStyle] = useStretchStyle(stretch);

  function doMeasure() {
    if (stretch) {
      measureStretchStyle(getRootDomNode());
    }
  }

  const [status, goNextStatus] = useVisibleStatus(visible, doMeasure);

  // ======================== Aligns ========================
  /**
   * `alignedClassNames` may modify `source` size,
   * which means one time align may not move to the correct position.
   *
   * We will reset `alignTimes` for each status switch to `alignPre`
   * and let `align` to align for multiple times to ensure proper alignment.
   * Currently we mark `alignTimes < 2` repeat align, this should be increased if customers report align issues.
   * May refactor to use a debounce.
   */
  const [alignTimes, setAlignTimes] = useState(0);
  const prepareResolveRef = useRef<(value?: unknown) => void>();

  useLayoutEffect(() => {
    if (status === 'alignPre') {
      setAlignTimes(0);
    }
  }, [status]);

  // `target` on `align` can accept as a function to get the bind element or a point.
  function getAlignTarget() {
    if (point) {
      return point;
    }
    return getRootDomNode;
  }

  function forceAlign() {
    alignRef.current?.forceAlign();
  }

  function onInternalAlign(popupDomNode: HTMLElement, matchAlign: AlignType) {
    const nextAlignedClassName = getClassNameFromAlign(matchAlign);

    if (alignedClassNames !== nextAlignedClassName) {
      setAlignedClassName(nextAlignedClassName);
    }

    // Retry to make sure that the element has been align in the right position.
    setAlignTimes((val) => val + 1);

    if (status === 'align') {
      onAlign?.(popupDomNode, matchAlign);
    }
  }

  // Delay to go to next status
  useLayoutEffect(() => {
    if (status === 'align') {
      // Repeat until no more align needed
      if (alignTimes < 2) {
        forceAlign();
      } else {
        goNextStatus(function () {
          prepareResolveRef.current?.();
        });
      }
    }
  }, [alignTimes]);

  const motion = { ...getMotion(props) };
  ['onAppearEnd', 'onEnterEnd', 'onLeaveEnd'].forEach((eventName) => {
    const originHandler: MotionEndEventHandler = (motion as any)[eventName];
    (motion as any)[eventName] = (element: HTMLElement, event: MotionEvent) => {
      goNextStatus();
      return originHandler?.(element, event);
    };
  });

  function onShowPrepare() {
    return new Promise((resolve) => {
      prepareResolveRef.current = resolve;
    });
  }

  // Go to stable directly when motion not provided
  React.useEffect(() => {
    if (!motion.motionName && status === 'motion') {
      goNextStatus();
    }
  }, [motion.motionName, status]);

  React.useImperativeHandle(ref, () => ({
    forceAlign,
    getElement: () => elementRef.current,
  }));

  const mergedStyle: React.CSSProperties = {
    ...stretchStyle,
    zIndex,
    opacity:
      status === 'motion' || status === 'stable' || !visible ? undefined : 0,
    // Cannot interact with disappearing elements
    pointerEvents: !visible && status !== 'stable' ? 'none' : undefined,
    ...style,
  };

  // Align status
  let alignDisabled = true;
  if (align?.points && (status === 'align' || status === 'stable')) {
    alignDisabled = false;
  }

  let childNode = children;

  // Wrapper when multiple children
  if (React.Children.count(children) > 1) {
    childNode = <div className={'trigger-popup-content'}>{children}</div>;
  }

  return (
    <CSSMotion
      visible={visible}
      ref={elementRef}
      leavedClassName={styles.triggerPopupHidden}
      {...motion}
      onAppearPrepare={onShowPrepare}
      onEnterPrepare={onShowPrepare}
      removeOnLeave={destroyPopupOnHide}
      forceRender={forceRender}
    >
      {({ classNames: motionClassNames, style: motionStyle }, motionRef) => {
        const mergedClassNames: string = mergeClasses([
          styles.triggerPopup,
          { ['trigger-popup-hidden']: !visible }, // TODO: Remove - This is a stub to ensure UTs pass based on props
          motion?.motionName,
          classNames,
          alignedClassNames,
          motionClassNames,
        ]);

        return (
          <Align
            target={getAlignTarget()}
            key="popup"
            ref={alignRef}
            viewportResize
            disabled={alignDisabled}
            align={align}
            onAlign={onInternalAlign}
          >
            <div
              ref={motionRef}
              className={mergedClassNames}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseDownCapture={onMouseDown}
              onTouchStartCapture={onTouchStart}
              onClick={onClick}
              style={{
                ...motionStyle,
                ...mergedStyle,
              }}
            >
              {childNode}
            </div>
          </Align>
        );
      }}
    </CSSMotion>
  );
});

PopupInner.displayName = 'PopupInner';

export default PopupInner;
