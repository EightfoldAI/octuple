import React, { FC, useEffect, useRef, useState } from 'react';
import {
    useFloating,
    shift,
    autoUpdate,
    arrow,
    offset as fOffset,
} from '@floating-ui/react-dom';
import { TooltipProps, TooltipTheme } from './Tooltip.types';
import { classNames } from '../../shared/utilities';

import styles from './tooltip.module.scss';

const TOOLTIP_ARROW_WIDTH = 8;

export const Tooltip: FC<TooltipProps> = ({
    children,
    offset = 8,
    theme,
    content,
    placement = 'bottom',
    disabled,
    visibleArrow = true,
    className,
    openDelay = 0,
    hideAfter = 0,
    tabIndex = 0,
    positionStrategy = 'absolute',
}) => {
    const tooltipSide: string = placement.split('-')?.[0];
    const [visible, setVisible] = useState<boolean>(false);
    const arrowRef = useRef<HTMLDivElement>(null);
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
            return null;
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
            timeout && clearTimeout(timeout);
            timeout = setTimeout(
                () => {
                    setVisible(show);
                },
                show ? openDelay : hideAfter
            );
        };

    const tooltipClasses: string = classNames([
        className,
        styles.tooltip,
        { [styles.visible]: visible },
        { [styles.dark]: theme === TooltipTheme.dark },
        { [styles.top]: tooltipSide === 'top' },
        { [styles.bottom]: tooltipSide === 'bottom' },
        { [styles.left]: tooltipSide === 'left' },
        { [styles.right]: tooltipSide === 'right' },
    ]);

    const referenceWrapperClasses: string = classNames([
        styles.referenceWrapper,
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

    return (
        <>
            <div
                onMouseEnter={toggle(true)}
                onFocus={toggle(true)}
                onBlur={toggle(false)}
                onMouseLeave={toggle(false)}
                ref={reference}
                className={referenceWrapperClasses}
            >
                {children}
            </div>
            <div
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
        </>
    );
};
