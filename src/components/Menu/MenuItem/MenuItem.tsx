import React, { FC } from 'react';
import { MenuItemProps } from './MenuItem.types';
import { MenuSize, MenuVariant } from '../Menu.types';
import { Icon } from '../../Icon';
import { mergeClasses } from '../../../shared/utilities';
import { Badge } from '../../Badge';

import styles from './menuItem.module.scss';

export const MenuItem: FC<MenuItemProps> = ({
    iconProps,
    text,
    variant = MenuVariant.neutral,
    size = MenuSize.medium,
    classNames,
    onClick,
    tabIndex = 0,
    value,
    active,
    counter,
    badgeProps,
    ...rest
}) => {
    const menuItemClasses: string = mergeClasses([
        styles.menuItem,
        { [styles.small]: size === MenuSize.small },
        { [styles.medium]: size === MenuSize.medium },
        { [styles.large]: size === MenuSize.large },
        { [styles.neutral]: variant === MenuVariant.neutral },
        { [styles.primary]: variant === MenuVariant.primary },
        { [styles.disruptive]: variant === MenuVariant.disruptive },
        { [styles.active]: active },
        classNames,
    ]);

    return (
        <button
            onClick={() => onClick?.(value)}
            tabIndex={tabIndex}
            role="menuitem"
            className={menuItemClasses}
            {...rest}
        >
            {iconProps && <Icon {...iconProps} />}
            <span className={styles.label}>{text}</span>
            {counter && (
                <Badge
                    disruptive={variant === MenuVariant.disruptive}
                    {...badgeProps}
                >
                    {counter}
                </Badge>
            )}
        </button>
    );
};
