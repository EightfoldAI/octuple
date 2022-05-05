import React, { FC } from 'react';
import { BadgeProps } from './Badge.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './badge.module.scss';

export const Badge: FC<BadgeProps> = ({
    active,
    classNames,
    style,
    children,
    disruptive,
    ...rest
}) => {
    const badgeClasses: string = mergeClasses([
        styles.badge,
        'header6',
        { [styles.disruptive]: disruptive },
        classNames,
        { [styles.active]: active },
    ]);
    return (
        <span className={badgeClasses} style={style} {...rest}>
            {children}
        </span>
    );
};
