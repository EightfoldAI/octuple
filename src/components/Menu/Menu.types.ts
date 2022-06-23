import { ListProps } from '../List';
import { MenuItemProps } from './MenuItem/MenuItem.types';

export enum MenuType {
    disruptive = 'disruptive',
    primary = 'primary',
    neutral = 'neutral',
}

export enum MenuSize {
    large = 'large',
    medium = 'medium',
    small = 'small',
}

export interface MenuProps
    extends Omit<ListProps<MenuItemProps>, 'renderItem' | 'role' | 'itemRole'> {
    /**
     * If menu is disruptive or not
     * @default false
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
