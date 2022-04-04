import React, { FC } from 'react';
import {
    ButtonSize,
    ButtonTheme,
    ButtonType,
    InternalButtonProps,
} from './index';
import { Icon, IconName, IconSize } from '../Icon/index';
import { Breakpoints, useMatchMedia } from '../../shared/hooks';
import { CSSVariables } from '../../shared/variables';
import { classNames, invertForegroundColor } from '../../shared/utilities';

import styles from './button.module.scss';

export const BaseButton: FC<InternalButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
    disruptive = false,
    htmlType,
    icon,
    id,
    onClick,
    primaryColor,
    size = ButtonSize.Flex,
    style,
    text,
    theme,
    type = ButtonType.Default,
}) => {
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const iconExists: boolean = !!icon;
    const textExists: boolean = !!text;

    const buttonBaseClassNames: string = classNames([
        className,
        {
            [styles.buttonPadding3]:
                size === ButtonSize.Flex && largeScreenActive,
        },
        {
            [styles.buttonPadding2]:
                size === ButtonSize.Flex && mediumScreenActive,
        },
        {
            [styles.buttonPadding2]:
                size === ButtonSize.Flex && smallScreenActive,
        },
        {
            [styles.buttonPadding1]:
                size === ButtonSize.Flex && xSmallScreenActive,
        },
        { [styles.buttonPadding1]: size === ButtonSize.Large },
        { [styles.buttonPadding2]: size === ButtonSize.Medium },
        { [styles.buttonPadding3]: size === ButtonSize.Small },
        { [styles.dark]: theme === ButtonTheme.dark },
        { [styles.disabled]: allowDisabledFocus || disabled },
    ]);

    const buttonTextClassNames: string = classNames([
        { [styles.button3]: size === ButtonSize.Flex && largeScreenActive },
        { [styles.button2]: size === ButtonSize.Flex && mediumScreenActive },
        { [styles.button2]: size === ButtonSize.Flex && smallScreenActive },
        { [styles.button1]: size === ButtonSize.Flex && xSmallScreenActive },
        { [styles.button1]: size === ButtonSize.Large },
        { [styles.button2]: size === ButtonSize.Medium },
        { [styles.button3]: size === ButtonSize.Small },
    ]);

    const getButtonIconSize = (): IconSize => {
        let iconSize: IconSize;
        if (size === ButtonSize.Flex && largeScreenActive) {
            iconSize = IconSize.Small;
        } else if (
            size === ButtonSize.Flex &&
            (mediumScreenActive || smallScreenActive)
        ) {
            iconSize = IconSize.Medium;
        } else if (size === ButtonSize.Flex && xSmallScreenActive) {
            iconSize = IconSize.Large;
        } else if (size === ButtonSize.Large) {
            iconSize = IconSize.Large;
        } else if (size === ButtonSize.Medium) {
            iconSize = IconSize.Medium;
        } else if (size === ButtonSize.Small) {
            iconSize = IconSize.Small;
        }
        return iconSize;
    };

    const getButtonIcon = (icon: IconName): JSX.Element => (
        <Icon className={styles.icon} path={icon} size={getButtonIconSize()} />
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
            id={id}
            onClick={!allowDisabledFocus ? onClick : null}
            style={buttonStyles()}
            type={htmlType}
        >
            {iconExists && !textExists && getButtonIcon(icon)}
            {iconExists && textExists && (
                <span>
                    {getButtonIcon(icon)}
                    {getButtonText(buttonTextClassNames, text)}
                </span>
            )}
            {!iconExists && getButtonText(buttonTextClassNames, text)}
        </button>
    );
};
