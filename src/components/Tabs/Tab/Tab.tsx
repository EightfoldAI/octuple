'use client';

import React, { FC, Ref, useEffect, useRef } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { TabIconAlign, TabProps, TabSize, TabVariant } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipped } from 'react-flip-toolkit';

import { Icon, IconSize } from '../../Icon';
import { ThemeNames, useConfig } from '../../ConfigProvider';
import { Badge } from '../../Badge';
import { Loader } from '../../Loader';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';

import { useMergedRefs } from '../../../hooks/useMergedRefs';
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
      ariaControls,
      index = 0,
      ...rest
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const htmlDir: string = useCanvasDirection();
    const tabRef = useRef(null);
    const combinedRef = useMergedRefs(ref, tabRef);

    const {
      alignIcon,
      colorInvert,
      onTabClick,
      currentActiveTab,
      size,
      variant,
      enableArrowNav,
      handleKeyDown,
      registerTab,
      focusedTabIndex,
      theme,
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
      { [styles.aiAgent]: theme === ThemeNames.AIAgent },
      classNames,
    ]);

    const tabSizeToIconSizeMap = new Map<TabSize, IconSize>([
      [TabSize.Large, IconSize.Large],
      [TabSize.Medium, IconSize.Medium],
      [TabSize.Small, IconSize.Small],
      [TabSize.XSmall, IconSize.Small],
    ]);

    useEffect(() => {
      if (registerTab) {
        registerTab(tabRef.current, index);
      }
    }, [registerTab, index]);

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

    const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (enableArrowNav && index !== undefined) {
        handleKeyDown?.(e, index);
      }
    };

    const currentActiveTabIndex =
      parseInt(currentActiveTab.match(/\d+/)?.[0] || '0', 10) - 1;

    const getTabIndex = () => {
      if (
        currentActiveTabIndex !== undefined &&
        currentActiveTabIndex !== null &&
        index === currentActiveTabIndex
      ) {
        return 0;
      }
      return -1;
    };

    return (
      <button
        {...rest}
        aria-controls={ariaControls}
        ref={combinedRef}
        className={tabClassNames}
        aria-label={ariaLabel}
        aria-selected={isActive}
        role="tab"
        disabled={disabled}
        onClick={(e) => onTabClick(value, e)}
        onKeyDown={handleTabKeyDown}
        tabIndex={getTabIndex()}
        data-index={index}
        data-value={value}
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
