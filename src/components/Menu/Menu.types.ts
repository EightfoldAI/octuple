import { ButtonProps } from '../Button';
import { ListProps } from '../List';

export interface MenuItem extends Omit<ButtonProps, 'disruptive' | 'onClick'> {}

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
    onChange?: (
        value: string | ReadonlyArray<string> | number | undefined
    ) => void;
}
