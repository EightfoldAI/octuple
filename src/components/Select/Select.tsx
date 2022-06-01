import React, { Ref, FC, useState, useEffect } from 'react';

// Styles:
import { Dropdown, ToggleState } from '../Dropdown';
import { Menu } from '../Menu';
import { TextInput, TextInputWidth } from '../Inputs';
import { SelectOption, SelectProps } from './Select.types';
import { Pill, PillSize } from '../Pills';
import { IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';

import styles from './select.module.scss';

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
            loadOptions,
            isLoading = false,
            classNames,
            style,
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

        useEffect(() => {
            setFilteredOptions(options);
        }, [JSON.stringify(options)]);

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

        const onInputClear = () => {
            setSearchQuery('');
            setFilteredOptions(options);
            setSelectedOption({ text: '', value: '' });
        };

        const onInputChange = (
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
            const { target } = event;
            if (target?.value) {
                const value = target.value.toLowerCase();
                const filteredOptions = options.filter((option) =>
                    option.value.toLowerCase().includes(value)
                );
                setSearchQuery(target.value);
                if (loadOptions) {
                    loadOptions(target.value);
                } else {
                    setFilteredOptions(filteredOptions);
                }
            } else {
                setFilteredOptions(options);
            }
        };

        const onDropdownToggle = (
            current: ToggleState,
            changes: Partial<ToggleState>
        ) => {
            if (multiple) {
                //
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

        const componentClasses: string = mergeClasses([
            styles.selectWrapper,
            classNames,
        ]);

        return (
            <div className={componentClasses} style={style}>
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
                    classNames={styles.selectDropdownMainWrapper}
                    dropdownClassNames={styles.myDropdownClass}
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
                            onClear={onInputClear}
                            onChange={onInputChange}
                            clearable={clearable}
                            inputWidth={TextInputWidth.fill}
                            iconProps={{
                                path: IconName.mdiMenuDown,
                                rotate: visible ? 180 : 0,
                            }}
                            classNames={styles.selectInputFit}
                        />
                    ) : (
                        <TextInput
                            placeholder="Select"
                            aria-readonly={true}
                            value={selectedOption?.text}
                            role="button"
                            disabled={disabled}
                            onClear={onInputClear}
                            clearable={clearable}
                            inputWidth={TextInputWidth.fill}
                            iconProps={{
                                path: IconName.mdiMenuDown,
                                rotate: visible ? 180 : 0,
                            }}
                            classNames={styles.selectInputFit}
                        />
                    )}
                </Dropdown>
            </div>
        );
    }
);
