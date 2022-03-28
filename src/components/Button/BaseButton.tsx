import React, { FC, useEffect, useState } from 'react';
import { classNames, invertForegroundColor } from '../../shared/utilities';
import { CSSVariables } from '../../shared/variables';
import {
    ButtonSize,
    ButtonTheme,
    ButtonType,
    InternalButtonProps,
} from './index';
import { Icon, IconName, IconSize } from '../Icon/index';
import { Breakpoints, useMatchMedia } from '../../shared/hooks';

import styles from './button.module.scss';

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
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const iconExists: boolean = !!icon;
    const textExists: boolean = !!text;

    const buttonBaseClassNames: string = classNames([
        className,
        size === ButtonSize.Flex && largeScreenActive
            ? styles.buttonPadding3
            : '',
        size === ButtonSize.Flex && mediumScreenActive
            ? styles.buttonPadding2
            : '',
        size === ButtonSize.Flex && smallScreenActive
            ? styles.buttonPadding2
            : '',
        size === ButtonSize.Flex && xSmallScreenActive
            ? styles.buttonPadding1
            : '',
        size === ButtonSize.Large ? styles.buttonPadding1 : '',
        size === ButtonSize.Medium ? styles.buttonPadding2 : '',
        size === ButtonSize.Small ? styles.buttonPadding3 : '',
        { [styles.dark]: theme === ButtonTheme.dark },
        allowDisabledFocus || disabled ? styles.disabled : '',
    ]);

    const buttonSpacerClassNames: string = classNames([
        styles.spacer,
        size === ButtonSize.Flex && largeScreenActive
            ? styles.buttonSpacer3
            : '',
        size === ButtonSize.Flex && mediumScreenActive
            ? styles.buttonSpacer2
            : '',
        size === ButtonSize.Flex && smallScreenActive
            ? styles.buttonSpacer2
            : '',
        size === ButtonSize.Flex && xSmallScreenActive
            ? styles.buttonSpacer1
            : '',
        size === ButtonSize.Large ? styles.buttonSpacer1 : '',
        size === ButtonSize.Medium ? styles.buttonSpacer2 : '',
        size === ButtonSize.Small ? styles.buttonSpacer3 : '',
    ]);

    const buttonTextClassNames: string = classNames([
        size === ButtonSize.Flex && largeScreenActive ? styles.button3 : '',
        size === ButtonSize.Flex && mediumScreenActive ? styles.button2 : '',
        size === ButtonSize.Flex && smallScreenActive ? styles.button2 : '',
        size === ButtonSize.Flex && xSmallScreenActive ? styles.button1 : '',
        size === ButtonSize.Large ? styles.button1 : '',
        size === ButtonSize.Medium ? styles.button2 : '',
        size === ButtonSize.Small ? styles.button3 : '',
    ]);

    const getButtonIconSize = (): IconSize => {
        let iconSize: IconSize;
        if (size === ButtonSize.Flex) {
            if (smallScreenActive) {
                iconSize = IconSize.Medium;
            } else if (mediumScreenActive) {
                iconSize = IconSize.Medium;
            } else if (largeScreenActive) {
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

    const getButtonIcon = (icon: IconName): JSX.Element => (
        <Icon path={icon} size={getButtonIconSize()} />
    );

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
            } else if (type === ButtonType.Secondary) {
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
    ): JSX.Element => (
        <span
            className={buttonTextClassNames}
            style={{
                color:
                    primaryColor && type === ButtonType.Primary
                        ? invertForegroundColor(primaryColor)
                        : 'inherit',
            }}
        >
            {text ? text : 'Button'}
        </span>
    );

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
            {iconExists && !textExists && getButtonIcon(icon)}
            {iconExists && textExists && (
                <span className={styles.flexStructureHorizontal}>
                    {getButtonIcon(icon)}
                    <span className={buttonSpacerClassNames}></span>
                    {getButtonText(buttonTextClassNames, text)}
                </span>
            )}
            {!iconExists && getButtonText(buttonTextClassNames, text)}
        </button>
    );
};
