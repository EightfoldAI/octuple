import React, { FC } from 'react';
import { BaseButton, ButtonProps, ButtonSize, ButtonType } from '../index';
import { classNames } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const PrimaryButton: FC<ButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
    disruptive = false,
    htmlType,
    icon,
    onClick,
    primaryColor,
    size = ButtonSize.Flex,
    style,
    text,
    theme,
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
            htmlType={htmlType}
            icon={icon}
            onClick={onClick}
            primaryColor={primaryColor}
            size={size}
            style={style}
            text={text}
            theme={theme}
            type={ButtonType.Primary}
        />
    );
};
