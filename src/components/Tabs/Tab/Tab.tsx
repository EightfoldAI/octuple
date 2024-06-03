'use client';

import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { TabIconAlign, TabProps, TabSize, TabVariant } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipped } from 'react-flip-toolkit';

import { Icon, IconSize } from '../../Icon';
import { useConfig } from '../../ConfigProvider';
import { Badge } from '../../Badge';
import { Loader } from '../../Loader';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';

import styles from '../tabs.module.scss';

export const Tab: FC<TabProps> = React.forwardRef(
  (
    {
      ariaLabel,
      badgeContent,
      classNames,
      disabled,
      icon,
      label,
      loading,
      value,
      ...rest
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const {
      alignIcon,
      colorInvert,
      onTabClick,
      currentActiveTab,
      size,
      variant,
    } = useTabs();

    const iconExists: boolean = !!icon;
    const labelExists: boolean = !!label;
    const isActive: boolean = value === currentActiveTab;

    const { registeredTheme: { light = false } = {} } = useConfig();

    const tabClassNames: string = mergeClasses([
      styles.tab,
      { [styles.active]: isActive },
      { [styles.inverse]: light || colorInvert },
      { [styles.tabRtl]: htmlDir === 'rtl' },
      classNames,
    ]);

    const tabSizeToIconSizeMap = new Map<TabSize, IconSize>([
      [TabSize.Large, IconSize.Large],
      [TabSize.Medium, IconSize.Medium],
      [TabSize.Small, IconSize.Small],
      [TabSize.XSmall, IconSize.Small],
    ]);

    const getIcon = (): JSX.Element =>
      // TODO: Once sizes are implemented for other variants, use the mapping.
      // For now, a ternary determines if mapping vs using the default icon size (medium).
      iconExists && (
        <Icon
          path={icon}
          classNames={mergeClasses([
            styles.icon,
            { [styles.start]: alignIcon === TabIconAlign.Start && !!label },
            {
              [styles.end]:
                alignIcon === TabIconAlign.End && (!!label || !!badgeContent),
            },
          ])}
          size={
            variant === TabVariant.pill
              ? tabSizeToIconSizeMap.get(size)
              : IconSize.Medium
          }
        />
      );

    const getLabel = (): JSX.Element =>
      labelExists && <span className={styles.label}>{label}</span>;

    const getTabIndicator = (): JSX.Element =>
      isActive && (
        <Flipped flipId="tabIndicator">
          <div className={styles.tabIndicator} />
        </Flipped>
      );

    const getBadge = (): JSX.Element =>
      !!badgeContent &&
      !loading && (
        <Badge active={isActive} classNames={styles.badge}>
          {badgeContent}
        </Badge>
      );

    const getLoader = (): JSX.Element =>
      loading && <Loader classNames={styles.loader} />;

    return (
      <button
        {...rest}
        ref={ref}
        className={tabClassNames}
        aria-label={ariaLabel}
        aria-selected={isActive}
        role="tab"
        disabled={disabled}
        onClick={(e) => onTabClick(value, e)}
      >
        {alignIcon === TabIconAlign.Start && getIcon()}
        {getLabel()}
        {getTabIndicator()}
        {getBadge()}
        {alignIcon === TabIconAlign.End && getIcon()}
        {getLoader()}
      </button>
    );
  }
);
