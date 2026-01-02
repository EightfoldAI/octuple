'use client';

import React, {
  cloneElement,
  FC,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  autoUpdate,
  flip,
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
  TRIGGER_TO_HANDLER_MAP_ON_ENTER,
  TRIGGER_TO_HANDLER_MAP_ON_LEAVE,
  DropdownProps,
  DropdownRef,
} from './Dropdown.types';
import { Menu } from '../Menu';
import { useMergedState } from '../../hooks/useMergedState';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { usePreviousState } from '../../hooks/usePreviousState';
import {
  canUseDocElement,
  ConditionalWrapper,
  eventKeys,
  focusable,
  mergeClasses,
  SELECTORS,
  uniqueId,
} from '../../shared/utilities';

import styles from './dropdown.module.scss';

export const Dropdown: FC<DropdownProps> = React.memo(
  React.forwardRef<DropdownRef, DropdownProps>(
    (
      {
        ariaRef,
        ariaHaspopupValue = 'true',
        children,
        classNames,
        closeOnDropdownClick = true,
        closeOnReferenceClick = true,
        closeOnOutsideClick = true,
        shouldCloseOnTab = false,
        disabled,
        dropdownClassNames,
        dropdownStyle,
        height,
        initialFocus = true,
        offset = 4,
        onClickOutside,
        onVisibleChange,
        overlay,
        placement = 'bottom-start',
        portal = false,
        positionStrategy = 'absolute',
        referenceRole = 'button',
        referenceOnClick,
        referenceOnKeydown,
        referenceWrapperClassNames,
        role = 'listbox',
        showDropdown,
        style,
        tabIndex = 0,
        trigger = 'click',
        visible,
        width,
        // Overlay should not be focusable by default to prevent issues with expected tab order
        overlayTabIndex = -1,
        overlayProps,
        toggleDropdownOnShiftTab = true,
      },
      ref: React.ForwardedRef<DropdownRef>
    ) => {
      const [mergedVisible, setVisible] = useMergedState<boolean>(false, {
        value: visible,
      });

      const [closing, setClosing] = useState<boolean>(false);
      const previouslyClosing: boolean = usePreviousState(closing);

      // TODO: Upgrade to React 18 and use the new `useId` hook.
      // This way the id will match on the server and client.
      // For now, pass an id via props if using SSR.
      const dropdownId: string = uniqueId('dropdown-');

      const [dropdownReferenceId, setReferenceElementId] = useState<string>(
        `${dropdownId}reference`
      );

      let timeout: ReturnType<typeof setTimeout>;
      const { x, y, strategy, update, refs, context } = useFloating({
        placement,
        strategy: positionStrategy,
        middleware: [fOffset(offset), flip(), shift()],
      });

      const intervalRef: React.MutableRefObject<NodeJS.Timer> =
        useRef<NodeJS.Timer>(null);

      const firstFocusableElement = (): HTMLElement => {
        const getFocusableElements = (): HTMLElement[] => {
          return [
            ...(refs.floating?.current.querySelectorAll(
              SELECTORS
            ) as unknown as HTMLElement[]),
          ].filter((el: HTMLElement) => focusable(el));
        };
        const focusableElements: HTMLElement[] = refs.floating?.current
          ? getFocusableElements?.()
          : null;
        return focusableElements?.[0];
      };

      const getFocusableItems = (): HTMLElement[] => {
        if (!refs.floating.current) return [];

        return Array.from(
          refs.floating.current.querySelectorAll<HTMLElement>(SELECTORS)
        ).filter((el) => focusable(el));
      };

      const focusFirstElement = (): void => {
        const elementToFocus: HTMLElement = firstFocusableElement?.();
        clearInterval(intervalRef?.current);
        intervalRef.current = setInterval((): void => {
          elementToFocus?.focus();
          if (document.activeElement === elementToFocus) {
            clearInterval(intervalRef?.current);
          }
        }, ANIMATION_DURATION);
      };

      const focusOnElement = (elementToFocus: HTMLElement): void => {
        elementToFocus?.focus();
      };

      const toggle: Function =
        (show: boolean, showDropdown = (show: boolean) => show): Function =>
        (e: SyntheticEvent): void => {
          // to control the toggle behaviour
          const updatedShow: boolean = showDropdown(show);
          if (PREVENT_DEFAULT_TRIGGERS.includes(trigger)) {
            e.preventDefault();
          }
          setClosing(!updatedShow);
          timeout && clearTimeout(timeout);
          timeout = setTimeout(
            () => {
              setVisible(updatedShow);
              if (!previouslyClosing) {
                setClosing(false);
              }
              onVisibleChange?.(updatedShow);
            },
            !show ? ANIMATION_DURATION : 0
          );
        };

      useImperativeHandle(ref, () => ({
        focusFirstElement,
        focusOnElement,
        update,
      }));

      useOnClickOutside(
        refs.floating,
        (e) => {
          let referenceElement: HTMLElement;
          if (canUseDocElement()) {
            referenceElement = document.getElementById(dropdownReferenceId);
          }
          if (closeOnOutsideClick && closeOnReferenceClick && !mergedVisible) {
            toggle(false)(e);
          }
          if (
            !closeOnReferenceClick &&
            !referenceElement.contains(e.target as Node) &&
            !mergedVisible
          ) {
            toggle(false)(e);
          }
          onClickOutside?.(e);
        },
        mergedVisible
      );

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

      // Add a new useEffect to update position when overlay content changes
      useEffect(() => {
        if (mergedVisible && refs.floating.current) {
          // Update the position when the overlay content changes
          update();
        }
      }, [overlay, mergedVisible, update, refs.floating]);

      const dropdownClasses: string = mergeClasses([
        dropdownClassNames,
        styles.dropdownWrapper,
        // Temp hack till we find a better solution
        { [styles.noPadding]: overlay.type === Menu },
        { [styles.open]: mergedVisible },
        { [styles.close]: closing },
      ]);

      const mainWrapperClasses: string = mergeClasses([
        classNames,
        styles.mainWrapper,
      ]);

      const dropdownStyles: React.CSSProperties = {
        ...dropdownStyle,
        position: strategy,
        top: Math.floor(y) ?? '',
        left: Math.floor(x) ?? '',
        width: width ?? '',
        height: height ?? '',
      };

      const handleReferenceClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        if (disabled) {
          return;
        }
        referenceOnClick?.(event);
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (mergedVisible && closeOnReferenceClick) {
            toggle(false)(event);
          } else {
            toggle(true)(event);
          }
        }, ANIMATION_DURATION);
      };

      const handleReferenceKeyDown = (event: React.KeyboardEvent): void => {
        event.stopPropagation();
        if (disabled) {
          return;
        }
        referenceOnKeydown?.(event);
        if (
          (event?.key === eventKeys.ENTER || event?.key === eventKeys.SPACE) &&
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
          }, ANIMATION_DURATION);
        }
        if (
          event?.key === eventKeys.ARROWDOWN &&
          document.activeElement === event.target &&
          !mergedVisible
        ) {
          event?.preventDefault();
          toggle(true)(event);
        }
        if (
          event?.key === eventKeys.ARROWUP &&
          document.activeElement === event.target &&
          mergedVisible
        ) {
          event?.preventDefault();
          toggle(false)(event);
        }
        if (event?.key === eventKeys.ESCAPE) {
          toggle(false)(event);
        }
        if (event?.key === eventKeys.TAB && mergedVisible && shouldCloseOnTab) {
          toggle(false)(event);
        }
        if (
          event?.key === eventKeys.TAB &&
          event.shiftKey &&
          !(event.target as HTMLElement).matches(':focus-within')
        ) {
          toggle(false)(event);
        }
      };

      const handleFloatingKeyDown = (event: React.KeyboardEvent): void => {
        if (
          !event.defaultPrevented &&
          (event.key === eventKeys.ARROWDOWN || event.key === eventKeys.ARROWUP)
        ) {
          const items = getFocusableItems();
          const currentIndex = items.indexOf(
            document.activeElement as HTMLElement
          );

          if (event.key === eventKeys.ARROWDOWN) {
            event.preventDefault();
            const next = items[currentIndex + 1] || items[0];
            next?.focus();
            return;
          }

          if (event.key === eventKeys.ARROWUP) {
            event.preventDefault();
            const prev = items[currentIndex - 1] || items[items.length - 1];
            prev?.focus();
            return;
          }
        }

        if (event.key === eventKeys.ESCAPE) {
          toggle(false)(event);
          return;
        }

        if (event?.key === eventKeys.TAB && mergedVisible && !event.shiftKey) {
          if (shouldCloseOnTab) {
            toggle(false)(event);
          } else {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
              if (
                refs.floating.current &&
                !refs.floating.current.contains(document.activeElement)
              ) {
                toggle(false)(event);
              }
            }, NO_ANIMATION_DURATION);
          }
        }
        if (event?.key === eventKeys.TAB && event.shiftKey && mergedVisible) {
          timeout && clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (!refs.floating.current.matches(':focus-within')) {
              toggle(toggleDropdownOnShiftTab)(event);
            }
          }, NO_ANIMATION_DURATION);
        }
      };

      const getReference = (): JSX.Element => {
        const child = React.Children.only(children) as React.ReactElement<any>;
        const referenceWrapperClasses: string = mergeClasses([
          styles.referenceWrapper,
          // Add any classnames added to the reference element
          { [child.props.className]: !!child.props.className },
          { [child.props.classNames]: !!child.props.classNames },
          { [styles.disabled]: disabled },
          referenceWrapperClassNames,
        ]);
        // If there's an id and it does not yet match the state, update dropdownReferenceId.
        // This compare ensures setState is only called when needed.
        if (child.props.id && dropdownReferenceId !== child.props.id) {
          setReferenceElementId(child.props.id);
        }
        // If there's an ariaRef, apply the a11y attributes to it, rather than the immediate child.
        if (ariaRef?.current) {
          ariaRef.current.setAttribute('aria-expanded', `${mergedVisible}`);

          // Only add aria-haspopup for non-combobox elements if it is not already set
          const currentRole = ariaRef.current.getAttribute('role');
          const currentAriaHaspopup =
            ariaRef.current.getAttribute('aria-haspopup');
          if (currentRole !== 'combobox' && !currentAriaHaspopup) {
            ariaRef.current.setAttribute('aria-haspopup', ariaHaspopupValue);
          }

          if (!ariaRef.current.hasAttribute('aria-controls')) {
            ariaRef.current.setAttribute('aria-controls', dropdownId);
          }

          if (!ariaRef.current.hasAttribute('role')) {
            ariaRef.current.setAttribute('role', referenceRole);
          }

          return cloneElement(child, {
            ...{
              [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(true),
            },
            className: referenceWrapperClasses,
            id: dropdownReferenceId,
            onClick: handleReferenceClick,
            onKeyDown: handleReferenceKeyDown,
          });
        }

        return cloneElement(child, {
          ...{
            [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(true),
          },
          id: dropdownReferenceId,
          onClick: handleReferenceClick,
          onKeyDown: handleReferenceKeyDown,
          className: referenceWrapperClasses,
          'aria-controls': dropdownId,
          'aria-expanded': mergedVisible,
          'aria-haspopup':
            child.props?.['aria-haspopup'] ??
            (child.props.role !== 'combobox' ? ariaHaspopupValue : undefined),
          role: child.props?.role || referenceRole,
          tabIndex: tabIndex,
        });
      };

      useEffect(() => {
        if (initialFocus && mergedVisible) {
          focusFirstElement();
        }
        if (!mergedVisible && previouslyClosing) {
          const referenceElement: HTMLElement =
            document.getElementById(dropdownReferenceId);
          referenceElement?.focus();
        }
        if (!mergedVisible) {
          clearInterval(intervalRef?.current);
        }
      }, [
        dropdownReferenceId,
        initialFocus,
        intervalRef,
        mergedVisible,
        previouslyClosing,
      ]);

      const getDropdown = (): JSX.Element =>
        mergedVisible && (
          <FloatingFocusManager
            context={context}
            key={dropdownId}
            modal={false}
            order={['reference', 'content']}
            initialFocus={-1}
            returnFocus={false}
          >
            <div
              ref={refs.setFloating}
              style={dropdownStyles as React.CSSProperties}
              className={dropdownClasses}
              tabIndex={overlayTabIndex}
              onClick={
                closeOnDropdownClick ? toggle(false, showDropdown) : null
              }
              onKeyDown={handleFloatingKeyDown}
              id={dropdownId}
              role={role}
              {...overlayProps}
            >
              {overlay}
            </div>
          </FloatingFocusManager>
        );

      return (
        <div
          className={mainWrapperClasses}
          style={style}
          ref={refs.setReference}
          {...(TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger]
            ? {
                [TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger]]: toggle(
                  false,
                  showDropdown
                ),
              }
            : {})}
        >
          {getReference()}
          <ConditionalWrapper
            condition={portal}
            wrapper={(children) => (
              <FloatingPortal preserveTabOrder>{children}</FloatingPortal>
            )}
          >
            {getDropdown()}
          </ConditionalWrapper>
        </div>
      );
    }
  )
);
