'use client';

import React, { Ref, FC } from 'react';

import { NavbarProps } from './';
import { mergeClasses } from '../../shared/utilities';

import styles from './navbar.module.scss';

export const Navbar: FC<NavbarProps> = React.forwardRef(
  ({ classNames, children, style, ...rest }, ref: Ref<HTMLDivElement>) => {
    const containerClasses: string = mergeClasses([
      styles.navbarContainer,
      classNames,
    ]);

    return (
      <div className={containerClasses} ref={ref} style={style} {...rest}>
        {children}
      </div>
    );
  }
);
