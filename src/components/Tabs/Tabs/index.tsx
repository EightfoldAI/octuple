import React, { FC } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = (props) => {
    const { activeTab, onChange, children } = props;
    return (
        <TabsProvider onChange={onChange} activeTab={activeTab}>
            <AnimatedTabs {...props}>{children}</AnimatedTabs>
        </TabsProvider>
    );
};
