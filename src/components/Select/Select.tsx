'use client';

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
import { Tooltip, TooltipTheme } from '../Tooltip';
import { FormItemInputContext } from '../Form/Context';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useMaxVisibleSections } from '../../hooks/useMaxVisibleSections';
import { usePreviousState } from '../../hooks/usePreviousState';
import {
  canUseDocElement,
  contains,
  eventKeys,
  mergeClasses,
  uniqueId,
} from '../../shared/utilities';

import styles from './select.module.scss';
import themedComponentStyles from './select.theme.module.scss';

const inputPaddingHorizontal: number = +styles.inputPaddingHorizontal;
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
      'data-test-id': dataTestId,
      keepCountPillFocus = true,
      'aria-label': ariaLabel,
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

    const getSelectedOptionValues = (): SelectOption['value'][] => {
      return (options || [])
        .filter((option: SelectOption) => option.selected)
        .map((option: SelectOption) => option.value);
    };

    const getSelectedOptions = (): SelectOption['value'][] => {
      return (options || []).filter((option: SelectOption) => option.selected);
    };

    const { count, filled, width } = useMaxVisibleSections(
      inputRef,
      pillRefs,
      168,
      8,
      1,
      getSelectedOptionValues().length
    );

    // Populate options on component render
    useEffect(() => {
      const selected: SelectOption[] = (options || []).filter(
        (opt: SelectOption) => opt.selected
      );
      setOptions(
        (_options || []).map((option: SelectOption, index: number) => ({
          selected: !!selected.find((opt) => opt.value === option.value),
          hideOption: false,
          id: option.text + '-' + index,
          object: option.object,
          role: 'option',
          'aria-selected': option.selected,
          ...option,
        }))
      );
    }, [_options]);

    // Populate options on isLoading change
    useEffect(() => {
      const selected: SelectOption[] = (options || []).filter(
        (opt: SelectOption) => opt.selected
      );
      setOptions(
        (_options || []).map((option: SelectOption, index: number) => ({
          selected:
            !!selected.find((opt) => opt.value === option.value) ||
            option.value === defaultValue,
          hideOption: false,
          id: option.text + '-' + index,
          object: option.object,
          role: 'option',
          'aria-selected': option.selected,
          ...option,
        }))
      );
    }, [isLoading]);

    // Update options on change
    useEffect(() => {
      onOptionsChange?.(getSelectedOptionValues(), getSelectedOptions());

      // Determine first render to help verify the Select interaction is intentional
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (multiple && prevDropdownVisible) {
        setTimeout(() => {
          const currentOption: HTMLElement = document.getElementById(
            currentlySelectedOption.current?.id
          );
          if (currentOption) {
            dropdownRef.current?.focusOnElement(currentOption);
          }
        }, NO_ANIMATION_DURATION);
      } else {
        getSelectedOptionText();
        if (filterable && prevDropdownVisible) {
          inputRef.current?.focus();
        }
      }
      if (filterable && multiple) {
        setClearInput(false);
      }
    }, [getSelectedOptionValues().join('')]);

    useEffect(() => {
      const updatedOptions = (options || []).map((opt) => ({
        ...opt,
        selected:
          (defaultValue !== undefined &&
            (multiple
              ? defaultValue.includes(opt.value)
              : opt.value === defaultValue)) ||
          opt.selected,
      }));
      setOptions(updatedOptions);
    }, [defaultValue]);

    useEffect(() => {
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
    }, [clear, dropdownVisible, filterable]);

    useEffect(() => {
      if (readonly && dropdownVisible) {
        setDropdownVisibility(false);
      }
      if (!dropdownVisible && prevDropdownVisible) {
        inputRef.current?.focus();
      }
    }, [readonly, dropdownVisible, prevDropdownVisible]);

    useEffect(() => {
      if (!filterable && !initialFocus) {
        setInitialFocus(true);
      } else if (!filterable && initialFocus !== null) {
        setInitialFocus(initialFocus);
      }
      if (filterable && !initialFocus) {
        setInitialFocus(false);
      } else if (filterable && initialFocus !== null) {
        setInitialFocus(initialFocus);
      }
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

      // Update the state with the updated options
      setOptions(updatedOptions);

      if (filterable && multiple && inputRef.current?.value !== '') {
        setClearInput(true);
      }
    };

    const resetSelectOnDropdownHide = (): void => {
      setSearchQuery('');
      setOptions(
        (options || []).map((opt: SelectOption) => ({
          ...opt,
          hideOption: false,
        }))
      );
    };

    const resetSingleSelectOnDropdownToggle = (): void => {
      const selected: SelectOption[] = (options || []).filter(
        (opt: SelectOption) => opt.selected
      );
      if (selected.length && inputRef.current?.value !== selectedOptionText) {
        setResetTextInput(true);
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
      onClear?.();
      inputRef.current?.focus();
    };

    const onInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
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

      const { target } = event;
      const value: string = target?.value || '';
      const valueLowerCase: string = value?.toLowerCase();
      setSearchQuery(value);
      if (loadOptions) {
        return loadOptions(value);
      }
      if (value) {
        setOptions(
          (options || []).map((opt: SelectOption) => ({
            ...opt,
            hideOption: filterOption
              ? !filterOption(opt, value)
              : !opt.text.toLowerCase().includes(valueLowerCase),
          }))
        );
      } else {
        setSearchQuery('');
        // When not in multiple mode and the value is empty
        // deselect and execute onClear.
        setOptions(
          (options || []).map((opt: SelectOption) => {
            const selected: boolean = multiple ? opt.selected : false;
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
      // Update dropdown position on options change
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
      const selected: SelectOption[] = (options || []).filter(
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
        element?.firstElementChild as HTMLSpanElement;
      return labelElement?.offsetWidth < labelElement?.scrollWidth;
    };

    const getPills = (): JSX.Element => {
      const selected: SelectOption[] = (options || []).filter(
        (opt: SelectOption) => opt.selected
      );

      const selectedCount: number = selected.length;
      const pills: React.ReactElement[] = [];
      let moreOptionsCount: number = selectedCount;

      // TODO: Mutate Array based on order of selection.
      selected.forEach((opt: SelectOption, index: number) => {
        const pill = (): JSX.Element => (
          <Pill
            ref={(ref) => (pillRefs.current[index] = ref)}
            id={`selectPill${opt.id}`}
            classNames={pillClassNames}
            disabled={mergedDisabled}
            key={`select-pill-${index}`}
            label={opt.text}
            onClose={(event) => {
              if (contains(document.activeElement, event.target as Node)) {
                toggleOption(opt);
              }
            }}
            size={selectSizeToPillSizeMap.get(size)}
            tabIndex={0}
            theme={'blueGreen'}
            type={readonly ? PillType.default : PillType.closable}
            style={{
              visibility: index < count ? 'visible' : 'hidden',
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
              key={`select-tooltip-${index}`}
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
        if (pills?.length === count && filled) {
          const remainingCount = moreOptionsCount - count;
          const accessibleLabel = `and ${remainingCount} more ${
            remainingCount === 1 ? 'option' : 'options'
          } selected`;
          // if keepCountPillFocus is true, keep the count pill focusable
          const updatedPillProps = {
            ...pillProps,
            ...(keepCountPillFocus &&
            'tabIndex' in pillProps &&
            pillProps.tabIndex === -1
              ? { tabIndex: 0 }
              : {}),
          };
          pills.push(
            <Pill
              classNames={countPillClassNames}
              disabled={mergedDisabled}
              id="select-pill-count"
              key="select-count"
              label={'+' + remainingCount}
              tabIndex={0}
              theme={'blueGreen'}
              size={selectSizeToPillSizeMap.get(mergedSize)}
              onClick={() => {
                if (!dropdownVisible) {
                  setDropdownVisibility(true);
                }
              }}
              onKeyDown={(event) => {
                if (
                  event.key === eventKeys.ENTER ||
                  event.key === eventKeys.SPACE
                ) {
                  event.preventDefault();
                  if (!dropdownVisible) {
                    setDropdownVisibility(true);
                  }
                }
              }}
              aria-label={accessibleLabel}
              role="button"
              {...updatedPillProps}
            />
          );
        }
      });

      return <div className={styles.multiSelectPills}>{pills}</div>;
    };

    const getSelectedOptionText = (): void => {
      if (multiple) {
        setSelectedOptionText(searchQuery);
        return;
      }
      const selectedOption = (options || [])
        .filter((opt: SelectOption) => opt.selected)
        .map((opt: SelectOption) => opt.text)
        .join(', ')
        .toLocaleString();
      setSelectedOptionText(selectedOption);
    };

    const OptionMenu = ({
      options,
    }: {
      options: SelectOption[];
    }): JSX.Element => {
      const {
        menuItemRole,
        menuButtonRole,
        menuButtonHasRole,
        ...restMenuProps
      } = menuProps;

      const filteredOptions = (options || []).filter(
        (opt: SelectOption) => !opt.hideOption
      );
      const updatedItems: SelectOption[] = filteredOptions.map(
        ({ hideOption, role: optRole, ...opt }) => {
          const item: SelectOption = {
            ...opt,
            classNames: mergeClasses([
              { [styles.selectedOption]: opt.selected },
            ]),
            listItemRole: menuItemRole,
            'aria-selected': opt.selected,
          };

          if (menuButtonHasRole === true) {
            item.role = menuButtonRole ?? optRole ?? 'option';
          } else if (menuButtonHasRole === false) {
            // Don't set role property - this will allow MenuItemButton to use its default or no role
            // We need to explicitly set it to null to remove it
            item.role = null;
          } else {
            item.role = optRole ?? 'option';
          }

          return item;
        }
      );
      if (filteredOptions.length > 0) {
        return (
          <Menu
            id={selectMenuId?.current}
            {...restMenuProps}
            itemProps={menuItemRole ? { role: menuItemRole } : undefined}
            items={updatedItems}
            onChange={(value) => {
              const option = updatedItems.find(
                (opt: SelectOption) => opt.value === value
              );
              currentlySelectedOption.current = option;
              toggleOption(option);
            }}
            role="listbox"
          />
        );
      } else {
        return <div className={styles.selectMenuEmpty}>{emptyText}</div>;
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
    };

    const clearButtonClassNames: string = mergeClasses([
      styles.selectClearButton,
      { [styles.selectClearButtonEnd]: multiple && filterable && showPills() },
      { [styles.selectClearButtonStart]: !multiple },
      {
        [styles.selectClearButtonEndRtl]:
          htmlDir === 'rtl' && multiple && filterable && showPills(),
      },
      { [styles.selectClearButtonStartRtl]: htmlDir === 'rtl' && !multiple },
    ]);

    const selectInputProps: TextInputProps = {
      placeholder: showPills() && !!options ? '' : placeholder,
      alignIcon: TextInputIconAlign.Right,
      clearable: clearable && !readonly,
      clearButtonClassNames: clearButtonClassNames,
      inputWidth: inputWidth,
      iconButtonProps: !readonly
        ? {
            ariaLabel: toggleButtonAriaLabel
              ? toggleButtonAriaLabel
              : 'Toggle dropdown',
            htmlType: 'button',
            // The button does not need to be the tab order as
            // the input itself provides the focus and action.
            tabIndex: -1,
            role: 'presentation',
            ariaHidden: true,
            iconProps: {
              path: dropdownVisible
                ? IconName.mdiChevronUp
                : IconName.mdiChevronDown,
            },
            onClick: handleToggleButtonClick,
          }
        : null,
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

    const shouldShowDropdown =
      dropdownVisible &&
      (showEmptyDropdown ||
        isLoading ||
        searchQuery?.length > 0 ||
        options?.length > 0);

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
            data-test-id={dataTestId}
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
              visible={shouldShowDropdown}
              ref={dropdownRef}
              role={null}
            >
              <div className={styles.selectInputWrapper}>
                {/* When Dropdown is visible, place Pills in the reference element */}
                {dropdownVisible && showPills() ? getPills() : null}
                <TextInput
                  ref={inputRef}
                  aria-activedescendant={currentlySelectedOption.current?.id}
                  aria-controls={selectMenuId?.current}
                  aria-expanded={shouldShowDropdown}
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
                  ariaLabel={ariaLabel}
                />
              </div>
            </Dropdown>
          </div>
        </ThemeContextProvider>
      </ResizeObserver>
    );
  }
);
