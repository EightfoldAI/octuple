import React, {
  cloneElement,
  FC,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
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
import { DropdownProps, DropdownRef } from './Dropdown.types';
import { Menu } from '../Menu';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useMergedState } from '../../hooks/useMergedState';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import {
  ConditionalWrapper,
  mergeClasses,
  uniqueId,
} from '../../shared/utilities';

import styles from './dropdown.module.scss';

const ANIMATION_DURATION: number = 200;

const PREVENT_DEFAULT_TRIGGERS: string[] = ['contextmenu'];

const TRIGGER_TO_HANDLER_MAP_ON_ENTER = {
  click: 'onClick',
  hover: 'onMouseEnter',
  contextmenu: 'onContextMenu',
};

const TRIGGER_TO_HANDLER_MAP_ON_LEAVE = {
  click: '',
  hover: 'onMouseLeave',
  contextmenu: '',
};

export const Dropdown: FC<DropdownProps> = React.memo(
  React.forwardRef<DropdownRef, DropdownProps>(
    (
      {
        children,
        classNames,
        closeOnDropdownClick = true,
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
        role = 'listbox',
        showDropdown,
        style,
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
          if (closeOnOutsideClick) {
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
        top: y ?? '',
        left: x ?? '',
        width: width ?? '',
        height: height ?? '',
      };

      const getReference = (): JSX.Element => {
        const child = React.Children.only(children) as React.ReactElement<any>;
        const referenceWrapperClasses: string = mergeClasses([
          styles.referenceWrapper,
          // Add any classnames added to the reference element
          { [child.props.className]: child.props.className },
          { [styles.disabled]: disabled },
        ]);
        return cloneElement(child, {
          ...{
            [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(true),
          },
          onClick: toggle(!mergedVisible),
          className: referenceWrapperClasses,
          'aria-controls': dropdownId,
          'aria-expanded': mergedVisible,
          'aria-haspopup': true,
          role: 'button',
          tabIndex: '0',
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
              role={role}
              tabIndex={0}
              onClick={
                closeOnDropdownClick ? toggle(false, showDropdown) : null
              }
              id={dropdownId}
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
