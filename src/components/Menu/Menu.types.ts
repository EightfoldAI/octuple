import { ButtonProps } from '../Button';
import { ListProps } from '../List';

export type MenuValue = string | number | boolean;

export interface MenuItem extends Omit<ButtonProps, 'disruptive'> {
    /**
     * Unique value of the menu item
     */
    value: MenuValue;
}

export interface MenuProps
    extends Omit<ListProps<MenuItem>, 'renderItem' | 'role' | 'itemRole'> {
    /**
     * If menu is disruptive or not
     * @default false
     */
    disruptive?: boolean;
    /**
     * On change callback when menu item is clicked
     * @param value {MenuItem}
     */
    onChange?: (value: MenuValue) => void;
}
