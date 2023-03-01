import React, { ForwardedRef } from 'react';
import { FrameWrapperProps } from './FrameWrapper.types';

export const FrameWrapper = React.forwardRef(
  (
    { classNames, children }: FrameWrapperProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={classNames}>
        {children}
      </div>
    );
  }
);
