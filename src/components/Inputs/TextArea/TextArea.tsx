import React, { FC } from 'react';
import { TextAreaProps, TextInputTheme } from '../index';
import { classNames } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const TextArea: FC<TextAreaProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    // clearInputTabIndex,
    disabled = false,
    enableExpand = false,
    helpText,
    id,
    label,
    name,
    onBlur,
    onChange,
    // onClear,
    onFocus,
    onKeyDown,
    placeholder,
    required = false,
    textAreaCols = 50,
    textAreaRows = 5,
    value,
    waitInterval = 10,
}) => {
    const textAreaClassNames: string = classNames([className]);

    const handleBlur = (
        _event?: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        onBlur;
    };

    const handleChange = (
        _event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        setTimeout(() => triggerChange(_event), waitInterval);
    };

    const handleFocus = (
        _event?: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        onFocus;
    };

    const handleKeyDown = (
        _event?: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (allowDisabledFocus) {
            return;
        }
        onKeyDown;
    };

    const triggerChange = (
        _event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        onChange;
    };

    return (
        <>
            {label && (
                <label className={styles.fieldLabel} htmlFor={name}>
                    {label}
                </label>
            )}
            <textarea
                aria-disabled={allowDisabledFocus}
                aria-label={ariaLabel}
                autoFocus={autoFocus}
                className={textAreaClassNames}
                cols={textAreaCols}
                disabled={disabled}
                id={id}
                name={name}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                required={required}
                rows={textAreaRows}
                tabIndex={0}
                value={value}
            />
            {helpText && (
                <div className={styles.fieldSupportText}>{helpText}</div>
            )}
            {enableExpand && id && (
                <div className="expand-textarea">
                    <div
                        className="expand-textarea-icon-container"
                        onClick={() => {
                            const textAreaElement = document.getElementById(id);
                            const minHeight = parseInt(
                                textAreaElement.style.minHeight,
                                10
                            );
                            const scrollHeight = textAreaElement.scrollHeight;
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
        </>
    );
};
