import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize } from '../index';

import '../../../styles/main.scss';

export const DefaultButton: FC<ButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
    icon,
    onClick,
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
        'button-default'
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
            text={text}
            size={size}
            style={style}
        />
    );
};
