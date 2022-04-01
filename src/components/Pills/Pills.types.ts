import * as React from 'react';
import { IconName } from '../Icon';
import { OcThemeNames } from '../ConfigProvider';

export enum PillType {
    default = 'default',
    closable = 'closable',
    withButton = 'withButton',
}

export enum PillSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface PillProps {
    label: string;
    theme?: OcThemeNames;
    color?: string;
    icon?: IconName;
    type?: PillType;
    size?: PillSize;
    buttonContent?: React.ReactNode;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
