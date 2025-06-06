'use client';

import React, { FC } from 'react';
import { InfoBar } from '../InfoBar';
import { SnackbarProps } from './Snackbar.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './snackbar.module.scss';

export const Snackbar: FC<SnackbarProps> = ({
  classNames,
  moveFocusToCloseButton,
  ...rest
}) => {
  const snackbarClasses = mergeClasses([styles.snackbar, classNames]);
  return (
    <InfoBar
      moveFocusToCloseButton={moveFocusToCloseButton}
      tabIndex={0}
      {...rest}
      classNames={snackbarClasses}
      contentClassNames={styles.content}
      contentWrapperClassNames={styles.contentWrapper}
      actionButtonClassNames={styles.actionButton}
    />
  );
};
