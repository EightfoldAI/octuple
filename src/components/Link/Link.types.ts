import { AnchorHTMLAttributes } from 'react';
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
   * Whether to show the Link underline.
   */
  underline?: boolean;
  /**
   * Link Variant.
   * @default 'default'
   */
  variant?: LinkType;
}
