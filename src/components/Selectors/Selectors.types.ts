import React from 'react';
import { OcBaseProps } from '../OcBase';

export type SelectRadioButtonEvent<E = HTMLElement> =
    | React.MouseEvent<E>
    | React.KeyboardEvent<E>;

export type RadioButtonChecked = string | number;

export type OnChangeHandler = (
    value: RadioButtonChecked,
    event: SelectRadioButtonEvent
) => void;

export interface RadioGroupContextProps {
    children: React.ReactNode;
    onChange: OnChangeHandler;
    activeRadioButton?: RadioButtonChecked;
}

export interface IRadioButtonsContext {
    currentRadioButton: RadioButtonChecked;
    onRadioButtonClick: OnChangeHandler;
}

export interface CheckBoxProps extends OcBaseProps<HTMLInputElement> {
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

export interface RadioButtonProps
    extends Omit<OcBaseProps<HTMLElement>, 'onChange'> {
    /**
     * The default radio button to select
     */
    activeRadioButton?: RadioButtonChecked | string;
    /**
     * The input aria label text.
     */
    ariaLabel?: string;
    /**
     * The input icon button checked value.
     */
    checked?: boolean;
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
    onChange?: OnChangeHandler;
    /**
     * The radio buttons in the radio group.
     */
    radioGroupItems?: any;
    setActiveRadioButton?: Function;
}
