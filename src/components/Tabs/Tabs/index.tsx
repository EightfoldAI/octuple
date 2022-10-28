import React, { FC, Ref } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = React.forwardRef(
    (props, ref: Ref<HTMLDivElement>) => {
        const { children, groupTheme, onChange, readonly, value } = props;
        return (
            <TabsProvider
                groupTheme={groupTheme}
                onChange={onChange}
                readonly={readonly}
                value={value}
            >
                <AnimatedTabs {...props} ref={ref}>
                    {children}
                </AnimatedTabs>
            </TabsProvider>
        );
    }
);
