import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize } from '../index';

import '../../../styles/main.scss';

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
    size = ButtonSize.Medium,
    style,
}) => {
    const buttonClassNames: string = classNames([
        className,
        'button',
        size === ButtonSize.Large ? 'button-padding-1' : '',
        size === ButtonSize.Medium ? 'button-padding-2' : '',
        size === ButtonSize.Small ? 'button-padding-3' : '',
        'button-secondary',
        disruptive ? 'button-secondary-disruptive' : '',
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
            size={size}
            style={style}
        />
    );
};
