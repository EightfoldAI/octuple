import React, { FC, Ref, useContext, useRef, useEffect } from 'react';
import { Flipper } from 'react-flip-toolkit';
import { OcThemeName, ThemeNames } from '../../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../../ConfigProvider/ThemeContext';
import { useTabs } from '../Tabs.context';
import { TabsProps, TabSize, TabVariant } from '../Tabs.types';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../tabs.module.scss';
import { useMergedRefs } from '../../../hooks/useMergedRefs';
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
      enableArrowNav = true,
      interactive = true,
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
      registerTablist,
    } = useTabs();

    const tablistRef = useRef(null);
    const combinedRef = useMergedRefs(ref, tablistRef);

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
        [styles.aiAgent]: mergedTheme === ThemeNames.AIAgent,
      },
      classNames,
    ]);

    useEffect(() => {
      if (registerTablist && tablistRef.current) {
        registerTablist(tablistRef.current);
      }
    }, [registerTablist]);

    const childrenWithIndex = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          index,
        });
      }
      return child;
    });

    return (
      <Flipper flipKey={currentActiveTab}>
        <ThemeContextProvider
          containerId={themeContainerId}
          componentClassName={themedComponentStyles.theme}
          theme={mergedTheme}
        >
          <div
            {...rest}
            ref={combinedRef}
            {...(interactive && { role: 'tablist' })}
            className={tabClassNames}
            style={style}
          >
            {childrenWithIndex}
          </div>
        </ThemeContextProvider>
      </Flipper>
    );
  }
);
