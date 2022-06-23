import { OcBaseProps } from '../OcBase';
import { Value } from '../ConfigProvider';

export interface NavbarProps extends OcBaseProps<HTMLDivElement> {}

export interface NavbarTheme {
    background?: Value;
    textColor?: Value;
    hoverBackground?: Value;
    textHoverColor?: Value;
}
