import React, { cloneElement, FC, useEffect, useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import { autoUpdate, shift } from '@floating-ui/react-dom';
import { offset as fOffset } from '@floating-ui/core';
import {
    ConditionalWrapper,
    mergeClasses,
    uniqueId,
} from '../../shared/utilities';
import {
    FloatingPortal,
    safePolygon,
    useClick,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
} from '@floating-ui/react-dom-interactions';
import { Menu } from '../Menu';
import { useMergedState } from '../../hooks/useMergedState';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import styles from './dropdown.module.scss';

const ANIMATION_DURATION = 200;

export const Dropdown: FC<DropdownProps> = React.memo(
    ({
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
        disabled,
        closeOnDropdownClick = true,
        closeOnOutsideClick = true,
        visible,
        onClickOutside,
        width,
        height,
    }) => {
        const [mergedVisible, setVisible] = useMergedState<boolean>(false, {
            value: visible,
        });

        const [closing, setClosing] = useState<boolean>(false);
        const [dropdownId] = useState<string>(uniqueId('dropdown-'));

        let timeout: ReturnType<typeof setTimeout>;

        const toggle: Function = (show: boolean) => {
            // to control the toggle behaviour
            setClosing(!show);
            timeout && clearTimeout(timeout);
            timeout = setTimeout(
                () => {
                    setVisible(show);
                    onVisibleChange?.(show);
                },
                !show ? ANIMATION_DURATION : 0
            );
        };

        const { x, y, reference, floating, strategy, update, refs, context } =
            useFloating({
                open: mergedVisible,
                onOpenChange: (open) =>
                    toggle(trigger === 'hover' ? open : !mergedVisible),
                placement,
                strategy: positionStrategy,
                middleware: [fOffset(offset), shift()],
            });

        const { getReferenceProps, getFloatingProps } = useInteractions([
            useHover(context, {
                handleClose: safePolygon({ restMs: 25 }),
                enabled: trigger === 'hover',
                move: false,
                delay: { open: 75 },
            }),
            useClick(context, {
                pointerDown: true,
                keyboardHandlers: true,
            }),
            useDismiss(context, {
                outsidePointerDown: false,
                referencePointerDown: closeOnDropdownClick,
                ancestorScroll: true,
            }),
            useFocus(context),
        ]);

        useOnClickOutside(
            refs.reference,
            (e) => {
                if (closeOnOutsideClick) {
                    toggle(false);
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
            top: y ?? '',
            left: x ?? '',
            width: width ?? '',
            height: height ?? '',
        };

        const getReference = (): JSX.Element => {
            const child = React.Children.only(
                children
            ) as React.ReactElement<any>;
            const referenceWrapperClasses: string = mergeClasses([
                styles.referenceWrapper,
                // Add any classnames added to the reference element
                { [child.props.className]: child.props.className },
                { [styles.disabled]: disabled },
            ]);
            return cloneElement(child, {
                className: referenceWrapperClasses,
                role: 'button',
                ...getReferenceProps(),
            });
        };

        const getDropdown = (): JSX.Element =>
            mergedVisible && (
                <div
                    ref={floating}
                    style={dropdownStyles}
                    className={dropdownClasses}
                    tabIndex={0}
                    id={dropdownId}
                    onClick={() => closeOnDropdownClick && toggle(false)}
                    {...getFloatingProps()}
                >
                    {overlay}
                </div>
            );

        return (
            <div className={mainWrapperClasses} style={style} ref={reference}>
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
    }
);
