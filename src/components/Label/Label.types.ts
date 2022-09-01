import { ButtonIconAlign, ButtonTextAlign } from '../Button';
import { Placement, Strategy } from '@floating-ui/react-dom';
import { TooltipTheme } from '../Tooltip';
import { OcBaseProps } from '../OcBase';
import { Size } from '../ConfigProvider';
import { IconProps } from '../Icon';

export enum LabelSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface LabelIconButtonProps {
    /**
     * The label icon button is shown.
     * @default false
     */
    show?: boolean;
    /**
     * Content to show on the tooltip
     */
    toolTipContent?: React.ReactNode;
    /**
     * Theme of the tooltip
     * @default light
     */
    toolTipTheme?: TooltipTheme;
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
     * Allows focus on the button when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * The button icon alignment.
     * @default ButtonIconAlign.Left
     */
    alignIcon?: ButtonIconAlign;
    /**
     * The button text alignment.
     * @default ButtonTextAlign.Center
     */
    alignText?: ButtonTextAlign;
    /**
     * The button aria-label text.
     */
    ariaLabel?: string;
    /**
     * The button class names.
     */
    classNames?: string;
    /**
     * The button counter string.
     */
    counter?: string;
    /**
     * The button disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The button disruptive state.
     * @default false
     */
    disruptive?: boolean;
    /**
     * The button drop shadow state.
     * @default false
     */
    dropShadow?: boolean;
    /**
     * The button icon props.
     */
    iconProps?: IconProps;
    /**
     * The button id.
     */
    id?: string;
    /**
     * The button onClick event handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The button style.
     */
    style?: React.CSSProperties;
    /**
     * The button text.
     */
    text?: string;
    /**
     * The button will remain transparent
     * @default false
     */
    transparent?: boolean;
    /**
     * If the button is in loading state
     */
    loading?: boolean;
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
     */
    size?: LabelSize | Size;
    /**
     * The label text.
     */
    text?: string;
}
