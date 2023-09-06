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
  FloatingFocusManager,
  FloatingPortal,
  offset as fOffset,
  shift,
  useFloating,
} from '@floating-ui/react';
import {
  ANIMATION_DURATION,
  NO_ANIMATION_DURATION,
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
import { useMergedState } from '../../hooks/useMergedState';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import {
  cloneElement,
  ConditionalWrapper,
  eventKeys,
  isAndroid,
  isIOS,
  isTouchSupported,
  mergeClasses,
  RenderProps,
  uniqueId,
} from '../../shared/utilities';

import styles from './tooltip.module.scss';

export const Tooltip: FC<TooltipProps> = React.memo(
  React.forwardRef<TooltipRef, TooltipProps>(
    (
      {
        animate = true,
        bordered = false,
        children,
        classNames,
        closeOnOutsideClick = true,
        closeOnReferenceClick = true,
        closeOnTooltipClick = false,
        content,
        disabled,
        dropShadow = true,
        height,
        hideAfter = ANIMATION_DURATION,
        id,
        minHeight,
        offset = TOOLTIP_DEFAULT_OFFSET,
        onClickOutside,
        onVisibleChange,
        openDelay = 0,
        placement = 'bottom',
        portal = false,
        portalId,
        portalRoot,
        positionStrategy = 'absolute',
        referenceOnClick,
        referenceOnKeydown,
        showTooltip,
        size = TooltipSize.Small,
        tabIndex = 0,
        theme,
        tooltipOnKeydown,
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
      const tooltipReferenceId: React.MutableRefObject<string> = useRef<string>(
        `${tooltipId?.current}-reference`
      );

      const isMobile: boolean = isIOS() || isAndroid();
      let mergedTrigger: 'click' | 'hover' | 'contextmenu';

      // First use the most reliable way of detecting iOS or Android,
      // then test for touch interaction as a somewhat less reliable
      // way to detect other hybrid devices.
      if (isMobile || (!isMobile && isTouchSupported())) {
        mergedTrigger = 'click';
      } else {
        mergedTrigger = trigger;
      }

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
        context,
      } = useFloating({
        placement,
        strategy: positionStrategy,
        middleware: [
          shift(),
          arrow({
            element: arrowRef,
            padding: visibleArrow ? TOOLTIP_ARROW_WIDTH : 0,
          }),
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
          if (PREVENT_DEFAULT_TRIGGERS.includes(mergedTrigger)) {
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
          const referenceElement: HTMLElement = document.querySelector(
            `.tooltip-reference[data-reference-id="${tooltipReferenceId?.current}"]`
          );
          if (closeOnOutsideClick && closeOnReferenceClick && !mergedVisible) {
            toggle(false)(e);
          }
          if (
            !closeOnReferenceClick &&
            referenceElement &&
            !referenceElement.contains(e.target as Node) &&
            !mergedVisible
          ) {
            toggle(false)(e);
          }
          onClickOutside?.(e);
        },
        mergedVisible
      );

      const handleReferenceClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        if (disabled) {
          return;
        }
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (mergedVisible && closeOnReferenceClick) {
            toggle(false)(event);
          } else {
            toggle(true)(event);
          }
        }, hideAfter);
        referenceOnClick?.(event);
      };

      const handleReferenceKeyDown = (event: React.KeyboardEvent): void => {
        event.stopPropagation();
        if (disabled) {
          return;
        }
        if (
          event?.key === eventKeys.ENTER &&
          document.activeElement === event.target
        ) {
          timeout && clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (mergedVisible && closeOnReferenceClick) {
              toggle(false)(event);
            } else {
              toggle(true)(event);
            }
          }, hideAfter);
        }
        if (
          event?.key === eventKeys.ESCAPE ||
          (event?.key === eventKeys.TAB && event.shiftKey)
        ) {
          toggle(false)(event);
        }
        referenceOnKeydown?.(event);
      };

      const handleFloatingKeyDown = (event: React.KeyboardEvent): void => {
        event.stopPropagation();
        if (event?.key === eventKeys.ESCAPE) {
          toggle(false)(event);
        }
        if (event?.key === eventKeys.TAB) {
          timeout && clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (!refs.floating.current.matches(':focus-within')) {
              toggle(false)(event);
            }
          }, NO_ANIMATION_DURATION);
        }
        if (event?.key === eventKeys.TAB && event.shiftKey) {
          timeout && clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (refs.floating.current.matches(':focus-within')) {
              toggle(true)(event);
            }
          }, NO_ANIMATION_DURATION);
        }
        tooltipOnKeydown?.(event);
      };

      // The placement type contains both `Side` and `Alignment`, joined by `-`.
      // e.g. placement: `${Side}-{Alignment}`
      const tooltipClassNames: string = mergeClasses([
        styles.tooltip,
        { [styles.popup]: type === TooltipType.Popup },
        classNames,
        { [styles.animate]: !!animate },
        { [styles.bordered]: !!bordered },
        { [styles.dropShadow]: !!dropShadow },
        { [styles.visibleArrow]: !!visibleArrow },
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
        minHeight: minHeight ?? '',
        ...tooltipStyle,
      };

      const arrowStyle: object = {
        position: strategy,
        top: arrowY ?? '',
        left: arrowX ?? '',
        [staticSide]: `-${TOOLTIP_ARROW_WIDTH / 2}px`,
      };

      const getDefaultReferenceElement = (
        node: React.ReactNode
      ): JSX.Element | React.ReactNode => {
        if (React.isValidElement(node)) {
          const child = React.Children.only(node) as React.ReactElement<any>;

          // Need this to handle disabled elements of default Tooltip.
          if (type === TooltipType.Default) {
            const defaultReferenceClassNames: string = mergeClasses([
              'tooltip-reference',
              { [node.props.className]: !!node.props.className },
              { [node.props.classNames]: !!node.props.classNames },
            ]);

            const clonedElementProps: RenderProps = {
              id: node.props?.id ? node.props?.id : tooltipReferenceId?.current,
              key: node.props?.key ? node.props?.key : tooltipId?.current,
              'data-reference-id': tooltipReferenceId?.current,
            };

            const defaultMergedClasses: string = node.props?.disabled
              ? mergeClasses([defaultReferenceClassNames, styles.disabled])
              : defaultReferenceClassNames;

            // Compares for octuple react prop vs native react html classes.
            if (node.props?.className) {
              clonedElementProps['className'] = defaultMergedClasses;
            } else if (child.props.classNames) {
              clonedElementProps['classNames'] = defaultMergedClasses;
            }

            return cloneElement(child, clonedElementProps);
          }
        }
        return node;
      };

      const getPopupReferenceElement = (
        node: React.ReactNode
      ): JSX.Element | React.ReactNode => {
        if (React.isValidElement(node)) {
          const child = React.Children.only(node) as React.ReactElement<any>;

          // Utilize a similar element clone pattern as Dropdown
          // for more complex Popup elements.
          const popupReferenceClassNames: string = mergeClasses([
            'tooltip-reference',
            { [styles.triggerAbove]: !!triggerAbove },
            // Add any classnames added to the reference element
            { [child.props.className]: !!child.props.className },
            { [child.props.classNames]: !!child.props.classNames },
            { [styles.disabled]: disabled },
          ]);

          const clonedElementProps: RenderProps = {
            ...{
              [TRIGGER_TO_HANDLER_MAP_ON_ENTER[mergedTrigger]]: toggle(true),
            },
            id: child.props?.id ? child.props?.id : tooltipReferenceId?.current,
            key: child.props?.key ? child.props?.key : tooltipId?.current,
            onClick: (event: React.MouseEvent<Element, MouseEvent>) => {
              child.props.onClick?.(event);
              handleReferenceClick(event);
            },
            onKeyDown: (event: React.KeyboardEvent<Element>) => {
              child.props.onKeyDown?.(event);
              if (!isMobile && !isTouchSupported()) {
                handleReferenceKeyDown(event);
              }
            },
            'aria-controls': tooltipId?.current,
            'aria-expanded': mergedVisible,
            'aria-haspopup': true,
            role: 'button',
            'data-reference-id': tooltipReferenceId?.current,
            tabIndex: `${tabIndex}`,
          };

          // Compares for octuple react prop vs native react html classes.
          if (child.props.className) {
            clonedElementProps['className'] = popupReferenceClassNames;
          } else if (child.props.classNames) {
            clonedElementProps['classNames'] = popupReferenceClassNames;
          }

          return cloneElement(child, clonedElementProps);
        }
        return (
          <div
            aria-controls={tooltipId?.current}
            aria-expanded={mergedVisible}
            aria-haspopup={true}
            className={mergeClasses([
              { [styles.triggerAbove]: !!triggerAbove },
              { [styles.disabled]: disabled },
            ])}
            id={tooltipReferenceId?.current}
            key={tooltipId?.current}
            onClick={handleReferenceClick}
            onKeyDown={handleReferenceKeyDown}
            role="button"
            tab-index={tabIndex}
          >
            {node}
          </div>
        );
      };

      const getTooltip = (): JSX.Element =>
        mergedVisible && (
          <ConditionalWrapper
            condition={type === TooltipType.Popup}
            wrapper={(children) => (
              <FloatingFocusManager
                context={context}
                key={tooltipId?.current}
                modal={false}
                order={['reference', 'content']}
                returnFocus={false}
              >
                {children}
              </FloatingFocusManager>
            )}
          >
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
              onKeyDown={
                type === TooltipType.Popup ? handleFloatingKeyDown : null
              }
              ref={floating}
              role="tooltip"
              style={tooltipStyles}
              tabIndex={tabIndex}
            >
              {content}
              {visibleArrow && (
                <div
                  className={styles.arrow}
                  ref={arrowRef}
                  style={arrowStyle}
                />
              )}
            </div>
          </ConditionalWrapper>
        );

      const getConditionalWrapper = (): JSX.Element => (
        <ConditionalWrapper
          condition={portal}
          wrapper={(children) => (
            <FloatingPortal id={portalId} root={portalRoot}>
              {children}
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
            id={tooltipId?.current}
            onClick={
              !mergedTrigger.includes('hover') ? handleReferenceClick : null
            }
            onKeyDown={
              !isMobile && !isTouchSupported() ? handleReferenceKeyDown : null
            }
            onMouseEnter={
              mergedTrigger.includes('hover') && !mergedVisible
                ? toggle(true, showTooltip)
                : null
            }
            onMouseLeave={
              mergedTrigger.includes('hover') && mergedVisible
                ? toggle(false, showTooltip)
                : null
            }
            onFocus={
              mergedTrigger.includes('hover') && !mergedVisible
                ? toggle(true, showTooltip)
                : null
            }
            onBlur={
              mergedTrigger.includes('hover') && mergedVisible
                ? toggle(false, showTooltip)
                : null
            }
            ref={reference}
          >
            {getDefaultReferenceElement(children)}
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
          {...(TRIGGER_TO_HANDLER_MAP_ON_LEAVE[mergedTrigger]
            ? {
                [TRIGGER_TO_HANDLER_MAP_ON_LEAVE[mergedTrigger]]: toggle(
                  false,
                  showTooltip
                ),
              }
            : {})}
        >
          {getPopupReferenceElement(children)}
          {getConditionalWrapper()}
        </div>
      );

      return type === TooltipType.Default ? getDefault() : getPopup();
    }
  )
);
