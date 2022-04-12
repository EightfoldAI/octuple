import React from 'react';
import { IconName } from '../Icon';
import { ButtonProps } from '../Button';

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

export interface PanelProps {
    /**
     * Autofocus on the panel on visible
     * @default true
     */
    autoFocus?: boolean;
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
     * Clicking on mask should close panel or not
     * @default true
     */
    maskClosable?: boolean;
    /**
     * Custom style for the side panel
     */
    panelStyle?: React.CSSProperties;
    /**
     * Size of the panel, can be overridden with width
     * @default medium
     */
    size?: PanelSize;
    /**
     * Whether the panel gets pushed out with nested panels
     * @default true
     */
    push?: boolean;
    /**
     * Custom class for the panel wrapper
     */
    panelWrapperClassName?: string;
    /**
     * Custom class for the panel
     */
    panelClassName?: string;
    /**
     * Custom class for the header
     */
    headerClassName?: string;
    /**
     * Custom class for the body
     */
    bodyClassName?: string;
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
     * Custom height of the panel
     */
    height?: number;
    /**
     * Custom zIndex for the panel
     */
    zIndex?: number;
    /**
     * Where to place the drawer
     * @default right
     */
    placement?: PanelPlacement;
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
     * Footer of the panel
     */
    footer?: React.ReactNode;
    /**
     * Custom class for the footer
     */
    footerClassName?: string;
    /**
     * Content of the body
     */
    children?: React.ReactNode;
    /**
     * Element to which to attach the panel to
     * @default HTMLBodyElement
     */
    parent?: HTMLDivElement | HTMLBodyElement;
}
