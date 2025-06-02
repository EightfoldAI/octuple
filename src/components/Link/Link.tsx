'use client';

import React, { Ref, FC, useContext } from 'react';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { LinkProps } from './Link.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './link.module.scss';
import themedComponentStyles from './link.theme.module.scss';

/**
 * Link component for navigation.
 * It supports different visual variants, disabled states, and theming.
 * Includes an accessibility feature for a high-contrast focus indicator.
 * @param props - {@link LinkProps}
 * @param ref - React ref for the anchor element.
 * @returns The Link component.
 * @example
 * ```tsx
 * <Link href="https://example.com">Default Link</Link>
 * <Link href="https://example.com" variant="primary">Primary Link</Link>
 * <Link href="https://example.com" disabled>Disabled Link</Link>
 * <Link href="https://example.com" highContrastFocus>High Contrast Focus Link</Link>
 * ```
 */
export const Link: FC<LinkProps> = React.forwardRef(
  (
    {
      href,
      classNames,
      children,
      configContextProps = {
        noDisabledContext: false,
        noThemeContext: false,
      },
      disabled = false,
      fullWidth = true,
      onClick,
      role = 'link',
      target = '_self',
      underline,
      variant = 'default',
      style,
      theme,
      themeContainerId,
      highContrastFocus = false, // Added new prop with default
      'data-test-id': dataTestId,
      ...rest
    },
    ref: Ref<HTMLAnchorElement>
  ) => {
    const contextuallyDisabled: Disabled = useContext(DisabledContext);
    const mergedDisabled: boolean = configContextProps.noDisabledContext
      ? disabled
      : contextuallyDisabled || disabled;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    const linkClassNames: string = mergeClasses([
      styles.linkStyle,
      { [styles.fullWidth]: !!fullWidth },
      { [styles.neutral]: variant === 'neutral' },
      { [styles.primary]: variant === 'primary' },
      { [styles.secondary]: variant === 'secondary' },
      { [styles.disruptive]: variant === 'disruptive' },
      { [styles.underline]: !!underline },
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.disabled]: mergedDisabled },
      { 'highContrastFocus': !!highContrastFocus }, // Added highContrastFocus class conditionally
      classNames,
    ]);

    const handleOnClick = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      if (mergedDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <ThemeContextProvider
        componentClassName={themedComponentStyles.theme}
        containerId={themeContainerId}
        theme={mergedTheme}
      >
        <a
          {...rest}
          ref={ref}
          role={role}
          aria-disabled={mergedDisabled}
          className={linkClassNames}
          href={href}
          onClick={handleOnClick}
          style={style}
          target={target}
          data-test-id={dataTestId}
        >
          {children}
        </a>
      </ThemeContextProvider>
    );
  }
);
