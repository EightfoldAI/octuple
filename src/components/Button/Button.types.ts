import * as React from 'react';
import { IconName } from '../Icon/mdi'

export enum ButtonSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface ButtonProps {
    allowDisabledFocus?: boolean;
    ariaLabel?: string;
    checked?: boolean;
    classes?: string;
    disabled?: boolean;
    disruptive?: boolean;
    icon?: IconName;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text?: string;
    size?: ButtonSize;
    split?: boolean;
    splitButtonAriaLabel?: string;
    splitButtonMenuProps?: ButtonProps;
    styles?: React.CSSProperties;
}
