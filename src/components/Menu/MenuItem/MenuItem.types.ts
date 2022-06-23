import { MenuSize, MenuType } from '../Menu.types';
import { OcBaseProps } from '../../OcBase';
import { IconProps } from '../../Icon';

export interface MenuItemProps
    extends OcBaseProps<Omit<HTMLLIElement, 'type' | 'children'>> {
    /**
     * Value of the menu item
     */
    value: any;
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
    iconProps?: IconProps;
    text?: string;
}
