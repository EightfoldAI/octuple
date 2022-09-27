import React, {
    FC,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    Ref,
} from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { ShapeContext, Shape, SizeContext, Size } from '../ConfigProvider';
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
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { useMaxVisibleSections } from '../../hooks/useMaxVisibleSections';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './select.module.scss';

const inputPaddingHorizontal: number = +styles.inputPaddingHorizontal;
const multiSelectCountOffset: number = +styles.multiSelectCountOffset;

export const Select: FC<SelectProps> = React.forwardRef(
    (
        {
            classNames,
            clearable = false,
            configContextProps = {
                noDisabledContext: false,
                noShapeContext: false,
                noSizeContext: false,
            },
            defaultValue,
            disabled = false,
            dropdownProps = {},
            emptyText = 'No match found.',
            filterable = false,
            filterOption = null,
            formItemInput = false,
            id,
            inputWidth = TextInputWidth.fill,
            isLoading,
            loadOptions,
            menuProps = {},
            multiple = false,
            onClear,
            onOptionsChange,
            options: _options = [],
            pillProps = {},
            placeholder = 'Select',
            shape = SelectShape.Rectangle,
            size = SelectSize.Medium,
            spinner = (
                <Spinner
                    classNames={styles.selectSpinner}
                    size={SpinnerSize.Small}
                />
            ),
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

        const htmlDir: string = useCanvasDirection();

        const [dropdownWidth, setDropdownWidth] = useState(0);
        const [selectWidth, setSelectWidth] = useState(0);

        const inputRef = useRef<HTMLInputElement>(null);
        const pillRefs = useRef<HTMLElement[]>([]);

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

        const { isFormItemInput } = useContext(FormItemInputContext);
        const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;

        const contextuallyShaped: Shape = useContext(ShapeContext);
        const mergedShape: SelectShape | Shape =
            configContextProps.noShapeContext
                ? shape
                : contextuallyShaped || shape;

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize: SelectSize | Size = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;

        const getSelectedOptions = (): SelectOption['value'][] => {
            return options
                .filter((option: SelectOption) => option.selected)
                .map((option: SelectOption) => option.value);
        };

        const { count, filled, width } = useMaxVisibleSections(
            inputRef,
            pillRefs,
            168,
            8,
            1,
            getSelectedOptions().length
        );

        useEffect(() => {
            const selected: SelectOption[] = options.filter(
                (opt: SelectOption) => opt.selected
            );
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
            const updatedOptions = options.map((opt: SelectOption) => ({
                ...opt,
                selected:
                    (defaultValue !== undefined &&
                        opt.value === defaultValue) ||
                    opt.selected,
            }));
            setOptions(updatedOptions);
        }, [defaultValue]);

        const toggleOption = (option: SelectOption): void => {
            setSearchQuery('');
            const updatedOptions = options.map((opt: SelectOption) => {
                const defaultState = multiple ? opt.selected : false;
                const selected =
                    opt.value === option.value ? !opt.selected : defaultState;
                return {
                    ...opt,
                    hideOption: false,
                    selected: selected,
                };
            });
            setOptions(updatedOptions);
        };

        const onInputClear = (): void => {
            setSearchQuery('');
            if (filterable && multiple && dropdownVisible) {
                setOptions(
                    options.map((opt: SelectOption) => ({
                        ...opt,
                        hideOption: false,
                    }))
                );
            } else if (filterable) {
                setOptions(
                    options.map((opt: SelectOption) => ({
                        ...opt,
                        hideOption: false,
                        selected: false,
                    }))
                );
            } else {
                setOptions(
                    options.map((opt: SelectOption) => ({
                        ...opt,
                        selected: false,
                    }))
                );
            }
            onClear?.();
        };

        const onInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            const { target } = event;
            const value: string = target?.value?.toLowerCase();
            setSearchQuery(value);
            if (loadOptions) {
                return loadOptions(value);
            }
            if (value) {
                setOptions(
                    options.map((opt: SelectOption) => ({
                        ...opt,
                        hideOption: filterOption
                            ? !filterOption(opt, value)
                            : !opt.text.toLowerCase().includes(value),
                    }))
                );
            } else {
                setSearchQuery('');
                // When not in multiple mode and the value is empty
                // deselect and execute onClear.
                setOptions(
                    options.map((opt: SelectOption) => {
                        const selected: boolean = multiple
                            ? opt.selected
                            : false;
                        return {
                            ...opt,
                            hideOption: false,
                            selected: selected,
                        };
                    })
                );
                if (!multiple) {
                    onClear?.();
                }
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
                    mergedSize === SelectSize.Flex && largeScreenActive,
            },
            {
                [styles.selectMedium]:
                    mergedSize === SelectSize.Flex && mediumScreenActive,
            },
            {
                [styles.selectMedium]:
                    mergedSize === SelectSize.Flex && smallScreenActive,
            },
            {
                [styles.selectLarge]:
                    mergedSize === SelectSize.Flex && xSmallScreenActive,
            },
            { [styles.selectLarge]: mergedSize === SelectSize.Large },
            { [styles.selectMedium]: mergedSize === SelectSize.Medium },
            { [styles.selectSmall]: mergedSize === SelectSize.Small },
            { [styles.selectWrapperRtl]: htmlDir === 'rtl' },
            { [styles.selectWrapperDisabled]: mergedDisabled },
            { ['in-form-item']: mergedFormItemInput },
            classNames,
        ]);

        const showPills = (): boolean => {
            const selected: SelectOption[] = options.filter(
                (opt: SelectOption) => opt.selected
            );
            const selectedCount: number = selected.length;
            return selectedCount !== 0 && multiple;
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

        const selectSizeToPillSizeMap = new Map<SelectSize | Size, PillSize>([
            [SelectSize.Flex, getPillSize()],
            [SelectSize.Large, PillSize.Large],
            [SelectSize.Medium, PillSize.Medium],
            [SelectSize.Small, PillSize.Small],
        ]);

        const isPillEllipsisActive = (element: HTMLElement) => {
            const labelElement: HTMLSpanElement =
                element.firstElementChild as HTMLSpanElement;
            return labelElement?.offsetWidth < labelElement?.scrollWidth;
        };

        const getPills = (): JSX.Element => {
            const selected: SelectOption[] = options.filter(
                (opt: SelectOption) => opt.selected
            );

            const selectedCount: number = selected.length;
            const pills: React.ReactElement[] = [];
            let moreOptionsCount: number = selectedCount;

            // TODO: Mutate Array based on order of selection.
            selected.forEach((value: SelectOption, index: number) => {
                pills.push(
                    <Tooltip
                        classNames={styles.selectTooltip}
                        content={value.text}
                        disabled={
                            !isPillEllipsisActive(
                                document?.getElementById(value.id)
                            )
                        }
                        placement={'top'}
                        theme={TooltipTheme.dark}
                    >
                        <Pill
                            ref={(ref) => (pillRefs.current[index] = ref)}
                            id={value.id}
                            classNames={pillClasses}
                            disabled={mergedDisabled}
                            label={value.text}
                            onClose={() => toggleOption(value)}
                            size={selectSizeToPillSizeMap.get(size)}
                            theme={'blueGreen'}
                            type={PillType.closable}
                            style={{
                                visibility:
                                    index < count ? 'visible' : 'hidden',
                            }}
                            {...pillProps}
                        />
                    </Tooltip>
                );
                if (pills.length === count && filled) {
                    pills.push(
                        <Pill
                            classNames={countPillClasses}
                            disabled={mergedDisabled}
                            label={'+' + (moreOptionsCount - count)}
                            theme={'blueGreen'}
                            size={selectSizeToPillSizeMap.get(mergedSize)}
                            {...pillProps}
                        />
                    );
                }
            });

            return <div className={styles.multiSelectPills}>{pills}</div>;
        };

        const getSelectedOptionText = (): string => {
            if (multiple) {
                return searchQuery;
            }
            const selectedOption = options
                .filter((opt: SelectOption) => opt.selected)
                .map((opt: SelectOption) => opt.text)
                .join(', ')
                .toLocaleString();
            return selectedOption;
        };

        const OptionMenu = ({
            options,
        }: {
            options: SelectOption[];
        }): JSX.Element => {
            const filteredOptions = options.filter(
                (opt: SelectOption) => !opt.hideOption
            );
            const updatedItems: SelectOption[] = filteredOptions.map(
                ({ hideOption, ...opt }) => ({
                    ...opt,
                    classNames: mergeClasses([
                        { [styles.selectedOption]: opt.selected },
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
                                (opt: SelectOption) => opt.value === value
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

        const getStyle = (): React.CSSProperties => {
            if (filterable && multiple && dropdownVisible && showPills()) {
                const paddingValue: number =
                    width > 0
                        ? filled
                            ? width + multiSelectCountOffset
                            : width + inputPaddingHorizontal
                        : inputPaddingHorizontal;
                if (htmlDir === 'rtl') {
                    return {
                        paddingRight: paddingValue,
                    };
                } else {
                    return {
                        paddingLeft: paddingValue,
                    };
                }
            } else {
                return undefined;
            }
        };

        const selectInputProps: TextInputProps = {
            placeholder: showPills() ? '' : placeholder,
            alignIcon: TextInputIconAlign.Right,
            clearable: clearable,
            inputWidth: inputWidth,
            iconButtonProps: {
                iconProps: {
                    path: dropdownVisible
                        ? IconName.mdiChevronUp
                        : IconName.mdiChevronDown,
                },
                onClick: () => inputRef.current.click(),
            },
            style: getStyle(),
            onClear: onInputClear,
            ...textInputProps,
        };

        const selectShapeToTextInputShapeMap = new Map<
            SelectShape | Shape,
            TextInputShape | Shape
        >([
            [SelectShape.Rectangle, TextInputShape.Rectangle],
            [SelectShape.Pill, TextInputShape.Pill],
            [SelectShape.Underline, TextInputShape.Underline],
        ]);

        const selectSizeToTextInputSizeMap = new Map<
            SelectSize | Size,
            TextInputSize | Size
        >([
            [SelectSize.Flex, TextInputSize.Flex],
            [SelectSize.Large, TextInputSize.Large],
            [SelectSize.Medium, TextInputSize.Medium],
            [SelectSize.Small, TextInputSize.Small],
        ]);

        const updateLayout = (): void => {
            // Ensure the minimum default width is 400
            const dropdownDefaultWidth: number = 400;

            if (!inputRef.current) {
                return;
            }

            const inputWidth: number = inputRef.current?.offsetWidth;
            let dropdownUpdatedWidth: number =
                inputRef.current?.offsetWidth > dropdownDefaultWidth
                    ? inputRef.current?.offsetWidth
                    : dropdownDefaultWidth;

            setSelectWidth(inputWidth);
            setDropdownWidth(dropdownUpdatedWidth);
        };

        useLayoutEffect(() => {
            updateLayout();
        }, [dropdownWidth, selectWidth]);

        return (
            <ResizeObserver onResize={updateLayout}>
                <div
                    ref={ref}
                    className={componentClasses}
                    data-test-id={dataTestId}
                    id={id}
                    style={style}
                >
                    {showPills() ? getPills() : null}
                    <Dropdown
                        width={dropdownWidth}
                        {...dropdownProps}
                        classNames={dropdownWrapperClasses}
                        dropdownClassNames={dropdownMenuOverlayClasses}
                        onVisibleChange={(isVisible) =>
                            setDropdownVisibility(isVisible)
                        }
                        overlay={
                            isLoading ? (
                                spinner
                            ) : (
                                <OptionMenu options={options} />
                            )
                        }
                        showDropdown={showDropdown}
                        visible={dropdownVisible}
                    >
                        <TextInput
                            ref={inputRef}
                            {...selectInputProps}
                            classNames={styles.selectInput}
                            disabled={mergedDisabled}
                            formItemInput={mergedFormItemInput}
                            onChange={filterable ? onInputChange : null}
                            readonly={!filterable}
                            shape={selectShapeToTextInputShapeMap.get(
                                mergedShape
                            )}
                            size={selectSizeToTextInputSizeMap.get(mergedSize)}
                            value={getSelectedOptionText()}
                        />
                    </Dropdown>
                </div>
            </ResizeObserver>
        );
    }
);
