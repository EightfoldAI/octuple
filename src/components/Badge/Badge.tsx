import React, { FC } from 'react';
import { BadgeProps } from './Badge.Types';
import { classNames } from '../../shared/utilities';

import styles from './badge.module.scss';

export const Badge: FC<BadgeProps> = ({
    active,
    className,
    style,
    children,
}) => {
    const badgeClasses: string = classNames([
        styles.badge,
        'header6',
        className,
        { [styles.active]: active },
    ]);
    return (
        <span className={badgeClasses} style={style}>
            {children}
        </span>
    );
};
