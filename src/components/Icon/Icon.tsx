import React, { FC } from 'react';
import { Icon } from '@mdi/react';
import { IconProps } from './index';

export const OctupleIcon: FC<IconProps> = ({
    icon,
    ariaHidden,
    classes,
    color,
    description,
    horizontal,
    role,
    rotate,
    size,
    spin,
    title,
    vertical,
}) => {
    return (
        <span
            aria-hidden={ariaHidden ? ariaHidden : false}
            className={classes}
            role={role ? role : 'presentation'}
        >
            <Icon
                color={color}
                description={description}
                horizontal={horizontal}
                path={icon}
                rotate={rotate}
                size={size}
                title={title}
                vertical={vertical}
                spin={spin}
            />
        </span>
    );
};
