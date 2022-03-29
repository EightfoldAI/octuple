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
    enableExpand = false,
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
    textarea = false,
    textAreaCols = 50,
    textAreaRows = 5,
    type = 'text',
    value,
    waitInterval = 10,
}) => {
    const textAreaClassNames: string = classNames([className]);
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

    if (textarea) {
        return (
            <>
                <label className={styles.fieldLabel} htmlFor={name}>
                    {label}
                </label>
                <textarea
                    aria-disabled={allowDisabledFocus}
                    autoFocus={autoFocus}
                    id={id}
                    className={textAreaClassNames}
                    name={name}
                    value={value}
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
            </>
        );
    }
    return (
        <>
            <input
                role="textbox"
                aria-label={ariaLabel}
                type={numbersOnly ? 'number' : type}
                id={id}
                className={textInputClassNames}
                name={name}
                value={value}
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
        </>
    );
};
