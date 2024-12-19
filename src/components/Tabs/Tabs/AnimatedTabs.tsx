import React, { FC, Ref, useContext } from 'react';
import { Flipper } from 'react-flip-toolkit';
import { OcThemeName } from '../../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../../ConfigProvider/ThemeContext';
import { useTabs } from '../Tabs.context';
import { TabsProps, TabSize, TabVariant } from '../Tabs.types';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../tabs.module.scss';
import themedComponentStyles from '../tabs.theme.module.scss';

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
    const {
      colorInvert,
      configContextProps,
      currentActiveTab,
      theme,
      themeContainerId,
    } = useTabs();

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

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
        [themedComponentStyles.theme]: mergedTheme,
        [styles.inverse]: colorInvert,
        [styles.scrollable]: scrollable,
      },
      classNames,
    ]);
    return (
      <Flipper flipKey={currentActiveTab}>
        <ThemeContextProvider
          containerId={themeContainerId}
          componentClassName={themedComponentStyles.theme}
          theme={mergedTheme}
        >
          <div
            {...rest}
            ref={ref}
            role="tablist"
            className={tabClassNames}
            style={style}
          >
            {children}
          </div>
        </ThemeContextProvider>
      </Flipper>
    );
  }
);
