import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import { autoUpdate, shift, useFloating } from '@floating-ui/react-dom';
import { offset as fOffset } from '@floating-ui/core';
import { mergeClasses, uniqueId } from '../../shared/utilities';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import styles from './dropdown.module.scss';
import { Icon } from '../Icon';

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

const ANIMATION_DURATION = 200;

export const Dropdown: FC<DropdownProps> = ({
    trigger = 'click',
    classNames,
    style,
    dropdownClassNames,
    dropdownStyle,
    children,
    placement = 'bottom-start',
    overlay,
    offset = 0,
    positionStrategy = 'absolute',
    onVisibleChange,
    iconProps,
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
        (show: boolean): Function =>
        (): void => {
            setClosing(!show);
            timeout && clearTimeout(timeout);
            timeout = setTimeout(
                () => {
                    setVisible(show);
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

    const onHoverElementFocus = useCallback((e) => {
        if (
            refs.reference.current instanceof Element &&
            refs.reference.current?.contains(e.target)
        ) {
            return toggle(true)();
        }
        return toggle(false)();
    }, []);

    // To show dropdown on focus in of element
    useEffect(() => {
        if (trigger === 'hover') {
            document.addEventListener('focusin', onHoverElementFocus);
        }

        return () => {
            document.removeEventListener('focusout', onHoverElementFocus);
        };
    }, [trigger]);

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

    const referenceWrapperClasses: string = mergeClasses([
        styles.referenceWrapper,
        { [styles.disabled]: false },
    ]);

    const iconClassNames = mergeClasses([
        styles.iconStyle,
        { [styles.visible]: visible },
        { [styles.hidden]: !visible },
    ]);

    const dropdownStyles: React.CSSProperties = {
        ...dropdownStyle,
        position: strategy,
        top: y ?? '',
        left: x ?? '',
    };

    const referenceProps: object = {
        ...{ [TRIGGER_TO_HANDLER_MAP_ON_ENTER[trigger]]: toggle(true) },
    };

    let containerProps = {};

    if (TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger]) {
        containerProps = {
            [TRIGGER_TO_HANDLER_MAP_ON_LEAVE[trigger]]: toggle(false),
        };
    }

    const getReference = (): JSX.Element => {
        return (
            <button
                className={referenceWrapperClasses}
                aria-controls={dropdownId}
                aria-expanded={visible}
                aria-haspopup={true}
                {...referenceProps}
            >
                {children}
                {iconProps && (
                    <Icon classNames={iconClassNames} {...iconProps} />
                )}
            </button>
        );
    };

    const getDropdown = (): JSX.Element =>
        visible && (
            <div
                ref={floating}
                style={dropdownStyles}
                className={dropdownClasses}
                tabIndex={0}
                onClick={toggle(false)}
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
            {...containerProps}
        >
            {getReference()}
            {getDropdown()}
        </div>
    );
};
