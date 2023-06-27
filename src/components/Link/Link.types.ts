import { AnchorHTMLAttributes } from 'react';
import { OcBaseProps } from '../OcBase';

export type LinkType =
  | 'default'
  | 'disruptive'
  | 'neutral'
  | 'primary'
  | 'secondary';

export interface LinkProps
  extends Omit<OcBaseProps<HTMLAnchorElement>, 'title'>,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
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
   * The Link title.
   */
  title?: number | string;
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
