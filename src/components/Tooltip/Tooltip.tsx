import React, { FC, useEffect, useRef, useState } from 'react';
import {
  useFloating,
  shift,
  autoUpdate,
  arrow,
  offset as fOffset,
} from '@floating-ui/react-dom';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { TooltipProps, TooltipTheme } from './Tooltip.types';
import {
  ConditionalWrapper,
  generateId,
  mergeClasses,
} from '../../shared/utilities';

import styles from './tooltip.module.scss';

const TOOLTIP_ARROW_WIDTH = 8;

export const Tooltip: FC<TooltipProps> = ({
  children,
  offset = 8,
  theme,
  content,
  placement = 'bottom',
  portal = false,
  disabled,
  id,
  visibleArrow = true,
  classNames,
  openDelay = 0,
  hideAfter = 0,
  tabIndex = 0,
  positionStrategy = 'absolute',
  ...rest
}) => {
  const tooltipSide: string = placement.split('-')?.[0];
  const [visible, setVisible] = useState<boolean>(false);
  const arrowRef = useRef<HTMLDivElement>(null);
  const tooltipId = useRef<string>(id || generateId());
  let timeout: ReturnType<typeof setTimeout>;

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    update,
    refs,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement,
    strategy: positionStrategy,
    middleware: [
      shift(),
      arrow({ element: arrowRef, padding: TOOLTIP_ARROW_WIDTH }),
      fOffset(offset),
    ],
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return () => {};
    }

    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);

  const toggle: Function =
    (show: boolean): Function =>
    (): void => {
      if (!content || disabled) {
        return;
      }
      timeout && clearTimeout(timeout);
      timeout = setTimeout(
        () => {
          setVisible(show);
        },
        show ? openDelay : hideAfter
      );
    };

  const tooltipClasses: string = mergeClasses([
    classNames,
    styles.tooltip,
    { [styles.visible]: visible },
    { [styles.dark]: theme === TooltipTheme.dark },
    { [styles.top]: tooltipSide === 'top' },
    { [styles.bottom]: tooltipSide === 'bottom' },
    { [styles.left]: tooltipSide === 'left' },
    { [styles.right]: tooltipSide === 'right' },
  ]);

  const referenceWrapperClasses: string = mergeClasses([
    styles.referenceWrapper,
    { [styles.disabled]: disabled },
  ]);

  const staticSide: string = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[tooltipSide];

  const tooltipStyle: object = {
    position: strategy,
    top: y ?? '',
    left: x ?? '',
  };

  const arrowStyle: object = {
    position: strategy,
    top: arrowY ?? '',
    left: arrowX ?? '',
    [staticSide]: `-${TOOLTIP_ARROW_WIDTH / 2}px`,
  };

  return (
    <>
      <div
        className={referenceWrapperClasses}
        id={tooltipId.current}
        onMouseEnter={toggle(true)}
        onFocus={toggle(true)}
        onBlur={toggle(false)}
        onMouseLeave={toggle(false)}
        ref={reference}
      >
        {children}
      </div>
      <ConditionalWrapper
        condition={portal}
        wrapper={(children) => <FloatingPortal>{children}</FloatingPortal>}
      >
        {visible && (
          <div
            {...rest}
            role="tooltip"
            aria-hidden={!visible}
            ref={floating}
            style={tooltipStyle}
            className={tooltipClasses}
            tabIndex={tabIndex}
          >
            {content}
            {visibleArrow && (
              <div ref={arrowRef} style={arrowStyle} className={styles.arrow} />
            )}
          </div>
        )}
      </ConditionalWrapper>
    </>
  );
};
