import React from 'react';
import { DropdownProps } from '../Dropdown';
import { TextInputProps, TextInputWidth } from '../Inputs';
import { MenuProps } from '../Menu';
import { OcBaseProps } from '../OcBase';
import { PillProps } from '../Pills';
import { MenuItemButtonProps } from '../Menu/MenuItem/MenuItem.types';
import { ConfigContextProps, Shape, Size } from '../ConfigProvider';

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

export interface SelectOption extends MenuItemButtonProps {
    hideOption?: boolean;
    id?: string;
    selected?: boolean;
}

export interface SelectProps extends OcBaseProps<HTMLDivElement> {
    /**
     * clearable.
     * @default false
     */
    clearable?: boolean;

    /**
     * Configure how contextual props are consumed
     */
    configContextProps?: ConfigContextProps;

    /**
     * Default Value
     * @default ''
     */
    defaultValue?: string;

    /**
     * The select disabled state.
     * @default false
     */
    disabled?: boolean;

    /**
     * dropdown and overlay props.
     * @default {}
     */
    dropdownProps?: DropdownProps;

    /**
     * display text when there are no filtered results.
     */
    emptyText?: string;

    /**
     * enable filtering/searching on the options
     * @default false
     */
    filterable?: boolean;

    /**
     * Custom method to filter whether an option should be displayed in the menu.
     * @default null
     */
    filterOption?: (option: any, query: any) => boolean;

    /**
     * The select is a form item.
     * @default false
     */
    formItemInput?: boolean;

    /**
     * Width of the tooltip
     * @default fitContent
     */
    inputWidth?: TextInputWidth;

    /**
     * applicable in case of loadOptions. pass true when the loading is in progress.
     * @default false
     */
    isLoading?: boolean;

    /**
     * for async loading options.
     * @default false
     */
    loadOptions?: (inputValue: string) => void;

    /**
     * dropdown menu props.
     * @default {}
     */
    menuProps?: MenuProps;

    /**
     * in case of multiple select.
     * @default false
     */
    multiple?: boolean;

    /**
     * Callback called when the clear button is clicked
     */
    onClear?: () => void;

    /**
     * Callback called when options are selected/unselected
     * @param options {SelectOption[]}
     */
    onOptionsChange?: (options: SelectOption[]) => void;

    /**
     * Default options
     * @default ''
     */
    options?: SelectOption[];

    /**
     * pill props. applicable in case of multiple: true.
     * @default {}
     */
    pillProps?: PillProps;

    /**
     * Shape of the select.
     * @default SelectShape.Rectangle
     */
    shape?: SelectShape | Shape;

    /**
     * The select size.
     * @default 'medium'
     */
    size?: SelectSize | Size;

    /**
     * loading spinner props.
     * @default {}
     */
    spinner?: React.ReactElement;

    /**
     * select input props.
     * @default {}
     */
    textInputProps?: TextInputProps;
}
