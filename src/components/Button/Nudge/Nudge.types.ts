import { OcBaseProps } from '../../OcBase';

export enum NudgeAnimation {
  Background = 'background',
  Bounce = 'bounce',
  Conic = 'conic',
  Ring = 'ring',
  Size = 'size',
}

export interface NudgeProps {
  /**
   * The button nudge animation.
   * @default ButtonHintAnimation.Background
   */
  animation?: NudgeAnimation;
  /**
   * Determines if the button nudge animation is enabled.
   * @default false
   */
  enabled?: boolean;
  /**
   * The number of times the button nudge animates.
   * @default 1
   */
  iterations?: number;
  /**
   * The amount of time in milliseconds between nudges.
   * @default 2000ms
   */
  delay?: number;
}

export interface InnerNudgeProps extends OcBaseProps<HTMLSpanElement> {
  /**
   * The nudge class names.
   */
  classNames?: string;
  /**
   * The nudge disruptive state.
   */
  disruptive?: boolean;
  /**
   * The nudge id.
   */
  id?: string;
  /**
   * The nudge props.
   */
  nudgeProps?: NudgeProps;
  /**
   * The nudge style.
   */
  style?: React.CSSProperties;
}
