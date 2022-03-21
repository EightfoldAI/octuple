import React, { FC } from 'react';
import { classNames } from '../../../shared/utilities';
import { ButtonSize, ButtonProps } from '../index';
import { Icon, IconName, IconSize } from '../../Icon/index';

import '../../../styles/main.scss';

export const SecondaryButton: FC<ButtonProps> = ({
    // allowDisabledFocus,
    ariaLabel,
    checked,
    classes,
    disabled,
    disruptive,
    icon,
    onClick,
    text,
    size,
    styles,
}) => {
    const buttonClassNames: string = classNames({
        button: true,
        'button1 button-padding-1': size === ButtonSize.Large,
        'button2 button-padding-2': size === ButtonSize.Medium,
        'button3 button-padding-3': size === ButtonSize.Small,
        'button-secondary': true,
        'button-secondary-disruptive': disruptive,
        classes: classes && classes !== '' ? classes : '',
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
            aria-label={ariaLabel}
            defaultChecked={checked}
            className={buttonClassNames}
            disabled={disabled}
            onClick={onClick}
            style={styles}
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
                getButtonText(buttonTextClassNames, 'Secondary Button')}
        </button>
    );
};
