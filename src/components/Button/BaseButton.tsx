import React, { FC, Ref, useContext } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../ConfigProvider';
import {
    ButtonIconAlign,
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonWidth,
    InternalButtonProps,
    SplitButton,
} from './';
import { Icon, IconSize } from '../Icon';
import { Badge } from '../Badge';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { mergeClasses } from '../../shared/utilities';
import { Loader, LoaderSize } from '../Loader';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

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
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
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
            size = ButtonSize.Medium,
            split,
            splitButtonChecked = false,
            splitButtonProps,
            style,
            text,
            toggle,
            type,
            loading = false,
            ...rest
        },
        ref: Ref<HTMLButtonElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const htmlDir: string = useCanvasDirection();

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;

        const counterExists: boolean = !!counter;
        const iconExists: boolean = !!iconProps;
        const textExists: boolean = !!text;

        const buttonBaseSharedClassNames: string = mergeClasses([
            classNames,
            {
                [styles.buttonSmall]:
                    mergedSize === ButtonSize.Flex && largeScreenActive,
            },
            {
                [styles.buttonMedium]:
                    mergedSize === ButtonSize.Flex && mediumScreenActive,
            },
            {
                [styles.buttonMedium]:
                    mergedSize === ButtonSize.Flex && smallScreenActive,
            },
            {
                [styles.buttonLarge]:
                    mergedSize === ButtonSize.Flex && xSmallScreenActive,
            },
            { [styles.buttonLarge]: mergedSize === ButtonSize.Large },
            { [styles.buttonMedium]: mergedSize === ButtonSize.Medium },
            { [styles.buttonSmall]: mergedSize === ButtonSize.Small },
            { [styles.pillShape]: shape === ButtonShape.Pill },
            {
                [styles.roundShape]:
                    shape === ButtonShape.Round && !split && !textExists,
            },
            { [styles.dropShadow]: dropShadow },
            { [styles.floating]: floatingButtonProps?.enabled },
            { [styles.buttonRtl]: htmlDir === 'rtl' },
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
            { [styles.disabled]: allowDisabledFocus || mergedDisabled },
            { [styles.loading]: loading },
        ]);

        const buttonTextClassNames: string = mergeClasses([
            {
                [styles.buttonTextSmall]:
                    mergedSize === ButtonSize.Flex && largeScreenActive,
            },
            {
                [styles.buttonTextMedium]:
                    mergedSize === ButtonSize.Flex && mediumScreenActive,
            },
            {
                [styles.buttonTextMedium]:
                    mergedSize === ButtonSize.Flex && smallScreenActive,
            },
            {
                [styles.buttonTextLarge]:
                    mergedSize === ButtonSize.Flex && xSmallScreenActive,
            },
            { [styles.buttonTextLarge]: mergedSize === ButtonSize.Large },
            { [styles.buttonTextMedium]: mergedSize === ButtonSize.Medium },
            { [styles.buttonTextSmall]: mergedSize === ButtonSize.Small },
        ]);

        const badgeClassNames: string = mergeClasses([
            styles.counter,
            buttonTextClassNames,
        ]);

        const getButtonIconSize = (): IconSize => {
            let iconSize: IconSize;
            if (mergedSize === ButtonSize.Flex && largeScreenActive) {
                iconSize = IconSize.Small;
            } else if (
                mergedSize === ButtonSize.Flex &&
                (mediumScreenActive || smallScreenActive)
            ) {
                iconSize = IconSize.Medium;
            } else if (mergedSize === ButtonSize.Flex && xSmallScreenActive) {
                iconSize = IconSize.Large;
            } else if (mergedSize === ButtonSize.Large) {
                iconSize = IconSize.Large;
            } else if (mergedSize === ButtonSize.Medium) {
                iconSize = IconSize.Medium;
            } else if (mergedSize === ButtonSize.Small) {
                iconSize = IconSize.Small;
            }
            return iconSize;
        };

        const getLoaderSize = (): LoaderSize => {
            let loaderSize: LoaderSize;
            if (size === ButtonSize.Flex && largeScreenActive) {
                loaderSize = LoaderSize.Small;
            } else if (
                size === ButtonSize.Flex &&
                (mediumScreenActive || smallScreenActive)
            ) {
                loaderSize = LoaderSize.Medium;
            } else if (size === ButtonSize.Flex && xSmallScreenActive) {
                loaderSize = LoaderSize.Large;
            } else if (size === ButtonSize.Large) {
                loaderSize = LoaderSize.Large;
            } else if (size === ButtonSize.Medium) {
                loaderSize = LoaderSize.Medium;
            } else if (size === ButtonSize.Small) {
                loaderSize = LoaderSize.Small;
            }
            return loaderSize;
        };

        const getButtonLoader = (): JSX.Element =>
            loading && (
                <Loader classNames={styles.loader} size={getLoaderSize()} />
            );

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
                    aria-disabled={mergedDisabled || loading}
                    aria-label={ariaLabel}
                    aria-pressed={toggle ? !!checked : undefined}
                    defaultChecked={checked}
                    disabled={
                        (!allowDisabledFocus && mergedDisabled) || loading
                    }
                    className={buttonBaseClassNames}
                    id={id}
                    onClick={!allowDisabledFocus ? onClick : null}
                    style={style}
                    type={htmlType}
                >
                    {iconExists && !textExists && getButtonIcon()}
                    {counterExists && !textExists && !loading && (
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
                    {getButtonLoader()}
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
                        size={mergedSize}
                        split={split}
                        type={type}
                    />
                )}
            </>
        );
    }
);
