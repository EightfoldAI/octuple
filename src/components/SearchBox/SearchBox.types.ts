export enum SearchBoxTheme {
    light = 'light',
    dark = 'dark',
}

export interface SearchBoxProps {
    allowDisabledFocus?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onClear?: boolean | (() => {});
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
    value?: string | number;
}
