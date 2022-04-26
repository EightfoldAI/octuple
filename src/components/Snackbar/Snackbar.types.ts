import { IconName } from '../Icon';
import React from 'react';
import { ButtonProps } from '../Button';

export enum SnackbarType {
    neutral = 'neutral',
    positive = 'positive',
    warning = 'warning',
    disruptive = 'disruptive',
}

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

export type SnackbarPosition =
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';

export interface SnackbarProps {
    content: string;
    id?: string;
    type?: SnackbarType;
    icon?: IconName;
    style?: React.CSSProperties;
    className?: string;
    closable?: boolean;
    onClose?: () => void;
    closeIcon?: IconName;
    closeButtonProps?: CloseButtonProps;
    duration?: number;
    position?: SnackbarPosition;
}

export interface SnackbarContainerProps {
    parent?: HTMLElement;
}
