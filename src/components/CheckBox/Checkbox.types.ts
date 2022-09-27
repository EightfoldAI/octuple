import React from 'react';
import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, Size } from '../ConfigProvider';

export type CheckboxValueType = string | number;

export enum LabelPosition {
    End = 'end',
    Start = 'start',
}

export enum LabelAlign {
    Start = 'start',
    Center = 'center',
    End = 'end',
}

export enum SelectorSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface CheckboxProps extends OcBaseProps<HTMLInputElement> {
    /**
     * Allows focus on the checkbox when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * The input checkbox aria-label text.
     */
    ariaLabel?: string;
    /**
     * The input checkbox checked value.
     */
    checked?: boolean;
    /**
     * Configure how contextual props are consumed
     */
    configContextProps?: ConfigContextProps;
    /**
     * The input checkbox default checked value.
     */
    defaultChecked?: boolean;
    /**
     * The checkbox disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The checkbox is a form item.
     * @default false
     */
    formItemInput?: boolean;
    /**
     * The checkbox input name.
     */
    name?: string;
    /**
     * The label of the checkbox.
     */
    label?: React.ReactNode;
    /**
     * The vertical placement of the label.
     * @default LabelAlign.Center
     */
    labelAlign?: LabelAlign;
    /**
     * The label position of the checkbox.
     * @default LabelPosition.End
     */
    labelPosition?: LabelPosition;
    /**
     * The checkbox onChange event handler.
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * The checkbox size.
     * @default SelectorSize.Medium
     */
    size?: SelectorSize | Size;
    /**
     * The Checkbox UI is toggle.
     * @default false
     */
    toggle?: boolean;
    /**
     * The checkbox value.
     */
    value?: CheckboxValueType;
}

export interface CheckboxGroupProps
    extends Omit<OcBaseProps<HTMLInputElement>, 'defaultChecked' | 'onChange'> {
    /**
     * Allows focus on the checkbox group when it's disabled.
     */
    allowDisabledFocus?: boolean;
    /**
     * Aria label for the checkbox group.
     */
    ariaLabel?: string;
    /**
     * Configure how contextual props are consumed
     */
    configContextProps?: ConfigContextProps;
    /**
     * The checkbox group disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The checkbox group is a form item.
     * @default false
     */
    formItemInput?: boolean;
    /**
     * The array of items for the checkbox group.
     */
    items?: CheckboxProps[];
    /**
     * The vertical placement of the label.
     * @default LabelAlign.Center
     */
    labelAlign?: LabelAlign;
    /**
     * The label position of the checkboxes.
     * @default LabelPosition.End
     */
    labelPosition?: LabelPosition;
    /**
     * Type of layout for the checkbox group
     * @default vertical
     */
    layout?: 'vertical' | 'horizontal';
    /**
     * Callback fired when any item in the checkboxGroup changes.
     * @param checkedValue
     */
    onChange?: (checkedValue: CheckboxValueType[]) => void;
    /**
     * The checkbox size.
     * @default SelectorSize.Medium
     */
    size?: SelectorSize;
    /**
     * The checkbox value.
     */
    value?: CheckboxValueType[];
}
