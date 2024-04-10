'use client';

import React, { FC, Ref } from 'react';
import {
  Button,
  ButtonIconAlign,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from '../';

// TODO: Remove in Octuple v3.0.0, use `<Button variant={ButtonVariant.Primary} />` instead.
export const PrimaryButton: FC<ButtonProps> = React.forwardRef(
  (
    {
      alignIcon = ButtonIconAlign.Left,
      alignText = ButtonTextAlign.Center,
      allowDisabledFocus = false,
      ariaLabel,
      badgeProps,
      buttonWidth,
      checked = false,
      classNames,
      configContextProps,
      counter,
      disabled = false,
      disruptive = false,
      dropShadow = false,
      floatingButtonProps,
      nudgeProps,
      htmlType,
      iconProps,
      onClick,
      onContextMenu,
      shape = ButtonShape.Pill,
      size = ButtonSize.Medium,
      split,
      splitButtonChecked = false,
      splitButtonProps,
      style,
      text,
      theme,
      themeContainerId,
      toggle,
      ...rest
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Button
        {...rest}
        ref={ref}
        alignIcon={alignIcon}
        alignText={alignText}
        allowDisabledFocus={allowDisabledFocus}
        ariaLabel={ariaLabel}
        badgeProps={badgeProps}
        buttonWidth={buttonWidth}
        checked={checked}
        classNames={classNames}
        configContextProps={configContextProps}
        counter={counter}
        disabled={disabled}
        disruptive={disruptive}
        dropShadow={dropShadow}
        floatingButtonProps={floatingButtonProps}
        nudgeProps={nudgeProps}
        htmlType={htmlType}
        iconProps={iconProps}
        onClick={onClick}
        onContextMenu={onContextMenu}
        shape={shape}
        size={size}
        split={split}
        splitButtonChecked={splitButtonChecked}
        splitButtonProps={splitButtonProps}
        style={style}
        text={text}
        theme={theme}
        themeContainerId={themeContainerId}
        toggle={toggle}
        variant={ButtonVariant.Primary}
      />
    );
  }
);
