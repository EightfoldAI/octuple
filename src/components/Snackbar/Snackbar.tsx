'use client';

import React, { FC, forwardRef, useRef } from 'react';
import { InfoBar } from '../InfoBar';
import { SnackbarLocale, SnackbarProps } from './Snackbar.types';
import { mergeClasses } from '../../shared/utilities';
import { useMergedRefs } from '../../hooks/useMergedRefs';
import { useLocaleReceiver } from '../../locale';
import enUS from './Locale/en_US';

import styles from './snackbar.module.scss';

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  ({ classNames, moveFocusToSnackbar, closeButtonRef, ...rest }, parentRef) => {
    const { locale: propsLocale = enUS } = rest;
    const snackbarClasses = mergeClasses([styles.snackbar, classNames]);
    const snackbarRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRefs(parentRef, snackbarRef);

    const [snackbarLocale] = useLocaleReceiver('Snackbar');
    let mergedLocale: SnackbarLocale;

    if (propsLocale) {
      mergedLocale = propsLocale;
    } else {
      mergedLocale = snackbarLocale || propsLocale;
    }

    return (
      <InfoBar
        role="alert"
        ref={mergedRef}
        moveFocusToSnackbar={moveFocusToSnackbar}
        closeButtonRef={closeButtonRef}
        {...rest}
        classNames={snackbarClasses}
        contentClassNames={styles.content}
        contentWrapperClassNames={styles.contentWrapper}
        actionButtonClassNames={styles.actionButton}
        closeButtonAriaLabelText={mergedLocale.lang!.closeButtonAriaLabelText}
      />
    );
  }
);
