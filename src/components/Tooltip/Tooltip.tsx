import React, { FC, useEffect, useRef, useState } from 'react';
import {
    arrow,
    autoUpdate,
    offset as fOffset,
    shift,
    useFloating,
} from '@floating-ui/react-dom';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { TooltipProps, TooltipSize, TooltipTheme } from './Tooltip.types';
import {
    cloneElement,
    ConditionalWrapper,
    generateId,
    mergeClasses,
} from '../../shared/utilities';

import styles from './tooltip.module.scss';

const TOOLTIP_ARROW_WIDTH = 8;

export const Tooltip: FC<TooltipProps> = ({
    children,
    offset = 8,
    theme,
    content,
    placement = 'bottom',
    portal = false,
    portalId,
    portalRoot,
    disabled,
    id,
    visibleArrow = true,
    classNames,
    openDelay = 0,
    hideAfter = 0,
    tabIndex = 0,
    positionStrategy = 'absolute',
    wrapperClassNames,
    wrapperStyle,
    size = TooltipSize.Small,
    ...rest
}) => {
    const tooltipSide: string = placement.split('-')?.[0];
    const [visible, setVisible] = useState<boolean>(false);
    const arrowRef = useRef<HTMLDivElement>(null);
    const tooltipId = useRef<string>(id || generateId());
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

    const toggle: Function =
        (show: boolean): Function =>
        (): void => {
            if (!content || disabled) {
                return;
            }
            timeout && clearTimeout(timeout);
            timeout = setTimeout(
                () => {
                    setVisible(show);
                },
                show ? openDelay : hideAfter
            );
        };

    const tooltipClasses: string = mergeClasses([
        classNames,
        styles.tooltip,
        { [styles.visible]: visible },
        { [styles.dark]: theme === TooltipTheme.dark },
        { [styles.top]: tooltipSide === 'top' },
        { [styles.bottom]: tooltipSide === 'bottom' },
        { [styles.left]: tooltipSide === 'left' },
        { [styles.right]: tooltipSide === 'right' },
        { [styles.small]: size === TooltipSize.Small },
        { [styles.medium]: size === TooltipSize.Medium },
        { [styles.large]: size === TooltipSize.Large },
    ]);

    const referenceWrapperClasses: string = mergeClasses([
        styles.referenceWrapper,
        wrapperClassNames,
        { [styles.disabled]: disabled },
    ]);

    const staticSide: string = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[tooltipSide];

    const tooltipStyle: object = {
        position: strategy,
        top: y ?? '',
        left: x ?? '',
    };

    const arrowStyle: object = {
        position: strategy,
        top: arrowY ?? '',
        left: arrowX ?? '',
        [staticSide]: `-${TOOLTIP_ARROW_WIDTH / 2}px`,
    };

    const getChild = (node: React.ReactNode): JSX.Element | React.ReactNode => {
        // Need this to handle disabled elements.
        if (React.isValidElement(node) && node.props?.disabled) {
            const child = React.Children.only(node) as React.ReactElement<any>;
            return cloneElement(child, {
                classNames: styles.noPointerEvents,
            });
        }
        return node;
    };

    return (
        <>
            <div
                className={referenceWrapperClasses}
                style={wrapperStyle}
                id={tooltipId.current}
                onMouseEnter={toggle(true)}
                onMouseLeave={toggle(false)}
                onFocus={toggle(true)}
                onBlur={toggle(false)}
                ref={reference}
            >
                {getChild(children)}
            </div>
            <ConditionalWrapper
                condition={portal}
                wrapper={(children) => (
                    <FloatingPortal id={portalId} root={portalRoot}>
                        {getChild(children)}
                    </FloatingPortal>
                )}
            >
                {visible && (
                    <div
                        {...rest}
                        role="tooltip"
                        aria-hidden={!visible}
                        ref={floating}
                        style={tooltipStyle}
                        className={tooltipClasses}
                        tabIndex={tabIndex}
                    >
                        {content}
                        {visibleArrow && (
                            <div
                                ref={arrowRef}
                                style={arrowStyle}
                                className={styles.arrow}
                            />
                        )}
                    </div>
                )}
            </ConditionalWrapper>
        </>
    );
};
