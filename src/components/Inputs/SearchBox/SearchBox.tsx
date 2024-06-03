'use client';

import React, { FC, Ref, useContext } from 'react';
import DisabledContext, {
  Disabled,
} from '../../ConfigProvider/DisabledContext';
import {
  OcThemeName,
  ShapeContext,
  Shape,
  SizeContext,
  Size,
} from '../../ConfigProvider';
import ThemeContext from '../../ConfigProvider/ThemeContext';
import { IconName } from '../../Icon';
import {
  SearchBoxProps,
  TextInput,
  TextInputIconAlign,
  TextInputShape,
  TextInputSize,
  TextInputWidth,
} from '../index';
import { FormItemInputContext } from '../../Form/Context';
import { getMergedStatus } from '../../../shared/utilities';

export const SearchBox: FC<SearchBoxProps> = React.forwardRef(
  (
    {
      alignIcon = TextInputIconAlign.Left,
      allowDisabledFocus = false,
      ariaLabel,
      autocomplete,
      autoFocus = false,
      classNames,
      clear = false,
      clearable = true,
      clearButtonAriaLabel,
      configContextProps = {
        noDisabledContext: false,
        noShapeContext: false,
        noSizeContext: false,
        noThemeContext: false,
      },
      disabled = false,
      formItemInput = false,
      iconProps,
      iconButtonProps = {
        allowDisabledFocus: false,
        disabled: false,
        iconProps: { path: IconName.mdiMagnify },
      },
      id,
      inline = false,
      inputWidth = TextInputWidth.fitContent,
      labelProps,
      maxlength,
      minlength,
      name,
      onBlur,
      onChange,
      onClear,
      onFocus,
      onKeyDown,
      onReset,
      onSubmit,
      placeholder = 'Search',
      readonly = false,
      readOnlyProps,
      reset = false,
      role,
      searchButtonAriaLabel,
      shape = TextInputShape.Pill,
      size = TextInputSize.Medium,
      status,
      style,
      theme,
      themeContainerId,
      value,
      waitInterval = 500,
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const { status: contextStatus, isFormItemInput } =
      useContext(FormItemInputContext);
    const mergedStatus = getMergedStatus(contextStatus, status);
    const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

    const contextuallyDisabled: Disabled = useContext(DisabledContext);
    const mergedDisabled: boolean = configContextProps.noDisabledContext
      ? disabled
      : contextuallyDisabled || disabled;

    const contextuallyShaped: Shape = useContext(ShapeContext);
    const mergedShape = configContextProps.noShapeContext
      ? shape
      : contextuallyShaped || shape;

    const contextuallySized: Size = useContext(SizeContext);
    const mergedSize = configContextProps.noSizeContext
      ? size
      : contextuallySized || size;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    return (
      <form role="search" onSubmit={(_event) => onSubmit?.(_event)}>
        <TextInput
          {...rest}
          ref={ref}
          alignIcon={alignIcon}
          clear={clear}
          clearable={clearable}
          allowDisabledFocus={allowDisabledFocus}
          ariaLabel={ariaLabel}
          autocomplete={autocomplete}
          autoFocus={autoFocus}
          classNames={classNames}
          clearButtonAriaLabel={clearButtonAriaLabel}
          configContextProps={configContextProps}
          disabled={mergedDisabled}
          formItemInput={mergedFormItemInput}
          htmlType="search"
          iconProps={iconProps}
          iconButtonProps={{
            ariaLabel: searchButtonAriaLabel ? searchButtonAriaLabel : 'Search',
            htmlType: 'button',
            iconProps: {
              path: IconName.mdiMagnify,
            },
            ...iconButtonProps,
            disabled: mergedDisabled,
          }}
          id={id}
          inline={inline}
          inputWidth={inputWidth}
          labelProps={labelProps}
          maxlength={maxlength}
          minlength={minlength}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onClear={onClear}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onReset={onReset}
          placeholder={placeholder}
          readonly={readonly}
          readOnlyProps={readOnlyProps}
          reset={reset}
          role={role}
          shape={mergedShape}
          size={mergedSize}
          status={mergedStatus}
          style={style}
          theme={mergedTheme}
          themeContainerId={themeContainerId}
          value={value}
          waitInterval={waitInterval}
        />
      </form>
    );
  }
);
