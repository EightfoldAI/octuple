import React from 'react';

export enum SelectorSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface CheckBoxProps {
    /**
     * Allows focus on the checkbox when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * The input checkbox aria-label text.
     */
    ariaLabel?: string;
    /**
     * The input checkbox checked value.
     */
    checked?: boolean;
    /**
     * The checkbox color.
     */
    color?: string;
    /**
     * The checkbox class names.
     */
    className?: string;
    /**
     * The input checkbox default checked value.
     */
    defaultChecked?: boolean;
    /**
     * The checkbox disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The checkbox id.
     */
    id?: string;
    /**
     * The input type.
     */
    inputType?: 'checkbox';
    /**
     * The array of items for the radio group.
     */
    items?: Array<CheckBoxProps>;
    /**
     * The checkbox input name.
     */
    name?: string;
    /**
     * The checkbox size.
     * @default SelectorSize.Medium
     */
    size?: SelectorSize;
    /**
     * The check box value.
     */
    value?: string;
    /**
     * The checkbox onClick event handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface RadioButtonProps {
    /**
     * The input aria label text.
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
     * The radio button id.
     */
    id?: string;
    /**
     * The input icon button html type.
     */
    inputType?: 'radio';
    /**
     * The array of items for the radio group.
     */
    items?: Array<RadioButtonProps>;
    /**
     * The name of the radio button group.
     */
    name?: string;
    /**
     * The radio button size.
     * @default SelectorSize.Medium
     */
    size?: SelectorSize;
    /**
     * The value of the input.
     */
    value?: string | number;
    /**
     * The radio button onClick event handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
