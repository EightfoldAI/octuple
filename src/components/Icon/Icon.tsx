import React, { FC } from 'react';
import IcomoonReact from 'icomoon-react';

import { mergeClasses } from '../../shared/utilities';
import { Icon as MdiIcon } from '@mdi/react';
import { IconProps, IconSize } from './index';

import styles from './icon.module.scss';
import { useConfig } from '../ConfigProvider';

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
    style,
    title,
    vertical,
    'data-test-id': dataTestId,
    icomoonIconName,
}) => {
    const { icomoonIconSet } = useConfig();

    const iconClassNames: string = mergeClasses([
        classNames,
        styles.iconWrapper,
    ]);

    if (!icomoonIconName && !path) {
        return null;
    }

    const iconComponent = icomoonIconName ? (
        <IcomoonReact
            iconSet={icomoonIconSet}
            size={size}
            color={color}
            icon={icomoonIconName}
            role="presentation"
        />
    ) : (
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
    );

    return (
        <span
            data-test-id={dataTestId}
            aria-hidden={ariaHidden}
            className={iconClassNames}
            id={id}
            role={role}
            style={style}
        >
            {iconComponent}
        </span>
    );
};
