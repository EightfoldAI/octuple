import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { TabsProps, TabSize, TabVariant, TabIconAlign } from '../Tabs.types';
import { useTabs } from '../Tabs.context';
import { Flipper } from 'react-flip-toolkit';

import styles from '../tabs.module.scss';

export const AnimatedTabs: FC<TabsProps> = React.forwardRef(
  (
    {
      bordered = true,
      children,
      classNames,
      direction = 'horizontal',
      fullWidth = false,
      onChange,
      scrollable,
      divider = true,
      size = TabSize.Medium,
      style,
      underlined = false,
      variant = TabVariant.default,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const { currentActiveTab } = useTabs();
    const tabClassNames: string = mergeClasses([
      styles.tabWrap,
      {
        [styles.underlined]:
          underlined &&
          variant !== TabVariant.pill &&
          variant !== TabVariant.stat,
        [styles.large]: size === TabSize.Large,
        [styles.small]: variant === TabVariant.small || size === TabSize.Small,
        [styles.xsmall]: variant === TabVariant.stat && size === TabSize.XSmall,
        [styles.pill]: variant === TabVariant.pill,
        [styles.stat]: variant === TabVariant.stat,
        [styles.bordered]: variant === TabVariant.stat && bordered,
        [styles.divider]: variant === TabVariant.stat && divider,
        [styles.vertical]:
          direction === 'vertical' && variant === TabVariant.stat,
        [styles.fullWidth]:
          fullWidth && direction === 'vertical' && variant === TabVariant.stat,
        [styles.scrollable]: scrollable,
      },
      classNames,
    ]);
    return (
      <Flipper flipKey={currentActiveTab}>
        <div
          {...rest}
          ref={ref}
          role="tablist"
          className={tabClassNames}
          style={style}
        >
          {children}
        </div>
      </Flipper>
    );
  }
);
