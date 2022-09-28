import React from 'react';
import { MenuSize, MenuVariant } from '../Menu.types';
import { OcBaseProps } from '../../OcBase';
import { IconProps } from '../../Icon';
import { LinkProps } from '../../Link';

export enum MenuItemType {
    button = 'button',
    custom = 'custom',
    link = 'link',
    subHeader = 'subHeader',
}

export interface MenuItemProps {
    /**
     * Size of the menu
     * @default MenuSize.Medium
     */
    size?: MenuSize;
    /**
     * Type of the menu
     * @default MenuType.button
     */
    type?: MenuItemType;
    /**
     * Value of the menu item
     */
    value: any;
    /**
     * Variant of the menu item
     * @default MenuVariant.neutral
     */
    variant?: MenuVariant;
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
     * Menu item icon props
     */
    iconProps?: IconProps;
    /**
     * On Click handler of the menu item
     * @param value
     */
    onClick?: (value: any) => void;
    /**
     * Display label of the menu item
     */
    text?: string;
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
    iconProps?: IconProps;
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
    onChange: (value: any) => void;
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
}
