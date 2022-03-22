import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize } from '../index';

import '../../../styles/main.scss';

export const DefaultButton: FC<ButtonProps> = ({
    allowDisabledFocus,
    ariaLabel,
    checked,
    className,
    disabled,
    icon,
    onClick,
    text,
    size,
    style,
}) => {
    const buttonClassNames: string = classNames({
        button: true,
        'button1 button-padding-1': size === ButtonSize.Large,
        'button2 button-padding-2': size === ButtonSize.Medium,
        'button3 button-padding-3': size === ButtonSize.Small,
        'button-default': true
    });

    return (
        <BaseButton
            allowDisabledFocus={allowDisabledFocus}
            ariaLabel={ariaLabel}
            checked={checked}
            className={className + ' ' + buttonClassNames}
            disabled={disabled}
            icon={icon}
            onClick={onClick}
            text={text}
            size={size}
            style={style}
        />
    );
};
