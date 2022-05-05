import React, { FC, Ref } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = React.forwardRef(
    (props, ref: Ref<HTMLDivElement>) => {
        const { value, onChange, children } = props;
        return (
            <TabsProvider onChange={onChange} value={value}>
                <AnimatedTabs {...props} ref={ref}>
                    {children}
                </AnimatedTabs>
            </TabsProvider>
        );
    }
);
