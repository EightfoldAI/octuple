export type BaseStrokeColorType = string | Record<string, string>;
export type GapPositionType = 'top' | 'right' | 'bottom' | 'left';
export type StrokeColorType = BaseStrokeColorType | BaseStrokeColorType[];
export type StrokeLinecapType = 'round' | 'butt' | 'square';

export interface OcProgressProps {
  /**
   * The Progress class names.
   */
  classNames?: string;
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
   * The Progress id.
   */
  id?: string;
  /**
   * The Progress click event handler.
   */
  onClick?: React.MouseEventHandler;
  /**
   * The Progress completion percentage.
   * @default 0
   */
  percent?: number | number[];
  /**
   * The total step count.
   */
  steps?: number | { count: number; space: number };
  /**
   * The color of the Progress stroke.
   */
  strokeColor?: StrokeColorType;
  /**
   * Sets the style of the Progress linecap.
   * @default 'round'
   */
  strokeLinecap?: StrokeLinecapType;
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
   * The color of the unfilled part.
   */
  trailColor?: string;
  /**
   * Sets the width of unfilled part, unit: px.
   */
  trailWidth?: number;
  /**
   * The stroke transition animation.
   */
  transition?: string;
}
