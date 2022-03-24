import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize } from '../index';

import styles from '../button.module.scss';

export const DefaultButton: FC<ButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
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
        styles['button-default'],
    ]);

    return (
        <BaseButton
            allowDisabledFocus={allowDisabledFocus}
            ariaLabel={ariaLabel}
            checked={checked}
            className={buttonClassNames}
            disabled={disabled}
            icon={icon}
            onClick={onClick}
            primaryColor={primaryColor}
            text={text}
            theme={theme}
            size={size}
            style={style}
        />
    );
};
