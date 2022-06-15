import React, { Ref } from 'react';
import { Placement, Strategy } from '@floating-ui/react-dom';
import { IconName, IconProps } from '../Icon';
import { LabelProps } from '../Label';
import { TooltipTheme } from '../Tooltip';
import { OcBaseProps } from '../OcBase';

export enum TextInputTheme {
    light = 'light',
    dark = 'dark',
}

export enum TextInputWidth {
    fitContent = 'fitContent',
    fill = 'fill',
}

export enum TextInputShape {
    Rectangle = 'rectangle',
    Pill = 'pill',
}

export interface InputIconProps extends Omit<IconProps, 'path'> {
    /**
     * The icon img alt text.
     */
    alt?: string;
    /**
     * The optional icon svg path name.
     */
    path?: IconName;
    /**
     * The icon image source url.
     */
    imageSrc?: string;
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
     * The input button icon props.
     */
    iconProps?: IconProps;
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
     * The label icon button props.
     */
    iconProps?: IconProps;
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
     * Content to show on the tooltip
     */
    toolTipContent?: React.ReactNode;
    /**
     * Theme of the tooltip
     * @default light
     */
    toolTipTheme?: TooltipTheme;
    /**
     * Placement of the tooltip
     * @default top
     */
    toolTipPlacement?: Placement;
    /**
     * Positioning strategy for the tooltip
     * @default absolute
     */
    toolTipPositionStrategy?: Strategy;
}

export interface SearchBoxProps
    extends Omit<InputProps<HTMLInputElement>, 'htmlType'> {
    /**
     * The search box value.
     */
    value?: string;
}

export interface TextAreaProps
    extends Omit<
        InputProps<HTMLTextAreaElement>,
        'clearButtonAriaLabel' | 'iconProps' | 'iconButtonProps' | 'shape'
    > {
    /**
     * The text area is expandable.
     * @default false
     */
    enableExpand?: boolean;
    /**
     * The text area component ref.
     */
    ref?: Ref<HTMLTextAreaElement>;
    /**
     * The text area required attribute.
     * @default false
     */
    required?: boolean;
    /**
     * The number of text area cols.
     * @default 50
     */
    textAreaCols?: number;
    /**
     * The number of text area rows.
     * @default 5
     */
    textAreaRows?: number;
}

export interface TextInputProps extends InputProps<HTMLInputElement> {
    /**
     * option to show the clear input button.
     * default is true for backward compatibility
     * @default true
     */
    clearable?: boolean;
    /**
     * The input html type.
     * @default 'text'
     */
    htmlType?: string;
    /**
     * The input accepts only numbers.
     * @default false
     */
    numbersOnly?: boolean;
    /**
     * onclear event handler.
     */
    onClear?: React.MouseEventHandler<Element>;
    /**
     * The input component ref.
     */
    ref?: Ref<HTMLInputElement>;
    /**
     * The input required attribute.
     * @default false
     */
    required?: boolean;
}

export interface InputProps<T>
    extends Omit<
        OcBaseProps<T>,
        'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown'
    > {
    /**
     * Allows focus on the input when it's disabled.
     * @default false
     */
    allowDisabledFocus?: boolean;
    /**
     * The input aria label text.
     */
    ariaLabel?: string;
    /**
     * The input autoFocus attribute.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * The input clear button aria label text.
     */
    clearButtonAriaLabel?: string;
    /**
     * The input disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The input icon props.
     */
    iconProps?: InputIconProps;
    /**
     * The input icon button props.
     */
    iconButtonProps?: InputIconButtonProps;
    /**
     * The input id.
     */
    id?: string;
    /**
     * Width of the tooltip
     * @default fitContent
     */
    inputWidth?: TextInputWidth;
    /**
     * The input label props.
     */
    labelProps?: LabelProps;
    /**
     * The input maxlength.
     */
    maxlength?: number;
    /**
     * The input minlength.
     */
    minlength?: number;
    /**
     * The input name.
     */
    name?: string;
    /**
     * The input onBlur event handler.
     */
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    /**
     * The input onChange event handler.
     */
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    /**
     * The input onFocus event handler.
     */
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    /**
     * The input onKeyDown event handler.
     */
    onKeyDown?: React.KeyboardEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    /**
     * Placeholder text of the input.
     */
    placeholder?: string;
    /**
     * Shape of the input.
     * @default TextInputShape.Pill
     */
    shape?: TextInputShape;
    /**
     * Theme of the input.
     * @default TextInputTheme.light
     */
    theme?: TextInputTheme;
    /**
     * The value of the input.
     */
    value?: string | number;
    /**
     * Debounce rate of the input.
     * @default 10
     */
    waitInterval?: number;

    /**
     * input readonly.
     * @default false
     */
    readonly?: boolean;
}
