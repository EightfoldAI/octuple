import React, { FC, Ref, useCallback, useState } from 'react';

import { mergeClasses, uniqueId } from '../../shared/utilities';

import { AccordionProps, AccordionSummaryProps, AccordionBodyProps } from './';
import { Icon, IconName } from '../Icon';
import { eventKeys } from '../../shared/eventKeys';

import styles from './accordion.module.scss';

export const AccordionSummary: FC<AccordionSummaryProps> = ({
    children,
    expandIconProps,
    expanded,
    onClick,
    classNames,
    style,
    id,
    'data-test-id': dataTestId,
}) => {
    const iconStyles: string = mergeClasses([
        styles.accordionIcon,
        // Conditional classes can also be handled as follows
        { [styles.expandedIcon]: expanded },
        classNames,
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
            className={styles.accordionSummary}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            id={`${id}-header`}
            role="button"
            tabIndex={0}
            style={style}
            data-test-id={dataTestId}
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
    'data-test-id': dataTestId,
    style,
}) => {
    const accordionBodyContainerStyles: string = mergeClasses(
        styles.accordionBodyContainer,
        { [styles.show]: expanded },
        classNames
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
            style={style}
            data-test-id={dataTestId}
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
            bodyClasses,
            headerClasses,
            style,
            'data-test-id': dataTestId,
            headerStyles = {},
            bodyStyles = {},
            headerTestId,
            bodyTestId,
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
            <div
                className={accordionContainerStyle}
                ref={ref}
                data-test-id={dataTestId}
                style={style}
            >
                <AccordionSummary
                    expandIconProps={expandIconProps}
                    onClick={() => toggleAccordion(!isExpanded)}
                    expanded={isExpanded}
                    id={id}
                    classNames={headerClasses}
                    style={headerStyles}
                    data-test-id={headerTestId}
                >
                    {summary}
                </AccordionSummary>
                <AccordionBody
                    id={id}
                    expanded={isExpanded}
                    classNames={bodyClasses}
                    style={bodyStyles}
                    data-test-id={bodyTestId}
                >
                    {children}
                </AccordionBody>
            </div>
        );
    }
);
