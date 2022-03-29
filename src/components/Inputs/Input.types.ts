import React from 'react';

export enum TextInputTheme {
    light = 'light',
    dark = 'dark',
}

export enum TextInputShape {
    Rectangle = 'rectangle',
    Pill = 'pill',
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
    numbersOnly?: boolean;
    required?: boolean;
    type?: string;
}

export interface InputProps {
    allowDisabledFocus?: boolean;
    ariaLabel?: string;
    autoFocus?: boolean;
    className?: string;
    clearInputTabIndex?: string;
    disabled?: boolean;
    helpText?: string;
    id?: string;
    label?: string;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onClear?: boolean | (() => {});
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    placeholder?: string;
    shape?: TextInputShape;
    value?: string | number;
    waitInterval?: number;
}
