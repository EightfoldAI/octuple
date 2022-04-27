import React from 'react';
import { IconName } from '../Icon';
import { ButtonProps } from '../Button';
import {
    serve,
    serveDisruptive,
    serveNeutral,
    servePositive,
    serveWarning,
} from './snack';

export enum SnackbarType {
    neutral = 'neutral',
    positive = 'positive',
    warning = 'warning',
    disruptive = 'disruptive',
}

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

export type SnackbarPosition =
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right';

export interface SnackbarProps {
    /**
     * Content of the snackbar
     */
    content: string;
    /**
     * Unique id of the snackbar
     */
    id?: string;
    /**
     * Type of the snackbar
     * @default SnackbarType.neutral
     */
    type?: SnackbarType;
    /**
     * Custom icon for the snackbar
     * @default IconName.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
     */
    icon?: IconName;
    /**
     * Custom style for the snackbar
     */
    style?: React.CSSProperties;
    /**
     * Custom classname for the snackbar
     */
    className?: string;
    /**
     * If the snackbar is closable or not
     */
    closable?: boolean;
    /**
     * Callback fired on close of the snackbar
     */
    onClose?: () => void;
    /**
     * Icon for the close button
     * @default IconName.mdiClose
     */
    closeIcon?: IconName;
    /**
     * Custom props for the close button
     */
    closeButtonProps?: CloseButtonProps;
    /**
     * Duration for which the snackbar is shown
     * @default 3000
     */
    duration?: number;
    /**
     * Position of the snackbar
     * @default top-center
     */
    position?: SnackbarPosition;
}

export interface SnackbarContainerProps {
    /**
     * Parent container on which the snackbar need to
     * be rendered on
     */
    parent?: HTMLElement;
}

export interface ISnack {
    serve: (props: SnackbarProps) => void;
    serveNeutral: (props: SnackbarProps) => void;
    servePositive: (props: SnackbarProps) => void;
    serveWarning: (props: SnackbarProps) => void;
    serveDisruptive: (props: SnackbarProps) => void;
}
