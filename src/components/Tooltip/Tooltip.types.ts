import { ComputedPlacement } from '@popperjs/core';
import React from 'react';

export enum TooltipTheme {
    light = 'light',
    dark = 'dark',
}

export interface TooltipProps {
    /**
     * Element the tooltip needs to be shown on
     */
    children: React.ReactNode;
    /**
     * Content to show on the tooltip
     */
    content: React.ReactNode | string;
    /**
     * Theme of the tooltip
     * @default light
     */
    theme?: TooltipTheme;
    /**
     * Placement of the tooltip
     * @default bottom
     */
    placement?: ComputedPlacement;
    /**
     * To disable the tooltip
     * @default false
     */
    disabled?: boolean;
    /**
     * Offset of the tooltip from the reference element
     * @default 8
     */
    offset?: number;
    /**
     * If the tooltip arrow is visible
     * @default true
     */
    visibleArrow?: boolean;
    /**
     * Delay of appearance, in millisecond
     * @default 0
     */
    openDelay?: number;
    /**
     * Custom class name for Tooltip's popper
     */
    className?: string;
    /**
     * Whether the mouse can enter the tooltip
     * @default true
     */
    enterable?: boolean;
    /**
     * Timeout in milliseconds to hide tooltip
     * @default 0
     */
    hideAfter?: number;
    /**
     * Tabindex of tooltip
     * @default 0
     */
    tabIndex?: number;
}
