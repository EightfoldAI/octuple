import React, { FC } from 'react';
import { PillProps, PillSize, PillType } from './Pills.types';
import { classNames } from '../../shared/utilities';
import { Icon, IconName, IconSize } from '../Icon';

import styles from './pills.module.scss';
import { ButtonSize, DefaultButton } from '../Button';

export const Pill: FC<PillProps> = ({
    color,
    label,
    icon,
    theme = 'blue',
    onClose,
    onClick,
    closeButtonProps,
    pillButtonProps,
    type = PillType.default,
    size = PillSize.Large,
}) => {
    const pillSizeToButtonSizeMap = new Map<PillSize, ButtonSize>([
        [PillSize.Large, ButtonSize.Medium],
        [PillSize.Medium, ButtonSize.Small],
        [PillSize.Small, ButtonSize.Small],
    ]);
    const pillSizeToIconSizeMap = new Map<PillSize, IconSize>([
        [PillSize.Large, IconSize.Medium],
        [PillSize.Medium, IconSize.Small],
        [PillSize.Small, IconSize.XSmall],
    ]);
    const labelClassName: string = classNames([
        styles.label,
        { [styles.header4]: size === PillSize.Large },
        { [styles.header5]: size === PillSize.Medium },
        { [styles.header6]: size === PillSize.Small },
    ]);
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
                    size={pillSizeToIconSizeMap.get(size)}
                    className={styles.icon}
                />
            )}
            <span className={labelClassName}>{label}</span>
            {type === PillType.withButton && (
                <DefaultButton
                    {...pillButtonProps}
                    onClick={onClick}
                    size={pillSizeToButtonSizeMap.get(size)}
                    className={styles.button}
                />
            )}
            {type === PillType.closable && (
                <DefaultButton
                    {...closeButtonProps}
                    icon={IconName.mdiClose}
                    onClick={onClose}
                    size={pillSizeToButtonSizeMap.get(size)}
                    className={styles.closeButton}
                />
            )}
        </div>
    );
};
