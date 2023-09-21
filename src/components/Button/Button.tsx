import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../ConfigProvider';
import {
  ButtonIconAlign,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
  SplitButton,
} from '.';
import { Icon, IconSize } from '../Icon';
import { Badge } from '../Badge';
import { InnerNudge, NudgeAnimation, NudgeProps } from './Nudge';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { mergeClasses } from '../../shared/utilities';
import { Loader, LoaderSize } from '../Loader';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useMergedRefs } from '../../hooks/useMergedRefs';
import { useNudge } from './Nudge/Hooks/useNudge';

import styles from './button.module.scss';

export const Button: FC<ButtonProps> = React.forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
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
      nudgeProps: defaultNudgeProps,
      htmlType,
      iconProps,
      id,
      loading = false,
      onClick,
      onContextMenu,
      prefixIconProps,
      shape = ButtonShape.Pill,
      size = ButtonSize.Medium,
      split,
      splitButtonChecked = false,
      splitButtonProps,
      style,
      text,
      toggle,
      transparent = false,
      type, // TODO: Remove in Octuple v3.0.0 and use `variant` only.
      variant = ButtonVariant.Default,
      ...rest
    } = props;
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const internalRef: React.MutableRefObject<HTMLButtonElement> =
      useRef<HTMLButtonElement>(null);

    const mergedRef = useMergedRefs(internalRef, ref);

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
    const prefixIconExists: boolean = !!prefixIconProps;
    const textExists: boolean = !!text;

    const [nudgeProps, setNudgeProps] = useState<NudgeProps>(defaultNudgeProps);
    const innerNudgeRef: React.MutableRefObject<HTMLSpanElement> =
      useRef<HTMLSpanElement>(null);

    useEffect(() => {
      setNudgeProps(
        props.nudgeProps
          ? props.nudgeProps
          : {
              animation: NudgeAnimation.Background,
              delay: 2000,
              iterations: 1,
              enabled: false,
            }
      );
    }, [nudgeProps?.enabled]);

    useNudge(disruptive, nudgeProps, [internalRef, innerNudgeRef], styles);

    // TODO: Remove in Octuple v3.0.0 and use `variant` only.
    // For now, if `type` has a value use it, else use `variant`.
    const mergedVariant: ButtonVariant = !!type ? type : variant;

    const buttonSharedClassNames: string = mergeClasses([
      classNames,
      styles.button,
      { [styles.buttonDefault]: mergedVariant === ButtonVariant.Default },
      { [styles.buttonNeutral]: mergedVariant === ButtonVariant.Neutral },
      { [styles.buttonPrimary]: mergedVariant === ButtonVariant.Primary },
      { [styles.buttonSecondary]: mergedVariant === ButtonVariant.Secondary },
      { [styles.buttonSystemUi]: mergedVariant === ButtonVariant.SystemUI },
      {
        [styles.buttonDisruptive]:
          disruptive && mergedVariant === ButtonVariant.Default,
      },
      {
        [styles.buttonPrimaryDisruptive]:
          disruptive && mergedVariant === ButtonVariant.Primary,
      },
      {
        [styles.buttonSecondaryDisruptive]:
          disruptive && mergedVariant === ButtonVariant.Secondary,
      },
      {
        [styles.transparent]:
          transparent && mergedVariant === ButtonVariant.SystemUI,
      },
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
      { [styles.disabled]: allowDisabledFocus || mergedDisabled },
      { [styles.floating]: floatingButtonProps?.enabled },
      { [styles.buttonRtl]: htmlDir === 'rtl' },
      {
        [styles.buttonConic]:
          !disruptive &&
          nudgeProps?.enabled &&
          nudgeProps?.animation === NudgeAnimation.Conic,
      },
    ]);

    const buttonClassNames: string = mergeClasses([
      buttonSharedClassNames,
      { [styles.buttonStretch]: buttonWidth === ButtonWidth.fill },
      { [styles.splitLeft]: split },
      { [styles.left]: alignText === ButtonTextAlign.Left },
      { [styles.right]: alignText === ButtonTextAlign.Right },
      {
        [styles.iconLeft]: iconExists && alignIcon === ButtonIconAlign.Left,
      },
      {
        [styles.iconRight]: iconExists && alignIcon === ButtonIconAlign.Right,
      },
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
        <Loader
          classNames={styles.loader}
          dotClassNames={styles.loaderDot}
          size={getLoaderSize()}
        />
      );

    const getButtonIcon = (): JSX.Element => (
      <Icon
        {...iconProps}
        classNames={mergeClasses([styles.icon, iconProps.classNames])}
        size={getButtonIconSize()}
      />
    );

    const getPrefixIcon = (): JSX.Element => (
      <Icon
        {...prefixIconProps}
        classNames={mergeClasses([
          styles.icon,
          styles.prefixIcon,
          prefixIconProps.classNames,
        ])}
        size={getButtonIconSize()}
      />
    );

    const getButtonContent = (
      buttonTextClassNames: string,
      text: string
    ): JSX.Element => (
      <span className={buttonTextClassNames}>
        {text ? text : 'Button'}
        {counterExists && <Badge classNames={badgeClassNames}>{counter}</Badge>}
      </span>
    );

    return (
      <>
        <button
          {...rest}
          ref={mergedRef}
          aria-checked={toggle ? !!checked : undefined}
          aria-disabled={mergedDisabled || loading}
          aria-label={ariaLabel}
          aria-pressed={toggle ? !!checked : undefined}
          defaultChecked={checked}
          disabled={(!allowDisabledFocus && mergedDisabled) || loading}
          className={buttonClassNames}
          id={id}
          onClick={!allowDisabledFocus ? onClick : null}
          style={style}
          type={htmlType}
        >
          <InnerNudge
            classNames={mergeClasses([
              styles.innerNudge,
              {
                [styles.conic]: nudgeProps?.animation === NudgeAnimation.Conic,
              },
            ])}
            disruptive={disruptive}
            id={id ? `${id}-nudge` : 'button-nudge'}
            nudgeProps={nudgeProps}
            ref={innerNudgeRef}
            style={style}
          />
          {iconExists && prefixIconExists && !textExists && (
            <span>
              {getButtonIcon()}
              {getPrefixIcon()}
            </span>
          )}
          {iconExists &&
            !textExists &&
            !prefixIconExists &&
            !counterExists &&
            getButtonIcon()}
          {counterExists && !textExists && !loading && !iconExists && (
            <Badge classNames={badgeClassNames}>{counter}</Badge>
          )}
          {iconExists && counterExists && !textExists && !loading && (
            <span>
              {getButtonIcon()}
              <Badge classNames={badgeClassNames}>{counter}</Badge>
              {prefixIconExists && getPrefixIcon()}
            </span>
          )}
          {iconExists && textExists && (
            <span>
              {getButtonIcon()}
              {getButtonContent(buttonTextClassNames, text)}
              {prefixIconExists && getPrefixIcon()}
            </span>
          )}
          {!iconExists && getButtonContent(buttonTextClassNames, text)}
          {getButtonLoader()}
        </button>
        {split && (
          <SplitButton
            {...splitButtonProps}
            classNames={
              buttonSharedClassNames + ' ' + splitButtonProps?.classNames
            }
            checked={splitButtonChecked}
            disruptive={disruptive}
            dropShadow={dropShadow}
            nudgeProps={nudgeProps}
            onClick={
              !splitButtonProps?.allowDisabledFocus ? onContextMenu : null
            }
            shape={shape}
            size={mergedSize}
            split={split}
            variant={mergedVariant}
          />
        )}
      </>
    );
  }
);
