'use client';

import React from 'react';
import { mergeClasses } from '../../shared/utilities';
import { AtomProps } from './Atom.types';

export const Atom = React.forwardRef(
  ({ of, children, classes = [], ...props }, ref): JSX.Element => {
    const computedClassName = mergeClasses([...classes, 'oct-component']);
    return React.createElement(
      of,
      { ...props, ref, className: computedClassName },
      children
    );
  }
) as <T, U = any>(props: AtomProps<T, U>) => JSX.Element;
