import React, { FC, useEffect, useRef, useState } from 'react';
import { Icon, IconName, IconSize } from '../Icon';
import { SearchBoxProps, SearchBoxTheme } from './SearchBox.types';
import { TextInput } from '../TextInput';
import { classNames } from '../../shared/utilities';

import styles from './searchbox.module.scss';

export const SearchBox: FC<SearchBoxProps> = ({
    allowDisabledFocus = false,
    onChange,
    placeholder = 'Search',
    value,
}) => {
    const [inputValue, setInputValue] = useState<string | number>(value);

    const handleChange = (
        event?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        setInputValue(event.target.value);
        onChange(event);
    };

    return (
        <div className="search-wrapper">
            <form role="search">
                <div className="input-group">
                    <TextInput
                        className="form-control input-lg search-input-v2"
                        onChange={handleChange}
                        placeholder={placeholder}
                        type="text"
                        value={inputValue}
                    />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-lg btn-primary search-input-v2-button"
                            type="submit"
                        >
                            <Icon
                                path={IconName.mdiMagnify}
                                size={IconSize.Small}
                            />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
