import React, { FC } from 'react';
import { LoaderProps, LoaderSize } from './Loader.types';
import { mergeClasses } from '../../shared/utilities';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './loader.module.scss';

export const Loader: FC<LoaderProps> = ({
    size = LoaderSize.Small,
    classNames,
    ...rest
}) => {
    const htmlDir: string = useCanvasDirection();
    const dotClasses = mergeClasses([
        styles.dot,
        {
            [styles.small]: size === LoaderSize.Small,
            [styles.medium]: size === LoaderSize.Medium,
            [styles.large]: size === LoaderSize.Large,
        },
        { [styles.dotRtl]: htmlDir === 'rtl' },
    ]);
    return (
        <div
            className={mergeClasses([styles.loaderContainer, classNames])}
            {...rest}
        >
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
        </div>
    );
};
