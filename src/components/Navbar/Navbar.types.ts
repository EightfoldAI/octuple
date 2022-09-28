import { OcBaseProps } from '../OcBase';
import { Value } from '../ConfigProvider';

export interface NavbarTheme {
    background?: Value;
    textColor?: Value;
    textHoverBackground?: Value;
    textHoverColor?: Value;
}

export interface NavbarProps extends OcBaseProps<HTMLDivElement> {}
