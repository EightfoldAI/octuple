'use client';

import React, { FC } from 'react';
import { SpinnerProps, SpinnerSize } from './Spinner.types';
import { Icon, IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';

import styles from './spinner.module.scss';

export const Spinner: FC<SpinnerProps> = ({
  size = SpinnerSize.Default,
  classNames,
  ...rest
}) => (
  <Icon
    {...rest}
    classNames={mergeClasses([styles.spinner, classNames])}
    spin={0.8}
    size={size}
    path={IconName.mdiLoading}
  />
);
