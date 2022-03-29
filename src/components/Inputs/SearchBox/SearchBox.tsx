import React, { FC } from 'react';
import { Icon, IconName, IconSize } from '../../Icon';
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
    label,
    onBlur,
    onChange,
    // onClear,
    onFocus,
    onKeyDown,
    placeholder = 'Search',
    shape = TextInputShape.Rectangle,
    value,
    waitInterval = 500,
}) => {
    const iconWrapperClassNames: string = classNames([
        styles.iconStyle,
        styles.leftIcon,
    ]);

    return (
        <form role="search">
            <TextInput
                allowDisabledFocus={allowDisabledFocus}
                className={className}
                label={label}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                shape={shape}
                type="search"
                value={value}
                waitInterval={waitInterval}
            />
            <div className={iconWrapperClassNames}>
                <Icon path={IconName.mdiMagnify} size={IconSize.Medium} />
            </div>
        </form>
    );
};
