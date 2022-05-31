import React, { Ref, FC, useState } from 'react';

// Styles:
import { Dropdown } from '../Dropdown';
import { ButtonIconAlign, DefaultButton } from '../Button';
import { IconName } from '../Icon';
import { Props } from '@storybook/addon-docs';
import { Menu } from '../Menu';
import { SearchBox, TextInput } from '../Inputs';
import { SelectOption, SelectProps } from './Select.types';

const Options = (props: SelectProps, onOptionChange: Function) => {
    const { options } = props;
    return (<Menu
        items={options}
        onChange={(value) => {
            const option = options.find(option => option.value === value);
            onOptionChange(option);
        }}
    />)
};

export const Select: FC<SelectProps> = React.forwardRef(
    (
        {
            options = [],
            ...rest
        },
        _ref: Ref<HTMLButtonElement>
    ) => {
        const { defaultValue, disabled } = rest;
        const [visible, setVisibility] = useState(false);
        const [selectedOption, setSelectedOption] = useState<SelectOption>({text: '', value: ''});
        const onOptionChange = (item: any) => {
            setSelectedOption(item)
        }

        const onClear = () => {
            setSelectedOption({text: '', value: ''});
        }
        if(!selectedOption.value && defaultValue) {
            const defaultOption = options.find(option => option.value === defaultValue);
            setSelectedOption(defaultOption);
        }
        return (
            <Dropdown
                onVisibleChange={(isVisible) => setVisibility(isVisible)}
                overlay={Options({options, ...rest}, onOptionChange)}
                trigger="click"
                classNames="my-dropdown-class"
                dropdownClassNames="my-dropdown-class"
                placement="bottom-start"
                positionStrategy="absolute"
                disabled={false}
            >
                <TextInput
                    placeholder='Select'
                    aria-readonly={true}
                    value={selectedOption.text}
                    role="button"
                    disabled={disabled}
                    onClear={onClear}
                />
            </Dropdown>
        );
    }
);

export const Option: FC<any> = React.forwardRef(
    (props, _ref: Ref<HTMLButtonElement>) => {
        const { key, label } = props;
        return <li key={key}>{label}</li>;
    }
);
