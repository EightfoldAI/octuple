import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../ConfigProvider';
import {
  LinkButtonIconAlign,
  LinkButtonProps,
  LinkButtonShape,
  LinkButtonSize,
  LinkButtonTextAlign,
  LinkButtonVariant,
  LinkButtonWidth,
} from '.';
import { Icon, IconSize } from '../Icon';
import { Badge } from '../Badge';
import { InnerNudge, NudgeAnimation, NudgeProps } from '../Button/Nudge';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { mergeClasses } from '../../shared/utilities';
import { Loader, LoaderSize } from '../Loader';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useMergedRefs } from '../../hooks/useMergedRefs';
import { useNudge } from '../Button/Nudge/Hooks/useNudge';

import styles from './linkbutton.module.scss';

export const LinkButton: FC<LinkButtonProps> = React.forwardRef(
  (props: LinkButtonProps, ref: Ref<HTMLAnchorElement>) => {
    const {
      alignIcon = LinkButtonIconAlign.Left,
      alignText = LinkButtonTextAlign.Center,
      allowDisabledFocus = false,
      ariaLabel,
      classNames,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
      },
      counter,
      disabled = false,
      disruptive = false,
      dropShadow = false,
      floatingLinkButtonProps,
      nudgeProps: defaultNudgeProps,
      iconProps,
      linkButtonWidth = LinkButtonWidth.fitContent,
      loading = false,
      prefixIconProps,
      id,
      onClick,
      role = 'link',
      shape = LinkButtonShape.Pill,
      size = LinkButtonSize.Medium,
      style,
      target = '_self',
      text,
      transparent = false,
      variant = LinkButtonVariant.Default,
      ...rest
    } = props;
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const internalRef: React.MutableRefObject<HTMLAnchorElement> =
      useRef<HTMLAnchorElement>(null);

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

    const linkButtonClassNames: string = mergeClasses([
      classNames,
      styles.linkButton,
      { [styles.linkButtonDefault]: variant === LinkButtonVariant.Default },
      { [styles.linkButtonNeutral]: variant === LinkButtonVariant.Neutral },
      { [styles.linkButtonPrimary]: variant === LinkButtonVariant.Primary },
      { [styles.linkButtonSecondary]: variant === LinkButtonVariant.Secondary },
      { [styles.linkButtonSystemUi]: variant === LinkButtonVariant.SystemUI },
      {
        [styles.linkButtonDisruptive]:
          disruptive && variant === LinkButtonVariant.Default,
      },
      {
        [styles.linkButtonPrimaryDisruptive]:
          disruptive && variant === LinkButtonVariant.Primary,
      },
      {
        [styles.linkButtonSecondaryDisruptive]:
          disruptive && variant === LinkButtonVariant.Secondary,
      },
      {
        [styles.transparent]:
          transparent && variant === LinkButtonVariant.SystemUI,
      },
      {
        [styles.linkButtonSmall]:
          mergedSize === LinkButtonSize.Flex && largeScreenActive,
      },
      {
        [styles.linkButtonMedium]:
          mergedSize === LinkButtonSize.Flex && mediumScreenActive,
      },
      {
        [styles.linkButtonMedium]:
          mergedSize === LinkButtonSize.Flex && smallScreenActive,
      },
      {
        [styles.linkButtonLarge]:
          mergedSize === LinkButtonSize.Flex && xSmallScreenActive,
      },
      { [styles.linkButtonLarge]: mergedSize === LinkButtonSize.Large },
      { [styles.linkButtonMedium]: mergedSize === LinkButtonSize.Medium },
      { [styles.linkButtonSmall]: mergedSize === LinkButtonSize.Small },
      { [styles.pillShape]: shape === LinkButtonShape.Pill },
      {
        [styles.roundShape]: shape === LinkButtonShape.Round && !textExists,
      },
      { [styles.dropShadow]: dropShadow },
      { [styles.floating]: floatingLinkButtonProps?.enabled },
      { [styles.linkButtonRtl]: htmlDir === 'rtl' },
      {
        [styles.linkButtonConic]:
          !disruptive &&
          nudgeProps?.enabled &&
          nudgeProps?.animation === NudgeAnimation.Conic,
      },
      { [styles.linkButtonStretch]: linkButtonWidth === LinkButtonWidth.fill },
      { [styles.left]: alignText === LinkButtonTextAlign.Left },
      { [styles.right]: alignText === LinkButtonTextAlign.Right },
      {
        [styles.iconLeft]: iconExists && alignIcon === LinkButtonIconAlign.Left,
      },
      {
        [styles.iconRight]:
          iconExists && alignIcon === LinkButtonIconAlign.Right,
      },
      { [styles.disabled]: allowDisabledFocus || mergedDisabled },
      { [styles.loading]: loading },
    ]);

    const linkButtonTextClassNames: string = mergeClasses([
      {
        [styles.linkButtonTextSmall]:
          mergedSize === LinkButtonSize.Flex && largeScreenActive,
      },
      {
        [styles.linkButtonTextMedium]:
          mergedSize === LinkButtonSize.Flex && mediumScreenActive,
      },
      {
        [styles.linkButtonTextMedium]:
          mergedSize === LinkButtonSize.Flex && smallScreenActive,
      },
      {
        [styles.linkButtonTextLarge]:
          mergedSize === LinkButtonSize.Flex && xSmallScreenActive,
      },
      { [styles.linkButtonTextLarge]: mergedSize === LinkButtonSize.Large },
      { [styles.linkButtonTextMedium]: mergedSize === LinkButtonSize.Medium },
      { [styles.linkButtonTextSmall]: mergedSize === LinkButtonSize.Small },
    ]);

    const badgeClassNames: string = mergeClasses([
      styles.counter,
      linkButtonTextClassNames,
    ]);

    const handleOnClick = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const getLinkButtonIconSize = (): IconSize => {
      let iconSize: IconSize;
      if (mergedSize === LinkButtonSize.Flex && largeScreenActive) {
        iconSize = IconSize.Small;
      } else if (
        mergedSize === LinkButtonSize.Flex &&
        (mediumScreenActive || smallScreenActive)
      ) {
        iconSize = IconSize.Medium;
      } else if (mergedSize === LinkButtonSize.Flex && xSmallScreenActive) {
        iconSize = IconSize.Large;
      } else if (mergedSize === LinkButtonSize.Large) {
        iconSize = IconSize.Large;
      } else if (mergedSize === LinkButtonSize.Medium) {
        iconSize = IconSize.Medium;
      } else if (mergedSize === LinkButtonSize.Small) {
        iconSize = IconSize.Small;
      }
      return iconSize;
    };

    const getLoaderSize = (): LoaderSize => {
      let loaderSize: LoaderSize;
      if (size === LinkButtonSize.Flex && largeScreenActive) {
        loaderSize = LoaderSize.Small;
      } else if (
        size === LinkButtonSize.Flex &&
        (mediumScreenActive || smallScreenActive)
      ) {
        loaderSize = LoaderSize.Medium;
      } else if (size === LinkButtonSize.Flex && xSmallScreenActive) {
        loaderSize = LoaderSize.Large;
      } else if (size === LinkButtonSize.Large) {
        loaderSize = LoaderSize.Large;
      } else if (size === LinkButtonSize.Medium) {
        loaderSize = LoaderSize.Medium;
      } else if (size === LinkButtonSize.Small) {
        loaderSize = LoaderSize.Small;
      }
      return loaderSize;
    };

    const getLinkButtonLoader = (): JSX.Element =>
      loading && <Loader classNames={styles.loader} size={getLoaderSize()} />;

    const getLinkButtonIcon = (): JSX.Element => (
      <Icon
        {...iconProps}
        classNames={mergeClasses([styles.icon, iconProps.classNames])}
        size={getLinkButtonIconSize()}
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
        size={getLinkButtonIconSize()}
      />
    );

    const getLinkButtonContent = (
      buttonTextClassNames: string,
      text: string
    ): JSX.Element => (
      <span className={buttonTextClassNames}>
        {text ? text : 'Link button'}
        {counterExists && <Badge classNames={badgeClassNames}>{counter}</Badge>}
      </span>
    );

    return (
      <a
        {...rest}
        ref={mergedRef}
        aria-label={ariaLabel}
        aria-disabled={(!allowDisabledFocus && mergedDisabled) || loading}
        className={linkButtonClassNames}
        id={id}
        onClick={!allowDisabledFocus ? handleOnClick : null}
        role={role}
        style={style}
        target={target}
      >
        <InnerNudge
          classNames={mergeClasses([
            styles.innerNudge,
            {
              [styles.conic]: nudgeProps?.animation === NudgeAnimation.Conic,
            },
          ])}
          disruptive={disruptive}
          id={id ? `${id}-nudge` : 'link-button-nudge'}
          nudgeProps={nudgeProps}
          ref={innerNudgeRef}
          style={style}
        />
        {iconExists && prefixIconExists && !textExists && (
          <span>
            {getLinkButtonIcon()}
            {getPrefixIcon()}
          </span>
        )}
        {iconExists &&
          !textExists &&
          !prefixIconExists &&
          !counterExists &&
          getLinkButtonIcon()}
        {counterExists && !textExists && !loading && !iconExists && (
          <Badge classNames={badgeClassNames}>{counter}</Badge>
        )}
        {iconExists && counterExists && !textExists && !loading && (
          <span>
            {getLinkButtonIcon()}
            <Badge classNames={badgeClassNames}>{counter}</Badge>
            {prefixIconExists && getPrefixIcon()}
          </span>
        )}
        {iconExists && textExists && (
          <span>
            {getLinkButtonIcon()}
            {getLinkButtonContent(linkButtonTextClassNames, text)}
            {prefixIconExists && getPrefixIcon()}
          </span>
        )}
        {!iconExists && getLinkButtonContent(linkButtonTextClassNames, text)}
        {getLinkButtonLoader()}
      </a>
    );
  }
);
