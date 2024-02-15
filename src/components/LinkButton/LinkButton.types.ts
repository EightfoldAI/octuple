import React, { AnchorHTMLAttributes, Ref } from 'react';
import { IconProps } from '../Icon';
import { OcBaseProps } from '../OcBase';
import {
  ConfigContextProps,
  Shape,
  Size,
  OcThemeName,
} from '../ConfigProvider';
import { NudgeProps } from '../Button/Nudge/Nudge.types';
import {
  ButtonIconAlign as LinkButtonIconAlign,
  ButtonTextAlign as LinkButtonTextAlign,
  ButtonSize as LinkButtonSize,
  ButtonWidth as LinkButtonWidth,
  ButtonShape as LinkButtonShape,
  ButtonVariant as LinkButtonVariant,
} from '../Button';

export {
  LinkButtonIconAlign,
  LinkButtonTextAlign,
  LinkButtonSize,
  LinkButtonWidth,
  LinkButtonShape,
  LinkButtonVariant,
};

export interface FloatingLinkButtonProps {
  /**
   * Determines if the link button is floating.
   * @default false
   */
  enabled?: boolean;
}

export type NativeLinkButtonProps = OcBaseProps<HTMLAnchorElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export interface LinkButtonProps extends NativeLinkButtonProps {
  /**
   * Allows focus on the link button when it's disabled.
   */
  allowDisabledFocus?: boolean;
  /**
   * The link button icon alignment.
   * @default LinkButtonIconAlign.Left
   */
  alignIcon?: LinkButtonIconAlign;
  /**
   * The link button text alignment.
   * @default LinkButtonTextAlign.Center
   */
  alignText?: LinkButtonTextAlign;
  /**
   * The link button aria-label text.
   */
  ariaLabel?: string;
  /**
   * The link button class names.
   */
  classNames?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The link button counter string.
   */
  counter?: string;
  /**
   * The link button disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * The link button disruptive state.
   * @default false
   */
  disruptive?: boolean;
  /**
   * The link button drop shadow state.
   * @default false
   */
  dropShadow?: boolean;
  /**
   * The link button is always floating on bottom right corner.
   */
  floatingLinkButtonProps?: FloatingLinkButtonProps;
  /**
   * The link button gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The link button nudge props.
   * @experimental
   */
  nudgeProps?: NudgeProps;
  /**
   * The link button icon props.
   */
  iconProps?: IconProps;
  /**
   * The link button width type
   * @default fitContent
   */
  linkButtonWidth?: LinkButtonWidth;
  /**
   * The link button icon props.
   */
  prefixIconProps?: IconProps;
  /**
   * The link button id.
   */
  id?: string;
  /**
   * The link button onClick event handler.
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * Ref of the link button
   */
  ref?: Ref<HTMLAnchorElement>;
  /**
   * The link button role.
   * @default 'link'
   */
  role?: string;
  /**
   * Shape of the link button.
   * @default LinkButtonShape.Pill
   */
  shape?: LinkButtonShape | Shape;
  /**
   * The link button size.
   * @default LinkButtonSize.Medium
   */
  size?: LinkButtonSize | Size;
  /**
   * The link button style.
   */
  style?: React.CSSProperties;
  /**
   * The link button target
   * @default '_self'
   */
  target?: string;
  /**
   * The link button text.
   */
  text?: string;
  /**
   * Theme of the link button.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the link button.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The link button will remain transparent
   * @default false
   */
  transparent?: boolean;
  /**
   * The link button variant.
   * variant: `Default`, `Neutral`, `Primary`, `Secondary`, `SystemUI`
   * @default LinkButtonVariant.Default
   */
  variant?: LinkButtonVariant;
  /**
   * If the link button is in loading state
   */
  loading?: boolean;
}
