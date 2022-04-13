import React, { FC, Ref } from 'react';
import {
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonTheme,
    ButtonType,
    SplitButtonProps,
} from '../';
import { Icon, IconName, IconSize } from '../../Icon';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { classNames } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const SplitButton: FC<SplitButtonProps> = React.forwardRef(
    (
        {
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            className,
            checked = false,
            disabled = false,
            disruptive = false,
            dropShadow = false,
            icon,
            iconColor,
            id,
            onClick,
            shape = ButtonShape.Rectangle,
            size = ButtonSize.Flex,
            split,
            style,
            theme,
            type,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const splitButtonClassNames: string = classNames([
            className,
            styles.splitButton,
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
            { [styles.splitRight]: split },
            {
                [styles.disabled]: allowDisabledFocus || disabled,
            },
            { [styles.dark]: theme === ButtonTheme.dark },
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

        return (
            <button
                {...rest}
                ref={ref}
                aria-checked={split ? !!checked : undefined}
                aria-disabled={allowDisabledFocus}
                aria-label={ariaLabel}
                aria-pressed={split ? !!checked : undefined}
                defaultChecked={checked}
                disabled={disabled}
                className={splitButtonClassNames}
                id={id}
                onClick={!allowDisabledFocus ? onClick : null}
                style={style}
                type="button"
            >
                {getButtonIcon(
                    icon || checked
                        ? IconName.mdiChevronDown
                        : IconName.mdiChevronUp
                )}
                <span
                    className={splitDividerClassNames}
                    aria-hidden="true"
                ></span>
            </button>
        );
    }
);
