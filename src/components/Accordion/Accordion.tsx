import React, { FC, Ref, useCallback, useState } from 'react';

import { eventKeys, mergeClasses, uniqueId } from '../../shared/utilities';

import { AccordionProps, AccordionSummaryProps, AccordionBodyProps } from './';
import { Icon, IconName } from '../Icon';

import styles from './accordion.module.scss';

export const AccordionSummary: FC<AccordionSummaryProps> = ({
    children,
    expandIconProps,
    expanded,
    onClick,
    classNames,
    id,
    ...rest
}) => {
    const headerClassnames = mergeClasses([
        styles.accordionSummary,
        'header4',
        classNames,
    ]);

    const iconStyles: string = mergeClasses([
        styles.accordionIcon,
        // Conditional classes can also be handled as follows
        { [styles.expandedIcon]: expanded },
    ]);

    // to handle enter press on accordion header
    const handleKeyDown = useCallback(
        (event) => {
            event.key === eventKeys.ENTER && onClick?.(event);
        },
        [onClick]
    );

    return (
        <div
            aria-expanded={expanded}
            aria-controls={`${id}-content`}
            className={headerClassnames}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            id={`${id}-header`}
            role="button"
            tabIndex={0}
            {...rest}
        >
            {children}
            <Icon classNames={iconStyles} {...expandIconProps} />
        </div>
    );
};

export const AccordionBody: FC<AccordionBodyProps> = ({
    children,
    expanded,
    classNames,
    id,
    ...rest
}) => {
    const accordionBodyContainerStyles: string = mergeClasses(
        styles.accordionBodyContainer,
        { [styles.show]: expanded }
    );

    const accordionBodyStyles: string = mergeClasses(
        styles.accordionBody,
        styles.showBorderTop,
        'body2',
        classNames
    );

    return (
        <div
            aria-labelledby={`${id}-header`}
            className={accordionBodyContainerStyles}
            id={`${id}-content`}
            role="region"
            {...rest}
        >
            <div className={accordionBodyStyles}>{children}</div>
        </div>
    );
};

export const Accordion: FC<AccordionProps> = React.forwardRef(
    (
        {
            expanded = false,
            onAccordionChange,
            classNames,
            summary,
            expandIconProps = { path: IconName.mdiChevronDown },
            children,
            id = uniqueId('accordion-'),
            headerProps,
            bodyProps,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
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
            <div className={accordionContainerStyle} ref={ref} {...rest}>
                <AccordionSummary
                    expandIconProps={expandIconProps}
                    onClick={() => toggleAccordion(!isExpanded)}
                    expanded={isExpanded}
                    id={id}
                    {...headerProps}
                >
                    {summary}
                </AccordionSummary>
                <AccordionBody id={id} expanded={isExpanded} {...bodyProps}>
                    {children}
                </AccordionBody>
            </div>
        );
    }
);
