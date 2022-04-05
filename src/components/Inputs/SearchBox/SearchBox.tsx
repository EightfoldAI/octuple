import React, { FC } from 'react';
import { IconName } from '../../Icon';
import {
    InputWidth,
    SearchBoxProps,
    TextInput,
    TextInputShape,
    TextInputTheme,
} from '../index';

export const SearchBox: FC<SearchBoxProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    clearButtonAriaLabel,
    disabled = false,
    iconProps,
    iconButtonProps = {
        allowDisabledFocus: false,
        disabled: false,
        icon: IconName.mdiMagnify,
    },
    inputWidth = InputWidth.fitContent,
    label,
    labelIconButtonProps,
    maxlength,
    minlength,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder = 'Search',
    shape = TextInputShape.Rectangle,
    style,
    theme = TextInputTheme.light,
    value,
    waitInterval = 500,
}) => (
    <form role="search">
        <TextInput
            allowDisabledFocus={allowDisabledFocus}
            ariaLabel={ariaLabel}
            autoFocus={autoFocus}
            className={className}
            clearButtonAriaLabel={clearButtonAriaLabel}
            disabled={disabled}
            htmlType="search"
            iconProps={iconProps}
            iconButtonProps={iconButtonProps}
            inputWidth={inputWidth}
            label={label}
            labelIconButtonProps={labelIconButtonProps}
            maxlength={maxlength}
            minlength={minlength}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            shape={shape}
            style={style}
            theme={theme}
            value={value}
            waitInterval={waitInterval}
        />
    </form>
);
