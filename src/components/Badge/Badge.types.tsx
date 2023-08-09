import { OcBaseProps } from '../OcBase';

export enum BadgeSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface BadgeProps extends OcBaseProps<HTMLSpanElement> {
  /**
   * Badge is in an active state or not.
   */
  active?: boolean;
  /**
   * If Badge is disruptive or not.
   */
  disruptive?: boolean;
  /**
   * The Badge size.
   * @default BadgeSize.Medium
   */
  size?: BadgeSize;
}
