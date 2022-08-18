import React, { FC, useContext, useState, useEffect, Ref } from 'react';
import DisabledContext, {
    DisabledType,
} from '../ConfigProvider/DisabledContext';
import { mergeClasses } from '../../shared/utilities';
import { Dropdown } from '../Dropdown';
import { Menu } from '../Menu';
import {
    TextInput,
    TextInputIconAlign,
    TextInputProps,
    TextInputShape,
    TextInputSize,
    TextInputWidth,
} from '../Inputs';
import { Pill, PillSize, PillType } from '../Pills';
import { IconName } from '../Icon';
import {
    SelectOption,
    SelectProps,
    SelectShape,
    SelectSize,
} from './Select.types';
import { Spinner, SpinnerSize } from '../Spinner';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { Tooltip, TooltipTheme } from '../Tooltip';
import { FormItemInputContext } from '../Form/Context';
import { getMergedStatus, getStatusClassNames } from '../../shared/utilities';

import styles from './select.module.scss';

export const Select: FC<SelectProps> = React.forwardRef(
    (
        {
            classNames,
            clearable = false,
            defaultValue,
            disabled = false,
            dropdownProps = {},
            emptyText = 'No match found.',
            filterable = false,
            filterOption = null,
            inputWidth = TextInputWidth.fill,
            isLoading,
            loadOptions,
            menuProps = {},
            multiple = false,
            onOptionsChange,
            options: _options = [],
            pillProps = {},
            placeholder = 'Select',
            shape = SelectShape.Rectangle,
            size = SelectSize.Flex,
            spinner = (
                <Spinner
                    classNames={styles.selectSpinner}
                    size={SpinnerSize.Small}
                />
            ),
            status,
            style,
            textInputProps = {},
            'data-test-id': dataTestId,
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const [dropdownVisible, setDropdownVisibility] =
            useState<boolean>(false);
        const [options, setOptions] = useState<SelectOption[]>(
            _options.map((option: SelectOption, index: number) => ({
                selected: false,
                hideOption: false,
                id: option.text + '-' + index,
                ...option,
            }))
        );
        const [searchQuery, setSearchQuery] = useState<string>('');

        const { status: contextStatus, isFormItemInput } =
            useContext(FormItemInputContext);
        const mergedStatus = getMergedStatus(contextStatus, status);

        const contextuallyDisabled: DisabledType = useContext(DisabledContext);
        const mergedDisabled: boolean = contextuallyDisabled || disabled;

        const getSelectedOptions = (): SelectOption['value'][] => {
            return options
                .filter((option: SelectOption) => option.selected)
                .map((option: SelectOption) => option.value);
        };

        useEffect(() => {
            const selected = options.filter((option) => option.selected);
            setOptions(
                _options.map((option: SelectOption, index: number) => ({
                    selected: !!selected.find(
                        (opt) => opt.value === option.value
                    ),
                    hideOption: false,
                    id: option.text + index,
                    ...option,
                }))
            );
        }, [isLoading]);

        useEffect(() => {
            onOptionsChange?.(getSelectedOptions());
        }, [getSelectedOptions().join('')]);

        useEffect(() => {
            const updatedOptions = options.map((opt) => ({
                ...opt,
                selected:
                    (defaultValue && opt.value === defaultValue) ||
                    opt.selected,
            }));
            setOptions(updatedOptions);
        }, [defaultValue]);

        const toggleOption = (option: SelectOption): void => {
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

        const onInputClear = (): void => {
            setSearchQuery('');
            setOptions(
                options.map((opt) => ({
                    ...opt,
                    selected: false,
                }))
            );
        };

        const onInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ): void => {
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
                        hideOption: filterOption
                            ? !filterOption(option, value)
                            : !option.text.toLowerCase().includes(value),
                    }))
                );
            } else {
                setSearchQuery('');
                setOptions(
                    options.map((option) => ({ ...option, hideOption: false }))
                );
            }
        };

        const showDropdown = (show: boolean) => {
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

        const countPillClasses: string = mergeClasses([
            pillProps.classNames,
            styles.multiSelectCount,
        ]);

        const componentClasses: string = mergeClasses([
            styles.selectWrapper,
            {
                [styles.selectSmall]:
                    size === SelectSize.Flex && largeScreenActive,
            },
            {
                [styles.selectMedium]:
                    size === SelectSize.Flex && mediumScreenActive,
            },
            {
                [styles.selectMedium]:
                    size === SelectSize.Flex && smallScreenActive,
            },
            {
                [styles.selectSmall]:
                    size === SelectSize.Flex && xSmallScreenActive,
            },
            { [styles.selectLarge]: size === SelectSize.Large },
            { [styles.selectMedium]: size === SelectSize.Medium },
            { [styles.selectSmall]: size === SelectSize.Small },
            { [styles.selectWrapperDisabled]: mergedDisabled },
            { ['in-form-item']: isFormItemInput },
            getStatusClassNames(mergedStatus),
            classNames,
        ]);

        const showPills = () => {
            const selected = options.filter((opt) => opt.selected);
            const selectedCount = selected.length;
            return (
                selectedCount !== 0 &&
                !(filterable && dropdownVisible) &&
                multiple
            );
        };

        const getPillSize = (): PillSize => {
            let pillSize: PillSize;
            if (largeScreenActive) {
                pillSize = PillSize.Small;
            } else if (mediumScreenActive) {
                pillSize = PillSize.Medium;
            } else if (smallScreenActive) {
                pillSize = PillSize.Medium;
            } else if (xSmallScreenActive) {
                pillSize = PillSize.Large;
            }
            return pillSize;
        };

        const selectSizeToPillSizeMap = new Map<SelectSize, PillSize>([
            [SelectSize.Flex, getPillSize()],
            [SelectSize.Large, PillSize.Large],
            [SelectSize.Medium, PillSize.Medium],
            [SelectSize.Small, PillSize.Small],
        ]);

        // TODO: Use ConditionalWrapper using a custom hook to determine when ellipsis is active
        // Because the option will not yet be rendered this may need to be spoofed in the hook
        // Also need a better way to determine the number of Pills shown before moreOptionsCount.
        const getPills = () => {
            const selected = options.filter((opt) => opt.selected);
            const selectedCount = selected.length;
            const moreOptionsCount = selectedCount - 1;
            return (
                <div className={styles.multiSelectPills}>
                    <Tooltip
                        classNames={styles.selectTooltip}
                        content={selected[0].text}
                        theme={TooltipTheme.dark}
                    >
                        <Pill
                            id={selected[0].id}
                            classNames={pillClasses}
                            label={selected[0].text}
                            onClose={() => toggleOption(selected[0])}
                            size={selectSizeToPillSizeMap.get(size)}
                            theme={'blueGreen'}
                            type={PillType.closable}
                            {...pillProps}
                        />
                    </Tooltip>
                    {moreOptionsCount ? (
                        <Pill
                            classNames={countPillClasses}
                            label={'+' + moreOptionsCount}
                            theme={'blueGreen'}
                            size={selectSizeToPillSizeMap.get(size)}
                            {...pillProps}
                        />
                    ) : null}
                </div>
            );
        };

        const onDropdownVisibilityChange = (isVisible: boolean) => {
            if (mergedDisabled) {
                return;
            }

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
                    classNames: mergeClasses([
                        { [styles.selectedOption]: option.selected },
                    ]),
                })
            );
            if (filteredOptions.length > 0) {
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
            } else {
                return (
                    <div className={styles.selectMenuEmpty}>{emptyText}</div>
                );
            }
        };

        const getSelectedOptionText = () => {
            if (showPills()) {
                return undefined;
            }
            const selectedOption = options
                .filter((option: SelectOption) => option.selected)
                .map((option: SelectOption) => option.text)
                .join(', ')
                .toLocaleString();
            return selectedOption;
        };

        const selectInputProps: TextInputProps = {
            placeholder: showPills() ? '' : placeholder,
            alignIcon: TextInputIconAlign.Right,
            clearable: clearable,
            inputWidth: inputWidth,
            iconProps: {
                path: IconName.mdiChevronDown,
                rotate: dropdownVisible ? 180 : 0,
            },
            onClear: onInputClear,
            ...textInputProps,
        };

        const selectShapeToTextInputShapeMap = new Map<
            SelectShape,
            TextInputShape
        >([
            [SelectShape.Rectangle, TextInputShape.Rectangle],
            [SelectShape.Pill, TextInputShape.Pill],
            [SelectShape.Underline, TextInputShape.Underline],
        ]);

        const selectSizeToTextInputSizeMap = new Map<SelectSize, TextInputSize>(
            [
                [SelectSize.Flex, TextInputSize.Flex],
                [SelectSize.Large, TextInputSize.Large],
                [SelectSize.Medium, TextInputSize.Medium],
                [SelectSize.Small, TextInputSize.Small],
            ]
        );

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
                    showDropdown={showDropdown}
                    overlay={
                        isLoading ? spinner : <OptionMenu options={options} />
                    }
                    classNames={dropdownWrapperClasses}
                    dropdownClassNames={dropdownMenuOverlayClasses}
                >
                    {filterable ? (
                        <TextInput
                            {...selectInputProps}
                            disabled={mergedDisabled}
                            formItemInput={isFormItemInput}
                            shape={selectShapeToTextInputShapeMap.get(shape)}
                            size={selectSizeToTextInputSizeMap.get(size)}
                            value={
                                !dropdownVisible
                                    ? getSelectedOptionText()
                                    : undefined
                            }
                            onChange={onInputChange}
                        />
                    ) : (
                        <TextInput
                            {...selectInputProps}
                            disabled={mergedDisabled}
                            formItemInput={isFormItemInput}
                            readonly
                            shape={selectShapeToTextInputShapeMap.get(shape)}
                            size={selectSizeToTextInputSizeMap.get(size)}
                            value={getSelectedOptionText()}
                            classNames={styles.selectInput}
                        />
                    )}
                </Dropdown>
            </div>
        );
    }
);
