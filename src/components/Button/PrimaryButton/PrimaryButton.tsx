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
    iconColor,
    onClick,
    size = ButtonSize.Flex,
    style,
    text,
    theme,
    toggle,
}) => {
    const buttonClassNames: string = classNames([
        className,
        styles.button,
        styles.buttonPrimary,
        { [styles.buttonPrimaryDisruptive]: disruptive },
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
            iconColor={iconColor}
            onClick={onClick}
            size={size}
            style={style}
            text={text}
            theme={theme}
            type={ButtonType.Primary}
            toggle={toggle}
        />
    );
};
