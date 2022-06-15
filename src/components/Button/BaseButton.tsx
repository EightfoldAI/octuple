import React, { FC, Ref } from 'react';
import {
    ButtonIconAlign,
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonTheme,
    ButtonWidth,
    InternalButtonProps,
    SplitButton,
} from './';
import { Icon, IconSize } from '../Icon';
import { Badge } from '../Badge';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { mergeClasses } from '../../shared/utilities';

import styles from './button.module.scss';

export const BaseButton: FC<InternalButtonProps> = React.forwardRef(
    (
        {
            alignIcon = ButtonIconAlign.Left,
            alignText = ButtonTextAlign.Center,
            allowDisabledFocus = false,
            ariaLabel,
            buttonWidth = ButtonWidth.fitContent,
            checked = false,
            classNames,
            counter,
            disabled = false,
            disruptive = false,
            dropShadow = false,
            floatingButtonProps,
            htmlType,
            iconProps,
            id,
            onClick,
            onContextMenu,
            shape = ButtonShape.Pill,
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

        const counterExists: boolean = !!counter;
        const iconExists: boolean = !!iconProps;
        const textExists: boolean = !!text;

        const buttonBaseSharedClassNames: string = mergeClasses([
            classNames,
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
            {
                [styles.roundShape]:
                    shape === ButtonShape.Round && !split && !textExists,
            },
            { [styles.dropShadow]: dropShadow },
            { [styles.dark]: theme === ButtonTheme.dark },
            { [styles.floating]: floatingButtonProps?.enabled },
        ]);

        const buttonBaseClassNames: string = mergeClasses([
            buttonBaseSharedClassNames,
            { [styles.buttonStretch]: buttonWidth === ButtonWidth.fill },
            { [styles.splitLeft]: split },
            { [styles.left]: alignText === ButtonTextAlign.Left },
            { [styles.right]: alignText === ButtonTextAlign.Right },
            {
                [styles.iconLeft]:
                    iconExists && alignIcon === ButtonIconAlign.Left,
            },
            {
                [styles.iconRight]:
                    iconExists && alignIcon === ButtonIconAlign.Right,
            },
            { [styles.disabled]: allowDisabledFocus || disabled },
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

        const getButtonIcon = (): JSX.Element => (
            <Icon
                {...iconProps}
                classNames={mergeClasses([styles.icon, iconProps.classNames])}
                size={getButtonIconSize()}
            />
        );

        const getButtonContent = (
            buttonTextClassNames: string,
            text: string
        ): JSX.Element => (
            <span className={buttonTextClassNames}>
                {text ? text : 'Button'}
                {counterExists && (
                    <Badge classNames={badgeClassNames}>{counter}</Badge>
                )}
            </span>
        );

        return (
            <>
                <button
                    ref={ref}
                    {...rest}
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
                    {iconExists && !textExists && getButtonIcon()}
                    {counterExists && !textExists && (
                        <Badge classNames={badgeClassNames}>{counter}</Badge>
                    )}
                    {iconExists && textExists && (
                        <span>
                            {getButtonIcon()}
                            {getButtonContent(buttonTextClassNames, text)}
                        </span>
                    )}
                    {!iconExists &&
                        getButtonContent(buttonTextClassNames, text)}
                </button>
                {split && (
                    <SplitButton
                        {...splitButtonProps}
                        classNames={
                            buttonBaseSharedClassNames +
                            ' ' +
                            splitButtonProps?.classNames
                        }
                        checked={splitButtonChecked}
                        disruptive={disruptive}
                        dropShadow={dropShadow}
                        onClick={
                            !splitButtonProps?.allowDisabledFocus
                                ? onContextMenu
                                : null
                        }
                        shape={shape}
                        size={size}
                        split={split}
                        theme={theme}
                        type={type}
                    />
                )}
            </>
        );
    }
);
