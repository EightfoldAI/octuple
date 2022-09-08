import React, { FC } from 'react';
import { SkeletonProps } from './Skeleton.types';
import { mergeClasses } from '../../shared/utilities';

export const Skeleton: FC<SkeletonProps> = ({ classNames }) => {
    const skeletonClasses = mergeClasses([classNames]);
    return <div className={skeletonClasses}></div>;
};
