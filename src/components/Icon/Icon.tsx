import React, { FC } from 'react';
import { classNames } from '../../shared/utilities';
import { Icon as MdiIcon } from '@mdi/react';
import { IconProps, IconSize } from './index';

import styles from './icon.module.scss';

export const Icon: FC<IconProps> = ({
    ariaHidden,
    className,
    color,
    description,
    horizontal,
    path,
    role,
    rotate,
    size,
    spin,
    title,
    vertical,
}) => {
    const iconClassNames: string = classNames({
        classes: className && className !== '' ? className : ''
    });

    return (
        <span
            aria-hidden={ariaHidden ? ariaHidden : false}
            className={styles.iconWrapper + ' ' + iconClassNames}
            role={role ? role : 'presentation'}
        >
            <MdiIcon
                color={color}
                description={description}
                horizontal={horizontal}
                path={path}
                rotate={rotate}
                size={size ? size : IconSize.Medium}
                title={title}
                vertical={vertical}
                spin={spin} />
        </span>
    );
};
