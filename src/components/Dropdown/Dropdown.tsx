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
import {
  ConditionalWrapper,
  eventKeys,
  mergeClasses,
  uniqueId,
} from '../../shared/utilities';

import styles from './dropdown.module.scss';

export const Dropdown: FC<DropdownProps> = React.memo(
  React.forwardRef<DropdownRef, DropdownProps>(
    (
      {
        children,
        classNames,
        closeOnDropdownClick = true,
        closeOnReferenceClick = true,
        closeOnOutsideClick = true,
        disabled,
        dropdownClassNames,
        dropdownStyle,
        height,
        offset = 4,
        onClickOutside,
        onVisibleChange,
        overlay,
        placement = 'bottom-start',
        portal = false,
        positionStrategy = 'absolute',
        referenceOnClick,
        role = 'listbox',
        showDropdown,
        style,
        tabIndex = 0,
        trigger = 'click',
        visible,
        width,
      },
      ref: React.ForwardedRef<DropdownRef>
    ) => {
      const [mergedVisible, setVisible] = useMergedState<boolean>(false, {
        value: visible,
      });

      const [closing, setClosing] = useState<boolean>(false);
      const dropdownId: string = uniqueId('dropdown-');
      const [dropdownReferenceId, setReferenceElementId] = useState<string>(
        `${dropdownId}reference`
      );

      let timeout: ReturnType<typeof setTimeout>;
      const { x, y, reference, floating, strategy, update, refs, context } =
        useFloating({
          placement,
          strategy: positionStrategy,
          middleware: [fOffset(offset), flip(), shift()],
        });

      const toggle: Function =
        (show: boolean, showDropdown = (show: boolean) => show): Function =>
        (e: SyntheticEvent): void => {
          // to control the toggle behaviour
          const updatedShow = showDropdown(show);
          if (PREVENT_DEFAULT_TRIGGERS.includes(trigger)) {
            e.preventDefault();
          }
          setClosing(!updatedShow);
          timeout && clearTimeout(timeout);
          timeout = setTimeout(
            () => {
              setVisible(updatedShow);
              onVisibleChange?.(updatedShow);
            },
            !show ? ANIMATION_DURATION : 0
          );
        };

      useImperativeHandle(ref, () => ({
        update,
      }));

      useOnClickOutside(
        refs.floating,
        (e) => {
          const referenceElement: HTMLElement =
            document.getElementById(dropdownReferenceId);
          if (closeOnOutsideClick && closeOnReferenceClick) {
            toggle(false)(e);
          }
          if (
            !closeOnReferenceClick &&
            !referenceElement.contains(e.target as Node)
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
          }, ANIMATION_DURATION);
        }
        if (
          event?.key === eventKeys.ESCAPE ||
          (event?.key === eventKeys.TAB &&
            event.shiftKey &&
            !(event.target as HTMLElement).matches(':focus-within'))
        ) {
          toggle(false)(event);
        }
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
      };

      const getReference = (): JSX.Element => {
        const child = React.Children.only(children) as React.ReactElement<any>;
        const referenceWrapperClassNames: string = mergeClasses([
          styles.referenceWrapper,
          // Add any classnames added to the reference element
          { [child.props.className]: child.props.className },
          { [styles.disabled]: disabled },
        ]);
        if (child.props.id && dropdownReferenceId !== child.props.id) {
          setReferenceElementId(child.props.id);
        }
        return cloneElement(child, {
          ...{
            [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(true),
          },
          id: dropdownReferenceId,
          onClick: handleReferenceClick,
          onKeyDown: handleReferenceKeyDown,
          className: referenceWrapperClassNames,
          'aria-controls': dropdownId,
          'aria-expanded': mergedVisible,
          'aria-haspopup': true,
          role: 'button',
          tabIndex: tabIndex,
        });
      };

      const getDropdown = (): JSX.Element =>
        mergedVisible && (
          <FloatingFocusManager
            context={context}
            key={dropdownId}
            modal={false}
            order={['reference', 'content']}
            returnFocus={false}
          >
            <div
              ref={floating}
              style={dropdownStyles}
              className={dropdownClasses}
              tabIndex={0}
              onClick={
                closeOnDropdownClick ? toggle(false, showDropdown) : null
              }
              onKeyDown={handleFloatingKeyDown}
              id={dropdownId}
              role={role}
            >
              {overlay}
            </div>
          </FloatingFocusManager>
        );

      return (
        <div
          className={mainWrapperClasses}
          style={style}
          ref={reference}
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
            wrapper={(children) => <FloatingPortal>{children}</FloatingPortal>}
          >
            {getDropdown()}
          </ConditionalWrapper>
        </div>
      );
    }
  )
);
