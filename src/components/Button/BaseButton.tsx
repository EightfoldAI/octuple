import React, { FC, useEffect, useState } from 'react';
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
    size = ButtonSize.Flex,
    style,
}) => {
    const [xSmallScreen, setXSmallScreen] = useState(
        window.matchMedia('(max-width: 599px)').matches
    );
    const [smallScreen, setSmallScreen] = useState(
        window.matchMedia('(min-width: 600px)').matches
    );
    const [mediumScreen, setMediumScreen] = useState(
        window.matchMedia('(min-width: 900px)').matches
    );
    const [largeScreen, setLargeScreen] = useState(
        window.matchMedia('(min-width: 1200px)').matches
    );

    useEffect(() => {
        window
            .matchMedia('(max-width: 599px)')
            .addEventListener('change', (e) => setXSmallScreen(e.matches));
        window
            .matchMedia('(min-width: 600px)')
            .addEventListener('change', (e) => setSmallScreen(e.matches));
        window
            .matchMedia('(min-width: 900px)')
            .addEventListener('change', (e) => setMediumScreen(e.matches));
        window
            .matchMedia('(min-width: 1200px)')
            .addEventListener('change', (e) => setLargeScreen(e.matches));
    }, []);

    const buttonBaseClassNames: string = classNames([
        className,
        size === ButtonSize.Flex && largeScreen
            ? styles['button-padding-3']
            : '',
        size === ButtonSize.Flex && mediumScreen
            ? styles['button-padding-2']
            : '',
        size === ButtonSize.Flex && smallScreen
            ? styles['button-padding-2']
            : '',
        size === ButtonSize.Flex && xSmallScreen
            ? styles['button-padding-1']
            : '',
        size === ButtonSize.Large ? styles['button-padding-1'] : '',
        size === ButtonSize.Medium ? styles['button-padding-2'] : '',
        size === ButtonSize.Small ? styles['button-padding-3'] : '',
        { [styles.dark]: theme === ButtonTheme.dark },
        allowDisabledFocus || disabled ? styles.disabled : '',
    ]);
    const buttonSpacerClassNames: string = classNames([
        styles.spacer,
        size === ButtonSize.Flex && largeScreen
            ? styles['button-spacer-3']
            : '',
        size === ButtonSize.Flex && mediumScreen
            ? styles['button-spacer-2']
            : '',
        size === ButtonSize.Flex && smallScreen
            ? styles['button-spacer-2']
            : '',
        size === ButtonSize.Flex && xSmallScreen
            ? styles['button-spacer-1']
            : '',
        size === ButtonSize.Large ? styles['button-spacer-1'] : '',
        size === ButtonSize.Medium ? styles['button-spacer-2'] : '',
        size === ButtonSize.Small ? styles['button-spacer-3'] : '',
    ]);
    const buttonTextClassNames: string = classNames([
        size === ButtonSize.Flex && largeScreen ? styles.button3 : '',
        size === ButtonSize.Flex && mediumScreen ? styles.button2 : '',
        size === ButtonSize.Flex && smallScreen ? styles.button2 : '',
        size === ButtonSize.Flex && xSmallScreen ? styles.button1 : '',
        size === ButtonSize.Large ? styles.button1 : '',
        size === ButtonSize.Medium ? styles.button2 : '',
        size === ButtonSize.Small ? styles.button3 : '',
    ]);

    const iconPropsExist: boolean = icon && icon !== null;
    const textPropsExist: boolean = text && text !== '';

    const getButtonIconSize = (): IconSize => {
        let iconSize: IconSize;
        if (size === ButtonSize.Flex) {
            if (smallScreen) {
                iconSize = IconSize.Medium;
            } else if (mediumScreen) {
                iconSize = IconSize.Medium;
            } else if (largeScreen) {
                iconSize = IconSize.Small;
            } else {
                iconSize = IconSize.Large;
            }
        } else {
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
