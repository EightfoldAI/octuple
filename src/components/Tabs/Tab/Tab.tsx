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
      href,
      ...rest
    },
    ref: Ref<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const htmlDir: string = useCanvasDirection();
    const tabRef = useRef(null);
    const targetElementRef = useRef<HTMLElement | null>(null);
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
      theme,
      disabledTabIndexes,
      useNavigationMode,
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

    const getTabIndex = () => {
      const isActiveTabIndex = isActive ? 0 : -1;

      if (!enableArrowNav) {
        return 0;
      }

      if (currentActiveTab) {
        return isActiveTabIndex;
      }

      // Find the least active (enabled) index when no tab is currently active
      // Find the first enabled index (not in disabledTabIndexes)
      let leastActiveIndex = 0;
      while (disabledTabIndexes.includes(leastActiveIndex)) {
        leastActiveIndex++;
      }
      console.log('disabledTabIndexes>> :', disabledTabIndexes);
      console.log('leastActiveIndex>> :', leastActiveIndex);

      // Return 0 for the least enabled index, -1 for others
      return index === leastActiveIndex ? 0 : -1;
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      onTabClick(value, e);

      // For navigation mode with href, handle focus after navigation
      if (useNavigationMode && href) {
        e.preventDefault();
        const targetId = href.replace('#', '');

        if (
          !targetElementRef.current ||
          targetElementRef.current.id !== targetId
        ) {
          targetElementRef.current =
            tabRef.current?.ownerDocument?.getElementById(targetId) || null;
        }

        const targetElement = targetElementRef.current;

        if (targetElement) {
          // Scroll to the target element
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Set focus on the target element
          if (
            targetElement.tabIndex === -1 ||
            !targetElement.hasAttribute('tabindex')
          ) {
            targetElement.setAttribute('tabindex', '-1');
          }
          targetElement.focus();
        }
      }
    };

    // Determine if we should render as a link
    const isLink = useNavigationMode || !!href;
    const Element = isLink ? 'a' : 'button';

    // Build props based on element type
    const elementProps: any = {
      ...rest,
      ref: combinedRef,
      className: tabClassNames,
      'aria-label': ariaLabel,
      onClick: handleClick,
      onKeyDown: handleTabKeyDown,
      tabIndex: getTabIndex(),
      'data-index': index,
      'data-value': value,
    };

    if (isLink) {
      // Link-specific props
      elementProps.href = href || '#';
      elementProps.role = 'link';
      elementProps['aria-current'] = isActive ? 'location' : undefined;
      if (disabled) {
        elementProps['aria-disabled'] = true;
        elementProps.onClick = (e: React.MouseEvent<HTMLElement>) =>
          e.preventDefault();
      }
    } else {
      // Button-specific props
      elementProps['aria-controls'] = ariaControls;
      elementProps['aria-selected'] = isActive;
      elementProps.role = 'tab';
      elementProps.disabled = disabled;
    }

    return (
      <Element {...elementProps}>
        {alignIcon === TabIconAlign.Start && getIcon()}
        {getLabel()}
        {getTabIndicator()}
        {getBadge()}
        {alignIcon === TabIconAlign.End && getIcon()}
        {getLoader()}
      </Element>
    );
  }
);
