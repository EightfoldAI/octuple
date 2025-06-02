import React from 'react';
import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';

export type LinkVariant =
  | 'default'
  | 'disruptive'
  | 'neutral'
  | 'primary'
  | 'secondary';

export interface LinkProps extends OcBaseProps<HTMLAnchorElement> {
  /**
   * The url for the link
   */
  href?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Link is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * The Link will fill the width of its parent or not.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * The Link click event handler
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * The ARIA role of the link
   * @default 'link'
   */
  role?: string;
  /**
   * The html target attribute
   * @default '_self'
   */
  target?: React.HTMLAttributeAnchorTarget;
  /**
   * Theme of the link
   * Use with configContextProps.noThemeContext = true
   */
  theme?: OcThemeName;
  /**
   * Theme container from which the component will propagate styles
   */
  themeContainerId?: string;
  /**
   * The Link variant
   * @default 'default'
   */
  variant?: LinkVariant;
  /**
   * The Link is underlined or not
   */
  underline?: boolean;
  /**
   * Enables a high-contrast focus indicator for improved accessibility.
   */
  highContrastFocus?: boolean;
}
