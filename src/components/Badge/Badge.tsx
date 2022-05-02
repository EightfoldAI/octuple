import React, { FC } from 'react';
import { BadgeProps } from './Badge.types';
import { classNames } from '../../shared/utilities';

import styles from './badge.module.scss';

export const Badge: FC<BadgeProps> = ({
    active,
    className,
    style,
    children,
    disruptive,
}) => {
    const badgeClasses: string = classNames([
        styles.badge,
        'header6',
        { [styles.disruptive]: disruptive },
        className,
        { [styles.active]: active },
    ]);
    return (
        <span className={badgeClasses} style={style}>
            {children}
        </span>
    );
};
