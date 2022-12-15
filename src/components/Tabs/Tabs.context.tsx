import React, { createContext, useEffect, useState } from 'react';
import {
  TabsContextProps,
  ITabsContext,
  TabSize,
  TabValue,
  TabVariant,
  SelectTabEvent,
} from './Tabs.types';

const TabsContext = createContext<Partial<ITabsContext>>({});

const TabsProvider = ({
  children,
  onChange,
  readOnly,
  size = TabSize.Medium,
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
        currentActiveTab,
        onTabClick,
        readOnly,
        size,
        statgrouptheme,
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
