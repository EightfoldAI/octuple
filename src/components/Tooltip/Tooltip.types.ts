import { Placement, Strategy } from '@floating-ui/react-dom';
import React from 'react';
import { OcBaseProps } from '../OcBase';

export enum TooltipTheme {
    light = 'light',
    dark = 'dark',
}

export enum TooltipSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface TooltipProps extends OcBaseProps<HTMLDivElement> {
    /**
     * Content to show in the tooltip
     */
    content: React.ReactNode;
    /**
     * Whether to disable the tooltip
     * @default false
     */
    disabled?: boolean;
    /**
     * Timeout in milliseconds to hide the tooltip
     * @default 0
     */
    hideAfter?: number;
    /**
     * Offset of the tooltip from the reference element
     * @default 8
     */
    offset?: number;
    /**
     * Delay of appearance, in milliseconds
     * @default 0
     */
    openDelay?: number;
    /**
     * Placement of the tooltip
     * @default bottom
     */
    placement?: Placement;
    /**
     * Whether the tooltip is portaled
     * @default false
     */
    portal?: boolean;
    /**
     * The id of the floating portal
     */
    portalId?: string;
    /**
     * The element in which to render the portal
     */
    portalRoot?: HTMLElement | null;
    /**
     * Positioning strategy for the tooltip
     * @default absolute
     */
    positionStrategy?: Strategy;
    /**
     * Size of the tooltip
     * @default TooltipSize.small
     */
    size?: TooltipSize;
    /**
     * Tabindex of tooltip
     * @default 0
     */
    tabIndex?: number;
    /**
     * Theme of the tooltip
     * @default light
     */
    theme?: TooltipTheme;
    /**
     * Whether the tooltip arrow is visible
     * @default true
     */
    visibleArrow?: boolean;
    /**
     * Wrapper class names
     */
    wrapperClassNames?: string;
    /**
     * Wrapper style
     */
    wrapperStyle?: React.CSSProperties;
}
