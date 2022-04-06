import React, { FC, useState } from 'react';
import { ButtonSize, DefaultButton } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon/index';
import {
    InputWidth,
    TextInputProps,
    TextInputShape,
    TextInputTheme,
} from '../index';
import { Tooltip } from '../../Tooltip';
import { useDebounce } from '../../../hooks/useDebounce';
import { classNames, uniqueId } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const TextInput: FC<TextInputProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    clearButtonAriaLabel,
    disabled = false,
    htmlType = 'text',
    iconProps,
    iconButtonProps,
    id,
    inputWidth = InputWidth.fitContent,
    label,
    labelIconButtonProps,
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
}) => {
    const [clearButtonShown, setClearButtonShown] = useState<boolean>(false);
    const [inputId] = useState<string>(uniqueId(id || 'input-'));
    const inputField: HTMLElement = document.getElementById(inputId);

    const iconClassNames: string = classNames([
        styles.iconWrapper,
        styles.leftIcon,
    ]);

    const iconButtonClassNames: string = classNames([
        styles.iconButton,
        styles.leftIcon,
    ]);

    const textInputClassNames: string = classNames([
        className,
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
            [styles.inputStretch]: inputWidth === InputWidth.fill,
        },
    ]);

    const textInputWrapperClassNames: string = classNames([
        styles.inputWrapper,
        {
            [styles.inputStretch]: inputWidth === InputWidth.fill,
        },
    ]);

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
        <div className={textInputWrapperClassNames}>
            <div className={styles.fieldLabel}>
                {label && (
                    <label className={styles.textStyle} htmlFor={name}>
                        {label}
                    </label>
                )}
                {labelIconButtonProps?.show && (
                    <span className={styles.fieldLabelIconButton}>
                        <Tooltip
                            content={labelIconButtonProps.toolTipContent}
                            placement={
                                labelIconButtonProps.toolTipPlacement || 'top'
                            }
                            positionStrategy={
                                labelIconButtonProps.toolTipPositionStrategy
                            }
                            theme={labelIconButtonProps.toolTipTheme}
                        >
                            <DefaultButton
                                allowDisabledFocus={
                                    labelIconButtonProps.allowDisabledFocus
                                }
                                ariaLabel={labelIconButtonProps.ariaLabel}
                                className={styles.labelIconButton}
                                disabled={labelIconButtonProps.disabled}
                                icon={
                                    labelIconButtonProps.icon ||
                                    IconName.mdiInformation
                                }
                                iconColor={labelIconButtonProps.iconColor}
                                onClick={
                                    !labelIconButtonProps.allowDisabledFocus
                                        ? labelIconButtonProps.onClick
                                        : null
                                }
                                size={ButtonSize.Small}
                            />
                        </Tooltip>
                    </span>
                )}
            </div>
            <input
                aria-label={ariaLabel}
                autoFocus={autoFocus}
                className={textInputClassNames}
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
                <div className={iconClassNames}>
                    {iconProps.path && !iconProps.imageSrc && (
                        <Icon
                            ariaHidden={iconProps.ariaHidden}
                            color={iconProps.color}
                            description={iconProps.description}
                            horizontal={iconProps.horizontal}
                            id={iconProps.id}
                            path={iconProps.path}
                            rotate={iconProps.rotate}
                            title={iconProps.title}
                            vertical={iconProps.vertical}
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
                </div>
            )}
            {iconButtonProps && (
                <DefaultButton
                    allowDisabledFocus={iconButtonProps.allowDisabledFocus}
                    ariaLabel={iconButtonProps.ariaLabel}
                    checked={iconButtonProps.checked}
                    className={iconButtonClassNames}
                    disabled={iconButtonProps.disabled}
                    icon={iconButtonProps.icon}
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
                    className={styles.clearIconButton}
                    disabled={disabled}
                    icon={IconName.mdiClose}
                    onClick={!allowDisabledFocus ? handleOnClear : null}
                    size={ButtonSize.Small}
                />
            )}
        </div>
    );
};
