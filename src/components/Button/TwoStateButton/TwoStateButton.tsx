import React, { FC, Ref } from 'react';
import {
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonTheme,
    ButtonWidth,
    TwoStateButtonProps,
} from '../';
import { Badge } from '../../Badge';
import { Icon, IconSize } from '../../Icon';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../button.module.scss';

export const TwoStateButton: FC<TwoStateButtonProps> = React.forwardRef(
    (
        {
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            buttonWidth = ButtonWidth.fitContent,
            classNames,
            checked = false,
            counter,
            disabled = false,
            disruptive = false,
            dropShadow = false,
            iconOneProps,
            iconTwoProps,
            id,
            onClick,
            shape = ButtonShape.Pill,
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
        const iconOneExists: boolean = !!iconOneProps;
        const iconTwoExists: boolean = !!iconTwoProps;
        const textExists: boolean = !!text;

        const twoStateButtonClassNames: string = mergeClasses([
            classNames,
            styles.button,
            styles.twoStateButton,
            { [styles.checked]: checked },
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
            { [styles.buttonStretch]: buttonWidth === ButtonWidth.fill },
            { [styles.pillShape]: shape === ButtonShape.Pill },
            { [styles.dropShadow]: dropShadow },
            { [styles.left]: alignText === ButtonTextAlign.Left },
            { [styles.right]: alignText === ButtonTextAlign.Right },
            { [styles.disabled]: allowDisabledFocus || disabled },
            { [styles.dark]: theme === ButtonTheme.dark },
        ]);

        const buttonTextClassNames: string = mergeClasses([
            {
                [styles.buttonText3]:
                    size === ButtonSize.Flex && largeScreenActive,
            },
            {
                [styles.buttonText2]:
                    size === ButtonSize.Flex && mediumScreenActive,
            },
            {
                [styles.buttonText2]:
                    size === ButtonSize.Flex && smallScreenActive,
            },
            {
                [styles.buttonText1]:
                    size === ButtonSize.Flex && xSmallScreenActive,
            },
            { [styles.buttonText1]: size === ButtonSize.Large },
            { [styles.buttonText2]: size === ButtonSize.Medium },
            { [styles.buttonText3]: size === ButtonSize.Small },
        ]);

        const badgeClassNames: string = mergeClasses([
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

        const getButtonIcon = (position: string): JSX.Element => (
            <Icon
                {...(position === 'left' ? iconOneProps : iconTwoProps)}
                classNames={styles.icon}
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
                <span className={styles.twoStateButtonContent}>
                    <span className={styles.column + ' ' + styles.columnOne}>
                        {iconOneExists && getButtonIcon('left')}
                        {textExists &&
                            getButtonText(buttonTextClassNames, text)}
                        {counterExists && (
                            <Badge classNames={badgeClassNames}>
                                {counter}
                            </Badge>
                        )}
                    </span>
                    <span className={styles.column}>
                        {iconTwoExists && getButtonIcon('right')}
                    </span>
                </span>
            </button>
        );
    }
);
