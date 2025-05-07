'use client';

import React, { FC, useRef } from 'react';
import { InfoBar } from '../InfoBar';
import { SnackbarProps } from './Snackbar.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './snackbar.module.scss';

export const Snackbar: FC<SnackbarProps> = ({
  classNames,
  moveFocusToSnackbar,
  ...rest
}) => {
  const snackbarClasses = mergeClasses([styles.snackbar, classNames]);
  const snackbarRef = useRef<HTMLDivElement>(null);
  return (
    <InfoBar
      role="status"
      ref={snackbarRef}
      moveFocusToSnackbar={moveFocusToSnackbar}
      {...rest}
      classNames={snackbarClasses}
      contentClassNames={styles.content}
      contentWrapperClassNames={styles.contentWrapper}
      actionButtonClassNames={styles.actionButton}
    />
  );
};
