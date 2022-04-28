import React, { FC, Ref } from 'react';
import {
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonTheme,
    ButtonWidth,
    TwoStateButtonProps,
} from '../';
import { Icon, IconName, IconSize } from '../../Icon';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { classNames } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const TwoStateButton: FC<TwoStateButtonProps> = React.forwardRef(
    (
        {
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            buttonWidth = ButtonWidth.fitContent,
            className,
            checked = false,
            counter,
            disabled = false,
            disruptive = false,
            dropShadow = false,
            iconOne,
            iconOneColor,
            iconTwo,
            iconTwoColor,
            id,
            onClick,
            shape = ButtonShape.Rectangle,
            size = ButtonSize.Flex,
            style,
            text,
            theme,
            toggle,
            type,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const counterExists: boolean = !!counter;
        const iconOneExists: boolean = !!iconOne;
        const iconTwoExists: boolean = !!iconTwo;
        const textExists: boolean = !!text;

        const twoStateButtonClassNames: string = classNames([
            className,
            styles.button,
            styles.twoStateButton,
            { [styles.checked]: checked },
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
            { [styles.buttonStretch]: buttonWidth === ButtonWidth.fill },
            { [styles.pillShape]: shape === ButtonShape.Pill },
            { [styles.dropShadow]: dropShadow },
            { [styles.left]: alignText === ButtonTextAlign.Left },
            { [styles.right]: alignText === ButtonTextAlign.Right },
            { [styles.disabled]: allowDisabledFocus || disabled },
            { [styles.dark]: theme === ButtonTheme.dark },
        ]);

        const buttonTextClassNames: string = classNames([
            { [styles.button3]: size === ButtonSize.Flex && largeScreenActive },
            {
                [styles.button2]:
                    size === ButtonSize.Flex && mediumScreenActive,
            },
            { [styles.button2]: size === ButtonSize.Flex && smallScreenActive },
            {
                [styles.button1]:
                    size === ButtonSize.Flex && xSmallScreenActive,
            },
            { [styles.button1]: size === ButtonSize.Large },
            { [styles.button2]: size === ButtonSize.Medium },
            { [styles.button3]: size === ButtonSize.Small },
        ]);

        const counterClassNames: string = classNames([
            styles.counter,
            buttonTextClassNames,
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

        const getButtonIcon = (icon: IconName, color: string): JSX.Element => (
            <Icon
                className={styles.icon}
                color={color}
                path={icon}
                size={getButtonIconSize()}
            />
        );

        const getButtonText = (
            buttonTextClassNames: string,
            text: string
        ): JSX.Element => (
            <span className={buttonTextClassNames}>
                {text ? text : 'Button'}
            </span>
        );

        return (
            <button
                {...rest}
                ref={ref}
                aria-checked={toggle ? !!checked : undefined}
                aria-disabled={allowDisabledFocus}
                aria-label={ariaLabel}
                aria-pressed={toggle ? !!checked : undefined}
                defaultChecked={checked}
                disabled={disabled}
                className={twoStateButtonClassNames}
                id={id}
                onClick={!allowDisabledFocus ? onClick : null}
                style={style}
                type="button"
            >
                <span>
                    {iconOneExists && getButtonIcon(iconOne, iconOneColor)}
                    {textExists && getButtonText(buttonTextClassNames, text)}
                    {counterExists && (
                        <span className={counterClassNames}>
                            {counter.toLocaleString()}
                        </span>
                    )}
                    {iconTwoExists && getButtonIcon(iconTwo, iconTwoColor)}
                </span>
            </button>
        );
    }
);
