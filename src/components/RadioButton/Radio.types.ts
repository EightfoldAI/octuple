import React from 'react';
import { ConfigContextProps, OcThemeName, Size } from '../ConfigProvider';
import { OcBaseProps } from '../OcBase';
import {
  LabelAlign,
  LabelPosition,
  SelectorSize,
  SelectorWidth,
  SelectorVariant,
} from '../CheckBox';

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
   * @default false
   */
  allowDisabledFocus?: boolean;
  /**
   * The input aria label text.
   */
  ariaLabel?: string;
  /**
   * The input icon button checked value.
   * @default false
   */
  checked?: boolean;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The boolean for disabling the radio button.
   * @default false
   */
  disabled?: boolean;
  /**
   * The radio button is a form item.
   * @default false
   */
  formItemInput?: boolean;
  /**
   * Label of the radio button.
   */
  label?: React.ReactNode;
  /**
   * The vertical placement of the label.
   * @default LabelAlign.Center
   */
  labelAlign?: LabelAlign;
  /**
   * The label position of the radio button.
   * @default LabelPosition.End
   */
  labelPosition?: LabelPosition;
  /**
   * The name of the radio button group.
   */
  name?: string;
  /**
   * The radio button onChange event handler.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The radio button width type
   * Use when variant is `SelectorVariant.Pill`
   * @default fitContent
   */
  selectorWidth?: SelectorWidth;
  /**
   * The radio button size.
   * @default SelectorSize.Medium
   */
  size?: SelectorSize | Size;
  /**
   * Theme of the radio button.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the radio button.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The value of the input.
   */
  value?: RadioButtonValue;
  /**
   * Determines the radio button variant.
   * @default SelectorVariant.Default
   */
  variant?: SelectorVariant;
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
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The boolean for disabling the radio group.
   */
  disabled?: boolean;
  /**
   * The radio button group is a form item.
   * @default false
   */
  formItemInput?: boolean;
  /**
   * The array of items for the radio group.
   */
  items?: RadioButtonProps[];
  /**
   * The vertical placement of the label.
   * @default LabelAlign.Center
   */
  labelAlign?: LabelAlign;
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
   * The radio group width type
   * Use when variant is `SelectorVariant.Pill`
   * @default fitContent
   */
  selectorWidth?: SelectorWidth;
  /**
   * The radio group size.
   * @default SelectorSize.Medium
   */
  size?: SelectorSize;
  /**
   * Theme of the radio group.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the radio group.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The input radio default selected value.
   */
  value?: RadioButtonValue;
  /**
   * Determines the radio group variant.
   * @default SelectorVariant.Default
   */
  variant?: SelectorVariant;
}
