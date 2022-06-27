import { MenuSize, MenuType, MenuVariant } from '../Menu.types';
import { OcBaseProps } from '../../OcBase';
import { IconProps } from '../../Icon';

export interface MenuItemProps
    extends OcBaseProps<Omit<HTMLLIElement, 'type' | 'children'>> {
    /**
     * Value of the menu item
     */
    value: any;
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
     * Menu item icon props
     */
    iconProps?: IconProps;
    /**
     * Display label of the menu item
     */
    text?: string;
    /**
     * If menu item is disabled or not
     */
    disabled?: boolean;
    /**
     * On Click handler of the menu item
     * @param value
     */
    onClick?: (value: any) => void;
}
