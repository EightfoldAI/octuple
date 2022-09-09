import React, { Ref, FormEventHandler } from 'react';
import { IconName, IconProps } from '../Icon';
import { LabelProps } from '../Label';
import { OcBaseProps } from '../OcBase';
import type { InputStatus } from '../../shared/utilities';
import { ConfigContextProps, Shape, Size } from '../ConfigProvider';

export enum TextInputIconAlign {
    Left = 'left',
    Right = 'right',
}

export enum TextInputSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

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
    Underline = 'underline',
}

export interface InputIconProps extends Omit<IconProps, 'path'> {
    /**
     * The icon img alt text.
     */
    alt?: string;
    /**
     * The icon image source url.
     */
    imageSrc?: string;
    /**
     * The optional icon svg path name.
     */
    path?: IconName;
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

export interface SearchBoxProps
    extends Omit<InputProps<HTMLInputElement>, 'htmlType'> {
    /**
     * Form onsubmit event handler.
     */
    onSubmit?: FormEventHandler<HTMLFormElement | HTMLInputElement>;
    /**
     * The search box value.
     */
    value?: string;
}

export interface TextAreaProps
    extends Omit<
        InputProps<HTMLTextAreaElement>,
        | 'clearable'
        | 'clearButtonAriaLabel'
        | 'iconProps'
        | 'iconButtonProps'
        | 'alignIcon'
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
     * The input icon alignment.
     * @default TextInputIconAlign.Left
     */
    alignIcon?: TextInputIconAlign;
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
     * option to show the clear input button.
     * default is true for backward compatibility
     * @default true
     */
    clearable?: boolean;
    /**
     * Configure how contextual props are consumed
     */
    configContextProps?: ConfigContextProps;
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
     * The input is a form item.
     * @default false
     */
    formItemInput?: boolean;
    /**
     * The input icon button props.
     */
    iconButtonProps?: InputIconButtonProps;
    /**
     * The input icon props.
     */
    iconProps?: InputIconProps;
    /**
     * The input id.
     */
    id?: string;
    /**
     * The input label is inline.
     * @default false
     */
    inline?: boolean;
    /**
     * Width of the input
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
     * input readonly.
     * @default false
     */
    readonly?: boolean;
    /**
     * Shape of the input.
     * @default TextInputShape.Pill
     */
    shape?: TextInputShape | Shape;
    /**
     * The input size.
     * @default TextInputSize.Medium
     */
    size?: TextInputSize | Size;
    /**
     * the validation status.
     */
    status?: InputStatus;
    /**
     * The value of the input.
     */
    value?: string | number;
    /**
     * Debounce rate of the input.
     * @default 10
     */
    waitInterval?: number;
}
