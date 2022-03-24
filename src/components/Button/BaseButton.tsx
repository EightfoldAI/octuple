import React, { FC } from 'react';
import { classNames, invertForegroundColor } from '../../shared/utilities';
import { ButtonProps, ButtonSize, ButtonTheme } from './index';
import { Icon, IconName, IconSize } from '../Icon/index';

import styles from './button.module.scss';

export const BaseButton: FC<ButtonProps> = ({
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
    size = ButtonSize.Medium,
    style,
}) => {
    const buttonBaseClassNames: string = classNames([
        className,
        { [styles.dark]: theme === ButtonTheme.dark },
        allowDisabledFocus || disabled ? styles.disabled : '',
    ]);
    const buttonSpacerClassNames: string = classNames([
        styles.spacer,
        size === ButtonSize.Large ? styles['button-spacer-1'] : '',
        size === ButtonSize.Medium ? styles['button-spacer-2'] : '',
        size === ButtonSize.Small ? styles['button-spacer-3'] : '',
    ]);
    const buttonTextClassNames: string = classNames([
        size === ButtonSize.Large ? styles.button1 : '',
        size === ButtonSize.Medium ? styles.button2 : '',
        size === ButtonSize.Small ? styles.button3 : '',
    ]);

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
    };

    const getButtonIcon = (icon: IconName): JSX.Element => {
        return <Icon path={icon} size={getButtonIconSize()} />;
    };

    const buttonStyles = (): React.CSSProperties => {
        let buttonStyle: React.CSSProperties;
        if (primaryColor) {
            buttonStyle = {
                ...style,
                background: primaryColor,
                borderColor: primaryColor,
                // TODO: figure out how to do :hover and :active
            };
        } else {
            buttonStyle = style;
        }
        return buttonStyle;
    };

    const getButtonText = (
        buttonTextClassNames: string,
        text: string
    ): JSX.Element => {
        return (
            <span
                className={buttonTextClassNames}
                style={{
                    color: primaryColor
                        ? invertForegroundColor(primaryColor)
                        : 'inherit',
                }}
            >
                {text}
            </span>
        );
    };

    return (
        <button
            aria-disabled={allowDisabledFocus}
            aria-label={ariaLabel}
            defaultChecked={checked}
            disabled={disabled}
            className={buttonBaseClassNames}
            onClick={!allowDisabledFocus ? onClick : null}
            style={buttonStyles()}
        >
            {iconPropsExist && !textPropsExist && getButtonIcon(icon)}
            {iconPropsExist && textPropsExist && (
                <span className={styles['flex-structure-horizontal']}>
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
