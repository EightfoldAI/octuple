import React, { FC, Ref } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = React.forwardRef(
  (props, ref: Ref<HTMLDivElement>) => {
    const {
      alignIcon,
      children,
      direction,
      fullWidth,
      lineClamp,
      maxWidth,
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
        direction={direction}
        fullWidth={fullWidth}
        lineClamp={lineClamp}
        maxWidth={maxWidth}
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
