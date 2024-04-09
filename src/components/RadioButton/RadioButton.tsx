'use client';

import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size, OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { RadioButtonProps, RadioButtonValue } from './';
import {
  LabelAlign,
  LabelPosition,
  SelectorSize,
  SelectorVariant,
  SelectorWidth,
} from '../CheckBox';
import { mergeClasses, generateId } from '../../shared/utilities';
import { useRadioGroup } from './RadioGroup.context';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { FormItemInputContext } from '../Form/Context';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './radio.module.scss';
import themedComponentStyles from './radio.theme.module.scss';

export const RadioButton: FC<RadioButtonProps> = React.forwardRef(
  (
    {
      allowDisabledFocus = false,
      ariaLabel,
      checked = false,
      classNames,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
        noThemeContext: false,
      },
      disabled = false,
      formItemInput = false,
      id,
      name,
      label,
      labelPosition = LabelPosition.End,
      labelAlign = LabelAlign.Center,
      onChange,
      selectorWidth = SelectorWidth.fitContent,
      size = SelectorSize.Medium,
      style,
      theme,
      themeContainerId,
      value = '',
      variant = SelectorVariant.Default,
      'data-test-id': dataTestId,
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const htmlDir: string = useCanvasDirection();

    // TODO: Upgrade to React 18 and use the new `useId` hook.
    // This way the id will match on the server and client.
    // For now, pass an id via props if using SSR.
    const radioButtonId = useRef<string>(id || generateId());

    const radioGroupContext = useRadioGroup();
    const [isActive, setIsActive] = useState<boolean>(
      radioGroupContext?.value === value || checked
    );
    const [selectedValue, setSelectedValue] = useState<RadioButtonValue>(value);

    const { isFormItemInput } = useContext(FormItemInputContext);
    const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

    const contextuallyDisabled: Disabled = useContext(DisabledContext);
    const mergedDisabled: boolean = configContextProps.noDisabledContext
      ? disabled
      : contextuallyDisabled || disabled;

    const contextuallySized: Size = useContext(SizeContext);
    const mergedSize = configContextProps.noSizeContext
      ? size
      : contextuallySized || size;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    const radioButtonClassNames: string = mergeClasses([styles.radioButton]);

    const selectorClassNames: string = mergeClasses([
      styles.selector,
      {
        [styles.selectorPill]: variant === SelectorVariant.Pill,
      },
      {
        [styles.selectorPillActive]:
          variant === SelectorVariant.Pill &&
          (radioGroupContext ? isActive : selectedValue === value && checked),
      },
      {
        [styles.selectorPillStretch]:
          variant === SelectorVariant.Pill &&
          selectorWidth === SelectorWidth.fill,
      },
      {
        [styles.selectorSmall]:
          mergedSize === SelectorSize.Flex && largeScreenActive,
      },
      {
        [styles.selectorMedium]:
          mergedSize === SelectorSize.Flex && mediumScreenActive,
      },
      {
        [styles.selectorMedium]:
          mergedSize === SelectorSize.Flex && smallScreenActive,
      },
      {
        [styles.selectorLarge]:
          mergedSize === SelectorSize.Flex && xSmallScreenActive,
      },
      { [styles.selectorLarge]: mergedSize === SelectorSize.Large },
      { [styles.selectorMedium]: mergedSize === SelectorSize.Medium },
      { [styles.selectorSmall]: mergedSize === SelectorSize.Small },
      classNames,
      { [styles.disabled]: allowDisabledFocus || mergedDisabled },
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.selectorRtl]: htmlDir === 'rtl' },
      { ['in-form-item']: mergedFormItemInput },
    ]);

    const labelClassNames: string = mergeClasses([
      {
        [styles.labelNoValue]: value === '',
        [styles.labelNoValue]: value === '',
        [styles.alignStart]: labelAlign === LabelAlign.Start,
        [styles.alignEnd]: labelAlign === LabelAlign.End,
      },
    ]);

    const selectorLabelClassNames: string = mergeClasses([
      styles.selectorLabel,
      {
        [styles.selectorLabelEnd]: labelPosition === LabelPosition.End,
        [styles.selectorLabelStart]: labelPosition === LabelPosition.Start,
      },
    ]);

    // TODO: Follow-up on React issue 24439 https://github.com/facebook/react/issues/24439
    // Bug: Checked attribute does not update in the dom - Meta folks are planning on
    // updating this in a future React version, this could be an A11y issue so need
    // to find a anti-pattern workaround. They closed the bug, but it's definitely still repro.
    useEffect(() => {
      setIsActive(radioGroupContext?.value === value);
    }, [radioGroupContext?.value]);

    const toggleChecked = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!radioGroupContext) {
        setSelectedValue(e.currentTarget?.value as RadioButtonValue);
      } else {
        radioGroupContext?.onChange?.(e);
      }

      onChange?.(e);
    };

    return (
      <ThemeContextProvider
        componentClassName={themedComponentStyles.theme}
        containerId={themeContainerId}
        theme={mergedTheme}
      >
        <div
          className={selectorClassNames}
          data-test-id={dataTestId}
          style={style}
        >
          <input
            ref={ref}
            aria-disabled={mergedDisabled}
            aria-label={ariaLabel}
            checked={
              radioGroupContext ? isActive : selectedValue === value && checked
            }
            disabled={!allowDisabledFocus && mergedDisabled}
            id={radioButtonId.current}
            name={name}
            type={'radio'}
            value={value}
            onChange={!allowDisabledFocus ? toggleChecked : null}
            readOnly
          />
          <label htmlFor={radioButtonId.current} className={labelClassNames}>
            {labelPosition == LabelPosition.Start && (
              <span className={selectorLabelClassNames}>{label}</span>
            )}
            <span
              id={`${radioButtonId.current}-custom-radio`}
              className={radioButtonClassNames}
            />
            {labelPosition == LabelPosition.End && (
              <span className={selectorLabelClassNames}>{label}</span>
            )}
          </label>
        </div>
      </ThemeContextProvider>
    );
  }
);
