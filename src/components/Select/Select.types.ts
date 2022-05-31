import { Ref } from 'react';
import { IconProps } from '../Icon';
import { MenuItem } from '../Menu';
import { OcBaseProps } from '../OcBase';

export interface SelectOption extends MenuItem {}

export interface SelectProps extends OcBaseProps<HTMLSelectElement> {
    /**
     * Default Value
     * @default ''
     */
    defaultValue?: string,

    /**
     * Default options
     * @default ''
     */
    options?: SelectOption[],

    /**
     * The select disabled state.
     * @default false
     */
    disabled?: boolean;
}
