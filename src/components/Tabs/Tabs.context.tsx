import React, { createContext, useState } from 'react';
import {
    TabsContextProps,
    ITabsContext,
    TabValue,
    SelectTabEvent,
} from './Tabs.types';

const TabsContext = createContext<Partial<ITabsContext>>({});

const TabsProvider = ({ children, onChange, activeTab }: TabsContextProps) => {
    const [currentActiveTab, setCurrentActiveTab] =
        useState<TabValue>(activeTab);

    const onTabClick = (value: TabValue, e: SelectTabEvent) => {
        setCurrentActiveTab(value);
        onChange(value, e);
    };

    return (
        <TabsContext.Provider value={{ onTabClick, currentActiveTab }}>
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
