import React from 'react';
import { FrameWrapperProps } from './FrameWrapper.types';

export const FrameWrapper = ({ classNames, children }: FrameWrapperProps) => {
    return <div className={classNames}>{children}</div>;
};
