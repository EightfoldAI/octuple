import React, { FC } from 'react';
import escapeStringRegexp from 'escape-string-regexp';
import { ButtonSize, DefaultButton } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon/index';
import { TextInputProps, TextInputShape, TextInputTheme } from '../index';
import { useDebounce } from '../../../shared/hooks';
import { classNames } from '../../../shared/utilities';

import styles from '../input.module.scss';

export const TextInput: FC<TextInputProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    autoFocus = false,
    className,
    disabled = false,
    htmlType = 'text',
    iconProps,
    iconButtonProps,
    id,
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
    value,
    waitInterval = 10,
}) => {
    const iconClassNames: string = classNames([
        styles.iconWrapper,
        styles.leftIcon,
    ]);

    const iconButtonClassNames: string = classNames([
        styles.iconButton,
        styles.leftIcon,
    ]);

    const labelIconButtonWrapperClassNames: string = classNames([
        {
            [styles.withIcon]:
                !!iconProps &&
                !!iconProps.path &&
                shape === TextInputShape.Rectangle,
        },
    ]);

    const textInputClassNames: string = classNames([
        className,
        {
            [styles.withIcon]:
                !!iconProps &&
                !!iconProps.path &&
                shape === TextInputShape.Rectangle,
        },
        {
            [styles.withImageIcon]:
                !!iconProps &&
                !!iconProps.imageSrc &&
                shape === TextInputShape.Rectangle,
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
                !!iconProps &&
                !!iconProps.path &&
                shape === TextInputShape.Pill,
        },
        {
            [styles.pillShapeWithImageIcon]:
                !!iconProps &&
                !!iconProps.imageSrc &&
                shape === TextInputShape.Pill,
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
    ]);

    const handleChange = useDebounce<React.ChangeEvent<HTMLInputElement>>(
        (_event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            triggerChange(_event),
        waitInterval
    );

    const triggerChange = (
        _event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        if (!numbersOnly) {
            _event.target.value = escapeStringRegexp(
                _event.target.value.toLocaleString()
            );
        }
        onChange;
    };

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.fieldLabelWrapper}>
                {label && (
                    <label className={styles.fieldLabel} htmlFor={name}>
                        {label}
                    </label>
                )}
                {labelIconButtonProps && (
                    <span className={styles.fieldLabelIconButton}>
                        <DefaultButton
                            allowDisabledFocus={
                                labelIconButtonProps.allowDisabledFocus
                            }
                            ariaLabel={labelIconButtonProps.ariaLabel}
                            disabled={labelIconButtonProps.disabled}
                            icon={IconName.mdiInformation}
                            iconColor={labelIconButtonProps.iconColor}
                            onClick={labelIconButtonProps.onClick}
                            size={ButtonSize.Small}
                        />
                    </span>
                )}
            </div>
            <input
                aria-label={ariaLabel}
                autoFocus={autoFocus}
                className={textInputClassNames}
                disabled={disabled}
                id={id}
                maxLength={maxlength}
                minLength={minlength}
                name={name}
                onChange={handleChange}
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
        </div>
    );
};
