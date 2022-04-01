import React, { FC } from 'react';
import { PillProps, PillSize, PillType } from './Pills.types';
import { classNames } from '../../shared/utilities';
import { Icon, IconName, IconSize } from '../Icon';

import styles from './pills.module.scss';

export const Pill: FC<PillProps> = ({
    color,
    label,
    icon,
    theme = 'blue',
    onClose,
    onClick,
    buttonContent,
    type = PillType.default,
    size = PillSize.Large,
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
        { [styles.medium]: size === PillSize.Medium },
        { [styles.small]: size === PillSize.Small },
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
            <span className={styles.label}>{label}</span>
            {type === PillType.withButton && (
                <button onClick={onClick} className={styles.button}>
                    {buttonContent}
                </button>
            )}
            {type === PillType.closable && (
                <button onClick={onClose} className={styles.closeButton}>
                    <Icon path={IconName.mdiClose} size={IconSize.Small} />
                </button>
            )}
        </div>
    );
};
