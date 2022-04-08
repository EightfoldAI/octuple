import * as React from 'react';
import { IconName } from '../Icon';
import { Ref } from 'react';

export enum ButtonSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export enum ButtonWidth {
    fitContent = 'fitContent',
    fill = 'fill',
}

export enum ButtonShape {
    Rectangle = 'rectangle',
    Pill = 'pill',
}

export enum ButtonTheme {
    light = 'light',
    dark = 'dark',
}

export enum ButtonType {
    Default = 'default',
    Neutral = 'neutral',
    Primary = 'primary',
    Secondary = 'secondary',
}

export type NativeButtonProps = Omit<React.ButtonHTMLAttributes<any>, 'type'>;

export interface InternalButtonProps extends ButtonProps {
    /**
     * Determines the button type.
     */
    type?: ButtonType;
    /**
     * Ref of the button
     */
    ref?: Ref<HTMLButtonElement>;
}

export interface ButtonProps extends NativeButtonProps {
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
     * The button drop shadow state.
     * @default false
     */
    dropShadow?: boolean;
    /**
     * The button html type.
     */
    htmlType?: 'button' | 'submit' | 'reset';
    /**
     * The button icon.
     */
    icon?: IconName;
    /**
     * The button icon color.
     */
    iconColor?: string;
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
     * Shape of the button.
     * @default ButtonShape.Rectangle
     */
    shape?: ButtonShape;
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
     * The button style.
     */
    style?: React.CSSProperties;
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
     * The button is a toggle button with distinct on and off states.
     */
    toggle?: boolean;
    /**
     * The button width type
     * @default fitContent
     */
    buttonWidth?: ButtonWidth;
}
