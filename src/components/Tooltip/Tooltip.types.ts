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
     * Timeout in milliseconds to hide tooltip
     * @default 0
     */
    hideAfter?: number;
    /**
     * Offset of the tooltip from the reference element
     * @default 8
     */
    offset?: number;
    /**
     * Delay of appearance, in millisecond
     * @default 0
     */
    openDelay?: number;
    /**
     * Placement of the tooltip
     * @default bottom
     */
    placement?: Placement;
    /**
     * If the tooltip is portaled
     * @default false
     */
    portal?: boolean;
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
     * If the tooltip arrow is visible
     * @default true
     */
    visibleArrow?: boolean;
    /**
     * Wrapper class name
     */
    wrapperClassNames?: string;
    /**
     * Wrapper style
     */
    wrapperStyle?: React.CSSProperties;
}
