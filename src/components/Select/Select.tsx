import React, { Ref, FC, useState } from 'react';

// Styles:
import { Dropdown, ToggleState } from '../Dropdown';
import { ButtonIconAlign, DefaultButton } from '../Button';
import { IconName } from '../Icon';
import { Props } from '@storybook/addon-docs';
import { Menu } from '../Menu';
import { SearchBox, TextInput } from '../Inputs';
import { SelectOption, SelectProps } from './Select.types';
import { Pill, PillSize } from '../Pills';

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
            multiple = false,
        } = rest;
        const [visible, setVisibility] = useState(false);
        const [defaultValueShown, setDefaultValueShown] = useState(false);
        const [selectedOption, setSelectedOption] = useState<SelectOption>({
            text: '',
            value: '',
        });
        const [filteredOptions, setFilteredOptions] = useState(options);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(
            []
        );

        const onOptionChange = (option: SelectOption) => {
            setSearchQuery('');
            if (multiple) {
                const index = selectedOptions.findIndex(
                    (selectedOption) => selectedOption.value === option.value
                );
                if (index > -1) {
                    const selectionOptionsSet: { [key: string]: SelectOption } =
                        selectedOptions.reduce((acc, opt) => {
                            return {
                                ...acc,
                                [opt.value]: opt,
                            };
                        }, {});
                    delete selectionOptionsSet[option.value];
                    return setSelectedOptions(
                        Object.values(selectionOptionsSet)
                    );
                }
                return setSelectedOptions([...selectedOptions, option]);
            }
            setSelectedOption(option);
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

        const onDropdownToggle = (
            current: ToggleState,
            changes: Partial<ToggleState>
        ) => {
            if (multiple) {
                return {
                    visible: true,
                    closing: false,
                };
            }
            return { ...current, ...changes };
        };

        if (defaultValue && !defaultValueShown) {
            const defaultOption = options.find(
                (option) => option.value === defaultValue
            );
            if (multiple) {
                setSelectedOptions([...selectedOptions, defaultOption]);
            } else {
                setSelectedOption(defaultOption);
            }
            setDefaultValueShown(true);
        }
        return (
            <>
                {multiple ? (
                    <div>
                        {selectedOptions.map((option) => (
                            <Pill
                                label={option.text}
                                theme={'bluegreen'}
                                closeButtonProps={{ ariaLabel: 'Close' }}
                                size={PillSize.Small}
                            />
                        ))}
                    </div>
                ) : null}
                <Dropdown
                    onVisibleChange={(isVisible) => setVisibility(isVisible)}
                    onToggle={onDropdownToggle}
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
                            value={selectedOption?.text}
                            role="button"
                            disabled={disabled}
                            onClear={onClear}
                            clearable={clearable}
                        />
                    )}
                </Dropdown>
            </>
        );
    }
);
