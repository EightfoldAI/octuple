import React, { FC, Ref } from 'react';
import {
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonTheme,
    ButtonType,
    ButtonWidth,
    InternalButtonProps,
} from './';
import { Icon, IconName, IconSize } from '../Icon';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { classNames } from '../../shared/utilities';

import styles from './button.module.scss';

export const BaseButton: FC<InternalButtonProps> = React.forwardRef(
    (
        {
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            buttonWidth = ButtonWidth.fitContent,
            checked = false,
            className,
            disabled = false,
            disruptive = false,
            dropShadow = false,
            htmlType,
            icon,
            iconColor,
            id,
            onClick,
            onContextMenu,
            shape = ButtonShape.Rectangle,
            size = ButtonSize.Flex,
            split,
            splitButtonChecked = false,
            splitButtonProps,
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

        const iconExists: boolean = !!icon;
        const textExists: boolean = !!text;

        const buttonBaseSharedClassNames: string = classNames([
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
            { [styles.pillShape]: shape === ButtonShape.Pill },
            { [styles.dropShadow]: dropShadow },
            { [styles.dark]: theme === ButtonTheme.dark },
        ]);

        const buttonBaseClassNames: string = classNames([
            buttonBaseSharedClassNames,
            { [styles.buttonStretch]: buttonWidth === ButtonWidth.fill },
            { [styles.splitLeft]: split },
            { [styles.left]: alignText === ButtonTextAlign.Left },
            { [styles.right]: alignText === ButtonTextAlign.Right },
            { [styles.disabled]: allowDisabledFocus || disabled },
        ]);

        const splitButtonClassNames: string = classNames([
            buttonBaseSharedClassNames,
            styles.splitButton,
            { [styles.splitRight]: split },
            {
                [styles.disabled]:
                    splitButtonProps?.allowDisabledFocus ||
                    splitButtonProps?.disabled,
            },
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

        const splitDividerClassNames: string = classNames([
            styles.splitDivider,
            {
                [styles.splitDividerSmall]:
                    size === ButtonSize.Flex && largeScreenActive,
            },
            {
                [styles.splitDividerMedium]:
                    size === ButtonSize.Flex && mediumScreenActive,
            },
            {
                [styles.splitDividerMedium]:
                    size === ButtonSize.Flex && smallScreenActive,
            },
            {
                [styles.splitDividerLarge]:
                    size === ButtonSize.Flex && xSmallScreenActive,
            },
            { [styles.splitDividerLarge]: size === ButtonSize.Large },
            { [styles.splitDividerMedium]: size === ButtonSize.Medium },
            { [styles.splitDividerSmall]: size === ButtonSize.Small },
            { [styles.splitDividerPrimary]: type === ButtonType.Primary },
            {
                [styles.splitDividerPrimaryDisruptive]:
                    type === ButtonType.Primary && disruptive,
            },
            { [styles.splitDividerSecondary]: type === ButtonType.Secondary },
            {
                [styles.splitDividerSecondaryDisruptive]:
                    type === ButtonType.Secondary && disruptive,
            },
            { [styles.splitDividerDefault]: type === ButtonType.Default },
            { [styles.splitDividerNeutral]: type === ButtonType.Neutral },
            {
                [styles.splitDividerDisruptive]:
                    type === ButtonType.Default && disruptive,
            },
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
            <span className={buttonTextClassNames}>
                {text ? text : 'Button'}
            </span>
        );

        return (
            <>
                <button
                    {...rest}
                    ref={ref}
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
                {split && (
                    <>
                        <button
                            aria-checked={
                                split ? !!splitButtonChecked : undefined
                            }
                            aria-disabled={splitButtonProps?.allowDisabledFocus}
                            aria-label={splitButtonProps?.ariaLabel}
                            aria-pressed={
                                split ? !!splitButtonChecked : undefined
                            }
                            defaultChecked={splitButtonChecked}
                            disabled={splitButtonProps?.disabled}
                            className={splitButtonClassNames}
                            id={splitButtonProps?.id}
                            onClick={
                                !splitButtonProps?.allowDisabledFocus
                                    ? onContextMenu
                                    : null
                            }
                            style={splitButtonProps?.style}
                            type="button"
                        >
                            {getButtonIcon(
                                splitButtonProps?.icon || splitButtonChecked
                                    ? IconName.mdiChevronDown
                                    : IconName.mdiChevronUp
                            )}
                            <span
                                className={splitDividerClassNames}
                                aria-hidden="true"
                            ></span>
                        </button>
                    </>
                )}
            </>
        );
    }
);
