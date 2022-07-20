import React from 'react';
import { DropdownProps } from '../Dropdown';
import { TextInputProps, TextInputWidth } from '../Inputs';
import { MenuProps } from '../Menu';
import { OcBaseProps } from '../OcBase';
import { PillProps } from '../Pills';
import { MenuItemProps } from '../Menu/MenuItem/MenuItem.types';

export enum SelectShape {
    Rectangle = 'rectangle',
    Pill = 'pill',
    Underline = 'underline',
}

export enum SelectSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface SelectOption extends MenuItemProps {
    selected?: boolean;
    hideOption?: boolean;
    id?: string;
}

export interface SelectProps extends OcBaseProps<HTMLSelectElement> {
    /**
     * Default Value
     * @default ''
     */
    defaultValue?: string;

    /**
     * Width of the tooltip
     * @default fitContent
     */
    inputWidth?: TextInputWidth;

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
     * Callback called when options are selected/unselected
     * @param options {SelectOption[]}
     */
    onOptionsChange?: (options: SelectOption[]) => void;

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
     * display text when there are no filtered results.
     */
    emptyText?: string;

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

    /**
     * Shape of the select.
     * @default SelectShape.Rectangle
     */
    shape?: SelectShape;

    /**
     * The select size.
     * @default Flex
     */
    size?: SelectSize;

    /**
     * loading spinner props.
     * @default {}
     */
    spinner?: React.ReactNode;
}
