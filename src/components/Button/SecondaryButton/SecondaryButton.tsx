import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize, ButtonType } from '../index';

import styles from '../button.module.scss';

export const SecondaryButton: FC<ButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
    disruptive = false,
    icon,
    onClick,
    primaryColor,
    text,
    theme,
    size = ButtonSize.Flex,
    style,
}) => {
    const buttonClassNames: string = classNames([
        className,
        styles.button,
        styles.buttonSecondary,
        disruptive ? styles.buttonSecondaryDisruptive : '',
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
            onClick={onClick}
            primaryColor={primaryColor}
            text={text}
            theme={theme}
            type={ButtonType.Secondary}
            size={size}
            style={style}
        />
    );
};
