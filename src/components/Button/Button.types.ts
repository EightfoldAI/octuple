import * as React from 'react';
import { IconName } from '../Icon/mdi'

export enum ButtonSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface ButtonProps {
    /**
     * Allows focus on the button when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * The button aria-label text.
     */
    ariaLabel?: string;
    /**
     * The button checked value.
     */
    checked?: boolean;
    /**
     * The button class names.
     */
    className?: string;
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
     * The button icon.
     */
    icon?: IconName;
    /**
     * The button onClick event handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The button text.
     */
    text?: string;
    /**
     * The button size.
     * @default ButtonSize.Medium
     */
    size?: ButtonSize;
    /**
     * Determines whether this is a split button.
     * @default false
     */
    split?: boolean;
    /**
     * The split button aria-label text.
     */
    splitButtonAriaLabel?: string;
    /**
     * The split button menu props.
     */
    splitButtonMenuProps?: ButtonProps;
    /**
     * The buton style.
     */
    style?: React.CSSProperties;
}
