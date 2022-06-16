import { OcBaseProps } from '../OcBase';

export interface MatchScoreProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The score value, like 2, 3.5, etc.
   */
  score: number;

  /**
   * The maximum score value. This limits the number of score indicators.
   */
  total?: number;

  /**
   * Flag for hiding the lavel display.
   */
  hideLabel?: boolean;

  /**
   * Aria label for the component
   */
  ariaLabel?: string;
}

export type FillType = 'empty' | 'full' | 'half';
