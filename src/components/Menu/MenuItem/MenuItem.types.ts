import { ButtonProps } from '../../Button';
import { MenuType } from '../Menu.types';

export interface MenuItemProps
    extends Omit<ButtonProps, 'disruptive' | 'onClick' | 'value'> {
    /**
     * Value of the menu item
     */
    value: any;
    /**
     * If menu is disruptive or not
     * @default false
     */
    type?: MenuType;
}
