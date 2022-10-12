import React, { FC, Ref, useCallback, useEffect, useState } from 'react';
import { eventKeys, mergeClasses, uniqueId } from '../../shared/utilities';
import {
    AccordionBodyProps,
    AccordionProps,
    AccordionShape,
    AccordionSize,
    AccordionSummaryProps,
} from './';
import { Icon, IconName } from '../Icon';
import { Badge } from '../Badge';

import styles from './accordion.module.scss';

export const AccordionSummary: FC<AccordionSummaryProps> = ({
    children,
    expandIconProps,
    expanded,
    onClick,
    classNames,
    id,
    iconProps,
    badgeProps,
    size,
    disabled,
    ...rest
}) => {
    const headerClassnames = mergeClasses([
        styles.accordionSummary,
        classNames,
        {
            [styles.medium]: size === AccordionSize.Medium,
            [styles.large]: size === AccordionSize.Large,
            [styles.accordionSummaryExpanded]: expanded,
            [styles.disabled]: disabled,
        },
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
            <div className={styles.accordionHeaderContainer}>
                {iconProps && <Icon {...iconProps} />}
                <span className={styles.accordionHeader}>{children}</span>
                {badgeProps && <Badge {...badgeProps} />}
            </div>
            <Icon classNames={iconStyles} {...expandIconProps} />
        </div>
    );
};

export const AccordionBody: FC<AccordionBodyProps> = ({
    children,
    expanded,
    classNames,
    id,
    size,
    bordered = true,
    ...rest
}) => {
    const accordionBodyContainerStyles: string = mergeClasses(
        styles.accordionBodyContainer,
        { [styles.show]: expanded }
    );

    const accordionBodyStyles: string = mergeClasses(
        styles.accordionBody,
        {
            [styles.borderTop]: bordered,
            [styles.medium]: size === AccordionSize.Medium,
            [styles.large]: size === AccordionSize.Large,
        },
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
            shape = AccordionShape.Pill,
            bordered = true,
            iconProps,
            badgeProps,
            size = AccordionSize.Large,
            disabled,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

        useEffect(() => {
            setIsExpanded(expanded);
        }, [expanded]);

        const toggleAccordion = (expand: boolean): void => {
            setIsExpanded(expand);
            onAccordionChange?.(expand);
        };

        const accordionContainerStyle: string = mergeClasses(
            styles.accordionContainer,
            {
                [styles.accordionBorder]: bordered,
                [styles.pill]: shape === AccordionShape.Pill,
                [styles.rectangle]: shape === AccordionShape.Rectangle,
            },
            classNames
        );

        return (
            <div className={accordionContainerStyle} ref={ref} {...rest}>
                <AccordionSummary
                    expandIconProps={expandIconProps}
                    onClick={() => toggleAccordion(!isExpanded)}
                    expanded={isExpanded}
                    iconProps={iconProps}
                    badgeProps={badgeProps}
                    disabled={disabled}
                    size={size}
                    id={id}
                    {...headerProps}
                >
                    {summary}
                </AccordionSummary>
                <AccordionBody
                    id={id}
                    expanded={isExpanded}
                    size={size}
                    bordered={bordered}
                    {...bodyProps}
                >
                    {children}
                </AccordionBody>
            </div>
        );
    }
);
