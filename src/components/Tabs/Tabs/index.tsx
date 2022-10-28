import React, { FC, Ref } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = React.forwardRef(
    (props, ref: Ref<HTMLDivElement>) => {
        const { children, groupTheme, onChange, value } = props;
        return (
            <TabsProvider
                groupTheme={groupTheme}
                onChange={onChange}
                value={value}
            >
                <AnimatedTabs {...props} ref={ref}>
                    {children}
                </AnimatedTabs>
            </TabsProvider>
        );
    }
);
