import { ButtonProps } from '../Button';
import { Placement, Strategy } from '@floating-ui/react-dom';
import { TooltipTheme } from '../Tooltip';
import { OcBaseProps } from '../OcBase';
import { Size } from '../ConfigProvider';

export enum LabelSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface LabelIconButtonProps extends ButtonProps {
    /**
     * The label icon button is shown
     * @default false
     */
    show?: boolean;
    /**
     * Content to show on the tooltip
     */
    toolTipContent?: React.ReactNode;
    /**
     * Placement of the tooltip
     * @default top
     */
    toolTipPlacement?: Placement;
    /**
     * Positioning strategy for the tooltip
     * @default absolute
     */
    toolTipPositionStrategy?: Strategy;
    /**
     * Theme of the tooltip
     * @default light
     */
    toolTipTheme?: TooltipTheme;
    /**
     * Unique id used to target element for testing
     */
    'data-test-id'?: string;
}

export interface LabelProps extends OcBaseProps<HTMLDivElement> {
    /**
     * The label class names.
     */
    classNames?: string;
    /**
     * Sets whether to display `:` after label text.
     * @default false
     */
    colon?: boolean;
    /**
     * The label element name.
     */
    htmlFor?: string;
    /**
     * The label element is inline.
     * @default false
     */
    inline?: boolean;
    /**
     * The label icon button props.
     */
    labelIconButtonProps?: LabelIconButtonProps;
    /**
     * The label size.
     * @default LabelSize.Medium
     */
    size?: LabelSize | Size;
    /**
     * The label text.
     */
    text?: string;
}
