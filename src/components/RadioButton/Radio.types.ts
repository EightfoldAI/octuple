import React from 'react';
import { OcBaseProps } from '../OcBase';
import { LabelPosition, SelectorSize } from '../CheckBox';
import { SizeType } from '../ConfigProvider';

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
     * Allows focus on the radio button when it's disabled.
     */
    allowDisabledFocus?: boolean;
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
    /**
     * The radio button size.
     * @default SelectorSize.Medium
     */
    size?: SelectorSize | SizeType;
}

export interface RadioGroupProps extends OcBaseProps<HTMLDivElement> {
    /**
     * Allows focus on the radio group when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * The group aria label text.
     */
    ariaLabel?: string;
    /**
     * The boolean for disabling the radio group.
     */
    disabled?: boolean;
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
    /**
     * The radio group size.
     * @default SelectorSize.Medium
     */
    size?: SelectorSize;
    /**
     * The input radio default selected value.
     */
    value?: RadioButtonValue;
}
