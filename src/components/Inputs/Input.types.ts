import React from 'react';
import { IconName } from '../Icon';

export enum TextInputTheme {
    light = 'light',
    dark = 'dark',
}

export enum TextInputShape {
    Rectangle = 'rectangle',
    Pill = 'pill',
}

export interface InputIconProps {
    /**
     * The icon img alt text.
     */
    alt?: string;
    /**
     * The icon is aria-hidden.
     * @default false
     */
    ariaHidden?: boolean;
    /**
     * The icon color.
     */
    color?: string;
    /**
     * The icon description.
     */
    description?: string;
    /**
     * The icon is horizontal.
     * @default false
     */
    horizontal?: boolean;
    /**
     * The icon id.
     */
    id?: string;
    /**
     * The icon image source url.
     */
    imageSrc?: string;
    /**
     * The icon svg path name.
     */
    path?: IconName;
    /**
     * The icon is rotated.
     * @default 0
     */
    rotate?: number;
    /**
     * The icon title.
     */
    title?: string;
    /**
     * The icon is vertical.
     * @default false
     */
    vertical?: boolean;
}

export interface InputIconButtonProps {
    /**
     * Allows focus on the input icon button when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * The input icon button aria-label text.
     */
    ariaLabel?: string;
    /**
     * The input icon button checked value.
     */
    checked?: boolean;
    /**
     * The icon color.
     */
    color?: string;
    /**
     * The input icon button disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The input icon button html type.
     */
    htmlType?: 'button' | 'submit' | 'reset';
    /**
     * The input button icon path.
     */
    icon?: IconName;
    /**
     * The input icon button id.
     */
    id?: string;
    /**
     * The input icon button onClick event handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface InputLabelIconButtonProps {
    /**
     * Allows focus on the label icon button when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * The label icon button aria-label.
     * @default false
     */
    ariaLabel?: string;
    /**
     * The label icon button disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The label icon button path.
     */
    icon?: IconName;
    /**
     * The label icon button color.
     */
    iconColor?: string;
    /**
     * The label icon button id.
     */
    id?: string;
    /**
     * The label icon button onClick event handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The label icon button is shown.
     * @default false
     */
    show?: boolean;
    /**
     * The label icon button tooltip text.
     */
    tooltipText?: string;
}

export interface SearchBoxProps extends InputProps {
    value?: string;
}

export interface TextAreaProps extends InputProps {
    enableExpand?: boolean;
    required?: boolean;
    textAreaCols?: number;
    textAreaRows?: number;
}

export interface TextInputProps extends InputProps {
    htmlType?: string;
    numbersOnly?: boolean;
    required?: boolean;
}

export interface InputProps {
    allowDisabledFocus?: boolean;
    ariaLabel?: string;
    autoFocus?: boolean;
    className?: string;
    clearInputTabIndex?: string;
    disabled?: boolean;
    helpText?: string;
    iconProps?: InputIconProps;
    iconButtonProps?: InputIconButtonProps;
    id?: string;
    imageSource?: string;
    label?: string;
    labelIconButtonProps?: InputLabelIconButtonProps;
    maxlength?: number;
    minlength?: number;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    placeholder?: string;
    shape?: TextInputShape;
    style?: React.CSSProperties;
    value?: string | number;
    waitInterval?: number;
    width?: string;
}
