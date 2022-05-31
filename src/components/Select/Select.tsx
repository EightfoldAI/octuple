import React, { Ref, FC, useState } from 'react';

// Styles:
import { Dropdown } from '../Dropdown';
import { ButtonIconAlign, DefaultButton } from '../Button';
import { IconName } from '../Icon';
import { Props } from '@storybook/addon-docs';
import { Menu } from '../Menu';
import { SearchBox, TextInput } from '../Inputs';
import { SelectOption, SelectProps } from './Select.types';

const Options = (options: SelectOption[], onOptionChange: Function) => {
    return (
        <Menu
            items={options}
            onChange={(value) => {
                const option = options.find((option) => option.value === value);
                onOptionChange(option);
            }}
        />
    );
};

export const Select: FC<SelectProps> = React.forwardRef(
    ({ options = [], ...rest }, _ref: Ref<HTMLButtonElement>) => {
        const {
            defaultValue,
            disabled,
            clearable = false,
            filterable = false,
        } = rest;
        const [visible, setVisibility] = useState(false);
        const [defaultValueShown, setDefaultValueShown] = useState(false);
        const [selectedOption, setSelectedOption] = useState<SelectOption>({
            text: '',
            value: '',
        });
        const [filteredOptions, setFilteredOptions] = useState(options);
        const [searchQuery, setSearchQuery] = useState('');

        const onOptionChange = (item: any) => {
            setSearchQuery('');
            setSelectedOption(item);
        };

        const onClear = () => {
            setSearchQuery('');
            setFilteredOptions(options);
            setSelectedOption({ text: '', value: '' });
        };

        const onChange = (
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
            const { target } = event;
            console.log('@@@@@ kishore ', target?.value);
            if (target?.value) {
                const value = target.value.toLowerCase();
                const filteredOptions = options.filter((option) =>
                    option.value.toLowerCase().includes(value)
                );
                setSearchQuery(target.value);
                setFilteredOptions(filteredOptions);
            } else {
                setFilteredOptions(options);
            }
        };

        if (defaultValue && !defaultValueShown) {
            const defaultOption = options.find(
                (option) => option.value === defaultValue
            );
            setSelectedOption(defaultOption);
            setDefaultValueShown(true);
        }

        return (
            <Dropdown
                onVisibleChange={(isVisible) => setVisibility(isVisible)}
                overlay={Options(filteredOptions, onOptionChange)}
                trigger="click"
                classNames="my-dropdown-class"
                dropdownClassNames="my-dropdown-class"
                placement="bottom-start"
                positionStrategy="absolute"
                disabled={false}
            >
                {filterable ? (
                    <TextInput
                        placeholder="Select"
                        aria-readonly={false}
                        value={
                            selectedOption?.text && !searchQuery
                                ? selectedOption.text
                                : undefined
                        }
                        role="button"
                        disabled={disabled}
                        onClear={onClear}
                        onChange={onChange}
                        clearable={clearable}
                    />
                ) : (
                    <TextInput
                        placeholder="Select"
                        aria-readonly={true}
                        value={selectedOption.text}
                        role="button"
                        disabled={disabled}
                        onClear={onClear}
                        clearable={clearable}
                    />
                )}
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
