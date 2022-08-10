import React, { FC } from 'react';
import { IconName } from '../../Icon';
import {
    TextInputWidth,
    SearchBoxProps,
    TextInput,
    TextInputShape,
    TextInputTheme,
} from '../index';

export const SearchBox: FC<SearchBoxProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    classNames,
    clearButtonAriaLabel,
    disabled = false,
    iconProps,
    iconButtonProps = {
        allowDisabledFocus: false,
        disabled: false,
        iconProps: { path: IconName.mdiMagnify },
    },
    inputWidth = TextInputWidth.fitContent,
    labelProps,
    maxlength,
    minlength,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onSubmit,
    placeholder = 'Search',
    shape = TextInputShape.Rectangle,
    style,
    theme = TextInputTheme.light,
    value,
    waitInterval = 500,
    ...rest
}) => (
    <form
        role="search"
        onSubmit={(_event) => {
            _event.preventDefault();
            onSubmit?.(_event);
        }}
    >
        <TextInput
            {...rest}
            allowDisabledFocus={allowDisabledFocus}
            ariaLabel={ariaLabel}
            autoFocus={autoFocus}
            classNames={classNames}
            clearButtonAriaLabel={clearButtonAriaLabel}
            disabled={disabled}
            htmlType="search"
            iconProps={iconProps}
            iconButtonProps={iconButtonProps}
            inputWidth={inputWidth}
            labelProps={labelProps}
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
