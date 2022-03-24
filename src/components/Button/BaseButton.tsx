import React, { FC, useEffect, useState } from 'react';
import { classNames, invertForegroundColor } from '../../shared/utilities';
import { CSSVariables } from '../../shared/variables';
import { ButtonProps, ButtonSize, ButtonTheme, ButtonType } from './index';
import { Icon, IconName, IconSize } from '../Icon/index';

import styles from './button.module.scss';

export interface InternalButtonProps extends ButtonProps {
    /**
     * Determines the button type.
     */
    type?: ButtonType;
}

export const BaseButton: FC<InternalButtonProps> = ({
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
    type,
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
        size === ButtonSize.Flex && largeScreen ? styles.buttonPadding3 : '',
        size === ButtonSize.Flex && mediumScreen ? styles.buttonPadding2 : '',
        size === ButtonSize.Flex && smallScreen ? styles.buttonPadding2 : '',
        size === ButtonSize.Flex && xSmallScreen ? styles.buttonPadding1 : '',
        size === ButtonSize.Large ? styles.buttonPadding1 : '',
        size === ButtonSize.Medium ? styles.buttonPadding2 : '',
        size === ButtonSize.Small ? styles.buttonPadding3 : '',
        { [styles.dark]: theme === ButtonTheme.dark },
        allowDisabledFocus || disabled ? styles.disabled : '',
    ]);
    const buttonSpacerClassNames: string = classNames([
        styles.spacer,
        size === ButtonSize.Flex && largeScreen ? styles.buttonSpacer3 : '',
        size === ButtonSize.Flex && mediumScreen ? styles.buttonSpacer2 : '',
        size === ButtonSize.Flex && smallScreen ? styles.buttonSpacer2 : '',
        size === ButtonSize.Flex && xSmallScreen ? styles.buttonSpacer1 : '',
        size === ButtonSize.Large ? styles.buttonSpacer1 : '',
        size === ButtonSize.Medium ? styles.buttonSpacer2 : '',
        size === ButtonSize.Small ? styles.buttonSpacer3 : '',
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

    const buttonStyles = (): CSSVariables => {
        let buttonStyle: CSSVariables;
        if (primaryColor && !disruptive) {
            if (type === ButtonType.Default) {
                buttonStyle = {
                    ...style,
                    // TODO: Assign primaryColor to css variables when available
                    '--css-var-example': primaryColor,
                };
            } else if (type === ButtonType.Primary) {
                buttonStyle = {
                    ...style,
                    // TODO: Assign primaryColor to css variables when available
                    '--css-var-example': primaryColor,
                };
            } else {
                buttonStyle = {
                    ...style,
                    // TODO: Assign primaryColor to css variables when available
                    '--css-var-example': primaryColor,
                };
            }
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
                    color:
                        primaryColor && type === ButtonType.Primary
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
                <span className={styles.flexStructureHorizontal}>
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
