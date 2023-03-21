import React, {
  FC,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  arrow,
  autoUpdate,
  offset as fOffset,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import {
  ANIMATION_DURATION,
  PREVENT_DEFAULT_TRIGGERS,
  TooltipProps,
  TooltipRef,
  TooltipSize,
  TooltipTheme,
  TooltipType,
  TOOLTIP_ARROW_WIDTH,
  TOOLTIP_DEFAULT_OFFSET,
  TRIGGER_TO_HANDLER_MAP_ON_ENTER,
  TRIGGER_TO_HANDLER_MAP_ON_LEAVE,
} from './Tooltip.types';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useMergedState } from '../../hooks/useMergedState';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import {
  cloneElement,
  ConditionalWrapper,
  mergeClasses,
  uniqueId,
} from '../../shared/utilities';

import styles from './tooltip.module.scss';

export const Tooltip: FC<TooltipProps> = React.memo(
  React.forwardRef<TooltipRef, TooltipProps>(
    (
      {
        children,
        classNames,
        closeOnOutsideClick = true,
        closeOnTooltipClick = false,
        content,
        disabled,
        height,
        hideAfter = ANIMATION_DURATION,
        id,
        offset = TOOLTIP_DEFAULT_OFFSET,
        onClickOutside,
        onVisibleChange,
        openDelay = 0,
        placement = 'bottom',
        portal = false,
        portalId,
        portalRoot,
        positionStrategy = 'absolute',
        showTooltip,
        size = TooltipSize.Small,
        tabIndex = 0,
        theme,
        tooltipStyle,
        trigger = 'hover',
        triggerAbove = false,
        type = TooltipType.Default,
        visible,
        visibleArrow = true,
        width,
        wrapperClassNames,
        wrapperStyle,
        ...rest
      },
      ref: React.ForwardedRef<TooltipRef>
    ) => {
      const tooltipSide: string = placement.split('-')?.[0];
      const [mergedVisible, setVisible] = useMergedState<boolean>(false, {
        value: visible,
      });
      const arrowRef: React.MutableRefObject<HTMLDivElement> =
        useRef<HTMLDivElement>(null);

      const [hiding, setHiding] = useState<boolean>(false);
      const tooltipId: React.MutableRefObject<string> = useRef<string>(
        id || uniqueId('tooltip-')
      );

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

      const toggle: Function =
        (show: boolean, showTooltip = (show: boolean) => show): Function =>
        (e: SyntheticEvent): void => {
          if (!content || disabled) {
            return;
          }
          // to control the toggle behaviour
          const updatedShow: boolean = showTooltip(show);
          if (PREVENT_DEFAULT_TRIGGERS.includes(trigger)) {
            e.preventDefault();
          }
          setHiding(!updatedShow);
          timeout && clearTimeout(timeout);
          timeout = setTimeout(
            () => {
              setVisible(updatedShow);
              onVisibleChange?.(updatedShow);
            },
            show ? openDelay : hideAfter
          );
        };

      useEffect(() => {
        if (!refs.reference.current || !refs.floating.current) {
          return () => {};
        }

        // Only call this when the floating element is rendered
        return autoUpdate(
          refs.reference.current,
          refs.floating.current,
          update
        );
      }, [refs.reference, refs.floating, update]);

      useImperativeHandle(ref, () => ({
        update,
      }));

      useOnClickOutside(
        refs.floating,
        (e) => {
          if (closeOnOutsideClick) {
            toggle(false)(e);
          }
          onClickOutside?.(e);
        },
        mergedVisible
      );

      useAccessibility(
        trigger,
        refs.reference,
        toggle(true),
        portal
          ? (e) => {
              if (e?.key == 'Enter') {
                toggle(false);
              }
            }
          : toggle(false)
      );

      // The placement type contains both `Side` and `Alignment`, joined by `-`.
      // e.g. placement: `${Side}-{Alignment}`
      const tooltipClassNames: string = mergeClasses([
        styles.tooltip,
        { [styles.popup]: type === TooltipType.Popup },
        classNames,
        { [styles.visible]: mergedVisible },
        { [styles.hiding]: hiding },
        { [styles.hidden]: !mergedVisible },
        { [styles.dark]: theme === TooltipTheme.dark },
        { [styles.bottom]: placement === 'bottom' },
        { [styles.bottomEnd]: placement === 'bottom-end' },
        { [styles.bottomStart]: placement === 'bottom-start' },
        { [styles.left]: placement === 'left' },
        { [styles.leftEnd]: placement === 'left-end' },
        { [styles.leftStart]: placement === 'left-start' },
        { [styles.right]: placement === 'right' },
        { [styles.rightEnd]: placement === 'right-end' },
        { [styles.rightStart]: placement === 'right-start' },
        { [styles.top]: placement === 'top' },
        { [styles.topEnd]: placement === 'top-end' },
        { [styles.topStart]: placement === 'top-start' },
        { [styles.small]: size === TooltipSize.Small },
        { [styles.medium]: size === TooltipSize.Medium },
        { [styles.large]: size === TooltipSize.Large },
      ]);

      const referenceWrapperClassNames: string = mergeClasses([
        styles.referenceWrapper,
        wrapperClassNames,
        { [styles.disabled]: disabled },
      ]);

      // Only use the `placement` type's `Side` property to determine `staticSide`.
      const staticSide: string = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[tooltipSide];

      const tooltipStyles: object = {
        position: strategy,
        top: Math.floor(y) ?? '',
        left: Math.floor(x) ?? '',
        width: width ?? '',
        height: height ?? '',
        ...tooltipStyle,
      };

      const arrowStyle: object = {
        position: strategy,
        top: arrowY ?? '',
        left: arrowX ?? '',
        [staticSide]: `-${TOOLTIP_ARROW_WIDTH / 2}px`,
      };

      const getChild = (
        node: React.ReactNode
      ): JSX.Element | React.ReactNode => {
        if (React.isValidElement(node)) {
          const child = React.Children.only(node) as React.ReactElement<any>;

          // Need this to handle disabled elements of default Tooltip.
          if (type === TooltipType.Default) {
            if (node.props?.disabled) {
              return cloneElement(child, {
                classNames: styles.noPointerEvents,
              });
            }
          }

          // Utilize tha same element clone pattern as Dropdown
          // for more complex Popup elements.
          if (type === TooltipType.Popup) {
            const referenceWrapperClassNames: string = mergeClasses([
              styles.referenceWrapper,
              { [styles.triggerAbove]: !!triggerAbove },
              // Add any classnames added to the reference element
              { [child.props.className]: child.props.className },
              { [styles.disabled]: disabled },
            ]);
            return cloneElement(child, {
              ...{
                [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(true),
              },
              onClick: toggle(!mergedVisible),
              classNames: referenceWrapperClassNames,
              'aria-controls': tooltipId?.current,
              'aria-expanded': mergedVisible,
              'aria-haspopup': true,
              role: 'button',
              tabIndex: `${tabIndex}`,
            });
          }
        }
        return node;
      };

      const getTooltip = (): JSX.Element =>
        mergedVisible && (
          <div
            {...rest}
            aria-hidden={!mergedVisible}
            className={tooltipClassNames}
            id={tooltipId?.current}
            onClick={
              closeOnTooltipClick && type === TooltipType.Popup
                ? toggle(false, showTooltip)
                : null
            }
            ref={floating}
            role="tooltip"
            style={tooltipStyles}
            tabIndex={tabIndex}
          >
            {content}
            {visibleArrow && (
              <div className={styles.arrow} ref={arrowRef} style={arrowStyle} />
            )}
          </div>
        );

      const getConditionalWrapper = (): JSX.Element => (
        <ConditionalWrapper
          condition={portal}
          wrapper={(children) => (
            <FloatingPortal id={portalId} root={portalRoot}>
              {getChild(children)}
            </FloatingPortal>
          )}
        >
          {getTooltip()}
        </ConditionalWrapper>
      );

      const getDefault = (): JSX.Element => (
        <>
          <div
            className={referenceWrapperClassNames}
            style={wrapperStyle}
            id={tooltipId.current}
            onMouseEnter={toggle(true, showTooltip)}
            onMouseLeave={toggle(false, showTooltip)}
            onFocus={toggle(true, showTooltip)}
            onBlur={toggle(false, showTooltip)}
            ref={reference}
          >
            {getChild(children)}
          </div>
          {getConditionalWrapper()}
        </>
      );

      const getPopup = (): JSX.Element => (
        <div
          className={referenceWrapperClassNames}
          id={tooltipId?.current}
          style={wrapperStyle}
          ref={reference}
          {...(TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger]
            ? {
                [TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger]]: toggle(
                  false,
                  showTooltip
                ),
              }
            : {})}
        >
          {getChild(children)}
          {getConditionalWrapper()}
        </div>
      );

      return type === TooltipType.Default ? getDefault() : getPopup();
    }
  )
);
