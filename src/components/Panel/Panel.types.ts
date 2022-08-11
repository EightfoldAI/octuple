import React from 'react';
import { IconName } from '../Icon';
import { ButtonProps } from '../Button';
import { OcBaseProps } from '../OcBase';

export enum PanelSize {
    small = 'small',
    medium = 'medium',
    large = 'large',
}

export type PanelRef = {
    push: () => void;
    pull: () => void;
};

export type PanelPlacement = 'top' | 'right' | 'bottom' | 'left';

type EventType =
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

export interface PanelProps extends Omit<OcBaseProps<HTMLElement>, 'title'> {
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
     * Autofocus on the panel on visible
     * @default true
     */
    autoFocus?: boolean;
    /**
     * Custom classes for the body
     */
    bodyClassNames?: string;
    /**
     * Enables body padding
     * @default true
     */
    bodyPadding?: boolean;
    /**
     * Enables header padding
     * @default true
     */
    headerPadding?: boolean;
    /**
     * Content of the body
     */
    children?: React.ReactNode;
    /**
     * Show close button on top right
     * @default true
     */
    closable?: boolean;
    /**
     * Close icon name
     */
    closeIcon?: IconName;
    /**
     * Close button extra props
     */
    closeButtonProps?: CloseButtonProps;
    /**
     * Footer of the panel
     */
    footer?: React.ReactNode;
    /**
     * Custom classes for the footer
     */
    footerClassNames?: string;
    /**
     * Props for the header button
     */
    headerButtonProps?: ButtonProps;
    /**
     * Custom classes for the header
     */
    headerClassNames?: string;
    /**
     * Header icon name
     */
    headerIcon?: IconName;
    /**
     * Custom height of the panel
     */
    height?: number;
    /**
     * Clicking on mask should close panel or not
     * @default true
     */
    maskClosable?: boolean;
    /**
     * Callback fired on close on the panel
     * @param e {EventType}
     */
    onClose?: (e: EventType) => void;
    /**
     * Callback fired on visibility change of the panel
     * @param visible {bool}
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * Whether the dialog should show the overlay
     * if false: there will be no overlay.
     * @default true
     */
    overlay?: boolean;
    /**
     * Element to which to attach the panel to
     * @default HTMLBodyElement
     */
    parent?: HTMLDivElement | HTMLBodyElement;
    /**
     * Custom classes for the panel
     */
    panelClassNames?: string;
    /**
     * Custom classes for the panel wrapper
     */
    panelWrapperClassNames?: string;
    /**
     * Custom style for the side panel
     */
    panelStyle?: React.CSSProperties;
    /**
     * Where to place the drawer
     * @default right
     */
    placement?: PanelPlacement;
    /**
     * Whether the panel gets pushed out with nested panels
     * @default true
     */
    push?: boolean;
    /**
     * Size of the panel, can be overridden with width
     * @default medium
     */
    size?: PanelSize;
    /**
     * The title of the panel
     */
    title?: React.ReactNode;
    /**
     * Whether the panel is visible or not
     */
    visible?: boolean;
    /**
     * Custom width of the panel
     */
    width?: number;
    /**
     * Custom zIndex for the panel
     */
    zIndex?: number;
    /**
     * Custom zIndex for the panel
     */
    panelHeader?: () => React.ReactElement;
}
