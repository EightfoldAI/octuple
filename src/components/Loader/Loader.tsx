import React, { FC } from 'react';
import { LoaderProps, LoaderSize } from './Loader.types';
import { Stack } from '../Stack';
import { mergeClasses } from '../../shared/utilities';

import styles from './loader.module.scss';

export const Loader: FC<LoaderProps> = ({
    size = LoaderSize.Small,
    ...rest
}) => {
    const dotClasses = mergeClasses([
        styles.dot,
        {
            [styles.small]: size === LoaderSize.Small,
            [styles.medium]: size === LoaderSize.Medium,
            [styles.large]: size === LoaderSize.Large,
        },
    ]);
    return (
        <Stack {...rest}>
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
        </Stack>
    );
};
