import { OcBaseProps } from '../OcBase';
import type { Breakpoint } from '../../shared/utilities';
import { tuple } from '../../shared/utilities';

type ColSpanType = number | string;

const RowAligns = tuple('top', 'middle', 'bottom', 'stretch');

const RowJustify = tuple(
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly'
);

export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;

export interface RowProps
  extends Omit<
    OcBaseProps<HTMLDivElement>,
    'placeholder' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'
  > {
  /**
   * The row align attributes.
   */
  align?: typeof RowAligns[number];
  /**
   * The gutter.
   * @default 0
   */
  gutter?: Gutter | [Gutter, Gutter];
  /**
   * The row justify attributes.
   */
  justify?: typeof RowJustify[number];
  /**
   * The row wraps.
   */
  wrap?: boolean;
}

export type FlexType = number | 'none' | 'auto' | string;

export interface ColSize {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

export interface ColProps
  extends Omit<
    OcBaseProps<HTMLDivElement>,
    'placeholder' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'
  > {
  /**
   * The col flex type.
   */
  flex?: FlexType;
  /**
   * The col span.
   */
  span?: ColSpanType;
  /**
   * The col order.
   */
  order?: ColSpanType;
  /**
   * The col offset.
   */
  offset?: ColSpanType;
  /**
   * The col push.
   */
  push?: ColSpanType;
  /**
   * The col pull.
   */
  pull?: ColSpanType;
  /**
   * The col size is extra-small.
   */
  xs?: ColSpanType | ColSize;
  /**
   * The col size is small.
   */
  sm?: ColSpanType | ColSize;
  /**
   * The col size is medium.
   */
  md?: ColSpanType | ColSize;
  /**
   * The col size is large.
   */
  lg?: ColSpanType | ColSize;
  /**
   * The col size is extra-large.
   */
  xl?: ColSpanType | ColSize;
}
