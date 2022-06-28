import React from 'react';
import { OcBaseProps } from '../OcBase';

export type CheckboxValueType = string | number;

export interface CheckboxProps extends OcBaseProps<HTMLInputElement> {
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
     * The input checkbox default checked value.
     */
    defaultChecked?: boolean;
    /**
     * The checkbox disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The checkbox input name.
     */
    name?: string;
    /**
     * The checkbox value.
     */
    value?: CheckboxValueType;
    /**
     * The label  of the checkbox
     */
    label?: string | React.ReactNode;
    /**
     * The checkbox onChange event handler.
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface CheckboxGroupProps
    extends Omit<OcBaseProps<HTMLInputElement>, 'defaultChecked' | 'onChange'> {
    /**
     * Aria label for the checkbox group
     */
    ariaLabel?: string;
    /**
     * The array of items for the radio group.
     */
    items?: CheckboxProps[];
    /**
     * The checkbox value.
     */
    value?: CheckboxValueType[];
    /**
     * Callback fired when any item in the checkboxGroup changes
     * @param checkedValue
     */
    onChange?: (checkedValue: CheckboxValueType[]) => void;
    /**
     * Type of layout for the checkbox group
     * @default vertical
     */
    layout?: 'vertical' | 'horizontal';
}
