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
    htmlType,
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
        { [styles.buttonSecondaryDisruptive]: disruptive },
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
            type={ButtonType.Secondary}
        />
    );
};
