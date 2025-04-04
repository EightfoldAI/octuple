'use client';

import React, { FC, Ref, useContext } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size, OcThemeName } from '../ConfigProvider';
import ThemeContext from '../ConfigProvider/ThemeContext';
import { mergeClasses } from '../../shared/utilities';
import { CheckBox } from './CheckBox';
import {
  CheckboxGroupProps,
  CheckboxValueType,
  LabelAlign,
  LabelPosition,
  SelectorSize,
  SelectorVariant,
  SelectorWidth,
} from './Checkbox.types';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { FormItemInputContext } from '../Form/Context';

import styles from './checkbox.module.scss';

export const CheckBoxGroup: FC<CheckboxGroupProps> = React.forwardRef(
  (
    {
      allowDisabledFocus = false,
      ariaLabel,
      ariaDescribedBy,
      classNames,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
        noThemeContext: false,
      },
      disabled = false,
      formItemInput = false,
      id,
      items = [],
      labelPosition = LabelPosition.End,
      labelAlign = LabelAlign.Center,
      layout = 'vertical',
      onChange,
      selectorWidth = SelectorWidth.fitContent,
      size = SelectorSize.Medium,
      style,
      theme,
      themeContainerId,
      value,
      variant = SelectorVariant.Default,
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

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

    const checkboxGroupClassNames = mergeClasses([
      styles.checkboxGroup,
      { [styles.vertical]: layout === 'vertical' },
      { [styles.horizontal]: layout === 'horizontal' },
      {
        [styles.checkboxGroupSmall]:
          mergedSize === SelectorSize.Flex && largeScreenActive,
      },
      {
        [styles.checkboxGroupMedium]:
          mergedSize === SelectorSize.Flex && mediumScreenActive,
      },
      {
        [styles.checkboxGroupMedium]:
          mergedSize === SelectorSize.Flex && smallScreenActive,
      },
      {
        [styles.checkboxGroupLarge]:
          mergedSize === SelectorSize.Flex && xSmallScreenActive,
      },
      { [styles.checkboxGroupLarge]: mergedSize === SelectorSize.Large },
      {
        [styles.checkboxGroupMedium]: mergedSize === SelectorSize.Medium,
      },
      { [styles.checkboxGroupSmall]: mergedSize === SelectorSize.Small },
      { ['in-form-item']: mergedFormItemInput },
      classNames,
    ]);

    return (
      <div
        className={checkboxGroupClassNames}
        style={style}
        role={items?.length > 1 ? 'group' : undefined}
        aria-label={ariaLabel}
        id={id}
        ref={ref}
        {...rest}
      >
        {items.map((item) => (
          <CheckBox
            allowDisabledFocus={allowDisabledFocus}
            configContextProps={configContextProps}
            ariaDescribedBy={ariaDescribedBy}
            disabled={mergedDisabled}
            labelPosition={labelPosition}
            labelAlign={labelAlign}
            {...item}
            checked={value?.includes(item.value)}
            key={item.value}
            onChange={() => {
              if (value) {
                const optionIndex: number = value.indexOf(item.value);
                const newValue: CheckboxValueType[] = [...value];
                if (optionIndex === -1) {
                  newValue.push(item.value);
                } else {
                  newValue.splice(optionIndex, 1);
                }
                onChange?.(newValue);
              }
            }}
            selectorWidth={selectorWidth}
            size={mergedSize}
            theme={mergedTheme}
            themeContainerId={themeContainerId}
            variant={variant}
          />
        ))}
      </div>
    );
  }
);
