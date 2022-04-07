import React, { FC } from 'react';
import { ButtonSize, ButtonTheme, InternalButtonProps } from './index';
import { Icon, IconName, IconSize } from '../Icon/index';
import { Breakpoints, useMatchMedia } from '../../shared/hooks';
import { classNames } from '../../shared/utilities';

import styles from './button.module.scss';

export const BaseButton: FC<InternalButtonProps> = ({
    allowDisabledFocus = false,
    ariaLabel,
    checked = false,
    className,
    disabled = false,
    htmlType,
    icon,
    iconColor,
    id,
    onClick,
    size = ButtonSize.Flex,
    style,
    text,
    theme,
    toggle,
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
        <Icon
            className={styles.icon}
            color={iconColor}
            path={icon}
            size={getButtonIconSize()}
        />
    );

    const getButtonText = (
        buttonTextClassNames: string,
        text: string
    ): JSX.Element => (
        <span className={buttonTextClassNames}>{text ? text : 'Button'}</span>
    );

    return (
        <button
            aria-checked={toggle ? !!checked : undefined}
            aria-disabled={allowDisabledFocus}
            aria-label={ariaLabel}
            aria-pressed={toggle ? !!checked : undefined}
            defaultChecked={checked}
            disabled={disabled}
            className={buttonBaseClassNames}
            id={id}
            onClick={!allowDisabledFocus ? onClick : null}
            style={style}
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
