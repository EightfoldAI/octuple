import React, { createContext, useEffect, useState } from 'react';
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
}: TabsContextProps) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<TabValue>(value);

  useEffect(() => {
    setCurrentActiveTab(value);
  }, [value]);

  const onTabClick = (value: TabValue, e: SelectTabEvent) => {
    onChange(value, e);
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
