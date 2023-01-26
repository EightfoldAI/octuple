import React, { FC, Ref, useContext, useRef } from 'react';
import DisabledContext, {
  Disabled,
} from '../../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../../ConfigProvider';
import {
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonType,
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
      iconProps,
      id,
      nudgeProps,
      onClick,
      shape = ButtonShape.Pill,
      size = ButtonSize.Medium,
      split,
      style,
      type,
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

    useNudge(disruptive, nudgeProps, [internalRef, innerNudgeRef]);

    const splitButtonClassNames: string = mergeClasses([
      classNames,
      styles.splitButton,
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
      { [styles.dropShadow]: dropShadow },
      { [styles.splitRight]: split },
      {
        [styles.disabled]: allowDisabledFocus || mergedDisabled,
      },
      {
        [styles.buttonConic]:
          !disruptive &&
          nudgeProps?.enabled &&
          nudgeProps?.animation === NudgeAnimation.Conic,
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
      { [styles.splitDividerPrimary]: type === ButtonType.Primary },
      {
        [styles.splitDividerPrimaryDisruptive]:
          type === ButtonType.Primary && disruptive,
      },
      { [styles.splitDividerSecondary]: type === ButtonType.Secondary },
      {
        [styles.splitDividerSecondaryDisruptive]:
          type === ButtonType.Secondary && disruptive,
      },
      { [styles.splitDividerDefault]: type === ButtonType.Default },
      { [styles.splitDividerNeutral]: type === ButtonType.Neutral },
      { [styles.splitDividerSystemUi]: type === ButtonType.SystemUI },
      {
        [styles.splitDividerDisruptive]:
          type === ButtonType.Default && disruptive,
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
        aria-checked={split ? !!checked : undefined}
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
