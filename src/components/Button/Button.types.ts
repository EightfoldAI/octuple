import React, { Ref } from 'react';
import { IconProps } from '../Icon';
import { OcBaseProps } from '../OcBase';
import {
  ConfigContextProps,
  Shape,
  Size,
  OcThemeName,
} from '../ConfigProvider';
import { NudgeProps } from './Nudge/Nudge.types';
import { BadgeProps } from '../Badge';

export enum ButtonIconAlign {
  Left = 'left',
  Right = 'right',
}

export enum ButtonTextAlign {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum ButtonSize {
  Flex = 'flex',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum ButtonWidth {
  fitContent = 'fitContent',
  fill = 'fill',
}

export enum ButtonShape {
  Rectangle = 'rectangle',
  Pill = 'pill',
  Round = 'round',
}

export enum ButtonVariant {
  Default = 'default',
  Neutral = 'neutral',
  Primary = 'primary',
  Secondary = 'secondary',
  SystemUI = 'systemui',
}

export interface FloatingButtonProps {
  /**
   * Determines if the button is floating.
   * @default false
   */
  enabled?: boolean;
}

export type NativeButtonProps = Omit<OcBaseProps<HTMLButtonElement>, 'type'>;

export interface SplitButtonProps
  extends Omit<
    ButtonProps,
    'text' | 'htmlType' | 'onContextMenu' | 'splitButtonProps' | 'toggle'
  > {}

export interface TwoStateButtonProps
  extends Omit<
    ButtonProps,
    | 'alignIcon'
    | 'htmlType'
    | 'iconProps'
    | 'onContextMenu'
    | 'split'
    | 'splitButtonChecked'
    | 'splitButtonProps'
  > {
  /**
   * The button icon 1 props.
   */
  iconOneProps?: IconProps;
  /**
   * The button icon 2 props.
   */
  iconTwoProps?: IconProps;
}

export interface ButtonProps extends NativeButtonProps {
  /**
   * Allows focus on the button when it's disabled.
   */
  allowDisabledFocus?: boolean;
  /**
   * The button icon alignment.
   * @default ButtonIconAlign.Left
   */
  alignIcon?: ButtonIconAlign;
  /**
   * The button text alignment.
   * @default ButtonTextAlign.Center
   */
  alignText?: ButtonTextAlign;
  /**
   * The button aria-label text.
   */
  ariaLabel?: string;
  /**
   * The button counter badge props.
   */
  badgeProps?: BadgeProps;
  /**
   * The button width type
   * @default fitContent
   */
  buttonWidth?: ButtonWidth;
  /**
   * The button checked value.
   */
  checked?: boolean;
  /**
   * The button class names.
   */
  classNames?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The button counter string.
   */
  counter?: string;
  /**
   * The button disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * The button disruptive state.
   * @default false
   */
  disruptive?: boolean;
  /**
   * The button drop shadow state.
   * @default false
   */
  dropShadow?: boolean;
  /**
   * The button is always floating on bottom right corner.
   */
  floatingButtonProps?: FloatingButtonProps;
  /**
   * The button gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The button nudge props.
   * @experimental
   */
  nudgeProps?: NudgeProps;
  /**
   * The button html type.
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * The button icon props.
   */
  iconProps?: IconProps;
  /**
   * The button icon props.
   */
  prefixIconProps?: IconProps;
  /**
   * The button id.
   */
  id?: string;
  /**
   * If the button is in loading state
   */
  loading?: boolean;
  /**
   * The button onClick event handler.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The split button click event handler.
   */
  onContextMenu?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Ref of the button
   */
  ref?: Ref<HTMLButtonElement>;
  /**
   * Shape of the button.
   * @default ButtonShape.Pill
   */
  shape?: ButtonShape | Shape;
  /**
   * The button size.
   * @default ButtonSize.Medium
   */
  size?: ButtonSize | Size;
  /**
   * Determines whether this is a split button.
   * @default false
   */
  split?: boolean;
  /**
   * The split button checked value.
   */
  splitButtonChecked?: boolean;
  /**
   * The split button props.
   */
  splitButtonProps?: SplitButtonProps;
  /**
   * The button style.
   */
  style?: React.CSSProperties;
  /**
   * The button text.
   */
  text?: string;
  /**
   * Theme of the button.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the button.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The button is a toggle button with distinct on and off states.
   */
  toggle?: boolean;
  /**
   * The button will remain transparent
   * @default false
   */
  transparent?: boolean;
  /**
   * Determines the button type.
   * @deprecated Use `variant` instead.
   * @default ButtonVariant.Default
   */
  type?: ButtonVariant;
  /**
   * Determines the button variant.
   * @default ButtonVariant.Default
   */
  variant?: ButtonVariant;
}
