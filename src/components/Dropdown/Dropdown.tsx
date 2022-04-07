import React, { FC, useEffect, useRef, useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import { autoUpdate, shift, useFloating } from '@floating-ui/react-dom';
import { offset as fOffset } from '@floating-ui/core';
import { classNames } from '../../shared/utilities';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import styles from './dropdown.module.scss';

const TRIGGER_TO_HANDLER_MAP = {
    click: 'onClick',
    hover: 'onMouseEnter',
    contextmenu: 'onContextMenu',
};

const ANIMATION_DURATION = 200;

export const Dropdown: FC<DropdownProps> = ({
    trigger = 'click',
    className,
    style,
    dropdownClassName,
    dropdownStyle,
    children,
    placement = 'bottom-start',
    overlay,
    offset = 0,
    positionStrategy = 'fixed',
}) => {
    const mainWrapperRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [closing, setClosing] = useState<boolean>(false);
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

    useOnClickOutside(mainWrapperRef, toggle(false));

    useEffect(() => {
        if (!refs.reference.current || !refs.floating.current) {
            return null;
        }

        // Only call this when the floating element is rendered
        return autoUpdate(
            refs.reference.current,
            refs.floating.current,
            update
        );
    }, [refs.reference, refs.floating, update]);

    const dropdownClasses: string = classNames([
        dropdownClassName,
        styles.dropdownWrapper,
        { [styles.open]: visible },
        { [styles.close]: closing },
    ]);

    const mainWrapperClasses: string = classNames([
        className,
        styles.mainWrapper,
    ]);

    const referenceWrapperClasses: string = classNames([
        styles.referenceWrapper,
        { [styles.disabled]: false },
    ]);

    const dropdownStyles: React.CSSProperties = {
        ...dropdownStyle,
        position: strategy,
        top: y ?? '',
        left: x ?? '',
    };

    const getReference = (): JSX.Element => (
        <div
            {...{ [TRIGGER_TO_HANDLER_MAP[trigger]]: toggle(true) }}
            ref={reference}
            className={referenceWrapperClasses}
        >
            {children}
        </div>
    );

    const getDropdown = (): JSX.Element =>
        visible && (
            <div
                ref={floating}
                style={dropdownStyles}
                className={dropdownClasses}
                tabIndex={0}
                onClick={toggle(false)}
            >
                {overlay}
            </div>
        );

    return (
        <div
            ref={mainWrapperRef}
            className={mainWrapperClasses}
            aria-expanded={visible}
            aria-haspopup={true}
            style={style}
        >
            {getReference()}
            {getDropdown()}
        </div>
    );
};
