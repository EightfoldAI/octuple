'use client';

import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import {
  TabIconAlign,
  TabProps,
  TabSize,
  TabVariant,
} from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipped } from 'react-flip-toolkit';

import { Icon, IconSize, IconName } from '../../Icon';
import { ThemeNames, useConfig } from '../../ConfigProvider';
import { Badge } from '../../Badge';
import { Loader } from '../../Loader';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';
import { Dropdown } from '../../Dropdown';
import { Menu, MenuSize } from '../../Menu';
import { MenuItemType } from '../../Menu/MenuItem/MenuItem.types';

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
      dropdownItems,
      dropdownPlacement = 'bottom-start',
      ...rest
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const htmlDir: string = useCanvasDirection();
    const tabRef = useRef(null);
    const combinedRef = useMergedRefs(ref, tabRef);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const hasDropdown = !!dropdownItems && dropdownItems.length > 0;

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
    } = useTabs();

    const iconExists: boolean = !!icon;
    const labelExists: boolean = !!label;
    // Tab is active if its value matches currentActiveTab OR if any of its dropdown items matches
    const isActive: boolean =
      value === currentActiveTab ||
      (hasDropdown &&
        !!dropdownItems?.some((item) => item.value === currentActiveTab));

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

    const getChevronIcon = (): JSX.Element =>
      hasDropdown && (
        <Icon
          path={IconName.mdiChevronDown}
          classNames={mergeClasses([
            (styles as any).dropdownChevron,
            { [(styles as any).dropdownChevronOpen]: dropdownVisible },
          ])}
          size={IconSize.Small}
        />
      );

    const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (enableArrowNav && index !== undefined) {
        handleKeyDown?.(e, index);
      }
    };

    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onTabClick(value, e);
    };

    const handleDropdownItemClick = (itemValue: string) => {
      onTabClick(itemValue, {
        currentTarget: tabRef.current,
      } as React.MouseEvent<HTMLElement>);
      setDropdownVisible(false);
    };

    const getDropdownOverlay = (): JSX.Element => {
      if (!hasDropdown) return null;

      const menuItems = dropdownItems.map((item) => ({
        text: item.label,
        value: item.value,
        disabled: item.disabled,
        iconProps: item.icon ? { path: item.icon } : undefined,
        type: MenuItemType.button,
        ariaLabel: item.ariaLabel || item.label,
        role: 'menuitem',
      }));

      return (
        <Menu
          items={menuItems}
          onChange={handleDropdownItemClick}
          role="menu"
          size={MenuSize.medium}
        />
      );
    };

    const getAriaAttributes = () => {
      const baseAttrs: React.ButtonHTMLAttributes<HTMLButtonElement> = {
        'aria-controls': hasDropdown
          ? `${ariaControls || `tab-dropdown-${value}`}`
          : ariaControls,
        'aria-label': ariaLabel,
        'aria-selected': isActive,
      };

      if (hasDropdown) {
        baseAttrs['aria-expanded'] = dropdownVisible;
        baseAttrs['aria-haspopup'] = 'menu';
      }

      return baseAttrs;
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

      // Return 0 for the least enabled index, -1 for others
      return index === leastActiveIndex ? 0 : -1;
    };

    const tabButton = (
      <button
        {...rest}
        {...getAriaAttributes()}
        ref={combinedRef}
        className={tabClassNames}
        role="tab"
        disabled={disabled}
        onClick={handleTabClick}
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
        {getChevronIcon()}
        {getLoader()}
      </button>
    );

    if (hasDropdown) {
      const dropdownId = `tab-dropdown-${value}`;
      return (
        <Dropdown
          overlay={getDropdownOverlay()}
          placement={dropdownPlacement}
          trigger="hover"
          visible={dropdownVisible}
          onVisibleChange={(visible) => {
            setDropdownVisible(visible);
          }}
          closeOnDropdownClick={true}
          closeOnOutsideClick={true}
          closeOnReferenceClick={false}
          ariaHaspopupValue="menu"
          role="menu"
          initialFocus
          offset={-0.5}
        >
          {React.cloneElement(tabButton, {
            'aria-controls': dropdownId,
            onClick: handleTabClick,
          })}
        </Dropdown>
      );
    }

    return tabButton;
  }
);
