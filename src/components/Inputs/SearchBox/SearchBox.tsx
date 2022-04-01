import React, { FC } from 'react';
import { IconName } from '../../Icon';
import {
    SearchBoxProps,
    TextInput,
    TextInputShape,
    TextInputTheme,
} from '../index';
import { classNames } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const SearchBox: FC<SearchBoxProps> = ({
    allowDisabledFocus = false,
    className,
    disabled = false,
    iconProps,
    iconButtonProps = {
        allowDisabledFocus: false,
        disabled: false,
        icon: IconName.mdiMagnify,
    },
    label,
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
    value,
    waitInterval = 500,
}) => (
    <form role="search">
        <TextInput
            allowDisabledFocus={allowDisabledFocus}
            className={className}
            disabled={disabled}
            iconProps={iconProps}
            iconButtonProps={iconButtonProps}
            label={label}
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
            htmlType="search"
            value={value}
            waitInterval={waitInterval}
        />
    </form>
);
