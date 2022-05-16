import React, { FC, useState } from 'react';
import { ButtonSize, DefaultButton } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon';
import { Label } from '../../Label';
import {
    TextInputWidth,
    TextInputProps,
    TextInputShape,
    TextInputTheme,
} from '../index';
import { useDebounce } from '../../../hooks/useDebounce';
import {
    ArgumentArray,
    mergeClasses,
    uniqueId,
} from '../../../shared/utilities';

import styles from '../input.module.scss';
import { Atom } from '../../Atom';

export const TextInput: FC<TextInputProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    classNames,
    clearButtonAriaLabel,
    disabled = false,
    htmlType = 'text',
    iconProps,
    iconButtonProps,
    id,
    inputWidth = TextInputWidth.fitContent,
    labelProps,
    maxlength,
    minlength,
    name,
    numbersOnly = false,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    required = false,
    shape = TextInputShape.Rectangle,
    style,
    theme = TextInputTheme.light,
    value,
    waitInterval = 10,
    ...rest
}) => {
    const [clearButtonShown, setClearButtonShown] = useState<boolean>(false);
    const [inputId] = useState<string>(uniqueId(id || 'input-'));
    const inputField: HTMLElement = document.getElementById(inputId);

    const iconClasses: ArgumentArray = [styles.iconWrapper, styles.leftIcon];

    const iconButtonClassNames: string = mergeClasses([
        styles.iconButton,
        styles.leftIcon,
    ]);

    const textInputClasses: ArgumentArray = [
        classNames,
        {
            [styles.withIcon]:
                !!iconProps?.path && shape === TextInputShape.Rectangle,
        },
        {
            [styles.withImageIcon]:
                !!iconProps?.imageSrc && shape === TextInputShape.Rectangle,
        },
        {
            [styles.withIconButton]:
                !!iconButtonProps && shape === TextInputShape.Rectangle,
        },
        {
            [styles.withIconAndIconButton]:
                !!iconProps &&
                !!iconButtonProps &&
                shape === TextInputShape.Rectangle,
        },
        { [styles.pillShape]: shape === TextInputShape.Pill },
        {
            [styles.pillShapeWithIcon]:
                !!iconProps?.path && shape === TextInputShape.Pill,
        },
        {
            [styles.pillShapeWithImageIcon]:
                !!iconProps?.imageSrc && shape === TextInputShape.Pill,
        },
        {
            [styles.pillShapeWithIconButton]:
                !!iconButtonProps && shape === TextInputShape.Pill,
        },
        {
            [styles.pillShapeWithIconAndIconButton]:
                !!iconProps &&
                !!iconButtonProps &&
                shape === TextInputShape.Pill,
        },
        {
            [styles.dark]: theme === TextInputTheme.dark,
        },
        {
            [styles.inputStretch]: inputWidth === TextInputWidth.fill,
        },
    ];

    const textInputWrapperClasses: ArgumentArray = [
        styles.inputWrapper,
        {
            [styles.inputStretch]: inputWidth === TextInputWidth.fill,
        },
    ];

    const handleOnClear = (_event: React.MouseEvent) => {
        _event.preventDefault();
        _event.stopPropagation();
        if (!!inputField) {
            (inputField as HTMLInputElement).value = '';
        }
        setClearButtonShown(false);
    };

    const handleChange = useDebounce<React.ChangeEvent<HTMLInputElement>>(
        (
            _event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
            onChange;
        },
        waitInterval
    );

    return (
        <Atom of="div" classes={textInputWrapperClasses}>
            {labelProps && <Label {...labelProps} />}
            <Atom<
                React.DetailedHTMLProps<
                    React.InputHTMLAttributes<HTMLInputElement>,
                    HTMLInputElement
                >
            >
                of="input"
                classes={textInputClasses}
                {...rest}
                aria-label={ariaLabel}
                autoFocus={autoFocus}
                disabled={disabled}
                id={inputId}
                maxLength={maxlength}
                minLength={minlength}
                name={name}
                onChange={
                    !allowDisabledFocus
                        ? (
                              _event?: React.ChangeEvent<
                                  HTMLTextAreaElement | HTMLInputElement
                              >
                          ) => {
                              handleChange;
                              if (
                                  _event.target.value.length === 0 &&
                                  clearButtonShown
                              ) {
                                  setClearButtonShown(false);
                              } else if (!clearButtonShown) {
                                  setClearButtonShown(true);
                              }
                          }
                        : null
                }
                onBlur={!allowDisabledFocus ? onBlur : null}
                onFocus={!allowDisabledFocus ? onFocus : null}
                onKeyDown={!allowDisabledFocus ? onKeyDown : null}
                placeholder={placeholder}
                required={required}
                role="textbox"
                style={style}
                tabIndex={0}
                type={numbersOnly ? 'number' : htmlType}
                value={value}
            />
            {iconProps && (
                <Atom of="div" classes={iconClasses}>
                    {iconProps.path && !iconProps.imageSrc && (
                        <Icon
                            {...iconProps}
                            path={iconProps.path}
                            size={IconSize.Medium}
                        />
                    )}
                    {iconProps.imageSrc && !iconProps.path && (
                        <img
                            aria-hidden={iconProps.ariaHidden}
                            alt={iconProps.alt}
                            id={iconProps.id}
                            src={iconProps.imageSrc}
                        />
                    )}
                </Atom>
            )}
            {iconButtonProps && (
                <DefaultButton
                    allowDisabledFocus={iconButtonProps.allowDisabledFocus}
                    ariaLabel={iconButtonProps.ariaLabel}
                    checked={iconButtonProps.checked}
                    classNames={iconButtonClassNames}
                    disabled={iconButtonProps.disabled}
                    iconProps={{ path: iconButtonProps.iconProps.path }}
                    id={iconButtonProps.id}
                    onClick={iconButtonProps.onClick}
                    size={ButtonSize.Medium}
                    htmlType={iconButtonProps.htmlType}
                />
            )}
            {clearButtonShown && (
                <DefaultButton
                    allowDisabledFocus={allowDisabledFocus}
                    ariaLabel={clearButtonAriaLabel}
                    classNames={styles.clearIconButton}
                    disabled={disabled}
                    iconProps={{ path: IconName.mdiClose }}
                    onClick={!allowDisabledFocus ? handleOnClear : null}
                    size={ButtonSize.Small}
                />
            )}
        </Atom>
    );
};
