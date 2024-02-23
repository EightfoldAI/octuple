import { AnchorHTMLAttributes } from 'react';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { OcBaseProps } from '../OcBase';

export type LinkType =
  | 'default'
  | 'disruptive'
  | 'neutral'
  | 'primary'
  | 'secondary';

export interface LinkProps
  extends OcBaseProps<HTMLAnchorElement>,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * Whether the Link is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the Link display is inline and width is unset.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * The Link onClick event handler.
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * The Link role.
   */
  role?: string;
  /**
   * Theme of the Link.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Theme container of the Link.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * Whether to show the Link underline.
   */
  underline?: boolean;
  /**
   * Link Variant.
   * @default 'default'
   */
  variant?: LinkType;
}
