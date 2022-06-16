import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { TabsProps, TabVariant } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipper } from 'react-flip-toolkit';

import styles from '../tabs.module.scss';

export const AnimatedTabs: FC<TabsProps> = React.forwardRef(
  (
    {
      children,
      classNames,
      style,
      variant = TabVariant.default,
      scrollable,
      onChange,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const { currentActiveTab } = useTabs();
    const tabClassName: string = mergeClasses([
      styles.tabWrap,
      { [styles.small]: variant === TabVariant.small },
      { [styles.pill]: variant === TabVariant.pill },
      { [styles.scrollable]: scrollable },
      classNames,
    ]);
    return (
      <Flipper flipKey={currentActiveTab}>
        <div
          {...rest}
          ref={ref}
          role="tablist"
          className={tabClassName}
          style={style}
        >
          {children}
        </div>
      </Flipper>
    );
  }
);
