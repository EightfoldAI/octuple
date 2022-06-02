import React, { FC, useState, useEffect, Ref } from 'react';

import { mergeClasses } from '../../shared/utilities';
import { Dropdown, ToggleState } from '../Dropdown';
import { Menu } from '../Menu';
import { TextInput, TextInputWidth } from '../Inputs';
import { SelectOption, SelectProps } from './Select.types';
import { Pill, PillSize } from '../Pills';
import { IconName } from '../Icon';

import styles from './select.module.scss';

const Options = ({
    options,
    onOptionChange,
    multiple,
    selectedOptions,
    selectedOption,
}: any) => {
    const updated = options.map((option: any) => {
        if (multiple) {
            const selected = selectedOptions.some(
                (selectedOption: any) => selectedOption.value === option.value
            );
            if (selected) {
                return {
                    ...option,
                    classNames: styles.selectedOption,
                };
            }
            return option;
        }
        return {
            ...option,
            classNames:
                selectedOption.value === option.value
                    ? styles.selectedOption
                    : '',
        };
    });
    return (
        <Menu
            items={updated}
            onChange={(value) => {
                const option = updated.find(
                    (option: any) => option.value === value
                );
                onOptionChange(option);
            }}
        />
    );
};

export const Select: FC<SelectProps> = React.forwardRef(
    (
        {
            options = [],
            defaultValue,
            disabled,
            clearable = false,
            filterable = false,
            multiple = false,
            loadOptions,
            classNames,
            style,
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const [dropdownVisible, setDropdownVisibility] = useState(false);
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
            setOptions(options);
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
            } else {
                setSelectedOption(option);
            }
        };

        const onInputClear = () => {
            setSearchQuery('');
            setOptions(options);
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
                    setOptions(filteredOptions);
                }
            } else {
                setSearchQuery('');
                setOptions(options);
            }
        };

        const setOptions = (options: SelectOption[]) => {
            setFilteredOptions(
                options.map((option) => {
                    if (multiple) {
                        const selected = selectedOptions.some(
                            (selectedOption) =>
                                selectedOption.value === option.value
                        );
                        if (selected) {
                            return {
                                ...option,
                                classNames: styles.selectedOption,
                            };
                        }
                        return option;
                    }
                    return {
                        ...option,
                        classNames:
                            selectedOption.value === option.value
                                ? styles.selectedOption
                                : '',
                    };
                })
            );
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

        const selectedPills = () => {
            const firstOption = selectedOptions[0];
            const moreOptionsCount = selectedOptions.length - 1;
            const hidePills =
                selectedOptions.length === 0 || (filterable && dropdownVisible);
            return !hidePills ? (
                <div className={styles.multiSelectPills}>
                    <Pill
                        label={firstOption.text}
                        theme={'bluegreen'}
                        closeButtonProps={{ ariaLabel: 'Close' }}
                        size={PillSize.Small}
                        classNames={styles.multiSelectPill}
                    />
                    {moreOptionsCount ? (
                        <Pill
                            label={'+' + moreOptionsCount}
                            theme={'bluegreen'}
                            closeButtonProps={{ ariaLabel: 'Close' }}
                            size={PillSize.Small}
                        />
                    ) : null}
                </div>
            ) : null;
        };

        const onDropdownVisibilityChange = (isVisible: boolean) => {
            setDropdownVisibility(isVisible);
            setSearchQuery('');
            setOptions(options);
        };

        return (
            <div className={componentClasses} style={style} ref={ref}>
                {multiple ? selectedPills() : null}
                <Dropdown
                    onVisibleChange={(isVisible) =>
                        onDropdownVisibilityChange(isVisible)
                    }
                    onToggle={onDropdownToggle}
                    overlay={
                        <Options
                            options={filteredOptions}
                            onOptionChange={onOptionChange}
                            multiple={multiple}
                            selectedOption={selectedOption}
                            selectedOptions={selectedOptions}
                        />
                    }
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
                            readonly={false}
                            value={
                                selectedOption?.text && !dropdownVisible
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
                                rotate: dropdownVisible ? 180 : 0,
                            }}
                            classNames={styles.selectInputFilterable}
                        />
                    ) : (
                        <TextInput
                            placeholder="Select"
                            readonly={true}
                            value={selectedOption?.text}
                            role="button"
                            disabled={disabled}
                            onClear={onInputClear}
                            clearable={clearable}
                            inputWidth={TextInputWidth.fill}
                            iconProps={{
                                path: IconName.mdiMenuDown,
                                rotate: dropdownVisible ? 180 : 0,
                            }}
                            classNames={styles.selectInput}
                        />
                    )}
                </Dropdown>
            </div>
        );
    }
);
