import React, { FC } from 'react';
import { ButtonSize, DefaultButton } from '../../Button';
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
    disabled,
    label,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onKeyDown,
    placeholder = 'Search',
    shape = TextInputShape.Rectangle,
    value,
    waitInterval = 500,
}) => {
    const iconButtonClassNames: string = classNames([
        styles.iconButtonStyle,
        styles.leftIcon,
    ]);

    return (
        <form className={styles.formWrapper} role="search">
            <TextInput
                allowDisabledFocus={allowDisabledFocus}
                className={className}
                disabled={disabled}
                label={label}
                onBlur={onBlur}
                onChange={onChange}
                onClear={onClear}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                shape={shape}
                type="search"
                value={value}
                waitInterval={waitInterval}
            />
            <DefaultButton
                className={iconButtonClassNames}
                disabled={disabled}
                icon={IconName.mdiMagnify}
                size={ButtonSize.Medium}
                type="submit"
            />
        </form>
    );
};
