import React, { FC, Ref } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = React.forwardRef(
  (props, ref: Ref<HTMLDivElement>) => {
    const {
      alignIcon,
      children,
      onChange,
      readOnly,
      size,
      statgrouptheme,
      value,
      variant,
    } = props;
    return (
      <TabsProvider
        alignIcon={alignIcon}
        onChange={onChange}
        readOnly={readOnly}
        size={size}
        statgrouptheme={statgrouptheme}
        value={value}
        variant={variant}
      >
        <AnimatedTabs {...props} ref={ref}>
          {children}
        </AnimatedTabs>
      </TabsProvider>
    );
  }
);
