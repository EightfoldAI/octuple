import React, { FC, useState } from 'react';
import { usePopper } from 'react-popper';
import { TooltipProps, TooltipTheme } from '../Tooltip.types';
import { classNames } from '../../../shared/utilities';

import styles from '../tooltip.module.scss';

export const BaseTooltip: FC<TooltipProps> = ({
    children,
    offset = 8,
    theme,
    content,
}) => {
    const [referenceElement, setReferenceElement] = useState<HTMLElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement>(null);

    const {
        styles: popperStyles,
        attributes,
        update,
    } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'arrow',
                options: { element: arrowElement },
            },
            {
                name: 'offset',
                options: { offset: [0, offset] },
            },
        ],
    });

    const show = (): void => {
        popperElement.setAttribute('data-show', '');
        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        update();
    };

    const hide = (): void => popperElement.removeAttribute('data-show');

    const tooltipClasses = classNames([
        styles.tooltip,
        { [styles.dark]: theme === TooltipTheme.dark },
    ]);

    return (
        <>
            <div
                onMouseEnter={show}
                onFocus={show}
                onBlur={hide}
                onMouseLeave={hide}
                className={styles.referenceWrapper}
                ref={setReferenceElement}
            >
                {children}
            </div>
            <div
                className={tooltipClasses}
                ref={setPopperElement}
                style={popperStyles.popper}
                {...attributes.popper}
            >
                {content}
                <div
                    ref={setArrowElement}
                    style={popperStyles.arrow}
                    className={styles.arrow}
                ></div>
            </div>
        </>
    );
};
