import * as React from 'react';
import { IconName } from '../Icon/mdi';

export enum ButtonSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export enum ButtonTheme {
    light = 'light',
    dark = 'dark',
}

export enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Secondary = 'secondary',
}

export interface InternalButtonProps extends ButtonProps {
    /**
     * Determines the button type.
     */
    type?: ButtonType;
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
     * The button id.
     */
    id?: string;
    /**
     * The button onClick event handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The button primary color.
     */
    primaryColor?: string;
    /**
     * The button text.
     */
    text?: string;
    /**
     * The button theme.
     * @default light
     */
    theme?: ButtonTheme;
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
    /**
     * The button html type.
     */
    htmlType?: 'button' | 'submit' | 'reset';
}
