import React, { createContext, useEffect, useState, useRef } from 'react';
import {
  TabsContextProps,
  ITabsContext,
  TabSize,
  TabValue,
  TabVariant,
  SelectTabEvent,
  TabIconAlign,
} from './Tabs.types';

const TabsContext = createContext<Partial<ITabsContext>>({});

const TabsProvider = ({
  alignIcon = TabIconAlign.Start,
  children,
  colorInvert = false,
  configContextProps = {
    noThemeContext: false,
  },
  direction = 'horizontal',
  fullWidth = false,
  lineClamp,
  maxWidth,
  onChange,
  readOnly,
  size = TabSize.Medium,
  theme,
  themeContainerId,
  statgrouptheme,
  value,
  variant = TabVariant.default,
  enableArrowNav,
  disabledTabIndexes,
}: TabsContextProps) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<TabValue>(value);

  useEffect(() => {
    setCurrentActiveTab(value);
  }, [value]);

  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (tabsContainerRef.current && enableArrowNav) {
      createTabs(tabsContainerRef.current);
    }
  }, [tabsContainerRef, enableArrowNav]);

  const onTabClick = (value: TabValue, e: SelectTabEvent) => {
    onChange(value, e);
  };

  const createTabs = (groupNode: HTMLElement) => {
    if (!enableArrowNav) return;
    const tablistNode = groupNode;
    const tabs = Array.from(
      tablistNode.querySelectorAll('[role=tab]')
    ) as HTMLElement[];
    const tabpanels = tabs.map((tab) =>
      document.getElementById(tab.getAttribute('aria-controls') as string)
    );
    const enabledTabs = tabs.filter(
      (_, index) => !disabledTabIndexes.includes(index)
    );
    const enabledTabpanels = enabledTabs.map(
      (tab) => tabpanels[tabs.indexOf(tab)]
    );
    const firstTab = enabledTabs[0];
    const lastTab = enabledTabs[enabledTabs.length - 1];
    const setSelectedTab = (currentTab: HTMLElement) => {
      tabs.forEach((tab, index) => {
        const tabpanel = enabledTabpanels[index];
        if (currentTab === tab) {
          tab.setAttribute('aria-selected', 'true');
          tab.removeAttribute('tabindex');
          tabpanel?.classList.remove('is-hidden');
        } else {
          tab.setAttribute('aria-selected', 'false');
          tab.tabIndex = -1;
          tabpanel?.classList.add('is-hidden');
        }
      });
    };
    const moveFocusToTab = (tab: HTMLElement) => {
      tab.focus();
    };
    const moveFocusToPreviousTab = (currentTab: HTMLElement) => {
      const index = enabledTabs.indexOf(currentTab);
      const previousTab = index === 0 ? lastTab : enabledTabs[index - 1];
      moveFocusToTab(previousTab);
    };
    const moveFocusToNextTab = (currentTab: HTMLElement) => {
      const index = enabledTabs.indexOf(currentTab);
      const nextTab =
        index === enabledTabs.length - 1 ? firstTab : enabledTabs[index + 1];
      moveFocusToTab(nextTab);
    };
    const onKeydown = (event: KeyboardEvent) => {
      let flag = false;
      const currentTab = event.currentTarget as HTMLElement;
      switch (event.key) {
        case 'ArrowLeft':
          moveFocusToPreviousTab(currentTab);
          flag = true;
          break;
        case 'ArrowRight':
          moveFocusToNextTab(currentTab);
          flag = true;
          break;
        default:
          break;
      }
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };
    const onClick = (event: MouseEvent) => {
      const currentTab = event.currentTarget as HTMLElement;
      setSelectedTab(currentTab);
    };
    tabs.forEach((tab) => {
      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      tab.addEventListener('keydown', onKeydown);
      tab.addEventListener('click', onClick);
    });
    setSelectedTab(firstTab);
  };

  return (
    <TabsContext.Provider
      value={{
        alignIcon,
        colorInvert,
        configContextProps,
        currentActiveTab,
        direction,
        fullWidth,
        lineClamp,
        maxWidth,
        onTabClick,
        readOnly,
        size,
        statgrouptheme,
        theme,
        themeContainerId,
        variant,
      }}
    >
      {React.cloneElement(children as React.ReactElement, {
        ref: tabsContainerRef,
      })}
    </TabsContext.Provider>
  );
};

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (context === undefined) {
    throw new Error('Tab component must be used within Tabs');
  }
  return context;
};

export { TabsProvider, useTabs };
