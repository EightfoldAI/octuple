import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { BaseButton, ButtonProps, ButtonSize } from '../index';

import * as styles from '../button.module.scss';

export const PrimaryButton: FC<ButtonProps> = ({
    allowDisabledFocus,
    ariaLabel,
    checked,
    className,
    disabled,
    disruptive,
    icon,
    onClick,
    text,
    size,
    style,
}) => {
    const buttonClassNames: string = classNames([
        className,
        styles.button,
        size === ButtonSize.Large ? 'button-padding-1' : '',
        size === ButtonSize.Medium ? 'button-padding-2' : '',
        size === ButtonSize.Small ? 'button-padding-3' : '',
        'button-primary',
        disruptive ? 'button-primary-disruptive' : ''
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
            text={text}
            size={size}
            style={style}
        />
    );
};
