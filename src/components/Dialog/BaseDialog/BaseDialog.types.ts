import React from 'react';

type EventType =
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export interface BaseDialogProps {
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
     * Custom classes for the dialog wrapper
     */
    dialogWrapperClassNames?: string;
    /**
     * Custom classes for the dialog
     */
    dialogClassNames?: string;
    /**
     * Custom classes for the header
     */
    headerClassNames?: string;
    /**
     * Custom classes for the body
     */
    bodyClassNames?: string;
    /**
     * Custom classes for the actions wrapper
     */
    actionsClassNames?: string;
    /**
     * The header of the dialog
     */
    header?: React.ReactNode;
    /**
     * The body of the dialog
     */
    body?: React.ReactNode;
    /**
     * The actions of the dialog
     */
    actions?: React.ReactNode;
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
