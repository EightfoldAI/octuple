import React from 'react';
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
  /**
   * React 18 typing error workaround. Make `placeholder` optional.
   * This type was improperly removed from the public `HTMLDivElement`/`HTMLElement` API in React 18.
   * Not entirely sure why this effects `Row` and `Col` components, but it does.
   * Probably because of the `OcBaseProps<HTMLDivElement>` type and `Col`/`Row` tags are shadowed in React somewhere.
   * https://github.com/facebook/react/issues/17883
   * @private Internal usage only.
   */
  placeholder?: string;
  /**
   * React 18 typing error workaround. Define and Make `onPointerEnterCapture` optional.
   * https://github.com/facebook/react/issues/17883
   * @private Internal usage only.
   */
  onPointerEnterCapture?: React.PointerEventHandler<HTMLDivElement>;
  /**
   * React 18 typing error workaround. Define and Make `onPointerLeaveCapture` optional.
   * https://github.com/facebook/react/issues/17883
   * @private Internal usage only.
   */
  onPointerLeaveCapture?: React.PointerEventHandler<HTMLDivElement>;
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
  /**
   * React 18 typing error workaround.
   * https://github.com/facebook/react/issues/17883
   * @private Internal usage only.
   */
  placeholder?: string;
  /**
   * React 18 typing error workaround. Define and Make `onPointerEnterCapture` optional.
   * https://github.com/facebook/react/issues/17883
   * @private Internal usage only.
   */
  onPointerEnterCapture?: React.PointerEventHandler<HTMLDivElement>;
  /**
   * React 18 typing error workaround. Define and Make `onPointerLeaveCapture` optional.
   * https://github.com/facebook/react/issues/17883
   * @private Internal usage only.
   */
  onPointerLeaveCapture?: React.PointerEventHandler<HTMLDivElement>;
}
