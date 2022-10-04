import React from 'react';
import { OcBaseProps } from '../OcBase';
import { IconProps } from '../Icon';
import { BadgeProps } from '../Badge';

export enum AccordionShape {
    Pill = 'pill',
    Rectangle = 'rectangle',
}

export enum AccordionSize {
    Large = 'large',
    Medium = 'medium',
}

interface AccordionBaseProps extends OcBaseProps<HTMLDivElement> {
    /**
     * Accordion is in an expanded state or not
     * @default false
     */
    expanded?: boolean;
    /**
     * Expand icon props
     * @default { path: IconName['mdiChevronDown'] }
     */
    expandIconProps?: IconProps;
    /**
     * Shape of the accordion
     * @default AccordionShape.Pill
     */
    shape?: AccordionShape;
    /**
     * If the accordion is bordered or not
     * @default true
     */
    bordered?: boolean;
    /**
     * Size of the accordion
     * @default AccordionSize.Large
     */
    size?: AccordionSize;
    /**
     * If the accordion is disabled
     */
    disabled?: boolean;
}

export interface AccordionProps extends AccordionBaseProps {
    /**
     * Callback called when the expanded state of the accordion changes
     */
    onAccordionChange?: (expanded: boolean) => void;
    /**
     * Accordion Summary
     */
    summary: React.ReactNode | string;
    /**
     * Accordion Header Props
     */
    headerProps?: AccordionSummaryProps;
    /**
     * Accordion Body Props
     */
    bodyProps?: AccordionBodyProps;
    /**
     * Icon props for the header icon
     */
    iconProps?: IconProps;
    /**
     * Badge props for the header badge
     */
    badgeProps?: BadgeProps;
}

export interface AccordionSummaryProps extends AccordionBaseProps {
    /**
     * Icon props for the header icon
     */
    iconProps?: IconProps;
    /**
     * Badge props for the header badge
     */
    badgeProps?: BadgeProps;
}

export interface AccordionBodyProps extends AccordionBaseProps {}
