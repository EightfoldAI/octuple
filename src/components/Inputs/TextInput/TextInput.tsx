import React, { FC, Ref, useContext, useEffect, useState } from 'react';
import DisabledContext, {
    Disabled,
} from '../../ConfigProvider/DisabledContext';
import { ShapeContext, Shape, SizeContext, Size } from '../../ConfigProvider';
import { ButtonSize, DefaultButton } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon';
import { Label, LabelSize } from '../../Label';
import {
    TextInputIconAlign,
    TextInputWidth,
    TextInputProps,
    TextInputShape,
    TextInputSize,
} from '../index';
import { FormItemInputContext } from '../../Form/Context';
import { ValidateStatus } from '../../Form/Form.types';
import { useDebounce } from '../../../hooks/useDebounce';
import {
    getMergedStatus,
    mergeClasses,
    resolveOnChange,
    uniqueId,
} from '../../../shared/utilities';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';

import styles from '../input.module.scss';

export const TextInput: FC<TextInputProps> = React.forwardRef(
    (
        {
            alignIcon = TextInputIconAlign.Left,
            allowDisabledFocus = false,
            ariaLabel,
            autoFocus = false,
            classNames,
            clearable = true,
            clearButtonAriaLabel,
            configContextProps = {
                noDisabledContext: false,
                noShapeContext: false,
                noSizeContext: false,
            },
            disabled = false,
            formItemInput = false,
            htmlType = 'text',
            iconProps,
            iconButtonProps,
            id,
            inline = false,
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
            size = TextInputSize.Medium,
            status,
            style,
            value,
            waitInterval = 10,
            ...rest
        },
        ref: Ref<HTMLInputElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const htmlDir: string = useCanvasDirection();

        const [inputValue, setInputValue] = useState(value);

        const [clearButtonShown, _setClearButtonShown] =
            useState<boolean>(false);
        const [inputId] = useState<string>(uniqueId(id || 'input-'));

        const {
            status: contextStatus,
            isFormItemInput,
            hasFeedback,
        } = useContext(FormItemInputContext);
        const mergedStatus = getMergedStatus(contextStatus, status);

        // Needed for form error scroll-into-view by id
        const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

        const inputField: HTMLElement = document.getElementById(
            mergedFormItemInput ? id : inputId
        );

        const contextuallyDisabled: Disabled = useContext(DisabledContext);
        const mergedDisabled: boolean = configContextProps.noDisabledContext
            ? disabled
            : contextuallyDisabled || disabled;

        const contextuallyShaped: Shape = useContext(ShapeContext);
        const mergedShape = configContextProps.noShapeContext
            ? shape
            : contextuallyShaped || shape;

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;

        const getStatusClassNames = (
            status?: ValidateStatus,
            hasFeedback?: boolean
        ): string => {
            return mergeClasses({
                [styles.statusSuccess]: status === 'success',
                [styles.statusWarning]: status === 'warning',
                [styles.statusError]: status === 'error',
                [styles.statusValidating]: status === 'validating',
                [styles.hasFeedback]: hasFeedback,
            });
        };

        const iconClassNames: string = mergeClasses([
            styles.iconWrapper,
            { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
            { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
        ]);

        const iconButtonClassNames: string = mergeClasses([
            styles.iconButton,
            { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
            { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
        ]);

        const clearIconButtonClassNames: string = mergeClasses([
            styles.clearIconButton,
            { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
            { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
        ]);

        const textInputClassNames: string = mergeClasses([
            classNames,
            {
                [styles.inputSmall]:
                    mergedSize === TextInputSize.Flex && largeScreenActive,
            },
            {
                [styles.inputMedium]:
                    mergedSize === TextInputSize.Flex && mediumScreenActive,
            },
            {
                [styles.inputMedium]:
                    mergedSize === TextInputSize.Flex && smallScreenActive,
            },
            {
                [styles.inputLarge]:
                    mergedSize === TextInputSize.Flex && xSmallScreenActive,
            },
            { [styles.inputLarge]: mergedSize === TextInputSize.Large },
            { [styles.inputMedium]: mergedSize === TextInputSize.Medium },
            { [styles.inputSmall]: mergedSize === TextInputSize.Small },
            {
                [styles.withIcon]:
                    !!iconProps?.path &&
                    (mergedShape === TextInputShape.Rectangle ||
                        mergedShape === TextInputShape.Underline),
            },
            {
                [styles.withImageIcon]:
                    !!iconProps?.imageSrc &&
                    (mergedShape === TextInputShape.Rectangle ||
                        mergedShape === TextInputShape.Underline),
            },
            {
                [styles.withIconButton]:
                    !!iconButtonProps &&
                    (mergedShape === TextInputShape.Rectangle ||
                        mergedShape === TextInputShape.Underline),
            },
            {
                [styles.withIconAndIconButton]:
                    !!iconProps &&
                    !!iconButtonProps &&
                    (mergedShape === TextInputShape.Rectangle ||
                        mergedShape === TextInputShape.Underline),
            },
            { [styles.pillShape]: mergedShape === TextInputShape.Pill },
            {
                [styles.pillShapeWithIcon]:
                    !!iconProps?.path && mergedShape === TextInputShape.Pill,
            },
            {
                [styles.pillShapeWithImageIcon]:
                    !!iconProps?.imageSrc &&
                    mergedShape === TextInputShape.Pill,
            },
            {
                [styles.pillShapeWithIconButton]:
                    !!iconButtonProps && mergedShape === TextInputShape.Pill,
            },
            {
                [styles.pillShapeWithIconAndIconButton]:
                    !!iconProps &&
                    !!iconButtonProps &&
                    mergedShape === TextInputShape.Pill,
            },
            {
                [styles.underline]: mergedShape === TextInputShape.Underline,
            },
            {
                [styles.inputStretch]: inputWidth === TextInputWidth.fill,
            },
            { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
            { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
            { [styles.clearDisabled]: !clearable },
            { [styles.clearNotVisible]: !clearButtonShown },
            { ['in-form-item']: mergedFormItemInput },
            getStatusClassNames(mergedStatus, hasFeedback),
        ]);

        const textInputGroupClassNames: string = mergeClasses([
            styles.inputGroup,
            { [styles.inline]: inline },
            { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
            { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
            getStatusClassNames(mergedStatus, hasFeedback),
        ]);

        const textInputWrapperClassNames: string = mergeClasses([
            styles.inputWrapper,
            {
                [styles.inline]: inline,
            },
            {
                [styles.underline]: mergedShape === TextInputShape.Underline,
            },
            {
                [styles.inputSmall]:
                    mergedSize === TextInputSize.Flex && largeScreenActive,
            },
            {
                [styles.inputMedium]:
                    mergedSize === TextInputSize.Flex && mediumScreenActive,
            },
            {
                [styles.inputMedium]:
                    mergedSize === TextInputSize.Flex && smallScreenActive,
            },
            {
                [styles.inputLarge]:
                    mergedSize === TextInputSize.Flex && xSmallScreenActive,
            },
            { [styles.inputLarge]: mergedSize === TextInputSize.Large },
            { [styles.inputMedium]: mergedSize === TextInputSize.Medium },
            { [styles.inputSmall]: mergedSize === TextInputSize.Small },
            {
                [styles.inputStretch]: inputWidth === TextInputWidth.fill,
            },
            { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
            { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
            {
                [styles.disabled]: allowDisabledFocus || mergedDisabled,
            },
            { [styles.inputWrapperRtl]: htmlDir === 'rtl' },
            { ['in-form-item']: mergedFormItemInput },
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
                resolveOnChange(
                    inputField as HTMLInputElement,
                    _event as React.MouseEvent<HTMLElement, MouseEvent>,
                    onChange
                );
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

        const inputSizeToIconSizeMap = new Map<TextInputSize | Size, IconSize>([
            [TextInputSize.Flex, getIconSize()],
            [TextInputSize.Large, IconSize.Large],
            [TextInputSize.Medium, IconSize.Medium],
            [TextInputSize.Small, IconSize.Small],
        ]);

        const inputSizeToButtonSizeMap = new Map<
            TextInputSize | Size,
            ButtonSize | Size
        >([
            [TextInputSize.Flex, ButtonSize.Flex],
            [TextInputSize.Large, ButtonSize.Large],
            [TextInputSize.Medium, ButtonSize.Medium],
            [TextInputSize.Small, ButtonSize.Small],
        ]);

        const inputSizeToLabelSizeMap = new Map<
            TextInputSize | Size,
            LabelSize | Size
        >([
            [TextInputSize.Flex, LabelSize.Flex],
            [TextInputSize.Large, LabelSize.Large],
            [TextInputSize.Medium, LabelSize.Medium],
            [TextInputSize.Small, LabelSize.Small],
        ]);

        return (
            <div className={textInputWrapperClassNames}>
                {labelProps && (
                    <Label
                        inline={inline}
                        size={inputSizeToLabelSizeMap.get(mergedSize)}
                        {...labelProps}
                    />
                )}
                <div className={textInputGroupClassNames}>
                    <input
                        {...rest}
                        ref={ref}
                        aria-disabled={mergedDisabled}
                        aria-label={ariaLabel}
                        autoFocus={autoFocus}
                        className={textInputClassNames}
                        disabled={!allowDisabledFocus && mergedDisabled}
                        id={mergedFormItemInput ? id : inputId}
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
                                    size={inputSizeToIconSizeMap.get(
                                        mergedSize
                                    )}
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
                            allowDisabledFocus={
                                iconButtonProps.allowDisabledFocus
                            }
                            ariaLabel={iconButtonProps.ariaLabel}
                            checked={iconButtonProps.checked}
                            classNames={iconButtonClassNames}
                            disabled={
                                iconButtonProps.disabled || mergedDisabled
                            }
                            iconProps={{ path: iconButtonProps.iconProps.path }}
                            id={iconButtonProps.id}
                            onClick={iconButtonProps.onClick}
                            size={inputSizeToButtonSizeMap.get(mergedSize)}
                            htmlType={iconButtonProps.htmlType}
                        />
                    )}
                    {clearable &&
                        clearButtonShown &&
                        !numbersOnly &&
                        htmlType !== 'number' && (
                            <DefaultButton
                                allowDisabledFocus={allowDisabledFocus}
                                ariaLabel={clearButtonAriaLabel}
                                classNames={clearIconButtonClassNames}
                                disabled={mergedDisabled}
                                iconProps={{ path: IconName.mdiClose }}
                                onClick={
                                    !allowDisabledFocus ? handleOnClear : null
                                }
                                size={ButtonSize.Small}
                            />
                        )}
                </div>
            </div>
        );
    }
);
