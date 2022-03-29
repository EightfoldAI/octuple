import React, { FC } from 'react';
import { Icon, IconName, IconSize } from '../../Icon/index';
import { TextInputProps, TextInputShape, TextInputTheme } from '../index';
import { classNames } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const TextInput: FC<TextInputProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    // clearInputTabIndex,
    disabled = false,
    helpText,
    id,
    label,
    name,
    numbersOnly = false,
    onBlur,
    onChange,
    // onClear,
    onFocus,
    onKeyDown,
    placeholder,
    required = false,
    shape = TextInputShape.Rectangle,
    type = 'text',
    value,
    waitInterval = 10,
}) => {
    const textInputClassNames: string = classNames([
        className,
        { [styles.withIcon]: shape === TextInputShape.Rectangle },
        { [styles.pillShapeWithIcon]: shape === TextInputShape.Pill },
    ]);

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
            <input
                aria-label={ariaLabel}
                autoFocus={autoFocus}
                className={textInputClassNames}
                disabled={disabled}
                id={id}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                required={required}
                role="textbox"
                tabIndex={0}
                type={numbersOnly ? 'number' : type}
                value={value}
            />
            {helpText && (
                <div className={styles.fieldSupportText}>{helpText}</div>
            )}
        </>
    );
};
