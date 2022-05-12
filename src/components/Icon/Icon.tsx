import React, { FC } from 'react';
import { mergeClasses } from '../../shared/utilities';
import { Icon as MdiIcon } from '@mdi/react';
import { IconProps, IconSize } from './index';

import styles from './icon.module.scss';

export const Icon: FC<IconProps> = ({
    ariaHidden = false,
    classNames,
    color,
    description,
    horizontal,
    id,
    path,
    role = 'presentation',
    rotate,
    size = IconSize.Medium,
    spin,
    title,
    vertical,
    'data-test-id': dataTestId,
}) => {
    const iconClassNames: string = mergeClasses([
        classNames,
        styles.iconWrapper,
    ]);

    return (
        <span
            data-test-id={dataTestId}
            aria-hidden={ariaHidden}
            className={iconClassNames}
            id={id}
            role={role}
        >
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
