'use client';

import React, { FC, forwardRef, useEffect, useRef } from 'react';
import { InfoBar } from '../InfoBar';
import { SnackbarProps } from './Snackbar.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './snackbar.module.scss';
import { useMergedRefs } from '../../hooks/useMergedRefs';

export const Snackbar: FC<SnackbarProps> = forwardRef(
  ({ classNames, moveFocusToSnackbar, ...rest }, parentRef) => {
    const snackbarClasses = mergeClasses([styles.snackbar, classNames]);
    const snackbarRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRefs(parentRef, snackbarRef);

    return (
      <InfoBar
        role="status"
        ref={mergedRef}
        moveFocusToSnackbar={moveFocusToSnackbar}
        {...rest}
        classNames={snackbarClasses}
        contentClassNames={styles.content}
        contentWrapperClassNames={styles.contentWrapper}
        actionButtonClassNames={styles.actionButton}
      />
    );
  }
);
