import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize, ButtonMode } from '../index';

import styles from '../button.module.scss';

export const PrimaryButton: FC<ButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
    disruptive = false,
    icon,
    onClick,
    onReset,
    onSubmit,
    primaryColor,
    size = ButtonSize.Flex,
    style,
    text,
    theme,
    type,
}) => {
    const buttonClassNames: string = classNames([
        className,
        styles.button,
        styles.buttonPrimary,
        disruptive ? styles.buttonPrimaryDisruptive : '',
    ]);

    return (
        <BaseButton
            allowDisabledFocus={allowDisabledFocus}
            ariaLabel={ariaLabel}
            checked={checked}
            className={buttonClassNames}
            disabled={disabled}
            disruptive={disruptive}
            icon={icon}
            mode={ButtonMode.Primary}
            onClick={onClick}
            onReset={onReset}
            onSubmit={onSubmit}
            primaryColor={primaryColor}
            size={size}
            style={style}
            text={text}
            theme={theme}
            type={type}
        />
    );
};
