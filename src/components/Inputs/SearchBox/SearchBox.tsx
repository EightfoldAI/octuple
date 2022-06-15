import React, { FC, Ref } from 'react';
import { IconName } from '../../Icon';
import {
    TextInputWidth,
    SearchBoxProps,
    TextInput,
    TextInputShape,
    TextInputTheme,
} from '../index';

export const SearchBox: FC<SearchBoxProps> = React.forwardRef(
    (
        {
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
            placeholder = 'Search',
            shape = TextInputShape.Pill,
            style,
            theme = TextInputTheme.light,
            value,
            waitInterval = 500,
            ...rest
        },
        ref: Ref<HTMLInputElement>
    ) => {
        return (
            <form role="search">
                <TextInput
                    {...rest}
                    ref={ref}
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
    }
);
