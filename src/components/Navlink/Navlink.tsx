import React, { Ref, FC } from 'react';

import { StackOrder, NavlinkProps, LinkTarget } from './Navlink.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './navlink.module.scss';

export const Navlink: FC<NavlinkProps> = React.forwardRef(
    (
        {
            stackOrder = StackOrder.row,
            url,
            classNames,
            children,
            target = LinkTarget.self,
            onClick,
            variant = 'default',
            style,
        },
        ref: Ref<HTMLAnchorElement>
    ) => {
        const linkClasses: string = mergeClasses([
            styles.linkStyle,
            classNames,
            { [styles.column]: stackOrder === StackOrder.column },
            { [styles.primary]: variant === 'primary' },
        ]);

        return (
            <a
                ref={ref}
                href={url}
                className={linkClasses}
                target={target}
                onClick={onClick}
                style={style}
            >
                {children}
            </a>
        );
    }
);
