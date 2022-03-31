import React, { FC } from 'react';
import { PillProps } from './Pills.types';
import { classNames } from '../../shared/utilities';
import { Icon, IconName, IconSize } from '../Icon';

import styles from './pills.module.scss';

export const Pill: FC<PillProps> = ({
    color,
    children,
    icon,
    onClose,
    theme = 'blue',
    closable,
}) => {
    const tagClassName: string = classNames([
        styles.tagPills,
        { [styles.red]: theme === 'red' },
        { [styles.orange]: theme === 'orange' },
        { [styles.yellow]: theme === 'yellow' },
        { [styles.green]: theme === 'green' },
        { [styles.bluegreen]: theme === 'bluegreen' },
        { [styles.blue]: theme === 'blue' },
        { [styles.violet]: theme === 'violet' },
        { [styles.grey]: theme === 'grey' },
    ]);
    return (
        <div className={tagClassName} style={{ color }}>
            {icon && (
                <Icon
                    path={icon}
                    size={IconSize.Small}
                    className={styles.icon}
                />
            )}
            {children}
            {closable && (
                <button onClick={onClose} className={styles.closeIconWrapper}>
                    <Icon path={IconName.mdiClose} size={IconSize.Small} />
                </button>
            )}
        </div>
    );
};
