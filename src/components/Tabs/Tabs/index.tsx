import React, { FC } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = (props) => {
    const { value, onChange, children } = props;
    return (
        <TabsProvider onChange={onChange} value={value}>
            <AnimatedTabs {...props}>{children}</AnimatedTabs>
        </TabsProvider>
    );
};
