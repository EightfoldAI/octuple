import * as React from 'react';
import { IconName } from '../Icon';
import { OcThemeNames } from '../ConfigProvider';
import { ButtonProps } from '../Button';

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

/**
 * Props for the close button
 */
export type closeButtonProps = Omit<
    ButtonProps,
    'icon' | 'onClick' | 'size' | 'className'
>;

/**
 * Props for the pill button shown on right of the label
 */
export type pillButtonProps = Omit<
    ButtonProps,
    'onClick' | 'size' | 'className'
>;

export interface PillProps {
    /**
     * Label of the pill
     */
    label: string;
    /**
     * Theme of the pill
     * @default blue
     */
    theme?: OcThemeNames;
    /**
     * Custom color for the pill
     */
    color?: string;
    /**
     * Icon shown before the label
     */
    icon?: IconName;
    /**
     * Type of the pill
     * @default PillType.default
     */
    type?: PillType;
    /**
     * Size of the pill
     * @default PillType.Large
     */
    size?: PillSize;
    /**
     * Props for the close button,
     * if type is set to PillType.closable
     */
    closeButtonProps?: closeButtonProps;
    /**
     * Props for the button on the right side of the pill
     * if type is set to PillType.withButton
     */
    pillButtonProps?: pillButtonProps;
    /**
     * Callback called on click of the close button
     */
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * Callback called on click of the button right of the pill
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
