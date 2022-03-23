import React, { FC } from 'react';
import { classNames } from '../../shared/utilities';
import { Icon as MdiIcon } from '@mdi/react';
import { IconProps, IconSize } from './index';

import styles from './icon.module.scss';

export const Icon: FC<IconProps> = ({
    ariaHidden = false,
    className,
    color,
    description,
    horizontal,
    path,
    role = 'presentation',
    rotate,
    size = IconSize.Medium,
    spin,
    title,
    vertical,
}) => {
    const iconClassNames: string = classNames([className, styles.iconWrapper]);

    return (
        <span aria-hidden={ariaHidden} className={iconClassNames} role={role}>
            <MdiIcon
                color={color}
                description={description}
                horizontal={horizontal}
                path={path}
                rotate={rotate}
                size={size}
                title={title}
                vertical={vertical}
                spin={spin}
            />
        </span>
    );
};
