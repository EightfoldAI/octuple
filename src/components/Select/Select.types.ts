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
  /**
   * Hide the select option.
   */
  hideOption?: boolean;
  /**
   * The select option element id.
   */
  id?: string;
  /**
   * The optional select JSON object.
   */
  object?: object;
  /**
   * The select option aria role.
   * @default 'option'
   */
  role?: string;
  /**
   * The select option selected state.
   */
  selected?: boolean;
}

export interface SelectProps
  extends Omit<OcBaseProps<HTMLDivElement>, 'onFocus' | 'onBlur'> {
  /**
   * Indicates the autocomplete attribute value for the Select input field.
   * @default undefined
   */
  autocomplete?: string;
  /**
   * programmatically clear the input when true.
   * @default false
   */
  clear?: boolean;
  /**
   * Whether the select text input is clearable.
   * @default false
   */
  clearable?: boolean;
  /**
   * Configure how contextual props are consumed.
   */
  configContextProps?: ConfigContextProps;
  /**
   * The select default value.
   * @default ''
   */
  defaultValue?: string | string[];
  /**
   * The select disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * The Dropdown and overlay props.
   * @default {}
   */
  dropdownProps?: DropdownProps;
  /**
   * Display text when there are no filtered results.
   * @default 'No match found.'
   */
  emptyText?: string;
  /**
   * Enable filtering/searching on the options.
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
   * The Select input custom class names.
   */
  inputClassNames?: string;
  /**
   * The Select input is readonly.
   * @default false
   */
  readonly?: boolean;
  /**
   * Width of the Select text input.
   * @default TextInputWidth.fitContent
   */
  inputWidth?: TextInputWidth;
  /**
   * Applicable in case of loadOptions. pass true when the loading is in progress.
   * @default false
   */
  isLoading?: boolean;
  /**
   * For async loading of options.
   */
  loadOptions?: (inputValue: string) => void;
  /**
   * The Dropdown Menu props.
   * @default {}
   */
  menuProps?: MenuProps;
  /**
   * In case of multiple select.
   * @default false
   */
  multiple?: boolean;
  /**
   * The Select onBlur event handler.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * Callback called when the clear button is clicked.
   */
  onClear?: () => void;
  /**
   * The Select onFocus event handler.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * The Select onKeyDown event handler.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * Callback called when options are selected/unselected.
   * @param values {SelectOption['value'].value[]}
   * @param options {SelectOption['value'][]}
   */
  onOptionsChange?: (values: SelectOption[], options?: SelectOption[]) => void;
  /**
   * The select options.
   * @default []
   */
  options?: SelectOption[];
  /**
   * The Pill props. Applicable in case of multiple: true.
   * @default {}
   */
  pillProps?: PillProps;
  /**
   * Shape of the select.
   * @default SelectShape.Rectangle
   */
  shape?: SelectShape | Shape;
  /**
   * Pass `true` to show `emptyText` when zero `options` are passed.
   * @default true
   */
  showEmptyDropdown?: boolean;
  /**
   * The select size.
   * @default SelectSize.Medium
   */
  size?: SelectSize | Size;
  /**
   * Loading spinner props in the select dropdown.
   * @default {}
   */
  spinner?: React.ReactElement;
  /**
   * The select input props.
   * @default {}
   */
  textInputProps?: TextInputProps;
}
