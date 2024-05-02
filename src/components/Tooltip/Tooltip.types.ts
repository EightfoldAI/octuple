import { Placement, Strategy } from '@floating-ui/react';
import React, { Ref } from 'react';
import { OcBaseProps } from '../OcBase';

export const ANIMATION_DURATION: number = 200;
export const NO_ANIMATION_DURATION: number = 10;
export const PREVENT_DEFAULT_TRIGGERS: string[] = ['contextmenu'];
export const TOOLTIP_ARROW_WIDTH: number = 8;
export const TOOLTIP_DEFAULT_OFFSET: number = TOOLTIP_ARROW_WIDTH;
export const TRIGGER_TO_HANDLER_MAP_ON_ENTER = {
  click: 'onClick',
  hover: 'onMouseEnter',
  contextmenu: 'onContextMenu',
};
export const TRIGGER_TO_HANDLER_MAP_ON_LEAVE = {
  click: '',
  hover: 'onMouseLeave',
  contextmenu: '',
};

export enum TooltipSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum TooltipTheme {
  light = 'light',
  dark = 'dark',
}

export enum TooltipType {
  Default = 'default',
  Popup = 'popup',
}

export enum TooltipTouchInteraction {
  Tap = 'Tap',
  TapAndHold = 'TapAndHold',
}

export interface TooltipProps extends Omit<OcBaseProps<HTMLDivElement>, 'ref'> {
  /**
   * Should animate the Tooltip transitions.
   * @default true
   */
  animate?: boolean;
  /**
   * Whether the Tooltip has a border.
   * @default false
   */
  bordered?: boolean;
  /**
   * Should close Tooltip on click outside.
   * @default true
   */
  closeOnOutsideClick?: boolean;
  /**
   * Should close Tooltip on reference click.
   * @default true
   */
  closeOnReferenceClick?: boolean;
  /**
   * Should close Tooltip on body click.
   * @default false
   */
  closeOnTooltipClick?: boolean;
  /**
   * Content to show in the Tooltip.
   */
  content: React.ReactNode;
  /**
   * Whether to disable the browser contextual menu on the reference element.
   * Useful for some touch (`Gestures.TapAndHold`) implementations.
   * @default false
   */
  disableContextMenu?: boolean;
  /**
   * Whether to disable the Tooltip.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the Tooltip has a drop shadow.
   * @default true
   */
  dropShadow?: boolean;
  /**
   * Timeout in milliseconds to hide the Tooltip.
   * @default 0
   */
  hideAfter?: number;
  /**
   * Manually control the height of the Tooltip.
   */
  height?: number;
  /**
   * Manually control the maximum width of the Tooltip.
   */
  maxWidth?: number;
  /**
   * Manually control the minimum height of the Tooltip.
   */
  minHeight?: number;
  /**
   * Offset of the Tooltip from the reference element.
   * @default 8
   */
  offset?: number;
  /**
   * Callback method fired on outside click oo Tooltip.
   * @param event
   */
  onClickOutside?: (event: MouseEvent) => void;
  /**
   * Callback called when the visibility of the Tooltip changes.
   * @param visible {boolean}
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Delay of appearance, in milliseconds.
   * @default 0
   */
  openDelay?: number;
  /**
   * Placement of the Tooltip.
   * @default bottom
   */
  placement?: Placement;
  /**
   * Whether to prevent the default behavior of touchmove.
   * @default true
   */
  preventTouchMoveDefault?: boolean;
  /**
   * Whether the Tooltip is portaled.
   * @default false
   */
  portal?: boolean;
  /**
   * The id of the floating portal.
   */
  portalId?: string;
  /**
   * The element in which to render the portal.
   */
  portalRoot?: HTMLElement | null;
  /**
   * Positioning strategy for the Tooltip.
   * @default absolute
   */
  positionStrategy?: Strategy;
  /**
   * The ref of the Tooltip.
   */
  ref?: Ref<TooltipRef>;
  /**
   * Callback executed on reference element click.
   * @param event
   * @returns (event: React.MouseEvent) => void
   */
  referenceOnClick?: (event: React.MouseEvent) => void;
  /**
   * Callback executed on reference element keydown.
   * @param event
   * @returns (event: React.KeyboardEvent) => void
   */
  referenceOnKeydown?: (event: React.KeyboardEvent) => void;
  /**
   * Callback to control the show/hide behavior of the Tooltip.
   * triggered before the visible change
   * @param show {boolean}
   * @returns true or false.
   */
  showTooltip?: (show: boolean) => boolean;
  /**
   * Size of the Tooltip.
   * @default TooltipSize.small
   */
  size?: TooltipSize;
  /**
   * Tabindex of Tooltip.
   * @default 0
   */
  tabIndex?: number;
  /**
   * Theme of the Tooltip.
   * @default light
   */
  theme?: TooltipTheme;
  /**
   * Callback executed on tooltip element keydown.
   * @param event
   * @returns (event: React.KeyboardEvent) => void
   */
  tooltipOnKeydown?: (event: React.KeyboardEvent) => void;
  /**
   * The Tooltip style.
   */
  tooltipStyle?: React.CSSProperties;
  /**
   * The trigger mode that opens the Tooltip.
   * @default 'click'
   */
  trigger?: 'click' | 'hover' | 'contextmenu';
  /**
   * The `z-index` of the trigger is higher than the Tooltip.
   * Use when type is TooltipType.Popup
   * @default false
   */
  triggerAbove?: boolean;
  /**
   * Determines the interaction that triggers
   * the equivalent of hover on touch interfaces.
   * @default TooltipTouchInteraction.TapAndHold
   */
  touchInteraction?: TooltipTouchInteraction;
  /**
   * The type of Tooltip
   * @default TooltipType.Default
   */
  type?: TooltipType;
  /**
   * Manually control visibility of the Tooltip.
   */
  visible?: boolean;
  /**
   * Whether the Tooltip arrow is visible.
   * @default true
   */
  visibleArrow?: boolean;
  /**
   * Manually control the width of the Tooltip.
   */
  width?: number;
  /**
   * Wrapper class names.
   */
  wrapperClassNames?: string;
  /**
   * The Wrapper style.
   */
  wrapperStyle?: React.CSSProperties;
}

export type TooltipRef = {
  /**
   * Helper method to manually update the position
   * of the Tooltip.
   */
  update: () => void;
};
