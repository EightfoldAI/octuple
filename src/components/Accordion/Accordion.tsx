import React, { FC, useState } from 'react';

import { mergeClasses } from '../../shared/utilities';

import { AccordionProps, AccordionSummaryProps, AccordionBodyProps } from './';

import styles from './accordion.module.scss';
import { Icon, IconName } from '../Icon';

export const AccordionSummary: FC<AccordionSummaryProps> = ({
    children,
    expandIconProps,
    expanded,
    onClick,
}) => {
    const iconStyles: string = mergeClasses([
        styles.accordionIcon,
        // Conditional classes can also be handled as follows
        { [styles.expandedIcon]: expanded },
    ]);

    return (
        <button
            className={styles.accordionSummary}
            onClick={onClick}
            aria-disabled={false}
            role="button"
        >
            {children}
            <Icon classNames={iconStyles} {...expandIconProps} />
        </button>
    );
};

export const AccordionBody: FC<AccordionBodyProps> = ({
    children,
    expanded,
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
        <div className={accordionBodyContainerStyles}>
            <div className={accordionBodyStyles}>{children}</div>
        </div>
    );
};

export const Accordion: FC<AccordionProps> = ({
    expanded = false,
    onAccordionChange,
    classNames,
    summary,
    expandIconProps = { path: IconName.mdiChevronDown },
    children,
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
            >
                {summary}
            </AccordionSummary>
            <AccordionBody expanded={isExpanded}>{children}</AccordionBody>
        </div>
    );
};
