import React, { FC, Ref } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = React.forwardRef(
    (props, ref: Ref<HTMLDivElement>) => {
        const { children, statgrouptheme, onChange, readOnly, value } = props;
        return (
            <TabsProvider
                statgrouptheme={statgrouptheme}
                onChange={onChange}
                readOnly={readOnly}
                value={value}
            >
                <AnimatedTabs {...props} ref={ref}>
                    {children}
                </AnimatedTabs>
            </TabsProvider>
        );
    }
);
