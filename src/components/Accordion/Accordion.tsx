import React, { FC, useCallback, useState } from 'react';

import { mergeClasses } from '../../shared/utilities';

import { AccordionProps, AccordionSummaryProps, AccordionBodyProps } from './';

import styles from './accordion.module.scss';
import { Icon, IconName } from '../Icon';

export const AccordionSummary: FC<AccordionSummaryProps> = ({
    children,
    expandIconProps,
    expanded,
    onClick,
    id,
}) => {
    const iconStyles: string = mergeClasses([
        styles.accordionIcon,
        // Conditional classes can also be handled as follows
        { [styles.expandedIcon]: expanded },
    ]);

    // to handle enter press on accordion header
    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Enter' && onClick) {
                onClick(event);
            }
        },
        [onClick]
    );

    return (
        <div
            aria-expanded={expanded}
            aria-controls={`${id}-content`}
            className={styles.accordionSummary}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            id={`${id}-header`}
            role="button"
            tabIndex={0}
        >
            {children}
            <Icon classNames={iconStyles} {...expandIconProps} />
        </div>
    );
};

export const AccordionBody: FC<AccordionBodyProps> = ({
    children,
    expanded,
    id,
}) => {
    const accordionBodyContainerStyles: string = mergeClasses(
        styles.accordionBodyContainer,
        { [styles.show]: expanded }
    );

    const accordionBodyStyles: string = mergeClasses(
        styles.accordionBody,
        styles.showBorderTop
    );

    return (
        <div
            aria-labelledby={`${id}-header`}
            className={accordionBodyContainerStyles}
            id={`${id}-content`}
            role="region"
        >
            <div className={accordionBodyStyles}>{children}</div>
        </div>
    );
};

export const Accordion: FC<AccordionProps> = React.forwardRef(
    ({
        expanded = false,
        onAccordionChange,
        classNames,
        summary,
        expandIconProps = { path: IconName.mdiChevronDown },
        children,
        id,
    }) => {
        const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

        const toggleAccordion = (expand: boolean): void => {
            setIsExpanded(expand);
            onAccordionChange?.(expand);
        };

        const accordionContainerStyle: string = mergeClasses(
            styles.accordionContainer,
            classNames
        );

        return (
            <div className={accordionContainerStyle}>
                <AccordionSummary
                    expandIconProps={expandIconProps}
                    onClick={() => toggleAccordion(!isExpanded)}
                    expanded={isExpanded}
                    id={id}
                >
                    {summary}
                </AccordionSummary>
                <AccordionBody id={id} expanded={isExpanded}>
                    {children}
                </AccordionBody>
            </div>
        );
    }
);
