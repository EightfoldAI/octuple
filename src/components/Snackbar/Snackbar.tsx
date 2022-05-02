import React, { FC } from 'react';
import { InfoBar } from '../InfoBar';
import { SnackbarProps } from './Snackbar.types';
import { classNames } from '../../shared/utilities';

import styles from './snackbar.module.scss';

export const Snackbar: FC<SnackbarProps> = ({ className, ...rest }) => {
    const snackbarClasses = classNames([styles.snackbar, className]);
    return <InfoBar {...rest} className={snackbarClasses} />;
};
