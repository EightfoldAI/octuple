'use client';

import React, { FC, Ref, useContext, useRef } from 'react';
import DisabledContext, {
  Disabled,
} from '../../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../../ConfigProvider';
import {
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  SplitButtonProps,
} from '../';
import { Icon, IconName, IconSize } from '../../Icon';
import { InnerNudge, NudgeAnimation } from '../Nudge';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { mergeClasses } from '../../../shared/utilities';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { useMergedRefs } from '../../../hooks/useMergedRefs';
import { useNudge } from '../Nudge/Hooks/useNudge';

import styles from '../button.module.scss';

export const SplitButton: FC<SplitButtonProps> = React.forwardRef(
  (props: SplitButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      alignText = ButtonTextAlign.Center,
      allowDisabledFocus = false,
      ariaLabel,
      classNames,
      checked = false,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
      },
      disabled = false,
      disruptive = false,
      dropShadow = false,
      gradient,
      iconProps,
      id,
      nudgeProps,
      onClick,
      shape = ButtonShape.Pill,
      size = ButtonSize.Medium,
      split,
      style,
      variant,
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

    const innerNudgeRef: React.MutableRefObject<HTMLSpanElement> =
      useRef<HTMLSpanElement>(null);

    useNudge(disruptive, nudgeProps, [internalRef, innerNudgeRef], styles);

    const splitButtonClassNames: string = mergeClasses([
      classNames,
      styles.splitButton,
      { [styles.splitRight]: split },
      { [styles.gradient]: gradient },
      {
        [styles.disabled]: allowDisabledFocus || mergedDisabled,
      },
    ]);

    const splitDividerClassNames: string = mergeClasses([
      styles.splitDivider,
      {
        [styles.splitDividerSmall]:
          mergedSize === ButtonSize.Flex && largeScreenActive,
      },
      {
        [styles.splitDividerMedium]:
          mergedSize === ButtonSize.Flex && mediumScreenActive,
      },
      {
        [styles.splitDividerMedium]:
          mergedSize === ButtonSize.Flex && smallScreenActive,
      },
      {
        [styles.splitDividerLarge]:
          mergedSize === ButtonSize.Flex && xSmallScreenActive,
      },
      { [styles.splitDividerLarge]: mergedSize === ButtonSize.Large },
      { [styles.splitDividerMedium]: mergedSize === ButtonSize.Medium },
      { [styles.splitDividerSmall]: mergedSize === ButtonSize.Small },
      { [styles.splitDividerPrimary]: variant === ButtonVariant.Primary },
      {
        [styles.splitDividerPrimaryDisruptive]:
          variant === ButtonVariant.Primary && disruptive,
      },
      { [styles.splitDividerSecondary]: variant === ButtonVariant.Secondary },
      {
        [styles.splitDividerSecondaryDisruptive]:
          variant === ButtonVariant.Secondary && disruptive,
      },
      { [styles.splitDividerDefault]: variant === ButtonVariant.Default },
      { [styles.splitDividerNeutral]: variant === ButtonVariant.Neutral },
      { [styles.splitDividerSystemUi]: variant === ButtonVariant.SystemUI },
      {
        [styles.splitDividerDisruptive]:
          variant === ButtonVariant.Default && disruptive,
      },
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

    const getButtonIconPath = (): IconName =>
      iconProps?.path
        ? iconProps.path
        : checked
        ? IconName.mdiChevronUp
        : IconName.mdiChevronDown;

    const getButtonIcon = (): JSX.Element => (
      <Icon
        {...iconProps}
        classNames={styles.icon}
        path={getButtonIconPath()}
        size={getButtonIconSize()}
      />
    );

    return (
      <button
        {...rest}
        ref={mergedRef}
        aria-disabled={mergedDisabled}
        aria-label={ariaLabel}
        aria-pressed={split ? !!checked : undefined}
        defaultChecked={checked}
        disabled={!allowDisabledFocus && mergedDisabled}
        className={splitButtonClassNames}
        id={id}
        onClick={!allowDisabledFocus ? onClick : null}
        style={style}
        type="button"
      >
        <InnerNudge
          classNames={mergeClasses([
            styles.innerNudge,
            {
              [styles.conic]: nudgeProps?.animation === NudgeAnimation.Conic,
            },
          ])}
          disruptive={disruptive}
          id={id ? `${id}-nudge` : 'split-nudge'}
          nudgeProps={nudgeProps}
          ref={innerNudgeRef}
          style={style}
        />
        {nudgeProps?.animation !== NudgeAnimation.Conic &&
          htmlDir === 'rtl' && (
            <span className={splitDividerClassNames} aria-hidden="true"></span>
          )}
        {getButtonIcon()}
        {nudgeProps?.animation !== NudgeAnimation.Conic &&
          htmlDir !== 'rtl' && (
            <span className={splitDividerClassNames} aria-hidden="true"></span>
          )}
      </button>
    );
  }
);
