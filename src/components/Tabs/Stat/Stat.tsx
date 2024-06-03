'use client';

import React, { FC, Ref, useContext } from 'react';
import GradientContext, {
  Gradient,
} from '../../ConfigProvider/GradientContext';
import { StatProps, StatThemeName, TabSize } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Button, ButtonSize } from '../../Button';
import { Icon } from '../../Icon';
import { Loader } from '../../Loader';
import { Stack, StackGap } from '../../Stack';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../tabs.module.scss';

const MEDIUM_ICON_SIZE: string = '40px';
const SMALL_ICON_SIZE: string = '32px';
const XSMALL_ICON_SIZE: string = '24px';

export const Stat: FC<StatProps> = React.forwardRef(
  (
    {
      ariaLabel,
      buttonProps,
      classNames,
      configContextProps = {
        noGradientContext: false,
      },
      disabled,
      direction = 'horizontal',
      fullWidth = false,
      gradient = false,
      icon,
      label,
      loading,
      ratioA,
      ratioB,
      size = TabSize.Medium,
      status,
      theme,
      value,
      ...rest
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const {
      currentActiveTab,
      lineClamp,
      maxWidth,
      statgrouptheme,
      readOnly,
      onTabClick,
    } = useTabs();

    const mergedTheme: StatThemeName = theme ?? statgrouptheme;

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const iconExists: boolean = !!icon;
    const labelExists: boolean = !!label;
    const ratioAExists: boolean = !!ratioA;
    const ratioBExists: boolean = !!ratioB;
    const isActive: boolean = value === currentActiveTab;

    const tabClassName: string = mergeClasses([
      styles.tab,
      (styles as any)[`${mergedTheme}`],
      {
        [styles.gradient]: mergedGradient,
        [styles.readOnly]: !!readOnly,
        [styles.active]: isActive && !readOnly,
        [styles.statusSuccess]: status === 'success',
        [styles.statusWarning]: status === 'warning',
        [styles.statusError]: status === 'error',
        [styles.vertical]: direction === 'vertical',
        [styles.fullWidth]: fullWidth && direction === 'vertical',
        [styles.tabRtl]: htmlDir === 'rtl',
      },
      classNames,
    ]);

    const tabSizeToIconSizeMap = new Map<TabSize, string>([
      [TabSize.Medium, MEDIUM_ICON_SIZE],
      [TabSize.Small, SMALL_ICON_SIZE],
      [TabSize.XSmall, XSMALL_ICON_SIZE],
    ]);

    const getIcon = (): JSX.Element =>
      iconExists && (
        <Icon
          path={icon}
          classNames={styles.icon}
          size={tabSizeToIconSizeMap.get(size)}
        />
      );

    const getLabel = (): JSX.Element =>
      labelExists && (
        <span
          className={mergeClasses([
            styles.label,
            { [styles.lineClamp]: lineClamp },
          ])}
          style={lineClamp ? { WebkitLineClamp: lineClamp } : null}
        >
          {label}
        </span>
      );

    const getRatioA = (): JSX.Element =>
      ratioAExists && <span className={styles.ratioA}>{ratioA}</span>;

    const getRatioB = (): JSX.Element =>
      ratioBExists && <span className={styles.ratioB}>{ratioB}</span>;

    const getLoader = (): JSX.Element =>
      loading && <Loader classNames={styles.loader} />;

    const tabSizeToGapMap = new Map<TabSize, StackGap>([
      [TabSize.Medium, 'm'],
      [TabSize.Small, 's'],
      [TabSize.XSmall, 'xxs'],
    ]);

    const tabSizeToButtonSizeMap = new Map<TabSize, ButtonSize>([
      [TabSize.Medium, ButtonSize.Large],
      [TabSize.Small, ButtonSize.Medium],
      [TabSize.XSmall, ButtonSize.Small],
    ]);

    return (
      <button
        {...rest}
        ref={ref}
        className={tabClassName}
        aria-label={ariaLabel}
        aria-selected={!readOnly && isActive}
        role="tab"
        disabled={disabled}
        onClick={!readOnly ? (e) => onTabClick(value, e) : null}
        style={{ ...rest.style, maxWidth }}
      >
        <Stack
          direction="horizontal"
          fullWidth
          flexGap={tabSizeToGapMap.get(size)}
          justify="center"
          align="center"
        >
          {getIcon()}
          <Stack direction="vertical" fullWidth>
            {getLabel()}
            <span className={styles.label}>
              {getRatioA()} {getRatioB()}
            </span>
            {getLoader()}
          </Stack>
          {!!buttonProps && (
            <Button size={tabSizeToButtonSizeMap.get(size)} {...buttonProps} />
          )}
        </Stack>
      </button>
    );
  }
);
