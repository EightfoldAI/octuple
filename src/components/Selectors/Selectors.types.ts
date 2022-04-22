import React from 'react';

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
     * The array of items for the radio group.
     */
    items?: Array<CheckBoxProps>;
    /**
     * The checkbox input name.
     */
    name?: string;
    /**
     * The check box value.
     */
    value?: string;
    /**
     * The checkbox onChange event handler.
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
     * The input radio default selected value.
     */
    defaultSelected?: boolean;
    /**
     * The boolean for disabling the radio button.
     */
    disabled?: boolean;
    /**
     * The radio button id.
     */
    id?: string;
    /**
     * The radio button index.
     */
    index?: number;
    /**
     * The array of items for the radio group.
     */
    items?: Array<RadioButtonProps>;
    /**
     * The boolean for the radio button being part of a group.
     */
    forRadioGroup?: boolean;
    /**
     * The name of the radio button group.
     */
    name?: string;
    /**
     * The value of the input.
     */
    value?: string | number;
    /**
     * The radio button onChange event handler.
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    updateRadioGroup?: Function;
}
