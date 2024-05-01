'use client';

import React, {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  Ref,
  useCallback,
  useMemo,
} from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import {
  ShapeContext,
  Shape,
  SizeContext,
  Size,
  OcThemeName,
} from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { Dropdown, DropdownRef, NO_ANIMATION_DURATION } from '../Dropdown';
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
import { ANIMATION_DURATION, Tooltip, TooltipTheme } from '../Tooltip';
import { FormItemInputContext } from '../Form/Context';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useMaxVisibleSections } from '../../hooks/useMaxVisibleSections';
import { usePreviousState } from '../../hooks/usePreviousState';
import {
  canUseDocElement,
  eventKeys,
  mergeClasses,
  uniqueId,
} from '../../shared/utilities';

import styles from './select.module.scss';
import themedComponentStyles from './select.theme.module.scss';

const inputPadding: number = +styles.inputPadding;
const multiSelectCountOffset: number = +styles.multiSelectCountOffset;

export const Select: FC<SelectProps> = React.forwardRef(
  (
    {
      autocomplete,
      classNames,
      clear = false,
      clearable = false,
      configContextProps = {
        noDisabledContext: false,
        noShapeContext: false,
        noSizeContext: false,
        noThemeContext: false,
      },
      defaultValue,
      disabled = false,
      dropdownProps = {},
      emptyText = 'No match found.',
      filterable = false,
      filterOption = null,
      formItemInput = false,
      id,
      initialFocus,
      inputClassNames,
      readonly = false,
      inputWidth = TextInputWidth.fill,
      isLoading,
      loadOptions,
      maxPillCount = true,
      menuProps = {},
      multiple = false,
      onBlur,
      onClear,
      onFocus,
      onKeyDown,
      onOptionsChange,
      options: _options = [],
      pillProps = {},
      placeholder = 'Select',
      shape = SelectShape.Rectangle,
      showEmptyDropdown = true,
      size = SelectSize.Medium,
      spinner = (
        <Spinner classNames={styles.selectSpinner} size={SpinnerSize.Small} />
      ),
      status,
      style,
      textInputProps = {},
      theme,
      themeContainerId,
      toggleButtonAriaLabel,
      toggleOptions = true,
      value,
      'data-test-id': dataTestId,
      'data-testid': dataTestIdv2,
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

    const inputRef: React.MutableRefObject<HTMLInputElement> =
      useRef<HTMLInputElement>(null);
    const dropdownRef: React.MutableRefObject<DropdownRef> =
      useRef<DropdownRef>(null);
    const pillRefs = useRef<HTMLElement[]>([]);
    const pillWrapperRef = useRef<HTMLDivElement>(null);
    const currentlySelectedOption: React.MutableRefObject<SelectOption> =
      useRef<SelectOption>(null);
    const selectMenuId: React.MutableRefObject<string> = useRef<string>(
      uniqueId('list-')
    );

    const [clearInput, setClearInput] = useState<boolean>(false);
    const [closeOnReferenceClick, setCloseOnReferenceClick] = useState<boolean>(
      !filterable && !multiple
    );
    const [dropdownVisible, setDropdownVisibility] = useState<boolean>(false);
    const [options, setOptions] = useState<SelectOption[]>(
      (_options || []).map((option: SelectOption, index: number) => ({
        selected: false,
        hideOption: false,
        id: option.text + '-' + index,
        object: option.object,
        role: 'option',
        'aria-selected': option.selected,
        ...option,
      }))
    );
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedOptionText, setSelectedOptionText] = useState<string>('');
    const [resetTextInput, setResetTextInput] = useState<boolean>(false);
    const [_initialFocus, setInitialFocus] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<SelectOption[]>([]);

    const { isFormItemInput } = useContext(FormItemInputContext);
    const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

    const contextuallyDisabled: Disabled = useContext(DisabledContext);
    const mergedDisabled: boolean = configContextProps.noDisabledContext
      ? disabled
      : contextuallyDisabled || disabled;

    const contextuallyShaped: Shape = useContext(ShapeContext);
    const mergedShape: SelectShape | Shape = configContextProps.noShapeContext
      ? shape
      : contextuallyShaped || shape;

    const contextuallySized: Size = useContext(SizeContext);
    const mergedSize: SelectSize | Size = configContextProps.noSizeContext
      ? size
      : contextuallySized || size;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    const firstRender: React.MutableRefObject<boolean> = useRef(true);

    const prevDropdownVisible: boolean = usePreviousState(dropdownVisible);

    const getSelectedOptionValues = useCallback((): SelectOption['value'][] => {
      return (options || [])
        .filter((option: SelectOption) => option.selected)
        .map((option: SelectOption) => option.value);
    }, [options]);

    const getSelectedOptions = useCallback((): SelectOption['value'][] => {
      return (options || []).filter((option: SelectOption) => option.selected);
    }, [options]);

    const { count, filled, width } = useMaxVisibleSections(
      inputRef,
      pillRefs,
      168,
      8,
      1,
      getSelectedOptionValues().length
    );

    const setOptionsWithSelection = (
      selectedOptions: SelectOption[],
      defaultValue: string | string[] = null
    ) => {
      setOptions(
        (_options || []).map((option: SelectOption, index: number) => ({
          selected:
            !!selectedOptions.find(
              (opt: SelectOption) => opt.value === option.value
            ) || option.value === defaultValue,
          hideOption: false,
          id: option.text + '-' + index,
          object: option.object,
          role: 'option',
          'aria-selected': option.selected,
          ...option,
        }))
      );
    };

    // Populate options on component render and isLoading change
    useEffect(() => {
      const selected: SelectOption[] = (options || []).filter(
        (opt: SelectOption) => opt.selected
      );
      setOptionsWithSelection(selected, defaultValue);
    }, [_options, isLoading]);

    const updateOptions = () => {
      onOptionsChange?.(getSelectedOptionValues(), getSelectedOptions());

      if (multiple) {
        if (prevDropdownVisible) {
          setTimeout(() => {
            const currentOption: HTMLElement = document.getElementById(
              currentlySelectedOption.current?.id
            );
            if (currentOption) {
              dropdownRef.current?.focusOnElement(currentOption);
            }
          }, NO_ANIMATION_DURATION);
        }
      } else {
        getSelectedOptionText();
      }

      if (filterable && prevDropdownVisible) {
        inputRef.current?.focus();
      }

      if (filterable && multiple) {
        setClearInput(false);
      }
    };

    const resetSelectOnDropdownHide = (): void => {
      setSearchQuery('');

      const updatedOptions = (options || []).map((opt: SelectOption) => ({
        ...opt,
        hideOption: false,
      }));

      setOptions(updatedOptions);
    };

    const resetSingleSelectOnDropdownToggle = (): void => {
      const isSelected = (options || []).some(
        (opt: SelectOption) => opt.selected
      );

      if (isSelected && inputRef.current?.value !== selectedOptionText) {
        setResetTextInput(true);
      }
    };

    const resetSelect = () => {
      // When filterable and not multiple if the input value does not match
      // the selected value, ensure it's restored.
      if (filterable && !multiple) {
        // When there's already an option selected and the input value is changed
        // force the rendered value to restore the option.
        resetSingleSelectOnDropdownToggle();
      }

      // When dropdown not visible and select is filterable
      // reset the search query and visibility of the options.
      if (prevDropdownVisible && !dropdownVisible && filterable) {
        resetSelectOnDropdownHide();
      }

      // Resets closeOnReferenceClick
      if ((dropdownVisible && filterable) || (dropdownVisible && multiple)) {
        setCloseOnReferenceClick(!filterable && !multiple);
      }

      // Clears options
      if (clear) {
        onInputClear();
      }
    };

    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
      } else {
        updateOptions();
      }
    }, [firstRender, getSelectedOptionValues().join('')]);

    useEffect(() => {
      resetSelect();
    }, [clear, dropdownVisible, filterable]);

    useEffect(() => {
      if (readonly && dropdownVisible) {
        setDropdownVisibility(false);
      }
      if (!dropdownVisible && prevDropdownVisible) {
        inputRef.current?.focus();
      }
    }, [dropdownVisible, readonly, prevDropdownVisible]);

    useEffect(() => {
      const updatedOptions = (options || []).map((opt: SelectOption) => {
        let selected = false;

        if (value !== undefined) {
          selected = multiple ? value.includes(opt.value) : opt.value === value;
        } else if (defaultValue !== undefined) {
          selected = multiple
            ? defaultValue.includes(opt.value)
            : opt.value === defaultValue;
        }

        return {
          ...opt,
          selected,
        };
      });

      setOptions(updatedOptions);
      if (multiple) {
        setSelectedOrder(
          updatedOptions.filter((opt: SelectOption) => opt.selected)
        );
      }
    }, [defaultValue, multiple, value]);

    const setInitialFocusValue = (
      filterable: boolean,
      initialFocus: boolean
    ) => {
      if (!filterable && !initialFocus) {
        setInitialFocus(true);
      } else if (!filterable && initialFocus) {
        setInitialFocus(initialFocus);
      }
      if (filterable && !initialFocus) {
        setInitialFocus(false);
      } else if (filterable && initialFocus) {
        setInitialFocus(initialFocus);
      }
    };

    useEffect(() => {
      setInitialFocusValue(filterable, initialFocus);
    }, [filterable, initialFocus]);

    const toggleOption = (option: SelectOption): void => {
      setSearchQuery('');

      const updatedOptions = (options || []).map((opt: SelectOption) => {
        const defaultState: boolean = multiple ? opt.selected : false;
        const selected: boolean =
          opt.value === option.value ? !opt.selected : defaultState;
        const hideOption: boolean = false;

        return {
          ...opt,
          hideOption,
          selected,
        };
      });

      setOptions(updatedOptions);

      if (multiple) {
        setSelectedOrder((prevSelectedOrder) => {
          const alreadySelected = prevSelectedOrder.some(
            (opt: SelectOption) => opt.value === option.value
          );
          if (alreadySelected) {
            return prevSelectedOrder.filter(
              (opt: SelectOption) => opt.value !== option.value
            );
          } else {
            return [...prevSelectedOrder, option];
          }
        });
      }

      if (filterable && multiple && inputRef.current?.value !== '') {
        setClearInput(true);
      }
    };

    const onInputClear = (): void => {
      setSearchQuery('');
      if (filterable && multiple) {
        setOptions(
          (options || []).map((opt: SelectOption) => ({
            ...opt,
            hideOption: false,
          }))
        );
      } else if (filterable) {
        setOptions(
          (options || []).map((opt: SelectOption) => ({
            ...opt,
            hideOption: false,
            selected: false,
          }))
        );
      } else {
        setOptions(
          (options || []).map((opt: SelectOption) => ({
            ...opt,
            selected: false,
          }))
        );
      }
      if (!multiple) {
        setSelectedOptionText('');
      }
      onClear?.();
      inputRef.current?.focus();
    };

    const onInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const { target } = event;
      const value: string = target?.value || '';
      const valueLowerCase: string = value?.toLowerCase();

      setSearchQuery(value);

      // When single mode filterable, the input value changes, the dropdown is not previously or
      // currently visible and there's no currently selected option, ensure the dropdown is visible
      // to enable filtering when backspace or clear button is used to deselect the previously
      // selected option and the input is currently focused.
      if (
        !dropdownVisible &&
        !prevDropdownVisible &&
        filterable &&
        !multiple &&
        searchQuery?.length !== 0 &&
        getSelectedOptions().length === 0
      ) {
        inputRef.current?.click();
      }

      if (loadOptions) {
        return loadOptions(value);
      }

      const updatedOptions = (options || []).map((opt: SelectOption) => {
        let hideOption = false;
        let selected = opt.selected;

        if (value) {
          hideOption = filterOption
            ? !filterOption(opt, value)
            : !opt.text.toLowerCase().includes(valueLowerCase);
        } else {
          selected = multiple ? opt.selected : false;
        }

        return {
          ...opt,
          hideOption,
          selected,
        };
      });

      setOptions(updatedOptions);

      // When not in multiple mode and the value is empty
      // deselect and execute onClear.
      if (!value && !multiple) {
        onClear?.();
      }

      dropdownRef.current?.update();
    };

    const showDropdown = (show: boolean) => {
      if (filterable || multiple) {
        if (!multiple && options?.length) {
          return show;
        }
        return true;
      }
      return show;
    };

    const selectInputClassNames: string = mergeClasses([
      styles.selectInput,
      inputClassNames,
    ]);

    const dropdownWrapperClassNames: string = mergeClasses([
      dropdownProps.classNames,
      { [themedComponentStyles.theme]: mergedTheme },
      styles.selectDropdownMainWrapper,
    ]);

    const dropdownMenuOverlayClassNames: string = mergeClasses([
      dropdownProps.dropdownClassNames,
      styles.selectDropdownOverlay,
    ]);

    const multiSelectPillsClassNames: string = mergeClasses([
      styles.multiSelectPills,
      { [styles.multiSelectPillsMaxCount]: !!maxPillCount },
      { [styles.multiSelectPillsDivider]: filterable && !maxPillCount },
    ]);

    const pillClassNames: string = mergeClasses([
      pillProps.classNames,
      styles.multiSelectPill,
    ]);

    const countPillClassNames: string = mergeClasses([
      pillProps.classNames,
      styles.multiSelectCount,
    ]);

    const componentClassNames: string = mergeClasses([
      styles.selectWrapper,
      {
        [styles.selectWrapperMultiple]: !!multiple,
      },
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
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.selectWrapperDisabled]: mergedDisabled },
      { ['in-form-item']: mergedFormItemInput },
      classNames,
    ]);

    const showPills = (): boolean => {
      const selectedCount: number = selectedOrder.length;
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

    const isPillEllipsisActive = (element: HTMLElement): boolean => {
      const labelElement: HTMLSpanElement =
        element?.firstElementChild as HTMLSpanElement;
      return (
        labelElement && labelElement.offsetWidth < labelElement.scrollWidth
      );
    };

    const getPills = (): JSX.Element => {
      const selected: SelectOption[] = selectedOrder;

      const selectedCount: number = selected.length;
      const pills: React.ReactElement[] = [];
      let moreOptionsCount: number = selectedCount;

      selected.forEach((opt: SelectOption, index: number) => {
        const pill = (): JSX.Element => (
          <Pill
            ref={(ref) => (pillRefs.current[index] = ref)}
            id={`selectPill${opt.id}`}
            classNames={pillClassNames}
            disabled={mergedDisabled}
            key={`select-pill-${index}`}
            label={opt.text}
            onClose={() => toggleOption(opt)}
            size={selectSizeToPillSizeMap.get(mergedSize)}
            tabIndex={0}
            theme={'blueGreen'}
            type={readonly ? PillType.default : PillType.closable}
            style={{
              visibility: maxPillCount
                ? index < count
                  ? 'visible'
                  : 'hidden'
                : 'visible',
            }}
            {...pillProps}
          />
        );
        if (
          canUseDocElement() &&
          isPillEllipsisActive(document?.getElementById(`selectPill${opt.id}`))
        ) {
          pills.push(
            <Tooltip
              classNames={styles.selectTooltip}
              content={opt.text}
              id={`selectTooltip${index}`}
              placement={'top'}
              portal
              theme={TooltipTheme.dark}
            >
              {pill()}
            </Tooltip>
          );
        } else {
          pills.push(pill());
        }
        if (maxPillCount && pills.length === count && filled) {
          pills.push(
            <Pill
              classNames={countPillClassNames}
              disabled={mergedDisabled}
              id="select-pill-count"
              key="select-count"
              label={'+' + (moreOptionsCount - count)}
              tabIndex={0}
              theme={'blueGreen'}
              size={selectSizeToPillSizeMap.get(mergedSize)}
              {...pillProps}
            />
          );
        }
      });

      return (
        <div className={multiSelectPillsClassNames} ref={pillWrapperRef}>
          {pills}
        </div>
      );
    };

    const getSelectedOptionText = (): void => {
      if (multiple) {
        setSelectedOptionText(searchQuery);
        return;
      }

      const selectedOption: SelectOption = (options || []).find(
        (opt: SelectOption) => opt.selected
      );

      setSelectedOptionText(selectedOption ? selectedOption.text : '');
    };

    const OptionMenu = ({
      options,
    }: {
      options: SelectOption[];
    }): JSX.Element => {
      const updatedItems: SelectOption[] = (options || [])
        .filter((opt: SelectOption) => !opt.hideOption)
        .map(({ hideOption, ...opt }) => ({
          ...opt,
          classNames: mergeClasses([{ [styles.selectedOption]: opt.selected }]),
          role: 'option',
          'aria-selected': opt.selected,
        }));

      if (updatedItems.length === 0) {
        return <div className={styles.selectMenuEmpty}>{emptyText}</div>;
      }

      return (
        <Menu
          aria-multiselectable={multiple ? 'true' : undefined}
          id={selectMenuId?.current}
          {...menuProps}
          items={updatedItems}
          onChange={(value) => {
            const option = updatedItems.find(
              (opt: SelectOption) => opt.value === value
            );
            if (multiple || toggleOptions) {
              toggleOption(option);
              currentlySelectedOption.current = option;
            } else {
              if (
                !currentlySelectedOption.current ||
                currentlySelectedOption.current?.value !== option.value
              ) {
                toggleOption(option);
                currentlySelectedOption.current = option;
              }
            }
          }}
          role="listbox"
        />
      );
    };

    const getPillWrapperOffset = (): number[] => {
      let offset: number[];
      if (largeScreenActive) {
        offset = [28, 48];
      } else if (mediumScreenActive) {
        offset = [36, 56];
      } else if (smallScreenActive) {
        offset = [36, 56];
      } else if (xSmallScreenActive) {
        offset = [44, 72];
      }
      return offset;
    };

    const selectSizeToPillWrapperOffsetMap = new Map<
      SelectSize | Size,
      number[]
    >([
      [SelectSize.Flex, getPillWrapperOffset()],
      [SelectSize.Large, [44, 72]],
      [SelectSize.Medium, [36, 56]],
      [SelectSize.Small, [28, 48]],
    ]);

    const getStyle = (): React.CSSProperties => {
      if (!multiple) {
        return {};
      }

      const pillWrapperOffsetHeight: number =
        pillWrapperRef.current?.offsetHeight || 0;
      const pillWrapperOffset: number[] =
        selectSizeToPillWrapperOffsetMap.get(mergedSize);

      if (!maxPillCount && showPills() && pillWrapperRef.current) {
        const pillOffsetStyles = {
          height: `${Math.floor(
            pillWrapperOffsetHeight + pillWrapperOffset[0]
          )}px`,
          padding: '4px 8px',
          paddingTop: `${Math.floor(pillWrapperOffsetHeight)}px`,
        };

        if (filterable) {
          return {
            ...pillOffsetStyles,
            [htmlDir === 'rtl' ? 'paddingLeft' : 'paddingRight']:
              pillWrapperOffset[1],
          };
        } else {
          return { height: `${Math.floor(pillWrapperOffsetHeight)}px` };
        }
      } else if (maxPillCount && showPills() && pillWrapperRef.current) {
        const paddingValue: number =
          width > 0
            ? filled
              ? width + multiSelectCountOffset
              : width + inputPadding
            : inputPadding;
        return {
          [htmlDir === 'rtl'
            ? 'paddingRight'
            : 'paddingLeft']: `${paddingValue}px`,
          [htmlDir === 'rtl' ? 'paddingLeft' : 'paddingRight']:
            pillWrapperOffset[1],
        };
      }
      return {};
    };

    const [textInputStyle, setTextInputStyle] = useState<React.CSSProperties>(
      getStyle()
    );

    useEffect(() => {
      if (!multiple) {
        return;
      }
      setTextInputStyle(getStyle());
    }, [maxPillCount, mergedSize, multiple, options, selectWidth]);

    const restoreCloseOnReferenceClickAsync = async (): Promise<void> => {
      if (filterable && !multiple) {
        resetSingleSelectOnDropdownToggle();
      }

      if (filterable || multiple) {
        setCloseOnReferenceClick(true);
      }
    };

    const handleToggleButtonClick = async (
      event: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
      event.stopPropagation();
      if (mergedDisabled) {
        return;
      }
      // Call setCloseOnReferenceClick asynchronously
      // to ensure the input click is not handled.
      await restoreCloseOnReferenceClickAsync();
      inputRef.current?.click();
    };

    const handleOnInputBlur = (
      event: React.FocusEvent<HTMLInputElement>
    ): void => {
      if (filterable && !multiple && !dropdownVisible) {
        resetSingleSelectOnDropdownToggle();
        resetSelectOnDropdownHide();
      }
      onBlur?.(event);
    };

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
      onKeyDown?.(event);
      if (mergedDisabled) {
        return;
      }
      if (
        filterable &&
        event?.key === eventKeys.ARROWDOWN &&
        document.activeElement === event.target
      ) {
        dropdownRef.current?.focusFirstElement?.();
      }
      if (
        filterable &&
        event?.key === eventKeys.ENTER &&
        document.activeElement === event.target
      ) {
        dropdownRef.current?.focusFirstElement?.();
        setTimeout(() => {
          (document.activeElement as HTMLElement)?.click();
        }, ANIMATION_DURATION);
      }
    };

    const clearButtonClassNames: string = mergeClasses([
      styles.selectClearButton,
      { [styles.selectClearButtonEnd]: multiple && filterable },
      { [styles.selectClearButtonStart]: !multiple },
      {
        [styles.selectClearButtonEndRtl]:
          htmlDir === 'rtl' && multiple && filterable,
      },
      { [styles.selectClearButtonStartRtl]: htmlDir === 'rtl' && !multiple },
    ]);

    const selectInputProps: TextInputProps = useMemo(
      () => ({
        placeholder: showPills() && !!options ? '' : placeholder,
        alignIcon: TextInputIconAlign.Right,
        clearable: clearable && !readonly,
        clearButtonClassNames: clearButtonClassNames,
        inputWidth: inputWidth,
        iconButtonProps: readonly
          ? null
          : {
              ariaLabel: toggleButtonAriaLabel || 'Toggle dropdown',
              htmlType: 'button',
              iconProps: {
                path: dropdownVisible
                  ? IconName.mdiChevronUp
                  : IconName.mdiChevronDown,
              },
              onClick: handleToggleButtonClick,
            },
        onClear: onInputClear,
        ...textInputProps,
        style: { ...textInputProps.style, ...textInputStyle },
      }),
      [
        placeholder,
        clearable,
        textInputStyle,
        readonly,
        clearButtonClassNames,
        inputWidth,
        toggleButtonAriaLabel,
        dropdownVisible,
        onInputClear,
        textInputProps,
      ]
    );

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

      const inputWidth: number = inputRef.current.offsetWidth;
      const dropdownUpdatedWidth: number = Math.max(
        inputWidth > dropdownDefaultWidth ? inputWidth : dropdownDefaultWidth
      );

      setSelectWidth(inputWidth);
      setDropdownWidth(dropdownUpdatedWidth);
      dropdownRef.current?.update();
    };

    useLayoutEffect(() => {
      updateLayout();
    }, [dropdownWidth, selectWidth]);

    return (
      <ResizeObserver onResize={updateLayout}>
        <ThemeContextProvider
          componentClassName={themedComponentStyles.theme}
          containerId={themeContainerId}
          theme={mergedTheme}
        >
          <div
            ref={ref}
            aria-owns={dropdownVisible ? selectMenuId?.current : undefined}
            className={componentClassNames}
            data-test-id={dataTestId} // TODO: Remove in v3.0.0
            data-testid={dataTestIdv2}
            id={id}
            style={style}
          >
            {/* When Dropdown is hidden, place Pills outside the reference element */}
            {!dropdownVisible && showPills() ? getPills() : null}
            <Dropdown
              ariaRef={inputRef}
              initialFocus={_initialFocus}
              width={dropdownWidth}
              closeOnReferenceClick={closeOnReferenceClick}
              {...dropdownProps}
              classNames={dropdownWrapperClassNames}
              disabled={mergedDisabled || readonly}
              dropdownClassNames={dropdownMenuOverlayClassNames}
              onVisibleChange={(isVisible) => setDropdownVisibility(isVisible)}
              overlay={isLoading ? spinner : <OptionMenu options={options} />}
              showDropdown={showDropdown}
              visible={
                dropdownVisible &&
                (showEmptyDropdown ||
                  isLoading ||
                  searchQuery?.length > 0 ||
                  options?.length > 0)
              }
              ref={dropdownRef}
            >
              <div className={styles.selectInputWrapper}>
                {/* When Dropdown is visible, place Pills in the reference element */}
                {dropdownVisible && showPills() ? getPills() : null}
                <TextInput
                  ref={inputRef}
                  aria-activedescendant={currentlySelectedOption.current?.id}
                  aria-controls={selectMenuId?.current}
                  configContextProps={configContextProps}
                  status={status}
                  theme={mergedTheme}
                  themeContainerId={themeContainerId}
                  {...selectInputProps}
                  autocomplete={autocomplete}
                  classNames={selectInputClassNames}
                  clear={
                    (!dropdownVisible && getSelectedOptions().length === 0) ||
                    (!dropdownVisible &&
                      multiple &&
                      filterable &&
                      inputRef.current?.value !== '') ||
                    clearInput
                  }
                  disabled={mergedDisabled}
                  formItemInput={mergedFormItemInput}
                  groupClassNames={styles.selectInputGroup}
                  onBlur={handleOnInputBlur}
                  onChange={filterable ? onInputChange : null}
                  onFocus={onFocus}
                  onKeyDown={handleInputKeyDown}
                  onReset={(): void => setResetTextInput(false)}
                  readonly={!filterable || readonly}
                  readOnlyProps={{
                    clearable:
                      (filterable || selectInputProps?.clearable) && !readonly,
                    noStyleChange: !readonly,
                  }}
                  reset={resetTextInput}
                  role="combobox"
                  shape={selectShapeToTextInputShapeMap.get(mergedShape)}
                  size={selectSizeToTextInputSizeMap.get(mergedSize)}
                  value={selectedOptionText}
                />
              </div>
            </Dropdown>
          </div>
        </ThemeContextProvider>
      </ResizeObserver>
    );
  }
);
