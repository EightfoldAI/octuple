import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import DisabledContext, {
  Disabled,
} from '../../ConfigProvider/DisabledContext';
import { SizeContext, Size } from '../../ConfigProvider';
import {
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonWidth,
  TwoStateButtonProps,
} from '../';
import { Badge } from '../../Badge';
import { Icon, IconSize } from '../../Icon';
import { InnerNudge, NudgeAnimation, NudgeProps } from '../Nudge';
import { Breakpoints, useMatchMedia } from '../../../hooks/useMatchMedia';
import { mergeClasses } from '../../../shared/utilities';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { useMergedRefs } from '../../../hooks/useMergedRefs';
import { useNudge } from '../Nudge/Hooks/useNudge';

import styles from '../button.module.scss';

export const TwoStateButton: FC<TwoStateButtonProps> = React.forwardRef(
  (props: TwoStateButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      alignText = ButtonTextAlign.Center,
      allowDisabledFocus = false,
      ariaLabel,
      buttonWidth = ButtonWidth.fitContent,
      classNames,
      checked = false,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
      },
      counter,
      disabled = false,
      disruptive = false,
      dropShadow = false,
      iconOneProps,
      iconTwoProps,
      id,
      nudgeProps: defaultNudgeProps,
      onClick,
      shape = ButtonShape.Pill,
      size = ButtonSize.Medium,
      style,
      text,
      toggle,
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

    const counterExists: boolean = !!counter;
    const iconOneExists: boolean = !!iconOneProps;
    const iconTwoExists: boolean = !!iconTwoProps;
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

    useNudge(disruptive, nudgeProps, [internalRef, innerNudgeRef]);

    const twoStateButtonClassNames: string = mergeClasses([
      classNames,
      styles.button,
      styles.twoStateButton,
      { [styles.checked]: checked },
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
      { [styles.buttonStretch]: buttonWidth === ButtonWidth.fill },
      { [styles.pillShape]: shape === ButtonShape.Pill },
      { [styles.dropShadow]: dropShadow },
      { [styles.left]: alignText === ButtonTextAlign.Left },
      { [styles.right]: alignText === ButtonTextAlign.Right },
      { [styles.disabled]: allowDisabledFocus || mergedDisabled },
      { [styles.buttonRtl]: htmlDir === 'rtl' },
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

    const getButtonIcon = (position: string): JSX.Element => (
      <Icon
        {...(position === 'left' ? iconOneProps : iconTwoProps)}
        classNames={styles.icon}
        size={getButtonIconSize()}
      />
    );

    const getButtonText = (
      buttonTextClassNames: string,
      text: string
    ): JSX.Element => (
      <span className={buttonTextClassNames}>{text ? text : 'Button'}</span>
    );

    return (
      <button
        {...rest}
        ref={mergedRef}
        aria-checked={toggle ? !!checked : undefined}
        aria-disabled={mergedDisabled}
        aria-label={ariaLabel}
        aria-pressed={toggle ? !!checked : undefined}
        defaultChecked={checked}
        disabled={!allowDisabledFocus && mergedDisabled}
        className={twoStateButtonClassNames}
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
          id={id ? `${id}-nudge` : 'two-state-nudge'}
          nudgeProps={nudgeProps}
          ref={innerNudgeRef}
          style={style}
        />
        <span className={styles.twoStateButtonContent}>
          <span className={styles.column + ' ' + styles.columnOne}>
            {iconOneExists && getButtonIcon('left')}
            {textExists && getButtonText(buttonTextClassNames, text)}
            {counterExists && (
              <Badge classNames={badgeClassNames}>{counter}</Badge>
            )}
          </span>
          <span className={styles.column}>
            {iconTwoExists && getButtonIcon('right')}
          </span>
        </span>
      </button>
    );
  }
);
