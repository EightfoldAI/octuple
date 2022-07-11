import React from 'react';
import { ListProps } from '../List';
import {
    MenuItemButtonProps,
    MenuItemCustomProps,
    MenuItemLinkProps,
    MenuItemProps,
    MenuItemSubHeaderProps,
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
    | MenuItemCustomProps;

export interface MenuProps
    extends Omit<
        ListProps<MenuItemTypes>,
        'renderItem' | 'role' | 'itemRole' | 'footer'
    > {
    /**
     * Variant of the menu item
     * @default MenuVariant.neutral
     */
    variant?: MenuVariant;
    /**
     * Size of the menu
     * @default MenuSize.Medium
     */
    size?: MenuSize;
    /**
     * On change callback when menu item is clicked
     * @param value
     */
    onChange?: (value: any) => void;
    /**
     * SubHeader of the menu
     */
    subHeader?: string;
    /**
     * Props for the ok button
     */
    okButtonProps?: ButtonProps;
    /**
     * Props for the cancel button
     */
    cancelButtonProps?: ButtonProps;
    /**
     * Callback when ok button is clicked
     */
    onOk?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * Callback when cancel button is clicked
     */
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}
