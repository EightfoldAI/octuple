import React from 'react';

export enum TextInputTheme {
    light = 'light',
    dark = 'dark',
}

export interface TextInputProps {
    allowDisabledFocus?: boolean;
    ariaLabel?: string;
    autoFocus?: boolean;
    className?: string;
    clearInputTabIndex?: string;
    disabled?: boolean;
    enableExpand?: boolean;
    helpText?: string;
    id?: string;
    name?: string;
    numbersOnly?: boolean;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onClear?: boolean | (() => {});
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    placeholder?: string;
    required?: boolean;
    textarea?: boolean;
    textAreaCols?: number;
    textAreaRows?: number;
    type?: string;
    value?: string | number;
    waitInterval?: number | boolean;
}
