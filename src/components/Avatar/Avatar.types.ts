import React, { ReactNode, Ref } from 'react';
import { OcThemeName } from '../ConfigProvider';
import { IconProps } from '../Icon';
import { ListProps } from '../List';
import { TooltipProps } from '../Tooltip';
import { OcBaseProps } from '../OcBase';

export enum StatusIconsPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  TopRight = 'topright',
  TopLeft = 'topleft',
  BottomRight = 'bottomright',
  BottomLeft = 'bottomleft',
}

export type StatusIconsMap = {
  [key in StatusIconsPosition]?: StatusIconsProps;
};

export interface BaseAvatarProps extends OcBaseProps<HTMLSpanElement> {
  /**
   * Avatar fallback font size
   * @default '18px'
   */
  fontSize?: string;
  /**
   * Function that returns avatar index
   */
  hashingFunction?: () => number;
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
   * theme of the fallback avatar
   * @default ''
   */
  theme?: OcThemeName;
  /**
   * Type of avatar style
   * @default 'square'
   */
  type?: 'round' | 'square';
  /**
   * Status icons which are to be placed on top of the avatar
   * @default {}
   */
  statusIcons?: StatusIconsMap;
}

export interface StatusIconsProps extends IconProps {
  /**
   * Background color
   * @default '#fff'
   */
  backgroundColor?: string;
  /**
   * Icon padding
   * @default '6px'
   */
  padding?: string;
  /**
   * Icon onClick event handler.
   * @default undefined
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

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

export interface AvatarGroupProps extends OcBaseProps<HTMLDivElement> {
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
