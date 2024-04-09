'use client';

import React, { FC, Ref } from 'react';
import { TabsProps } from '../Tabs.types';
import { TabsProvider } from '../Tabs.context';
import { AnimatedTabs } from './AnimatedTabs';

export const Tabs: FC<TabsProps> = React.forwardRef(
  (props, ref: Ref<HTMLDivElement>) => {
    const {
      alignIcon,
      children,
      colorInvert,
      configContextProps,
      direction,
      fullWidth,
      lineClamp,
      maxWidth,
      onChange,
      readOnly,
      size,
      statgrouptheme,
      theme,
      themeContainerId,
      value,
      variant,
    } = props;
    return (
      <TabsProvider
        alignIcon={alignIcon}
        colorInvert={colorInvert}
        configContextProps={configContextProps}
        direction={direction}
        fullWidth={fullWidth}
        lineClamp={lineClamp}
        maxWidth={maxWidth}
        onChange={onChange}
        readOnly={readOnly}
        size={size}
        statgrouptheme={statgrouptheme}
        theme={theme}
        themeContainerId={themeContainerId}
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
