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
     * Content to show on the tooltip
     */
    content: React.ReactNode;
    /**
     * Theme of the tooltip
     * @default light
     */
    theme?: TooltipTheme;
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
     * Positioning strategy for the tooltip
     * @default absolute
     */
    positionStrategy?: Strategy;
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
    /**
     * Wrapper class name
     */
    wrapperClassNames?: string;
    /**
     * Wrapper style
     */
    wrapperStyle?: React.CSSProperties;
    /**
     * Size of the tooltip
     * @default TooltipSize.small
     */
    size?: TooltipSize;
}
