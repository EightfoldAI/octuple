import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
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
  disabledTabIndexes = [],
  enableArrowNav = true,
  variant = TabVariant.default,
}: TabsContextProps) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(value);
  const [focusedTabIndex, setFocusedTabIndex] = useState<number | null>(null);
  const tabsRef = useRef<HTMLElement[]>([]);
  const tabListRef = useRef<HTMLElement | null>(null);
  const tabsValuesRef = useRef<TabValue[]>([]);

  useEffect(() => {
    setCurrentActiveTab(value);
  }, [value]);

  const registerTab = useCallback(
    (tabElement: HTMLElement | null, index: number) => {
      if (tabElement) {
        tabsRef.current[index] = tabElement;
        const tabValue = tabElement.getAttribute('data-value');
        if (tabValue) {
          tabsValuesRef.current[index] = tabValue;
        }
      }
    },
    []
  );

  const registerTablist = useCallback((tabListElement: HTMLElement | null) => {
    tabListRef.current = tabListElement;
  }, []);

  const onTabClick = useCallback(
    (value: TabValue, e: SelectTabEvent) => {
      if (!readOnly) {
        setCurrentActiveTab(value);
        onChange(value, e);
      }
    },
    [onChange, readOnly]
  );

  const moveFocusToNextTab = useCallback(() => {
    const tabValues = tabsValuesRef.current.filter(Boolean);
    if (tabValues.length === 0) return;

    let currentIndex =
      focusedTabIndex !== null
        ? focusedTabIndex
        : tabValues.indexOf(currentActiveTab);
    if (currentIndex === -1) currentIndex = 0;

    let nextIndex = currentIndex;
    do {
      nextIndex = (nextIndex + 1) % tabValues.length;
      if (nextIndex === currentIndex) break;
    } while (disabledTabIndexes.includes(nextIndex));

    const nextTab = tabsRef.current[nextIndex];
    if (nextTab && !disabledTabIndexes.includes(nextIndex)) {
      nextTab.focus();
      setFocusedTabIndex(nextIndex);
    }
  }, [focusedTabIndex, currentActiveTab, disabledTabIndexes]);

  const moveFocusToPreviousTab = useCallback(() => {
    const tabValues = tabsValuesRef.current.filter(Boolean);
    if (tabValues.length == 0) return;

    let currentIndex =
      focusedTabIndex !== null
        ? focusedTabIndex
        : tabValues.indexOf(currentActiveTab);
    if (currentIndex === -1) currentIndex = 0;

    let prevIndex = currentIndex;
    do {
      prevIndex = (prevIndex - 1 + tabValues.length) % tabValues.length;
      if (prevIndex === currentIndex) break;
    } while (disabledTabIndexes.includes(prevIndex));

    const prevTab = tabsRef.current[prevIndex];
    if (prevTab && !disabledTabIndexes.includes(prevIndex)) {
      prevTab.focus();
      setFocusedTabIndex(prevIndex);
    }
  }, [focusedTabIndex, currentActiveTab, disabledTabIndexes]);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (enableArrowNav) return;
      if (event.key == 'Tab') {
        const activeElement = document.activeElement;
        const tabList = tabListRef.current;

        if (
          tabList &&
          tabList.contains(activeElement) &&
          activeElement?.getAttribute('role') === 'tab'
        ) {
          event.preventDefault();
          if (event.shiftKey) {
            moveFocusToPreviousTab();
          } else {
            moveFocusToNextTab();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveFocusToNextTab, moveFocusToPreviousTab]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, tabIndex: number) => {
      if (!enableArrowNav || readOnly) return;

      if (event.key === 'Tab') {
        return;
      }

      const enableTabIndexes = tabsRef.current
        .map((_, index) => index)
        .filter((index) => !disabledTabIndexes.includes(index));

      const currentEnabledIndex = enableTabIndexes.indexOf(tabIndex);

      if (currentEnabledIndex === -1) return;

      let nextFocusIndex: number | null = null;

      switch (event.key) {
        case 'ArrowLeft':
          nextFocusIndex =
            currentEnabledIndex === 0
              ? enableTabIndexes[enableTabIndexes.length - 1]
              : enableTabIndexes[currentEnabledIndex - 1];
          console.log('nextFocusIndex L', nextFocusIndex);
          event.preventDefault();
          break;
        case 'ArrowRight':
          nextFocusIndex =
            currentEnabledIndex === enableTabIndexes.length - 1
              ? enableTabIndexes[0]
              : enableTabIndexes[currentEnabledIndex + 1];
          console.log('nextFocusIndex R', nextFocusIndex);
          event.preventDefault();
          break;
        case 'Home':
          nextFocusIndex = enableTabIndexes[0];
          event.preventDefault();
          break;
        case 'End':
          nextFocusIndex = enableTabIndexes[enableTabIndexes.length - 1];
          event.preventDefault();
          break;
        case 'Enter':
          const currentTab = tabsRef.current[tabIndex];
          if (currentTab) {
            const tabValue = currentTab.getAttribute('data-value');
            if (tabValue) {
              setCurrentActiveTab(tabValue);
              onChange?.(tabValue, {
                currentTarget: currentTab,
              } as SelectTabEvent);
            }
          }
          event.preventDefault();
          return;
        default:
          return;
      }

      if (nextFocusIndex !== null) {
        const nextTab = tabsRef.current[nextFocusIndex];
        if (nextTab) {
          nextTab.focus();
          setFocusedTabIndex(nextFocusIndex);
        }
      }
    },
    [enableArrowNav, disabledTabIndexes, readOnly, onChange]
  );

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
        registerTab,
        registerTablist,
        handleKeyDown,
        enableArrowNav,
        disabledTabIndexes,
        focusedTabIndex,
      }}
    >
      {children}
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
