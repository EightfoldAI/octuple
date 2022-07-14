import React, { FC, Ref, useEffect, useState } from 'react';
import { ButtonSize, DefaultButton } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon';
import { Label, LabelSize } from '../../Label';
import {
    TextInputWidth,
    TextInputProps,
    TextInputShape,
    TextInputSize,
    TextInputTheme,
} from '../index';
import { useDebounce } from '../../../hooks/useDebounce';
import { mergeClasses, uniqueId } from '../../../shared/utilities';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';

import styles from '../input.module.scss';

export const TextInput: FC<TextInputProps> = React.forwardRef(
    (
        {
            allowDisabledFocus = false,
            ariaLabel,
            autoFocus = false,
            classNames,
            clearButtonAriaLabel,
            disabled = false,
            htmlType = 'text',
            iconProps,
            iconButtonProps,
            id,
            inputWidth = TextInputWidth.fitContent,
            labelProps,
            maxlength,
            minlength,
            name,
            numbersOnly = false,
            onBlur,
            onChange,
            onClear,
            onFocus,
            onKeyDown,
            placeholder,
            required = false,
            readonly = false,
            shape = TextInputShape.Rectangle,
            size = TextInputSize.Flex,
            style,
            theme = TextInputTheme.light,
            value,
            waitInterval = 10,
            clearable = true,
            ...rest
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const [inputValue, setInputValue] = useState(value);

        const [clearButtonShown, _setClearButtonShown] =
            useState<boolean>(false);
        const [inputId] = useState<string>(uniqueId(id || 'input-'));
        const inputField: HTMLElement = document.getElementById(inputId);

        const iconClassNames: string = mergeClasses([
            styles.iconWrapper,
            styles.leftIcon,
        ]);

        const iconButtonClassNames: string = mergeClasses([
            styles.iconButton,
            styles.leftIcon,
        ]);

        const textInputClassNames: string = mergeClasses([
            classNames,
            {
                [styles.inputSize3]:
                    size === TextInputSize.Flex && largeScreenActive,
            },
            {
                [styles.inputSize2]:
                    size === TextInputSize.Flex && mediumScreenActive,
            },
            {
                [styles.inputSize2]:
                    size === TextInputSize.Flex && smallScreenActive,
            },
            {
                [styles.inputSize1]:
                    size === TextInputSize.Flex && xSmallScreenActive,
            },
            { [styles.inputSize1]: size === TextInputSize.Large },
            { [styles.inputSize2]: size === TextInputSize.Medium },
            { [styles.inputSize3]: size === TextInputSize.Small },
            {
                [styles.withIcon]:
                    !!iconProps?.path && shape === TextInputShape.Rectangle,
            },
            {
                [styles.withImageIcon]:
                    !!iconProps?.imageSrc && shape === TextInputShape.Rectangle,
            },
            {
                [styles.withIconButton]:
                    !!iconButtonProps && shape === TextInputShape.Rectangle,
            },
            {
                [styles.withIconAndIconButton]:
                    !!iconProps &&
                    !!iconButtonProps &&
                    shape === TextInputShape.Rectangle,
            },
            { [styles.pillShape]: shape === TextInputShape.Pill },
            {
                [styles.pillShapeWithIcon]:
                    !!iconProps?.path && shape === TextInputShape.Pill,
            },
            {
                [styles.pillShapeWithImageIcon]:
                    !!iconProps?.imageSrc && shape === TextInputShape.Pill,
            },
            {
                [styles.pillShapeWithIconButton]:
                    !!iconButtonProps && shape === TextInputShape.Pill,
            },
            {
                [styles.pillShapeWithIconAndIconButton]:
                    !!iconProps &&
                    !!iconButtonProps &&
                    shape === TextInputShape.Pill,
            },
            {
                [styles.dark]: theme === TextInputTheme.dark,
            },
            {
                [styles.inputStretch]: inputWidth === TextInputWidth.fill,
            },
        ]);

        const textInputWrapperClassNames: string = mergeClasses([
            styles.inputWrapper,
            {
                [styles.inputSize3]:
                    size === TextInputSize.Flex && largeScreenActive,
            },
            {
                [styles.inputSize2]:
                    size === TextInputSize.Flex && mediumScreenActive,
            },
            {
                [styles.inputSize2]:
                    size === TextInputSize.Flex && smallScreenActive,
            },
            {
                [styles.inputSize1]:
                    size === TextInputSize.Flex && xSmallScreenActive,
            },
            { [styles.inputSize1]: size === TextInputSize.Large },
            { [styles.inputSize2]: size === TextInputSize.Medium },
            { [styles.inputSize3]: size === TextInputSize.Small },
            {
                [styles.inputStretch]: inputWidth === TextInputWidth.fill,
            },
        ]);

        useEffect(() => {
            setInputValue(value);
            if (value?.toString()?.length > 0) {
                return setClearButtonShown(true);
            }
            setClearButtonShown(false);
        }, [value]);

        const setClearButtonShown = (showClear: boolean) => {
            return !clearable
                ? _setClearButtonShown(false)
                : _setClearButtonShown(showClear);
        };

        const handleOnClear = (_event: React.MouseEvent) => {
            _event.preventDefault();
            _event.stopPropagation();
            if (!!inputField) {
                (inputField as HTMLInputElement).value = '';
            }
            setInputValue('');
            onClear?.(_event);
            setClearButtonShown(false);
        };

        const debouncedChange = useDebounce<
            React.ChangeEvent<HTMLInputElement>
        >(
            (
                _event?: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                >
            ) => {
                const { target } = _event;

                onChange?.(_event);

                if (target?.value.length === 0 && clearButtonShown) {
                    setClearButtonShown(false);
                } else if (!clearButtonShown) {
                    setClearButtonShown(true);
                }
            },
            waitInterval
        );

        // We need to persist the syntheticevent object, as useDebounce uses a timeout function internally
        // Reference: https://reactjs.org/docs/legacy-event-pooling.html
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            setInputValue(e.target.value);
            debouncedChange(e);
        };

        const inputSizeToButtonSizeMap = new Map<TextInputSize, ButtonSize>([
            [TextInputSize.Flex, ButtonSize.Flex],
            [TextInputSize.Large, ButtonSize.Large],
            [TextInputSize.Medium, ButtonSize.Medium],
            [TextInputSize.Small, ButtonSize.Small],
        ]);

        const getIconSize = (): IconSize => {
            let iconSize: IconSize;
            if (largeScreenActive) {
                iconSize = IconSize.Small;
            } else if (mediumScreenActive) {
                iconSize = IconSize.Medium;
            } else if (smallScreenActive) {
                iconSize = IconSize.Medium;
            } else if (xSmallScreenActive) {
                iconSize = IconSize.Large;
            }
            return iconSize;
        };

        const inputSizeToIconSizeMap = new Map<TextInputSize, IconSize>([
            [TextInputSize.Flex, getIconSize()],
            [TextInputSize.Large, IconSize.Large],
            [TextInputSize.Medium, IconSize.Medium],
            [TextInputSize.Small, IconSize.Small],
        ]);

        const getLabelSize = (): LabelSize => {
            let labelSize: LabelSize;
            if (largeScreenActive) {
                labelSize = LabelSize.Small;
            } else if (mediumScreenActive) {
                labelSize = LabelSize.Medium;
            } else if (smallScreenActive) {
                labelSize = LabelSize.Medium;
            } else if (xSmallScreenActive) {
                labelSize = LabelSize.Large;
            }
            return labelSize;
        };

        const inputSizeToLabelSizeMap = new Map<TextInputSize, LabelSize>([
            [TextInputSize.Flex, getLabelSize()],
            [TextInputSize.Large, LabelSize.Large],
            [TextInputSize.Medium, LabelSize.Medium],
            [TextInputSize.Small, LabelSize.Small],
        ]);

        return (
            <div className={textInputWrapperClassNames}>
                {labelProps && (
                    <Label
                        size={inputSizeToLabelSizeMap.get(size)}
                        {...labelProps}
                    />
                )}
                <input
                    {...rest}
                    ref={ref}
                    aria-label={ariaLabel}
                    autoFocus={autoFocus}
                    className={textInputClassNames}
                    disabled={disabled}
                    id={inputId}
                    maxLength={maxlength}
                    minLength={minlength}
                    name={name}
                    onChange={!allowDisabledFocus ? handleChange : null}
                    onBlur={!allowDisabledFocus ? onBlur : null}
                    onFocus={!allowDisabledFocus ? onFocus : null}
                    onKeyDown={!allowDisabledFocus ? onKeyDown : null}
                    placeholder={placeholder}
                    required={required}
                    role="textbox"
                    style={style}
                    tabIndex={0}
                    type={numbersOnly ? 'number' : htmlType}
                    value={inputValue}
                    readOnly={readonly}
                />
                {iconProps && (
                    <div className={iconClassNames}>
                        {iconProps.path && !iconProps.imageSrc && (
                            <Icon
                                {...iconProps}
                                path={iconProps.path}
                                size={inputSizeToIconSizeMap.get(size)}
                            />
                        )}
                        {iconProps.imageSrc && !iconProps.path && (
                            <img
                                aria-hidden={iconProps.ariaHidden}
                                alt={iconProps.alt}
                                id={iconProps.id}
                                src={iconProps.imageSrc}
                            />
                        )}
                    </div>
                )}
                {iconButtonProps && (
                    <DefaultButton
                        allowDisabledFocus={iconButtonProps.allowDisabledFocus}
                        ariaLabel={iconButtonProps.ariaLabel}
                        checked={iconButtonProps.checked}
                        classNames={iconButtonClassNames}
                        disabled={iconButtonProps.disabled}
                        iconProps={{ path: iconButtonProps.iconProps.path }}
                        id={iconButtonProps.id}
                        onClick={iconButtonProps.onClick}
                        size={inputSizeToButtonSizeMap.get(size)}
                        htmlType={iconButtonProps.htmlType}
                    />
                )}
                {clearButtonShown && !numbersOnly && htmlType !== 'number' && (
                    <DefaultButton
                        allowDisabledFocus={allowDisabledFocus}
                        ariaLabel={clearButtonAriaLabel}
                        classNames={styles.clearIconButton}
                        disabled={disabled}
                        iconProps={{ path: IconName.mdiClose }}
                        onClick={!allowDisabledFocus ? handleOnClear : null}
                        size={ButtonSize.Small}
                    />
                )}
            </div>
        );
    }
);
