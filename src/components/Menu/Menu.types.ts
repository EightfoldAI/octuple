import { ListProps } from '../List';
import { MenuItemProps } from './MenuItem/MenuItem.types';

export enum MenuType {
    disruptive = 'disruptive',
    default = 'default',
    neutral = 'neutral',
}

export interface MenuProps
    extends Omit<ListProps<MenuItemProps>, 'renderItem' | 'role' | 'itemRole'> {
    /**
     * If menu is disruptive or not
     * @default false
     */
    type?: MenuType;
    /**
     * On change callback when menu item is clicked
     * @param value
     */
    onChange?: (value: any) => void;
}
