import React, { Ref, FC } from 'react';

import { LinkProps } from './Link.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './link.module.scss';

export const Link: FC<LinkProps> = React.forwardRef(
    (
        {
            href,
            classNames,
            children,
            target = '_self',
            variant = 'default',
            style,
        },
        ref: Ref<HTMLAnchorElement>
    ) => {
        const linkClasses: string = mergeClasses([
            styles.linkStyle,
            classNames,
            { [styles.primary]: variant === 'primary' },
        ]);

        return (
            <a
                ref={ref}
                href={href}
                className={linkClasses}
                target={target}
                style={style}
            >
                {children}
            </a>
        );
    }
);
