import * as React from 'react';

export enum ButtonSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small'
}

export interface IButtonProps {
    allowDisabledFocus?: boolean;
    ariaLabel?: string;
    checked?: boolean;
    classes?: String;
    disabled?: boolean;
    disruptive?: boolean;
    icon?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text?: string;
    size?: ButtonSize;
    split?: boolean;
    splitButtonAriaLabel?: string;
    splitButtonMenuProps?: IButtonProps;
    styles?: React.CSSProperties;
}