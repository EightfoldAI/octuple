import React, { FC, Ref, useContext, useEffect, useState } from 'react';
import DisabledContext, {
  Disabled,
} from '../../ConfigProvider/DisabledContext';
import { ShapeContext, Shape, SizeContext, Size } from '../../ConfigProvider';
import { Icon, IconName, IconSize } from '../../Icon';
import { Label, LabelSize } from '../../Label';
import {
  TextAreaProps,
  TextInputShape,
  TextInputSize,
  TextInputWidth,
} from '../index';
import { FormItemInputContext } from '../../Form/Context';
import { ValidateStatus } from '../../Form/Form.types';
import { useDebounce } from '../../../hooks/useDebounce';
import {
  getMergedStatus,
  mergeClasses,
  uniqueId,
} from '../../../shared/utilities';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';

import styles from '../input.module.scss';

export const TextArea: FC<TextAreaProps> = React.forwardRef(
  (
    {
      allowDisabledFocus = false,
      ariaLabel,
      autoFocus = false,
      classNames,
      clear = false,
      configContextProps = {
        noDisabledContext: false,
        noShapeContext: false,
        noSizeContext: false,
      },
      disabled = false,
      enableExpand = false,
      formItemInput = false,
      id,
      inline = false,
      inputWidth = TextInputWidth.fitContent,
      labelProps,
      maxlength,
      minlength,
      name,
      onBlur,
      onChange,
      onClear,
      onFocus,
      onKeyDown,
      onReset,
      placeholder,
      readonly = false,
      readOnlyProps,
      required = false,
      reset = false,
      shape = TextInputShape.Rectangle,
      size = TextInputSize.Medium,
      status,
      style,
      textAreaCols = 50,
      textAreaRows = 5,
      value,
      waitInterval = 10,
      ...rest
    },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const htmlDir: string = useCanvasDirection();

    const textAreaId: string = !!id ? id : uniqueId('textarea-');
    const [inputValue, setInputValue] = useState(value);

    const {
      status: contextStatus,
      isFormItemInput,
      hasFeedback,
    } = useContext(FormItemInputContext);
    const mergedStatus = getMergedStatus(contextStatus, status);

    // Needed for form error scroll-into-view by id
    const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

    const inputField: HTMLElement = document.getElementById(
      mergedFormItemInput ? id : textAreaId
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

    const readOnlyIconClassNames: string = mergeClasses([
      styles.readOnlyIconWrapper,
      styles.rightIcon,
    ]);

    const textAreaClassNames: string = mergeClasses([
      classNames,
      styles.textArea,
      {
        [styles.inline]: inline,
      },
      { [styles.textAreaNoExpand]: !enableExpand },
      { [styles.pillShape]: mergedShape === TextInputShape.Pill },
      {
        [styles.underline]: mergedShape === TextInputShape.Underline,
      },
      { [styles.inputStretch]: inputWidth === TextInputWidth.fill },
      { [styles.readOnly]: !!readonly && !readOnlyProps?.noStyleChange },
      { ['in-form-item']: mergedFormItemInput },
      getStatusClassNames(mergedStatus, hasFeedback),
    ]);

    const textAreaGroupClassNames: string = mergeClasses([
      styles.textAreaGroup,
      {
        [styles.inline]: inline,
      },
      getStatusClassNames(mergedStatus, hasFeedback),
    ]);

    const textAreaWrapperClassNames: string = mergeClasses([
      styles.inputWrapper,
      { [styles.pillShape]: mergedShape === TextInputShape.Pill },
      {
        [styles.underline]: mergedShape === TextInputShape.Underline,
      },
      {
        [styles.inline]: inline,
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
      {
        [styles.disabled]: allowDisabledFocus || mergedDisabled,
      },
      { [styles.readOnly]: !!readonly && !readOnlyProps?.noStyleChange },
      { [styles.inputWrapperRtl]: htmlDir === 'rtl' },
    ]);

    useEffect(() => setInputValue(value), [value]);

    useEffect(() => {
      if (clear) {
        if (!!inputField && (inputField as HTMLInputElement).value !== '') {
          (inputField as HTMLInputElement).value = '';
          setInputValue('');
          onClear?.();
        }
      }
    }, [clear]);

    useEffect(() => {
      if (reset) {
        if (!!inputField && (inputField as HTMLInputElement).value !== value) {
          (inputField as HTMLInputElement).value = '';
          setInputValue(value);
          onReset?.();
        }
      }
    }, [reset]);

    const debouncedChange = useDebounce<React.ChangeEvent<HTMLTextAreaElement>>(
      (_event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        onChange?.(_event),
      waitInterval
    );

    // We need to persist the syntheticevent object, as useDebounce uses a timeout function internally
    // Reference: https://reactjs.org/docs/legacy-event-pooling.html
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <div className={textAreaWrapperClassNames}>
        {labelProps && (
          <Label
            inline={inline}
            size={inputSizeToLabelSizeMap.get(mergedSize)}
            {...labelProps}
          />
        )}
        <div className={textAreaGroupClassNames}>
          <textarea
            {...rest}
            ref={ref}
            aria-disabled={mergedDisabled}
            aria-label={ariaLabel}
            autoFocus={autoFocus}
            className={textAreaClassNames}
            cols={textAreaCols}
            disabled={!allowDisabledFocus && mergedDisabled}
            id={mergedFormItemInput ? id : textAreaId}
            maxLength={maxlength}
            minLength={minlength}
            name={name}
            onChange={!allowDisabledFocus ? handleChange : null}
            onBlur={!allowDisabledFocus ? onBlur : null}
            onFocus={!allowDisabledFocus ? onFocus : null}
            onKeyDown={!allowDisabledFocus ? onKeyDown : null}
            placeholder={placeholder}
            readOnly={readonly}
            required={required}
            style={style}
            rows={textAreaRows}
            tabIndex={0}
            value={inputValue}
          />
          {enableExpand && (
            <Icon
              classNames={styles.textAreaResizeIcon}
              path={IconName.mdiResizeBottomRight}
              rotate={htmlDir === 'rtl' ? 90 : 0}
            />
          )}
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
    );
  }
);
