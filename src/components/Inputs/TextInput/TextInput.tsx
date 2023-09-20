import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import DisabledContext, {
  Disabled,
} from '../../ConfigProvider/DisabledContext';
import { ShapeContext, Shape, SizeContext, Size } from '../../ConfigProvider';
import { ButtonShape, ButtonSize, SystemUIButton } from '../../Button';
import { Icon, IconName, IconSize } from '../../Icon';
import { Label, LabelSize } from '../../Label';
import {
  TextInputIconAlign,
  TextInputProps,
  TextInputShape,
  TextInputSize,
  TextInputWidth,
} from '../index';
import { FormItemInputContext } from '../../Form/Context';
import { ValidateStatus } from '../../Form/Form.types';
import { useDebounce } from '../../../hooks/useDebounce';
import {
  eventKeys,
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
      autocomplete,
      autoFocus = false,
      classNames,
      clear = false,
      clearable = true,
      clearButtonAriaLabel,
      clearButtonClassNames,
      configContextProps = {
        noDisabledContext: false,
        noShapeContext: false,
        noSizeContext: false,
      },
      disabled = false,
      expandable = false,
      expandRight = false,
      formItemInput = false,
      groupClassNames,
      htmlType = 'text',
      iconProps,
      iconButtonProps,
      id,
      inline = false,
      inputWidth = TextInputWidth.fitContent,
      labelProps,
      maxlength,
      minlength,
      max,
      min,
      name,
      numbersOnly = false,
      onBlur,
      onChange,
      onClear,
      onFocus,
      onKeyDown,
      onReset,
      placeholder,
      readonly = false,
      readOnlyProps,
      reset = false,
      required = false,
      role = 'textbox',
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

    const [clearButtonShown, _setClearButtonShown] = useState<boolean>(false);
    const inputId: string = !!id ? id : uniqueId('input-');

    const clearButtonRef: React.MutableRefObject<HTMLButtonElement> =
      useRef<HTMLButtonElement>(null);

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

    const readOnlyIconClassNames: string = mergeClasses([
      styles.readOnlyIconWrapper,
      styles.rightIcon,
    ]);

    const iconButtonClassNames: string = mergeClasses([
      styles.iconButton,
      { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
      { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
    ]);

    const clearIconButtonClassNames: string = mergeClasses([
      styles.clearIconButton,
      { [styles.clearIconButtonRtl]: htmlDir === 'rtl' },
      { [styles.leftIcon]: alignIcon === TextInputIconAlign.Left },
      { [styles.rightIcon]: alignIcon === TextInputIconAlign.Right },
      clearButtonClassNames,
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
          !!iconProps?.imageSrc && mergedShape === TextInputShape.Pill,
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
      { [styles.readOnly]: !!readonly && !readOnlyProps?.noStyleChange },
      { ['in-form-item']: mergedFormItemInput },
      getStatusClassNames(mergedStatus, hasFeedback),
    ]);

    const textInputGroupClassNames: string = mergeClasses([
      groupClassNames,
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
      { [styles.readOnly]: !!readonly && !readOnlyProps?.noStyleChange },
      { [styles.inputWrapperRtl]: htmlDir === 'rtl' },
      { ['in-form-item']: mergedFormItemInput },
      { [styles.isExpandable]: expandable },
      { [styles.expandRight]: expandable && expandRight },
    ]);

    useEffect(() => {
      setInputValue(value);
      if (value?.toString()?.length > 0) {
        return setClearButtonShown(true);
      }
      setClearButtonShown(false);
    }, [value]);

    useEffect(() => {
      if (reset) {
        if (!!inputField && (inputField as HTMLInputElement).value !== value) {
          (inputField as HTMLInputElement).value = '';
          setInputValue(value);
          onReset?.();
        }
      }
    }, [reset]);

    const setClearButtonShown = (showClear: boolean) => {
      return !clearable
        ? _setClearButtonShown(false)
        : _setClearButtonShown(showClear);
    };

    useEffect(() => {
      if (clear) {
        clearButtonRef.current?.click();
      }
    }, [clear]);

    const handleOnKeydownClear = (_event: React.KeyboardEvent) => {
      if (
        document.activeElement !== clearButtonRef?.current &&
        _event.key === eventKeys.ENTER
      ) {
        return;
      }
      handleOnClear;
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

    const debouncedChange = useDebounce<React.ChangeEvent<HTMLInputElement>>(
      (_event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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

    const inputShapeToButtonShapeMap = new Map<
      TextInputShape | Shape,
      ButtonShape
    >([
      [TextInputShape.Pill, ButtonShape.Round],
      [TextInputShape.Rectangle, ButtonShape.Rectangle],
      [TextInputShape.Underline, ButtonShape.Rectangle],
    ]);

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

    const getIconButton = (): JSX.Element => (
      <SystemUIButton
        allowDisabledFocus={iconButtonProps.allowDisabledFocus}
        ariaLabel={iconButtonProps.ariaLabel}
        checked={iconButtonProps.checked}
        classNames={iconButtonClassNames}
        disabled={iconButtonProps.disabled || mergedDisabled}
        htmlType={iconButtonProps.htmlType}
        iconProps={{
          path: iconButtonProps.iconProps.path,
        }}
        id={iconButtonProps.id}
        onClick={
          !iconButtonProps.disabled && !mergedDisabled
            ? iconButtonProps.onClick
            : null
        }
        shape={inputShapeToButtonShapeMap.get(shape)}
        size={inputSizeToButtonSizeMap.get(mergedSize)}
        transparent
      />
    );

    return (
      <div className={textInputWrapperClassNames}>
        {labelProps && (
          <Label
            inline={inline}
            size={inputSizeToLabelSizeMap.get(mergedSize)}
            {...labelProps}
          />
        )}
        <div className={styles.expandableWrapper}>
          <div className={textInputGroupClassNames}>
            <input
              {...rest}
              ref={ref}
              aria-disabled={mergedDisabled}
              aria-label={ariaLabel}
              autoComplete={autocomplete}
              autoFocus={autoFocus}
              className={textInputClassNames}
              disabled={!allowDisabledFocus && mergedDisabled}
              id={mergedFormItemInput ? id : inputId}
              maxLength={maxlength}
              minLength={minlength}
              max={max}
              min={min}
              name={name}
              onChange={!allowDisabledFocus ? handleChange : null}
              onBlur={!allowDisabledFocus ? onBlur : null}
              onFocus={!allowDisabledFocus ? onFocus : null}
              onKeyDown={!allowDisabledFocus ? onKeyDown : null}
              placeholder={placeholder}
              readOnly={readonly}
              required={required}
              role={role}
              style={style}
              tabIndex={0}
              type={numbersOnly ? 'number' : htmlType}
              value={inputValue}
            />
            {expandable && iconButtonProps && (
              <SystemUIButton
                classNames={styles.expandableThumb}
                transparent
                allowDisabledFocus={iconButtonProps.allowDisabledFocus}
                ariaLabel={iconButtonProps.ariaLabel}
                checked={iconButtonProps.checked}
                disabled={iconButtonProps.disabled || mergedDisabled}
                iconProps={{
                  path: iconButtonProps.iconProps.path,
                }}
                id={iconButtonProps.id}
                shape={inputShapeToButtonShapeMap.get(shape)}
                size={inputSizeToButtonSizeMap.get(mergedSize)}
                htmlType={iconButtonProps.htmlType}
              />
            )}
            <div className={styles.actionWrapper}>
              <div className={styles.overlay}></div>
              {iconProps && (
                <div className={iconClassNames}>
                  {iconProps.path && !iconProps.imageSrc && (
                    <Icon
                      {...iconProps}
                      path={iconProps.path}
                      size={inputSizeToIconSizeMap.get(mergedSize)}
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
              {iconButtonProps &&
                alignIcon === TextInputIconAlign.Left &&
                getIconButton()}
              {clearable &&
                clearButtonShown &&
                !numbersOnly &&
                htmlType !== 'number' &&
                (!readonly || (readonly && readOnlyProps?.clearable)) && (
                  <SystemUIButton
                    ref={clearButtonRef}
                    allowDisabledFocus={allowDisabledFocus}
                    ariaLabel={clearButtonAriaLabel}
                    classNames={clearIconButtonClassNames}
                    disabled={mergedDisabled}
                    htmlType={'button'}
                    iconProps={{ path: IconName.mdiClose }}
                    onClick={!allowDisabledFocus ? handleOnClear : null}
                    onKeyDown={
                      !allowDisabledFocus ? handleOnKeydownClear : null
                    }
                    shape={inputShapeToButtonShapeMap.get(shape)}
                    size={ButtonSize.Small}
                    transparent
                  />
                )}
              {iconButtonProps &&
                alignIcon === TextInputIconAlign.Right &&
                getIconButton()}
              {readonly && !readOnlyProps?.noStyleChange && (
                <div className={readOnlyIconClassNames}>
                  <Icon
                    path={IconName.mdiLock}
                    {...readOnlyProps?.iconProps}
                    size={inputSizeToIconSizeMap.get(mergedSize)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
