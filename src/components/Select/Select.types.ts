import { DropdownProps } from '../Dropdown';
import { TextInputProps } from '../Inputs';
import { MenuItem, MenuProps } from '../Menu';
import { OcBaseProps } from '../OcBase';
import { PillProps } from '../Pills';

export interface SelectOption extends MenuItem {
    selected?: boolean;
    hideOption?: boolean;
}

export interface SelectProps extends OcBaseProps<HTMLSelectElement> {
    /**
     * Default Value
     * @default ''
     */
    defaultValue?: string;

    /**
     * Default options
     * @default ''
     */
    options?: SelectOption[];

    /**
     * clearable.
     * @default false
     */
    clearable?: boolean;

    /**
     * enable filtering/searching on the options
     * @default false
     */
    filterable?: boolean;

    /**
     * in case of multiple select.
     * @default false
     */
    multiple?: boolean;

    /**
     * for async loading options.
     * @default false
     */
    loadOptions?: (inputValue: string) => void;

    /**
     * applicable in case of loadOptions. pass true when the loading is in progress.
     * @default false
     */
    isLoading?: boolean;

    /**
     * select input props.
     * @default {}
     */
    textInputProps?: TextInputProps;

    /**
     * dropdown and overlay props.
     * @default {}
     */
    dropdownProps?: DropdownProps;

    /**
     * pill props. applicable in case of multiple: true.
     * @default {}
     */
    pillProps?: PillProps;

    /**
     * dropdown menu props.
     * @default {}
     */
    menuProps?: MenuProps;
}
