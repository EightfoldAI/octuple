import React, { FC } from 'react';
import { classNames } from '../../shared/utilities';
import { ButtonProps, ButtonSize } from './index';
import { Icon, IconName, IconSize } from '../Icon/index';

import '../../styles/main.scss';

export const BaseButton: FC<ButtonProps> = ({
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
    const buttonBaseClassNames: string = classNames({
        disabled: allowDisabledFocus || disabled
    });
    const buttonSpacerClassNames: string = classNames({
        spacer: true,
        'button-spacer-1': size === ButtonSize.Large,
        'button-spacer-2': size === ButtonSize.Medium,
        'button-spacer-3': size === ButtonSize.Small,
    });
    const buttonTextClassNames: string = classNames({
        button1: size === ButtonSize.Large,
        button2: size === ButtonSize.Medium,
        button3: size === ButtonSize.Small,
    });

    const iconPropsExist: boolean = icon && icon !== null;
    const textPropsExist: boolean = text && text !== '';

    const getButtonIconSize = (): IconSize => {
        let iconSize: IconSize;
        switch (size) {
            case ButtonSize.Large:
                iconSize = IconSize.Large;
            case ButtonSize.Medium:
                iconSize = IconSize.Medium;
            case ButtonSize.Small:
                iconSize = IconSize.Small;
            default:
                iconSize = IconSize.Large;
        }
        return iconSize;
    }

    const getButtonIcon = (icon: IconName): JSX.Element => {
        return (
            <Icon path={icon} size={getButtonIconSize()} />
        );
    }

    const getButtonText = (
        buttonTextClassNames: string,
        text: string
    ): JSX.Element => {
        return <span className={buttonTextClassNames}>{text}</span>;
    };

    return (
        <button
            aria-disabled={allowDisabledFocus}
            aria-label={ariaLabel}
            defaultChecked={checked}
            disabled={disabled}
            className={className + ' ' + buttonBaseClassNames}
            onClick={!allowDisabledFocus ? onClick : null}
            style={style}
        >
            {iconPropsExist &&
                !textPropsExist &&
                getButtonIcon(icon)}
            {iconPropsExist && textPropsExist && (
                <span className="flex-structure-horizontal">
                    {getButtonIcon(icon)}
                    <span className={buttonSpacerClassNames}></span>
                    {getButtonText(buttonTextClassNames, text)}
                </span>
            )}
            {!iconPropsExist &&
                textPropsExist &&
                getButtonText(buttonTextClassNames, text)}
            {!iconPropsExist &&
                !textPropsExist &&
                getButtonText(buttonTextClassNames, 'Button')}
        </button>
    );
};
