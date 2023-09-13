import { DirectionType } from '../ConfigProvider';
import { OcBaseProps } from '../OcBase';
import type { GapPositionType } from './Internal/OcProgress.types';
import { tuple } from '../../shared/utilities';

const ProgressTypes = tuple('line', 'circle', 'dashboard');
export type ProgressType = typeof ProgressTypes[number];
export const ProgressStatuses = tuple(
  'normal',
  'exception',
  'active',
  'success'
);
export type StringGradients = { [percentage: string]: string };
type FromToGradients = { from: string; to: string };
export type ProgressGradient = { direction?: string } & (
  | StringGradients
  | FromToGradients
);

export enum ProgressSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum ProgressVariant {
  Default = 'default',
  Pill = 'pill',
}

export interface ProgressProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Whether to visually show/hide the Progress border.
   * @default true
   */
  bordered?: boolean;
  /**
   * The Progress render.
   */
  children?: React.ReactNode;
  /**
   * The Progress class names.
   */
  classNames?: string;
  /**
   * The Progress value label function.
   * Used by minLabel or valueLabel.
   */
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  /**
   * The gap degree of the half circle.
   * @default 75
   */
  gapDegree?: number;
  /**
   * The gap position, options: 'top' 'bottom' 'left' 'right'.
   * @default 'bottom'
   */
  gapPosition?: GapPositionType | null;
  /**
   * Hide the maximum value of Progress.
   * @default false
   */
  hideMax?: boolean;
  /**
   * Hide the minimum value of Progress.
   * @default false
   */
  hideMin?: boolean;
  /**
   * The custom maximum value label of Progress.
   */
  maxLabel?: string;
  /**
   * The custom minimum value label of Progress.
   * Use when showValueLabel is true.
   */
  minLabel?: string;
  /**
   * The Progress completion percentage.
   * @default 0
   */
  percent?: number;
  /**
   * Whether to visually show/hide the Progress Pill border.
   * @default true
   */
  pillBordered?: boolean;
  /**
   * Whether the labels are visible or not
   * @default true
   */
  showLabels?: boolean;
  /**
   * Whether the percent symbol is displayed.
   * @default true
   */
  showPercentSymbol?: boolean;
  /**
   * When Progress success prop is used, display the success value label
   * @default false
   */
  showSuccessLabel?: boolean;
  /**
   * Display the value label
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * The Progress size.
   * @default ProgressSize.Medium
   */
  size?: ProgressSize;
  /**
   * The status of the Progress Line component.
   * options: 'success', 'exception', 'normal', 'active'
   */
  status?: typeof ProgressStatuses[number];
  /**
   * The number of steps to display.
   */
  steps?: number;
  /**
   * Sets a single absolute pixel width for steps.
   */
  stepWidth?: number;
  /**
   * The color of the Progress stroke.
   */
  strokeColor?: string | string[] | ProgressGradient;
  /**
   * Sets the style of the Progress linecap.
   * @default 'round'
   */
  strokeLinecap?: 'butt' | 'square' | 'round';
  /**
   * Sets the width of the Progress bar, unit: px.
   * @default 6
   */
  strokeWidth?: number;
  /**
   * The Progress styles.
   */
  style?: React.CSSProperties;
  /**
   * The Progress success segment configuration.
   */
  success?: SuccessProps;
  /**
   * The custom success segment value label of Progress.
   */
  successLabel?: string;
  /**
   * The color of the unfilled part.
   */
  trailColor?: string | null;
  /**
   * The type of Progress
   * @default 'line'
   */
  type?: ProgressType;
  /**
   * Determines the progress variant.
   * @default ProgressVariant.Default
   */
  variant?: ProgressVariant;
  /**
   * The Progress component width.
   */
  width?: number;
}

export interface SuccessProps {
  /**
   * The success percent.
   */
  percent?: number;
  /**
   * The color of the success segment stroke.
   */
  strokeColor?: string;
}

export interface ProgressStepsProps extends ProgressProps {
  /**
   * Whether to visually hide the Progress border.
   * @default true
   */
  bordered?: boolean;
  /**
   * The current canvas direction.
   */
  direction?: DirectionType;
  /**
   * The max label ref passed down from Progress to Steps.
   */
  maxLabelRef?: React.MutableRefObject<HTMLSpanElement>;
  /**
   * The min label ref passed down from Progress to Steps.
   */
  minLabelRef?: React.MutableRefObject<HTMLSpanElement>;
  /**
   * The Progress size.
   * @default ProgressSize.Medium
   */
  size?: ProgressSize;
  /**
   * The number of steps to display.
   */
  steps: number;
  /**
   * The color of the Progress stroke.
   */
  strokeColor?: string | string[];
  /**
   * The color of the unfilled part.
   */
  trailColor?: string;
  /**
   * The value label ref passed down from Progress to Steps.
   */
  valueLabelRef?: React.MutableRefObject<HTMLSpanElement>;
}

export interface CircleProps extends ProgressProps {
  /**
   * Whether to visually hide the Progress border.
   * @default true
   */
  bordered?: boolean;
  /**
   * The Progress Circle render.
   */
  children?: React.ReactNode;
  /**
   * The status of the Progress Circle component.
   * options: 'success', 'exception', 'normal', 'active'
   */
  progressStatus: string;
  /**
   * The color of the Progress stroke.
   */
  strokeColor?: string | ProgressGradient;
}

export interface LineProps extends ProgressProps {
  /**
   * Whether to visually hide the Progress border.
   * @default true
   */
  bordered?: boolean;
  /**
   * The Progress Line render.
   */
  children: React.ReactNode;
  /**
   * The current canvas direction.
   */
  direction?: DirectionType;
  /**
   * The max label ref passed down from Progress to Line.
   */
  maxLabelRef?: React.MutableRefObject<HTMLSpanElement>;
  /**
   * The min label ref passed down from Progress to Line.
   */
  minLabelRef?: React.MutableRefObject<HTMLSpanElement>;
  /**
   * The color of the Progress stroke.
   */
  strokeColor?: string | ProgressGradient;
  /**
   * The success label ref passed down from Progress to Line.
   */
  successLabelRef?: React.MutableRefObject<HTMLSpanElement>;
  /**
   * The value label ref passed down from Progress to Line.
   */
  valueLabelRef?: React.MutableRefObject<HTMLSpanElement>;
}
