import React from 'react';
import { ButtonProps } from '../Button';

type EventType =
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type DialogButtonProps = Omit<ButtonProps, 'onClick'>;

export enum DialogSize {
    small = 'small',
    medium = 'medium',
}

export interface DialogProps {
    /**
     * Dialog is visible or not
     */
    visible?: boolean;
    /**
     * Clicking on mask should close modal or not
     * @default true
     */
    maskClosable?: boolean;
    /**
     * Callback fired on close on the modal
     * @param e {EventType}
     */
    onClose?: (e: EventType) => void;
    /**
     * Callback fired on visibility change of the modal
     * @param visible {bool}
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * Custom class for the dialog wrapper
     */
    dialogWrapperClassName?: string;
    /**
     * Custom class for the dialog
     */
    dialogClassName?: string;
    /**
     * Custom class for the header
     */
    headerClassName?: string;
    /**
     * Custom class for the body
     */
    bodyClassName?: string;
    /**
     * Custom class for the actions wrapper
     */
    actionsClassName?: string;
    /**
     * The header of the dialog
     */
    header?: React.ReactNode;
    /**
     * The body of the dialog
     */
    body?: React.ReactNode;
    /**
     * Props for the ok button
     */
    okButtonProps?: DialogButtonProps;
    /**
     * Props for the cancel button
     */
    cancelButtonProps?: DialogButtonProps;
    /**
     * Callback when ok button is clicked
     */
    onOk?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * Callback when cancel button is clicked
     */
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * Size of the dialog
     * @default medium
     */
    size?: DialogSize;
    /**
     * Custom width of the dialog
     */
    width?: number;
    /**
     * Custom height of the dialog
     */
    height?: number;
    /**
     * Custom zIndex for the dialog
     */
    zIndex?: number;
    /**
     * Element to which to attach the modal to
     * @default HTMLBodyElement
     */
    parent?: HTMLDivElement | HTMLBodyElement;
}
