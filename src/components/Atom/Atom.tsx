import React from 'react';
import { ArgumentArray, mergeClasses } from '../../shared/utilities';
import { OcBaseProps } from '../OcBase';

type AtomProps<T = {}, U = React.Ref<any>> = Omit<T, 'children'> &
    OcBaseProps<U> & {
        of: keyof HTMLElementTagNameMap;
        classes: ArgumentArray;
        children?: React.ReactNode;
    };

export const Atom = React.forwardRef(
    ({ of, children, classes = [], ...props }, ref): JSX.Element => {
        const computedClassName = mergeClasses(classes);
        return React.createElement(
            of,
            { ...props, ref, className: computedClassName },
            children
        );
    }
) as <T, U = any>(props: AtomProps<T, U>) => JSX.Element;
