import React from 'react';
import {
  DropdownMenuProps,
  MenuSize,
  MenuVariant,
  MenuRenderFunction,
} from '../Menu.types';
import { OcBaseProps } from '../../OcBase';
import { IconProps } from '../../Icon';
import { LinkProps } from '../../Link';
import { ButtonProps } from '../../Button';

export interface MenuIconProps extends Omit<IconProps, 'size'> {}

export enum MenuItemIconAlign {
  Left = 'left',
  Right = 'right',
}

export enum MenuItemType {
  button = 'button',
  custom = 'custom',
  link = 'link',
  subHeader = 'subHeader',
}

export interface MenuItemProps {
  /**
   * The Menu item icon alignment.
   * @default MenuItemIconAlign.Left
   */
  alignIcon?: MenuItemIconAlign;
  /**
   * The canvas direction of the Menu.
   */
  direction?: string;
  /**
   * Size of the menu
   * @default MenuSize.Medium
   */
  size?: MenuSize;
  /**
   * Display label of the menu item
   */
  text?: string;
  /**
   * Type of the menu
   * @default MenuType.button
   */
  type?: MenuItemType;
  /**
   * Value of the menu item
   */
  value?: any;
  /**
   * Variant of the menu item
   * @default MenuVariant.neutral
   */
  variant?: MenuVariant;
  /**
   * The text should wrap
   * @default false
   */
  wrap?: boolean;
  /**
   * Menu renderer for nested menus
   */
  menuRenderer?: MenuRenderFunction;
}

type NativeMenuButtonProps = Omit<OcBaseProps<HTMLButtonElement>, 'children'>;

export interface MenuItemButtonProps
  extends MenuItemProps,
    NativeMenuButtonProps {
  /**
   * If the menu item is active or not
   * @default false
   */
  active?: boolean;
  /**
   * The counter string.
   */
  counter?: string;
  /**
   * If menu item is disabled or not
   */
  disabled?: boolean;
  /**
   * Menu item opens a dropdown menu.
   */
  dropdownMenuItems?: DropdownMenuItemProps[];
  /**
   * The nested dropdown menu props
   */
  dropdownMenuProps?: NestedDropdownMenuProps;
  /**
   * The button html type.
   * @default 'button'
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * Menu item icon props
   */
  iconProps?: MenuIconProps;
  /**
   * On Click handler of the menu item
   * @param value
   * @param event
   */
  onClick?: (value: any, event?: React.MouseEvent<any>) => void;
  /**
   * Secondary action button for the menu item
   */
  secondaryButtonProps?: Omit<ButtonProps, 'text' | 'shape'>;
  /**
   * Display sub text of the menu item
   */
  subText?: string;
  /**
   * Display label of the menu item
   */
  text?: string;
  /**
   * Role for the list item (li) element
   */
  listItemRole?: string;
}

export interface MenuItemLinkProps
  extends MenuItemProps,
    Omit<LinkProps, 'variant' | 'type'> {
  /**
   * If the menu item is active or not
   * @default false
   */
  active?: boolean;
  /**
   * The counter string.
   */
  counter?: string;
  /**
   * If menu item is disabled or not
   */
  disabled?: boolean;
  /**
   * Menu item icon props
   */
  iconProps?: MenuIconProps;
  /**
   * Display sub text of the menu item
   */
  subText?: string;
  /**
   * Display label of the menu item
   */
  text?: string;
}

export interface MenuItemSubHeaderProps
  extends MenuItemProps,
    OcBaseProps<HTMLSpanElement> {
  /**
   * Text of the sub header
   */
  text?: string;
}

export interface IMenuItemRender {
  value: any;
  index: number;
  onChange: (value: any, event?: React.MouseEvent<any>) => void;
  ref?: React.ForwardedRef<any>;
}

export interface MenuItemCustomProps
  extends MenuItemProps,
    OcBaseProps<HTMLDivElement> {
  /**
   * Index of the sub item
   */
  index?: number;
  /**
   * Method to render custom menu item
   */
  render?: (menuItemRender: IMenuItemRender) => React.ReactNode;
  /**
   * Menu item opens a dropdown menu.
   */
  dropdownMenuItems?: DropdownMenuItemProps[];
  /**
   * The nested dropdown menu props
   */
  dropdownMenuProps?: NestedDropdownMenuProps;
}

/**
 * NOTE: Sub menus should only be triggered by buttons, not links or text.
 */
export type DropdownMenuItemProps =
  | MenuItemButtonProps
  | MenuItemLinkProps
  | MenuItemSubHeaderProps
  | MenuItemCustomProps;

export interface NestedDropdownMenuProps
  extends Omit<DropdownMenuProps, 'items'> {}
