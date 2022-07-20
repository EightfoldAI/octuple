import React, { Ref } from 'react';
import { OcBaseProps } from '../../OcBase';
import { ButtonProps } from '../../Button';

type EventType =
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type Strategy = 'absolute' | 'fixed';

export interface BaseDialogProps
    extends Omit<OcBaseProps<HTMLDivElement>, 'classNames'> {
    /**
     * Props for the first header action button
     */
    actionButtonOneProps?: ButtonProps;
    /**
     * Props for the second header action button
     */
    actionButtonTwoProps?: ButtonProps;
    /**
     * Props for the third header action button
     */
    actionButtonThreeProps?: ButtonProps;
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
     * Positioning strategy for the dialog
     * @default absolute
     */
    positionStrategy?: Strategy;
    /**
     * Element to which to attach the modal to
     * @default HTMLBodyElement
     */
    parent?: HTMLDivElement | HTMLBodyElement;
    /**
     * Ref for the dialog element
     */
    ref?: Ref<HTMLDivElement>;
}
