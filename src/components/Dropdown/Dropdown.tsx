import React, {
    FC,
    useEffect,
    cloneElement,
    useState,
    SyntheticEvent,
} from 'react';
import { DropdownProps } from './Dropdown.types';
import { autoUpdate, shift, useFloating } from '@floating-ui/react-dom';
import { offset as fOffset } from '@floating-ui/core';
import {
    ConditionalWrapper,
    mergeClasses,
    uniqueId,
} from '../../shared/utilities';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useAccessibility } from '../../hooks/useAccessibility';
import styles from './dropdown.module.scss';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';

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

const PREVENT_DEFAULT_TRIGGERS = ['contextmenu'];

const ANIMATION_DURATION = 200;

export const Dropdown: FC<DropdownProps> = ({
    trigger = 'click',
    classNames,
    style,
    dropdownClassNames,
    dropdownStyle,
    children,
    placement = 'bottom-start',
    portal = false,
    overlay,
    offset = 4,
    positionStrategy = 'absolute',
    onVisibleChange,
    showDropdown,
    disabled,
    closeOnDropdownClick = true,
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [closing, setClosing] = useState<boolean>(false);
    const [dropdownId] = useState<string>(uniqueId('dropdown-'));

    let timeout: ReturnType<typeof setTimeout>;
    const { x, y, reference, floating, strategy, update, refs } = useFloating({
        placement,
        strategy: positionStrategy,
        middleware: [fOffset(offset), shift()],
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
                },
                !show ? ANIMATION_DURATION : 0
            );
        };

    useOnClickOutside(refs.reference, toggle(false), visible);

    useEffect(() => {
        onVisibleChange?.(visible);
    }, [visible]);

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

    useAccessibility(trigger, refs.reference, toggle(true), toggle(false));
    const dropdownClasses: string = mergeClasses([
        dropdownClassNames,
        styles.dropdownWrapper,
        { [styles.open]: visible },
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
            ...{ [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(true) },
            onClick: toggle(!visible),
            className: referenceWrapperClasses,
            'aria-controls': dropdownId,
            'aria-expanded': visible,
            'aria-haspopup': true,
            role: 'button',
            tabIndex: '0',
        });
    };

    const getDropdown = (): JSX.Element =>
        visible && (
            <div
                ref={floating}
                style={dropdownStyles}
                className={dropdownClasses}
                tabIndex={0}
                onClick={
                    closeOnDropdownClick ? toggle(false, showDropdown) : null
                }
                id={dropdownId}
            >
                {overlay}
            </div>
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
                wrapper={(children) => (
                    <FloatingPortal>{children}</FloatingPortal>
                )}
            >
                {getDropdown()}
            </ConditionalWrapper>
        </div>
    );
};
