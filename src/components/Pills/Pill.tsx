import React, { FC } from 'react';
import { PillProps, PillSize, PillType } from './Pills.types';
import { mergeClasses } from '../../shared/utilities';
import { Icon, IconName, IconSize } from '../Icon';

import styles from './pills.module.scss';
import { ButtonSize, DefaultButton } from '../Button';

export const Pill: FC<PillProps> = ({
    color,
    label,
    iconProps,
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
    const labelClassName: string = mergeClasses([
        styles.label,
        { [styles.medium]: size === PillSize.Medium },
        { [styles.small]: size === PillSize.Small },
    ]);
    const tagClassName: string = mergeClasses([
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
            {iconProps && (
                <Icon
                    {...iconProps}
                    size={pillSizeToIconSizeMap.get(size)}
                    classNames={styles.icon}
                />
            )}
            <span className={labelClassName}>{label}</span>
            {type === PillType.withButton && (
                <DefaultButton
                    {...pillButtonProps}
                    onClick={onClick}
                    size={pillSizeToButtonSizeMap.get(size)}
                    classNames={styles.button}
                />
            )}
            {type === PillType.closable && (
                <DefaultButton
                    {...closeButtonProps}
                    iconProps={{ path: IconName.mdiClose }}
                    onClick={onClose}
                    size={pillSizeToButtonSizeMap.get(size)}
                    classNames={styles.closeButton}
                />
            )}
        </div>
    );
};
