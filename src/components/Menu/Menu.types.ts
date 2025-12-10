import React, { ReactNode } from 'react';
import { ListProps } from '../List';
import {
  MenuItemButtonProps,
  MenuItemCustomProps,
  MenuItemLinkProps,
  MenuItemSubHeaderProps,
  DropdownMenuItemProps,
} from './MenuItem/MenuItem.types';
import { ButtonProps } from '../Button';

export enum MenuVariant {
  disruptive = 'disruptive',
  primary = 'primary',
  neutral = 'neutral',
}

export enum MenuSize {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

export type MenuItemTypes =
  | MenuItemLinkProps
  | MenuItemButtonProps
  | MenuItemSubHeaderProps
  | MenuItemCustomProps
  | DropdownMenuItemProps;

export interface MenuProps
  extends Omit<
    ListProps<MenuItemTypes>,
    'renderItem' | 'role' | 'itemRole' | 'footer'
  > {
  /**
   * Props for the cancel button
   */
  cancelButtonProps?: ButtonProps;
  /**
   * Props for the ok button
   */
  okButtonProps?: ButtonProps;
  /**
   * Callback when cancel button is clicked
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * On change callback when menu item is clicked
   * @param value
   */
  onChange?: (value: any, event?: React.MouseEvent) => void;
  /**
   * Callback when ok button is clicked
   */
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The menu aria role.
   * @default 'menu'
   */
  role?: string;
  /**
   * Size of the menu
   * @default MenuSize.Medium
   */
  size?: MenuSize;
  /**
   * SubHeader of the menu
   * @deprecated 'Unused prop'
   */
  subHeader?: string;
  /**
   * Variant of the menu item
   * @default MenuVariant.neutral
   */
  variant?: MenuVariant;
  /**
   * The role attribute for menu item list item wrappers (li elements).
   * Applied to all menu items if not specified on individual items.
   * @default 'presentation'
   */
  menuItemRole?: string;
  /**
   * The role attribute for menu item button elements.
   * Applied to all menu items if not specified on individual items.
   * @default undefined (uses item's role prop)
   */
  menuButtonRole?: string;
  /**
   * Whether to inject the default role into the menu item button elements.
   * @default true
   */
  menuButtonHasRole?: boolean;
}

export interface DropdownMenuProps extends MenuProps {
  /**
   * If the dropdown is disabled or not
   */
  disabled?: boolean;
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
  menuRenderer?: MenuRenderFunction;
}
export interface MenuRendererProps {
  items: MenuItemTypes[];
  size?: MenuSize;
  variant?: MenuVariant;
  children?: ReactNode;
  [key: string]: any;
}

export interface MenuRenderFunction {
  (props: MenuRendererProps): JSX.Element;
}
