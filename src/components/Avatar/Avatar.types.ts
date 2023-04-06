import React, { ReactNode, Ref } from 'react';
import { OcThemeName } from '../ConfigProvider';
import { IconProps } from '../Icon';
import { ListProps } from '../List';
import { TooltipProps } from '../Tooltip';
import { OcBaseProps } from '../OcBase';
import { PopupProps } from '../Popup';

export type Key = React.Key;

export type StatusItemsMap = {
  [key in StatusItemsPosition]?: StatusItemsProps;
};

export enum StatusItemsPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  TopRight = 'topRight',
  TopLeft = 'topLeft',
  BottomRight = 'bottomRight',
  BottomLeft = 'bottomLeft',
}

export enum StatusItemIconAlign {
  Left = 'left',
  Right = 'right',
}

export interface AvatarOutlineProps {
  /**
   * Outline color
   */
  outlineColor?: string;
  /**
   * Outline offset
   */
  outlineOffset?: string;
  /**
   * Outline style
   */
  outlineStyle?: string;
  /**
   * Outline width
   */
  outlineWidth?: string;
}

export interface StatusItemsProps extends IconProps {
  /**
   * Interactive element label
   */
  ariaLabel?: string;
  /**
   * Background color
   * @default 'var(--white-color)'
   */
  backgroundColor?: string;
  /**
   * Icon onClick event handler.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Status item outline
   *
   * Defaults when `outline` is truthy are `{ outlineColor: 'var(--grey-color-80)', outlineOffset: '0px', outlineStyle: 'solid', outlineWidth: '2px' }`
   */
  outline?: AvatarOutlineProps;
  /**
   * Style for status item wrapper
   */
  wrapperStyle?: React.CSSProperties;
  /**
   * Class for status item wrapper
   */
  wrapperClassName?: string;
  /**
   * Status item icon alignment
   * @default StatusItemIconAlign.Right
   */
  alignIcon?: StatusItemIconAlign;
  /**
   * Text present with icon
   */
  text?: string;
  /**
   * Text having length larger than this will not be shown
   * @default 3
   */
  textMaxLength?: number;
}

export interface BaseAvatarProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Avatar fallback font size
   * @default '18px'
   */
  fontSize?: string;
  /**
   * Function that returns Avatar index
   */
  hashingFunction?: () => number;
  /**
   * Unique key of the Avatar
   */
  key?: Key;
  /**
   * Callback called on Avatar click
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback called on Avatar keydown
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Callback called on Avatar mouse enter
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback called on Avatar mouse leave
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Avatar outline
   *
   * Defaults when `outline` is truthy are `{ outlineColor: 'var(--green-color-60)', outlineOffset: '2px', outlineStyle: 'solid', outlineWidth: '4px' }`
   */
  outline?: AvatarOutlineProps;
  /**
   * Avatar Popup props.
   */
  popupProps?: AvatarPopupProps;
  /**
   * Should randomise theme
   * @default false
   */
  randomiseTheme?: boolean;
  /**
   * Ref of the container div
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * Avatar size
   * @default '32px'
   */
  size?: string;
  /**
   * Status icons which are to be placed on top of the avatar
   * @default {}
   */
  statusItems?: StatusItemsMap;
  /**
   * theme of the fallback avatar
   * @default ''
   */
  theme?: OcThemeName;
  /**
   * Type of avatar style
   * @default 'square'
   */
  type?: 'round' | 'square';
}

export interface AvatarPopupProps extends PopupProps {}

export interface AvatarIconProps extends BaseAvatarProps {
  /**
   * Icon Props
   */
  iconProps?: IconProps;
}

export interface AvatarFallbackProps extends BaseAvatarProps {}

export interface AvatarProps
  extends AvatarIconProps,
    Omit<BaseAvatarProps, 'ref'> {
  /**
   * Image source
   */
  src?: string;
  /**
   * Image alt text
   */
  alt?: string;
  /**
   * Hover tooltip
   */
  tooltipProps?: TooltipProps;
}

interface MaxAvatarProps extends BaseAvatarProps {
  /**
   * Max Avatar class names.
   */
  classNames?: string;
  /**
   * Shown Avatars max count.
   */
  count?: number;
  /**
   * Max Avatar style.
   */
  style?: React.CSSProperties;
  /**
   * Max tooltip props.
   */
  tooltipProps?: TooltipProps;
  /**
   * Max Avatar custom value.
   */
  value?: ReactNode;
  /**
   * Unique id used to target element for testing.
   */
  'data-test-id'?: string;
  /**
   * Max Avatar ref.
   */
  ref?: Ref<HTMLDivElement>;
}

interface AvatarListProps
  extends Omit<ListProps<ReactNode>, 'footer' | 'header' | 'layout'> {}

export enum AvatarGroupVariant {
  Overlapped = 'overlapped',
  Spaced = 'spaced',
}

export interface AvatarGroupProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The Avatars should animate on hover.
   * @default false
   */
  animateOnHover?: boolean;
  /**
   * Avatar group List props.
   */
  avatarListProps?: AvatarListProps;
  /**
   * Avatar group children.
   */
  children?: ReactNode;
  /**
   * Avatar group fallback avatar font sizes.
   * @default '18px'
   */
  fontSize?: string;
  /**
   * Avatar grouping variant
   * @default AvatarGroupVariant.Overlapped
   */
  groupVariant?: AvatarGroupVariant;
  /**
   * Avatar group max props.
   */
  maxProps?: MaxAvatarProps;
  /**
   * Avatar group avatar sizes.
   * @default '32px'
   */
  size?: string;
  /**
   * Type of avatar group style
   * @default 'square'
   */
  type?: 'round' | 'square';
}
