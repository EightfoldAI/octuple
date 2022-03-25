import React, { FC, useEffect, useRef, useState } from 'react';
import { Icon, IconName, IconSize } from '../Icon/index';
import { TextInputProps, TextInputTheme } from './TextInput.types';
import { classNames } from '../../shared/utilities';

import styles from './textinput.module.scss';

export const TextInput: FC<TextInputProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    clearInputTabIndex,
    disabled = false,
    enableExpand = false,
    helpText,
    id,
    name,
    numbersOnly = false,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onKeyDown,
    placeholder,
    required = false,
    textarea = false,
    textAreaCols = 50,
    textAreaRows = 5,
    type = 'text',
    value,
    waitInterval = 500,
}) => {
    const [inputValue, setInputValue] = useState<string | number>(value);

    const elementClassNames: string = classNames([className, 'form-control']);

    const handleBlur = (
        event?: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        onBlur(event);
    };

    const handleChange = (
        event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        setInputValue(event.target.value);
        onChange(event);
    };

    const handleFocus = (
        event?: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        onFocus(event);
    };

    const handleKeyDown = (
        event?: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        onKeyDown(event);
    };

    if (textarea) {
        return (
            <div className={className}>
                <textarea
                    aria-disabled={allowDisabledFocus}
                    autoFocus={autoFocus}
                    id={id}
                    className={elementClassNames}
                    name={name}
                    value={inputValue}
                    placeholder={placeholder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                    rows={textAreaRows}
                    cols={textAreaCols}
                    disabled={disabled}
                    aria-label={ariaLabel}
                    tabIndex={0}
                    required={required}
                />
                {helpText && (
                    <div className="faded sm-text m-t-xs m-b-sm">
                        {helpText}
                    </div>
                )}
                {enableExpand && id && (
                    <div className="expand-textarea">
                        <div
                            className="expand-textarea-icon-container"
                            onClick={() => {
                                const textAreaElement =
                                    document.getElementById(id);
                                const minHeight = parseInt(
                                    textAreaElement.style.minHeight,
                                    10
                                );
                                const scrollHeight =
                                    textAreaElement.scrollHeight;
                                if (minHeight < scrollHeight) {
                                    textAreaElement.style.minHeight =
                                        (scrollHeight + 5).toString() + 'px';
                                } else {
                                    textAreaElement.removeAttribute('style');
                                }
                            }}
                        >
                            <i className="fas fa-sort expand-textarea-icon" />
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className={className}>
            <input
                role="textbox"
                aria-label={ariaLabel}
                type={numbersOnly ? 'number' : type}
                id={id}
                className={elementClassNames}
                name={name}
                value={inputValue}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                autoFocus={autoFocus}
                tabIndex={0}
                disabled={disabled}
                required={required}
            />
            {helpText && (
                <div className="faded sm-text m-t-xs m-b-sm">{helpText}</div>
            )}
            {/* {onClear && value &&
                <span className="faded sm-text m-t-xs m-b-sm clear-text-input">
                    <i
                        className="fal fa-times pointer"
                        onClick={onClear}
                        tab-index={clearInputTabIndex}
                        role="button"
                        aria-label={'Clear text'}
                    />
                </span>
            } */}
        </div>
    );
};
