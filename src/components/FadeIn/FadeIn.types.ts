import { ReactNode } from 'react';
import { OcBaseProps } from '../OcBase';

export interface FadeInProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The FadeIn child renderer.
   */
  children: ReactNode;
  /**
   * The FadeIn delay amount.
   */
  delay?: number;
  /**
   * The FadeIn animation duration.
   * @default 300
   */
  duration?: number;
  /**
   * Whether the FadeIn style is disabled.
   * @default false
   */
  disabled?: boolean;
}
