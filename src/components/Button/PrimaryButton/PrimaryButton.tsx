import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize } from '../index';

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
    primaryColor,
    text,
    theme,
    size = ButtonSize.Medium,
    style,
}) => {
    const buttonClassNames: string = classNames([
        className,
        styles.button,
        size === ButtonSize.Large ? styles['button-padding-1'] : '',
        size === ButtonSize.Medium ? styles['button-padding-2'] : '',
        size === ButtonSize.Small ? styles['button-padding-3'] : '',
        styles['button-primary'],
        disruptive ? styles['button-primary-disruptive'] : '',
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
            size={size}
            style={style}
        />
    );
};
