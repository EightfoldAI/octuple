'use client';

import React, { FC, Ref } from 'react';
import { OcBaseProps } from '../../components/OcBase';
import { useFocusTrap } from './hooks/useFocusTrap';
import { useMergedRefs } from '../../hooks/useMergedRefs';

interface FocusTrapProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Whether or not to trap focus.
   */
  trap: boolean;
  /**
   * Prepend a specific selector to the beginning
   * of the focus loop generated list of selectors.
   */
  firstFocusableSelector?: string;
  /**
   * Append a specific selector to the end
   * of the focus loop generated list of selectors.
   */
  lastFocusableSelector?: string;
  /**
   * Optionally skip some selectors when tabbing by index.length - skipFocusableSelectorsFromIndex
   * Use when `trap` is `true`
   * @default `index.length - 1`
   */
  skipFocusableSelectorsFromIndex?: number;
}

export const FocusTrap: FC<FocusTrapProps> = React.forwardRef(
  (props: FocusTrapProps, ref: Ref<HTMLDivElement>) => {
    const {
      trap = true,
      children,
      classNames,
      firstFocusableSelector,
      lastFocusableSelector,
      skipFocusableSelectorsFromIndex,
      'data-test-id': dataTestId,
      ...rest
    } = props;

    const focusRef: React.MutableRefObject<HTMLDivElement> = useFocusTrap(
      trap,
      firstFocusableSelector,
      lastFocusableSelector,
      skipFocusableSelectorsFromIndex
    );

    const mergedRef: (node: HTMLDivElement) => void = useMergedRefs(
      focusRef,
      ref
    );

    return (
      <div
        ref={mergedRef}
        className={classNames}
        data-test-id={dataTestId}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
