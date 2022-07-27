import React from 'react';
import { OcBaseProps } from '../OcBase';
import { LabelPosition } from '../CheckBox';

export type RadioButtonValue = string | number;

export interface RadioGroupContextProps {
    children: React.ReactNode;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value?: RadioButtonValue;
}

export interface IRadioButtonsContext {
    value: RadioButtonValue;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface RadioButtonProps extends OcBaseProps<HTMLInputElement> {
    /**
     * The input aria label text.
     */
    ariaLabel?: string;
    /**
     * The input icon button checked value.
     */
    checked?: boolean;
    /**
     * The boolean for disabling the radio button.
     */
    disabled?: boolean;
    /**
     * The name of the radio button group.
     */
    name?: string;
    /**
     * The value of the input.
     */
    value?: RadioButtonValue;
    /**
     * Label of the radio button.
     */
    label?: React.ReactNode;
    /**
     * The label position of the radio button.
     * @default LabelPosition.End
     */
    labelPosition?: LabelPosition;
    /**
     * The radio button onChange event handler.
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface RadioGroupProps extends OcBaseProps<HTMLDivElement> {
    /**
     * The group aria label text.
     */
    ariaLabel?: string;
    /**
     * The input radio default selected value.
     */
    value?: RadioButtonValue;
    /**
     * The array of items for the radio group.
     */
    items?: RadioButtonProps[];
    /**
     * The label position of the radio buttons.
     * @default LabelPosition.End
     */
    labelPosition?: LabelPosition;
    /**
     * Type of layout for the radio group.
     * @default vertical.
     */
    layout?: 'vertical' | 'horizontal';
    /**
     * The radio button onChange event handler.
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
