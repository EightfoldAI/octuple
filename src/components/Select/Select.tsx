import React, { FC, useState, useEffect, Ref } from 'react';

import { mergeClasses } from '../../shared/utilities';
import { Dropdown } from '../Dropdown';
import { Menu } from '../Menu';
import { TextInput, TextInputProps, TextInputWidth } from '../Inputs';
import { Pill, PillProps, PillSize } from '../Pills';
import { IconName } from '../Icon';
import { SelectOption, SelectProps } from './Select.types';

import styles from './select.module.scss';
import { Spinner, SpinnerSize } from '../Spinner';

export const Select: FC<SelectProps> = React.forwardRef(
    (
        {
            options: _options = [],
            defaultValue,
            filterable = false,
            multiple = false,
            textInputProps = {},
            dropdownProps = {},
            pillProps = {},
            menuProps = {},
            loadOptions,
            isLoading,
            spinner = <Spinner size={SpinnerSize.Small} />,
            classNames,
            style,
            'data-test-id': dataTestId,
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const [dropdownVisible, setDropdownVisibility] =
            useState<boolean>(false);
        const [options, setOptions] = useState<SelectOption[]>(
            _options.map((option) => ({
                selected: false,
                hideOption: false,
                ...option,
            }))
        );
        const [searchQuery, setSearchQuery] = useState<string>('');

        useEffect(() => {
            const selected = options.filter((option) => option.selected);
            setOptions(
                _options.map((option) => ({
                    selected: !!selected.find(
                        (opt) => opt.value === option.value
                    ),
                    hideOption: false,
                    ...option,
                }))
            );
        }, [isLoading]);

        useEffect(() => {
            const updatedOptions = options.map((opt) => ({
                ...opt,
                selected:
                    (defaultValue && opt.value === defaultValue) ||
                    opt.selected,
            }));
            setOptions(updatedOptions);
        }, [defaultValue]);

        const toggleOption = (option: SelectOption) => {
            setSearchQuery('');
            const updatedOptions = options.map((opt) => {
                const defaultState = multiple ? opt.selected : false;
                const selected =
                    opt.value === option.value ? !opt.selected : defaultState;
                return {
                    ...opt,
                    selected: selected,
                };
            });
            setOptions(updatedOptions);
        };

        const onInputClear = () => {
            if (filterable && dropdownVisible) {
                setSearchQuery('');
            } else {
                setOptions(
                    options.map((opt) => ({
                        ...opt,
                        selected: false,
                    }))
                );
            }
        };

        const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { target } = event;
            const value = target?.value?.toLowerCase();
            setSearchQuery(value);
            if (loadOptions) {
                return loadOptions(value);
            }
            if (value) {
                setOptions(
                    options.map((option) => ({
                        ...option,
                        hideOption: !option.text.toLowerCase().includes(value),
                    }))
                );
            } else {
                setSearchQuery('');
                setOptions(
                    options.map((option) => ({ ...option, hideOption: false }))
                );
            }
        };

        const beforeToggleStateChange = (show: boolean) => {
            if (multiple) {
                return true;
            }
            return show;
        };

        const dropdownWrapperClasses: string = mergeClasses([
            dropdownProps.classNames,
            styles.selectDropdownMainWrapper,
        ]);

        const dropdownMenuOverlayClasses: string = mergeClasses([
            dropdownProps.dropdownClassNames,
            styles.selectDropdownOverlay,
        ]);

        const pillClasses: string = mergeClasses([
            pillProps.classNames,
            styles.multiSelectPill,
        ]);

        const componentClasses: string = mergeClasses([
            styles.selectWrapper,
            classNames,
        ]);

        const showPills = () => {
            const selected = options.filter((opt) => opt.selected);
            const selectedCount = selected.length;
            const showPills =
                selectedCount !== 0 && !(filterable && dropdownVisible);
            return showPills && multiple;
        };

        const getPills = () => {
            const selected = options.filter((opt) => opt.selected);
            const selectedCount = selected.length;
            const moreOptionsCount = selectedCount - 1;
            const SelectedPill = (props: PillProps) => (
                <Pill {...props} theme={'bluegreen'} size={PillSize.Small} />
            );
            return (
                <div className={styles.multiSelectPills}>
                    <SelectedPill
                        label={selected[0].text}
                        classNames={pillClasses}
                    />
                    {moreOptionsCount ? (
                        <SelectedPill
                            label={'+' + moreOptionsCount}
                            size={PillSize.Small}
                        />
                    ) : null}
                </div>
            );
        };

        const onDropdownVisibilityChange = (isVisible: boolean) => {
            setDropdownVisibility(isVisible);
            setSearchQuery('');
            setOptions(
                options.map((option) => ({ ...option, hideOption: false }))
            );
        };

        const OptionMenu = ({ options }: { options: SelectOption[] }) => {
            const filteredOptions = options.filter(
                (option) => !option.hideOption
            );
            const updatedItems: SelectOption[] = filteredOptions.map(
                ({ hideOption, ...option }) => ({
                    ...option,
                    classNames: option.selected ? styles.selectedOption : '',
                })
            );
            return (
                <Menu
                    {...menuProps}
                    items={updatedItems}
                    onChange={(value) => {
                        const option = updatedItems.find(
                            (option) => option.value === value
                        );
                        toggleOption(option);
                    }}
                />
            );
        };

        const getSelectedOptionText = () => {
            if (showPills()) {
                return undefined;
            }
            const selectedOption = options.find((option) => option.selected);
            return selectedOption?.text;
        };

        const selectInputProps: TextInputProps = {
            placeholder: 'Select',
            clearable: false,
            inputWidth: TextInputWidth.fill,
            iconProps: {
                path: IconName.mdiMenuDown,
                rotate: dropdownVisible ? 180 : 0,
            },
            onClear: onInputClear,
            ...textInputProps,
        };

        return (
            <div
                className={componentClasses}
                style={style}
                ref={ref}
                data-test-id={dataTestId}
            >
                {showPills() ? getPills() : null}
                <Dropdown
                    {...dropdownProps}
                    onVisibleChange={(isVisible) =>
                        onDropdownVisibilityChange(isVisible)
                    }
                    beforeToggleStateChange={beforeToggleStateChange}
                    overlay={
                        isLoading ? spinner : <OptionMenu options={options} />
                    }
                    classNames={dropdownWrapperClasses}
                    dropdownClassNames={dropdownMenuOverlayClasses}
                >
                    {filterable ? (
                        <TextInput
                            {...selectInputProps}
                            value={
                                getSelectedOptionText() && !dropdownVisible
                                    ? getSelectedOptionText()
                                    : undefined
                            }
                            onChange={onInputChange}
                            classNames={styles.selectInputFilterable}
                        />
                    ) : (
                        <TextInput
                            {...selectInputProps}
                            readonly={true}
                            value={getSelectedOptionText()}
                            classNames={styles.selectInput}
                        />
                    )}
                </Dropdown>
            </div>
        );
    }
);
