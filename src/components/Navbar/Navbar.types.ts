import { OcBaseProps } from '../OcBase';
import { Value } from '../ConfigProvider';

export interface NavbarProps extends OcBaseProps<HTMLDivElement> {}

export interface NavbarTheme {
    background?: Value;
    textColor?: Value;
    iconColor?: Value;
    activeBackground?: Value;
    activeText?: Value;
    activeIcon?: Value;
    searchBackground?: Value;
    searchText?: Value;
    searchActiveBackground?: Value;
    searchBorder?: Value;
    searchIcon?: Value;
    searchPlaceholder?: Value;
    searchActiveText?: Value;
    searchCategoryBackground?: Value;
    searchCategoryText?: Value;
    searchHoverBackground?: Value;
    searchHoverText?: Value;
    searchHoverIcon?: Value;
    dropdownBackground?: Value;
    dropdownText?: Value;
    dropdownIcon?: Value;
    dropdownHoverBackground?: Value;
    dropdownHoverText?: Value;
    dropdownHoverIcon?: Value;
}
