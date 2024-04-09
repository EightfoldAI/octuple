'use client';

import React from 'react';
import { toArray } from '../utilities';
import { SingleObserver } from './SingleObserver/SingleObserver';
import { Collection } from './Collection';

const OBSERVER_PREFIX_KEY = 'oc-observer-key';

export interface SizeInfo {
  width: number;
  height: number;
  offsetWidth: number;
  offsetHeight: number;
}

export type OnResize = (size: SizeInfo, element: HTMLElement) => void;

export interface ResizeObserverProps {
  /** Pass to ResizeObserver.Collection with additional data */
  data?: any;
  children:
    | React.ReactNode
    | ((ref: React.RefObject<any>) => React.ReactElement);
  disabled?: boolean;
  /** Trigger if element resized. Will always trigger when first time render. */
  onResize?: OnResize;
}

export const ResizeObserver = (props: ResizeObserverProps) => {
  const { children } = props;
  const childNodes =
    typeof children === 'function' ? [children] : toArray(children);

  return childNodes.map((child: any, index: number) => {
    const key = child?.key || `${OBSERVER_PREFIX_KEY}-${index}`;
    return (
      <SingleObserver {...props} key={key}>
        {child}
      </SingleObserver>
    );
  }) as any as React.ReactElement;
};

ResizeObserver.displayName = 'ResizeObserver';

ResizeObserver.Collection = Collection;
