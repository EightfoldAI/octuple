import React, { FC, Ref } from 'react';
import { IconName } from '../../Icon';
import {
    TextInputIconAlign,
    TextInputWidth,
    SearchBoxProps,
    TextInput,
    TextInputShape,
    TextInputSize,
    TextInputTheme,
} from '../index';

export const SearchBox: FC<SearchBoxProps> = React.forwardRef(
    (
        {
            alignIcon = TextInputIconAlign.Left,
            allowDisabledFocus = false,
            ariaLabel,
            autoFocus = false,
            classNames,
            clearable = true,
            clearButtonAriaLabel,
            disabled = false,
            iconProps,
            iconButtonProps = {
                allowDisabledFocus: false,
                disabled: false,
                iconProps: { path: IconName.mdiMagnify },
            },
            inline = false,
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
            shape = TextInputShape.Rectangle,
            size = TextInputSize.Flex,
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
                    alignIcon={alignIcon}
                    clearable={clearable}
                    allowDisabledFocus={allowDisabledFocus}
                    ariaLabel={ariaLabel}
                    autoFocus={autoFocus}
                    classNames={classNames}
                    clearButtonAriaLabel={clearButtonAriaLabel}
                    disabled={disabled}
                    htmlType="search"
                    iconProps={iconProps}
                    iconButtonProps={iconButtonProps}
                    inline={inline}
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
                    size={size}
                    style={style}
                    theme={theme}
                    value={value}
                    waitInterval={waitInterval}
                />
            </form>
        );
    }
);
