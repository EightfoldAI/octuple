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
     * children to represent Accordion body
     */
    children: React.ReactNode;
}

export interface AccordionSummaryProps extends AccordionBaseProps {
    /**
     * Callback called on click of the accordion summary
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AccordionBodyProps extends AccordionBaseProps {}
