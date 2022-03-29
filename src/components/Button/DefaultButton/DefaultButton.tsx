import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize, ButtonMode } from '../index';

import styles from '../button.module.scss';

export const DefaultButton: FC<ButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
    icon,
    onClick,
    onReset,
    onSubmit,
    primaryColor,
    text,
    theme,
    size = ButtonSize.Flex,
    style,
    type,
}) => {
    const buttonClassNames: string = classNames([
        className,
        styles.button,
        styles.buttonDefault,
    ]);

    return (
        <BaseButton
            allowDisabledFocus={allowDisabledFocus}
            ariaLabel={ariaLabel}
            checked={checked}
            className={buttonClassNames}
            disabled={disabled}
            icon={icon}
            mode={ButtonMode.Default}
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
