import { ListProps } from '../List';
import { MenuItemProps } from './MenuItem/MenuItem.types';

export enum MenuVariant {
    disruptive = 'disruptive',
    primary = 'primary',
    neutral = 'neutral',
}

export enum MenuType {
    button = 'button',
}

export enum MenuSize {
    large = 'large',
    medium = 'medium',
    small = 'small',
}

export interface MenuProps
    extends Omit<ListProps<MenuItemProps>, 'renderItem' | 'role' | 'itemRole'> {
    /**
     * Variant of the menu item
     * @default MenuVariant.neutral
     */
    variant?: MenuVariant;
    /**
     * Type of the menu
     * @default MenuType.button
     */
    type?: MenuType;
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
}
