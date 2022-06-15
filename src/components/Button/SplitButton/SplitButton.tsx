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
import { mergeClasses } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const SplitButton: FC<SplitButtonProps> = React.forwardRef(
    (
        {
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            classNames,
            checked = false,
            disabled = false,
            disruptive = false,
            dropShadow = false,
            iconProps,
            id,
            onClick,
            shape = ButtonShape.Pill,
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

        const splitButtonClassNames: string = mergeClasses([
            classNames,
            styles.splitButton,
            {
                [styles.buttonSize3]:
                    size === ButtonSize.Flex && largeScreenActive,
            },
            {
                [styles.buttonSize2]:
                    size === ButtonSize.Flex && mediumScreenActive,
            },
            {
                [styles.buttonSize2]:
                    size === ButtonSize.Flex && smallScreenActive,
            },
            {
                [styles.buttonSize1]:
                    size === ButtonSize.Flex && xSmallScreenActive,
            },
            { [styles.buttonSize1]: size === ButtonSize.Large },
            { [styles.buttonSize2]: size === ButtonSize.Medium },
            { [styles.buttonSize3]: size === ButtonSize.Small },
            { [styles.pillShape]: shape === ButtonShape.Pill },
            { [styles.dropShadow]: dropShadow },
            { [styles.splitRight]: split },
            {
                [styles.disabled]: allowDisabledFocus || disabled,
            },
            { [styles.dark]: theme === ButtonTheme.dark },
        ]);

        const splitDividerClassNames: string = mergeClasses([
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

        const getButtonIcon = (): JSX.Element => (
            <Icon
                {...iconProps}
                classNames={styles.icon}
                path={
                    iconProps?.path || checked
                        ? IconName.mdiChevronUp
                        : IconName.mdiChevronDown
                }
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
                {getButtonIcon()}
                <span
                    className={splitDividerClassNames}
                    aria-hidden="true"
                ></span>
            </button>
        );
    }
);
