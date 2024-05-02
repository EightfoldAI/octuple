'use client';

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
  TooltipTouchInteraction,
} from './Tooltip.types';
import { useParentComponents } from '../ConfigProvider/ParentComponentsContext';
import useGestures, { Gestures } from '../../hooks/useGestures';
import { useMergedState } from '../../hooks/useMergedState';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import {
  canUseDocElement,
  cloneElement,
  ConditionalWrapper,
  eventKeys,
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
        disableContextMenu = false,
        disabled,
        dropShadow = true,
        height,
        hideAfter = ANIMATION_DURATION,
        id,
        maxWidth,
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
        preventTouchMoveDefault,
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
        touchInteraction = TooltipTouchInteraction.TapAndHold,
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

      // TODO: Upgrade to React 18 and use the new `useId` hook.
      // This way the id will match on the server and client.
      // For now, pass an id via props if using SSR.
      const tooltipId: React.MutableRefObject<string> = useRef<string>(
        id || uniqueId('tooltip-')
      );

      const tooltipReferenceId: React.MutableRefObject<string> = useRef<string>(
        `${tooltipId?.current}-reference`
      );
      const tooltipWrapperId: React.MutableRefObject<string> = useRef<string>(
        `${tooltipId?.current}-wrapper`
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

      const parentComponents = useParentComponents();
      const gestureType: Gestures = useGestures(
        refs.reference?.current as HTMLElement,
        preventTouchMoveDefault ?? !parentComponents.includes('Carousel')
      );

      const toggle: Function =
        (show: boolean, showTooltip = (show: boolean) => show): Function =>
        (e: SyntheticEvent): void => {
          if (!content || disabled) {
            return;
          }
          // to control the toggle behaviour
          const updatedShow: boolean = showTooltip(show);
          if (PREVENT_DEFAULT_TRIGGERS.includes(trigger)) {
            e?.preventDefault();
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

      useEffect(() => {
        const escapeTooltip = (event: KeyboardEvent): void => {
          if (event?.key === eventKeys.ESCAPE) {
            toggle(false)(event);
          }
        };
        if (type === TooltipType.Default && canUseDocElement()) {
          document.addEventListener('keydown', escapeTooltip);
        }
        return () => {
          if (canUseDocElement()) {
            document.removeEventListener('keydown', escapeTooltip);
          }
        };
      }, [type]);

      useEffect(() => {
        let referenceElement: HTMLElement | null = null;
        if (canUseDocElement()) {
          referenceElement = document.querySelector(
            `.tooltip-reference[data-reference-id="${tooltipReferenceId?.current}"]`
          );
        }
        if (disableContextMenu) {
          referenceElement?.addEventListener('contextmenu', (e) =>
            e?.preventDefault()
          );
        }
        return () => {
          if (disableContextMenu) {
            referenceElement?.removeEventListener('contextmenu', (e) =>
              e?.preventDefault()
            );
          }
        };
      }, [disableContextMenu]);

      useImperativeHandle(ref, () => ({
        update,
      }));

      useOnClickOutside(
        refs.floating,
        (e) => {
          let referenceElement: HTMLElement | null = null;
          if (canUseDocElement()) {
            referenceElement = document.querySelector(
              `.tooltip-reference[data-reference-id="${tooltipReferenceId?.current}"]`
            );
          }
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
          canUseDocElement() &&
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
        maxWidth: maxWidth ?? '',
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
              { [node.props.className]: !!node.props.className },
              { [node.props.classNames]: !!node.props.classNames },
              'tooltip-reference',
            ]);

            const clonedElementProps: RenderProps = {
              id: node.props?.id ? node.props?.id : tooltipReferenceId?.current,
              key: node.props?.key ? node.props?.key : tooltipId?.current,
              // If the content is not a string, the element of the content should be
              // manually targeted by id via `aria-describedby` to be announced by screen readers.
              // As this is an edge case, don't worry about it here, instead take the override if available.
              'aria-describedby': node.props?.['aria-describedby']
                ? node.props?.['aria-describedby']
                : tooltipId?.current,
              'data-reference-id': tooltipReferenceId?.current,
            };

            // Compares for octuple react prop vs native react html classes.
            if (node.props?.className) {
              clonedElementProps['className'] = defaultReferenceClassNames;
            } else if (child.props.classNames) {
              clonedElementProps['classNames'] = defaultReferenceClassNames;
            } else {
              clonedElementProps['className'] = defaultReferenceClassNames;
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
            { [styles.triggerAbove]: !!triggerAbove },
            // Add any classnames added to the reference element
            { [child.props.className]: !!child.props.className },
            { [child.props.classNames]: !!child.props.classNames },
            'tooltip-reference',
          ]);

          const clonedElementProps: RenderProps = {
            ...{
              [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(!gestureType),
            },
            id: child.props?.id ? child.props?.id : tooltipReferenceId?.current,
            key: child.props?.key ? child.props?.key : tooltipId?.current,
            onClick: (event: React.MouseEvent<Element, MouseEvent>): void => {
              if (!trigger.includes('hover')) {
                child.props.onClick?.(event);
                handleReferenceClick(event);
              } else if (
                trigger.includes('hover') &&
                gestureType?.includes(touchInteraction)
              ) {
                event?.preventDefault();
                handleReferenceClick(event);
              }
            },
            onKeyDown: (event: React.KeyboardEvent<Element>): void => {
              child.props.onKeyDown?.(event);
              if (!gestureType) {
                handleReferenceKeyDown(event);
              }
            },
            onFocus: (event: React.FocusEvent<Element, FocusEvent>): void => {
              child.props.onFocus?.(event);
              if (trigger.includes('hover') && !mergedVisible && !gestureType) {
                toggle(true, showTooltip)(event);
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
            className={!!triggerAbove ? styles.triggerAbove : ''}
            id={tooltipReferenceId?.current}
            key={tooltipId?.current}
            onClick={(
              event: React.MouseEvent<HTMLDivElement, MouseEvent>
            ): void => {
              if (!trigger.includes('hover')) {
                handleReferenceClick(event);
              } else if (
                trigger.includes('hover') &&
                gestureType?.includes(touchInteraction)
              ) {
                event?.preventDefault();
                handleReferenceClick(event);
              }
            }}
            onKeyDown={!gestureType ? handleReferenceKeyDown : null}
            onFocus={
              trigger.includes('hover') && !mergedVisible && !gestureType
                ? toggle(true, showTooltip)
                : null
            }
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
              onMouseEnter={
                trigger.includes('hover') && mergedVisible && !gestureType
                  ? toggle(true, showTooltip)
                  : null
              }
              onMouseLeave={(
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ): void => {
                let referenceElement: HTMLElement | null = null;
                if (canUseDocElement()) {
                  referenceElement = document.querySelector(
                    `.tooltip-reference[data-reference-id="${tooltipReferenceId?.current}"]`
                  );
                }
                if (
                  trigger.includes('hover') &&
                  mergedVisible &&
                  !gestureType
                ) {
                  toggle(
                    !event.currentTarget &&
                      event.relatedTarget !== referenceElement,
                    showTooltip
                  )(event);
                }
              }}
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
            id={tooltipWrapperId?.current}
            onClick={(
              event: React.MouseEvent<HTMLDivElement, MouseEvent>
            ): void => {
              if (!trigger.includes('hover')) {
                handleReferenceClick(event);
              } else if (
                trigger.includes('hover') &&
                gestureType?.includes(touchInteraction)
              ) {
                event?.preventDefault();
                handleReferenceClick(event);
              }
            }}
            onKeyDown={!gestureType ? handleReferenceKeyDown : null}
            onMouseEnter={
              trigger.includes('hover') && !mergedVisible && !gestureType
                ? toggle(true, showTooltip)
                : null
            }
            onMouseLeave={(
              event: React.MouseEvent<HTMLDivElement, MouseEvent>
            ): void => {
              const floatingElement: HTMLElement = refs.floating.current;
              if (trigger.includes('hover') && mergedVisible && !gestureType) {
                toggle(
                  !event.currentTarget &&
                    event.relatedTarget !== floatingElement,
                  showTooltip
                )(event);
              }
            }}
            onFocus={
              trigger.includes('hover') && !mergedVisible && !gestureType
                ? toggle(true, showTooltip)
                : null
            }
            onBlur={
              trigger.includes('hover') && mergedVisible && !gestureType
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
          id={tooltipWrapperId?.current}
          style={wrapperStyle}
          ref={reference}
          {...(TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger] && !gestureType
            ? {
                [TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger]]: toggle(
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
