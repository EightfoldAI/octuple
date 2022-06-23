import React, { Ref, FC } from 'react';

// Styles:
import styles from './navbar.module.scss';
import { NavbarProps } from './';
import { mergeClasses } from '../../shared/utilities';

export const NavbarContent: FC<NavbarProps> = React.forwardRef(
    ({ classNames, children, style }, ref: Ref<HTMLDivElement>) => {
        const containerClasses: string = mergeClasses([
            styles.navbarContent,
            classNames,
        ]);

        return (
            <div className={containerClasses} ref={ref} style={style}>
                {children}
            </div>
        );
    }
);

export const Navbar: FC<NavbarProps> = React.forwardRef(
    ({ classNames, children, style }, ref: Ref<HTMLDivElement>) => {
        const containerClasses: string = mergeClasses([
            styles.navbarContainer,
            classNames,
        ]);

        return (
            <div className={containerClasses} ref={ref} style={style}>
                {children}
            </div>
        );
    }
);
