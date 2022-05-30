import { OcBaseProps } from '../OcBase';
import { IconProps } from '../Icon';

interface AccordionBaseProps extends OcBaseProps<HTMLSpanElement> {
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
     * Header Classnames
     * @default ''
     */
    headerClasses?: string;
    /**
     * Body Classnames
     * @default ''
     */
    bodyClasses?: string;
}

export interface AccordionSummaryProps extends AccordionBaseProps {}

export interface AccordionBodyProps extends AccordionBaseProps {}
